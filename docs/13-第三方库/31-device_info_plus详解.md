# device_info_plus 详解

> 读取设备型号、系统版本、标识符，用于适配、日志与风控（wiki：`[[device_info_plus]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [device_info_plus](https://pub.dev/packages/device_info_plus) |
| **平台** | Android、iOS、Web、Desktop |
| **适用** | 版本兼容、Bug 上报、API 网关 `User-Agent` 补充 |
| **注意** | **勿**将设备 ID 当作稳定用户标识；隐私合规 |
| **站内** | [[06-工具库详解]]、[[42-dio_logging_interceptor详解]] |

与 `package_info_plus`（App 版本）常一起使用。

## 安装

```yaml
dependencies:
  device_info_plus: ^10.1.0
  package_info_plus: ^8.0.0  # 可选：app 版本
```

## 基本用法

```dart
import 'dart:io';
import 'package:device_info_plus/device_info_plus.dart';

final deviceInfo = DeviceInfoPlugin();

Future<Map<String, String>> collectDeviceContext() async {
  if (Platform.isAndroid) {
    final android = await deviceInfo.androidInfo;
    return {
      'platform': 'android',
      'model': android.model,
      'brand': android.brand,
      'sdkInt': '${android.version.sdkInt}',
      'release': android.version.release,
    };
  }
  if (Platform.isIOS) {
    final ios = await deviceInfo.iosInfo;
    return {
      'platform': 'ios',
      'model': ios.utsname.machine,
      'system': '${ios.systemName} ${ios.systemVersion}',
      'isPhysical': '${ios.isPhysicalDevice}',
    };
  }
  return {'platform': 'other'};
}
```

## 与 Dio 请求头

```dart
class DeviceHeaderInterceptor extends Interceptor {
  DeviceHeaderInterceptor(this._info);
  final Map<String, String> _info;

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    options.headers['X-Device-Platform'] = _info['platform'];
    options.headers['X-Device-Model'] = _info['model'];
    handler.next(options);
  }
}

// 启动时
final ctx = await collectDeviceContext();
dio.interceptors.add(DeviceHeaderInterceptor(ctx));
```

## 功能开关示例

```dart
bool needsLegacyStorageWorkaround(Map<String, String> ctx) {
  final sdk = int.tryParse(ctx['sdkInt'] ?? '0') ?? 0;
  return sdk <= 29;
}
```

按 SDK / 系统版本走不同代码路径，减少 `Platform.isAndroid` 散落。

## 隐私与合规

1. **identifierForVendor / androidId**：仅作分析会话，跨重装可能变；遵守 GDPR/个保法告知。
2. **不上传原始 IMEI**：现代 API 已限制；勿尝试绕过。
3. **Crash 报告**：Firebase Crashlytics / Sentry 会自动带部分设备信息，避免重复采集。

## 最佳实践

1. **启动缓存**：读一次存内存，勿每次请求都 await。
2. **Web**：`WebBrowserInfo` 字段不同，分支处理。
3. **测试**：Mock `DeviceInfoPlugin` 或用 fake platform 测分支逻辑。
4. **与 `package_info_plus`**：上报 `version+build` 与设备信息组合使用。

## 相关链接

- [[06-工具库详解]]
- [[03-网络请求库详解]]
- [[02-调试技巧详解]]
- [[00-第三方库索引]]
