# firebase_messaging 详解

> Firebase Cloud Messaging（FCM）在 Flutter 中的接入：Token、前台/后台消息与跳转。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `firebase_messaging` |
| **依赖** | 通常与 `firebase_core` 一起使用 |
| **能力** | 推送 Token、消息监听、通知点击 Deep Link |
| **站内** | [[13-消息系统设计]]、[[25-flutter_local_notifications详解]] |

## 安装

```yaml
dependencies:
  firebase_core: ^3.0.0
  firebase_messaging: ^15.0.0
```

按 [FlutterFire 文档](https://firebase.flutter.dev/docs/messaging/overview) 配置 `google-services.json` / `GoogleService-Info.plist`。

## 初始化与 Token

```dart
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

@pragma('vm:entry-point')
Future<void> _firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  // 处理后台数据消息
}

Future<void> setupFcm() async {
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_firebaseMessagingBackgroundHandler);

  final messaging = FirebaseMessaging.instance;
  await messaging.requestPermission();

  final token = await messaging.getToken();
  // 上传 token 到你的后端，与用户账号绑定

  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    // 前台：可配合 flutter_local_notifications 展示
  });

  FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
    // 点击通知冷/热启动后的路由跳转
  });
}
```

## 平台差异

| 平台 | 注意 |
| --- | --- |
| **Android** | 通知渠道、高优先级、厂商杀后台 |
| **iOS** | APNs 证书/Key、Capabilities 打开 Push |
| **Web** | 需 VAPID key |

## 最佳实践

1. **Token 刷新**：监听 `onTokenRefresh` 并更新服务端。
2. **数据 vs 通知消息**：后台纯数据需 `onBackgroundMessage`；展示通知常用 notification payload + 本地通知兜底。
3. **与 IM 区分**：FCM 适合系统级到达；聊天在线态仍用 WebSocket — [[41-socket_io_client详解]]。
4. **测试**：Firebase Console 单设备推送；真机验证点击跳转。

## 相关链接

- [[13-消息系统设计]]
- [[63-onesignal详解]]
- [[00-第三方库索引]]
