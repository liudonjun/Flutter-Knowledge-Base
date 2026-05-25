# permission_handler 详解

> 统一申请与检查 Android/iOS 权限：相机、相册、定位、通知等（wiki：`[[permission_handler]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [permission_handler](https://pub.dev/packages/permission_handler) |
| **能力** | 查询状态、`request()`、跳转系统设置 |
| **配合** | [[22-image_picker详解]]、[[58-geolocator详解]]、[[57-camera详解]] |
| **站内** | [[18-地图系统集成]]、[[22-社交应用实战]] |

插件只负责 **权限 UI 流程**；`AndroidManifest` / `Info.plist` 仍需声明用途说明。

## 安装

```yaml
dependencies:
  permission_handler: ^11.3.0
```

Android 在 `android/app/src/main/AndroidManifest.xml` 声明具体权限；iOS 在 `Info.plist` 填 `NS*UsageDescription`。

### Android 额外配置（部分版本）

在 `AndroidManifest` 的 `<application>` 内按 README 添加 `permission_handler` 所需的 `activity`/`queries` 声明（以 pub 文档为准）。

## 基本用法

```dart
import 'package:permission_handler/permission_handler.dart';

Future<bool> ensureCamera() async {
  var status = await Permission.camera.status;
  if (status.isGranted) return true;

  if (status.isDenied) {
    status = await Permission.camera.request();
    return status.isGranted;
  }

  if (status.isPermanentlyDenied) {
    await openAppSettings();
  }
  return false;
}
```

## 常见权限映射

| 能力 | Permission | 平台备注 |
| --- | --- | --- |
| 相机 | `Permission.camera` | 拍照/扫码 |
| 相册 | `Permission.photos` | iOS；Android 13+ 用 `photos` / `storage` 视 targetSdk |
| 定位 | `Permission.locationWhenInUse` | 地图、[[58-geolocator详解]] |
| 后台定位 | `Permission.locationAlways` | 需额外审核理由 |
| 通知 | `Permission.notification` | Android 13+ |
| 麦克风 | `Permission.microphone` | 语音/视频 |
| 蓝牙 | `Permission.bluetoothConnect` | Android 12+ |

## 封装：权限网关

```dart
typedef PermissionGate = Future<bool> Function();

Future<bool> runWithPermission(
  Permission permission,
  Future<void> Function() action, {
  void Function()? onDenied,
}) async {
  final ok = await _ensure(permission);
  if (!ok) {
    onDenied?.call();
    return false;
  }
  await action();
  return true;
}

Future<bool> _ensure(Permission p) async {
  if (await p.isGranted) return true;
  final r = await p.request();
  if (r.isGranted) return true;
  if (r.isPermanentlyDenied) await openAppSettings();
  return false;
}
```

业务层（如头像上传）先 `runWithPermission(Permission.photos, ...)`，再调 [[22-image_picker详解]]。

## 最佳实践

1. **用时再请**：不要启动页一次性请求全部权限。
2. **解释后请求**：先 Dialog 说明用途，再 `request()`，提高通过率。
3. **永久拒绝**：`isPermanentlyDenied` → 引导 `openAppSettings()`，勿死循环 request。
4. **分平台**：Android 13 通知、照片权限与旧版不同，真机分版本测。
5. **Web/Desktop**：部分 Permission 不可用，需 `kIsWeb` 分支。

## 相关链接

- [[22-image_picker详解]]
- [[58-geolocator详解]]
- [[18-地图系统集成]]
- [[06-工具库详解]]
- [[00-第三方库索引]]
