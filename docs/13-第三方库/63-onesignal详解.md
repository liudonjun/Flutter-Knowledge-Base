# OneSignal 详解

> 第三方推送平台 OneSignal SDK：跨平台推送、细分、A/B（wiki：`[[onesignal]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [onesignal_flutter](https://pub.dev/packages/onesignal_flutter) |
| **对比** | 自建 FCM — [[24-firebase_messaging详解]] |
| **适用** | 快速接入推送、营销自动化、无需自研推送后台 |
| **站内** | [[13-消息系统设计]]、[[25-flutter_local_notifications详解]] |

OneSignal 封装 APNs/FCM；仍要在各平台配置证书与 Firebase（Android）。

## 安装

```yaml
dependencies:
  onesignal_flutter: ^5.2.0
```

控制台创建 App，获取 **OneSignal App ID**。

## 初始化

```dart
import 'package:onesignal_flutter/onesignal_flutter.dart';

Future<void> initOneSignal(String appId) async {
  OneSignal.Debug.setLogLevel(OSLogLevel.verbose);
  OneSignal.initialize(appId);

  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addClickListener((event) {
    final data = event.notification.additionalData;
    final route = data?['route'] as String?;
    if (route != null) {
      // router.go(route);
    }
  });

  OneSignal.User.pushSubscription.addObserver((state) {
    debugPrint('push id: ${state.current.id}');
  });
}
```

## 用户标识

```dart
await OneSignal.login(businessUserId);
OneSignal.User.addTags({'plan': 'pro', 'lang': 'zh'});
```

与业务账号绑定后，后台按 Tag 群发。

## 与 FCM 分工

| 方案 | 说明 |
| --- | --- |
| **Firebase 直连** | 完全自控 payload、与 Firebase 生态一体 |
| **OneSignal** | 控制台、细分、旅程；依赖第三方 |

## 最佳实践

1. **隐私**：告知推送用途；提供关闭开关。
2. **Deep Link**：`additionalData` 只放路由 id。
3. **与 IM**：聊天在线 WS，离线 OneSignal，见 [[13-消息系统设计]]。
4. **测试**：OneSignal 控制台发测试推送 + 真机。

## 相关链接

- [[24-firebase_messaging详解]]
- [[64-push_notification详解]]
- [[25-flutter_local_notifications详解]]
- [[00-第三方库索引]]
