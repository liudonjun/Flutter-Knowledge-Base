# flutter_local_notifications 详解

> 在 Flutter 中展示本地通知：前台补充、定时提醒、与 FCM 配合的通道配置（wiki：`[[flutter_local_notifications]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) |
| **用途** | App 内触发的通知（非 FCM 下行也可显示）；Android **Notification Channel** |
| **配合** | [[24-firebase_messaging详解]]（远程消息转本地通知） |
| **站内** | [[13-消息系统设计]]、[[22-社交应用实战]] |

远程推送仍优先 FCM/APNs；本地插件负责 **展示层** 与渠道、点击回调。

## 安装

```yaml
dependencies:
  flutter_local_notifications: ^18.0.0
```

Android 需在 `AndroidManifest` 注册 `RECEIVE_BOOT_COMPLETED` 等（按版本 README）；iOS 请求通知权限。

## 初始化

```dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

final flutterLocalNotificationsPlugin = FlutterLocalNotificationsPlugin();

Future<void> initLocalNotifications() async {
  const android = AndroidInitializationSettings('@mipmap/ic_launcher');
  const ios = DarwinInitializationSettings(
    requestAlertPermission: true,
    requestBadgePermission: true,
    requestSoundPermission: true,
  );

  await flutterLocalNotificationsPlugin.initialize(
    const InitializationSettings(android: android, iOS: ios),
    onDidReceiveNotificationResponse: (details) {
      final payload = details.payload;
      if (payload != null) {
        // 例如 payload = conversation_id，跳转聊天页
        router.push('/chat/$payload');
      }
    },
  );

  // Android 8+ 必须创建 channel
  const channel = AndroidNotificationChannel(
    'chat_messages',
    '聊天消息',
    description: '新消息提醒',
    importance: Importance.high,
  );
  await flutterLocalNotificationsPlugin
      .resolvePlatformSpecificImplementation<
          AndroidFlutterLocalNotificationsPlugin>()
      ?.createNotificationChannel(channel);
}
```

## 展示通知

```dart
Future<void> showChatNotification({
  required int id,
  required String title,
  required String body,
  required String conversationId,
}) async {
  const androidDetails = AndroidNotificationDetails(
    'chat_messages',
    '聊天消息',
    channelDescription: '新消息提醒',
    importance: Importance.high,
    priority: Priority.high,
  );
  const iosDetails = DarwinNotificationDetails();
  const details = NotificationDetails(android: androidDetails, iOS: iosDetails);

  await flutterLocalNotificationsPlugin.show(
    id,
    title,
    body,
    details,
    payload: conversationId,
  );
}
```

## 与 FCM 前台配合

当 App 在前台时，系统默认不弹横幅；可在 `FirebaseMessaging.onMessage` 里转本地通知：

```dart
FirebaseMessaging.onMessage.listen((message) {
  final n = message.notification;
  if (n == null) return;
  showChatNotification(
    id: message.hashCode,
    title: n.title ?? '新消息',
    body: n.body ?? '',
    conversationId: message.data['conversation_id'] ?? '',
  );
});
```

详见 [[24-firebase_messaging详解]]。

## 最佳实践

1. **Channel 分类**：聊天、营销、系统分开，用户可在系统设置里关闭营销类。
2. **id 策略**：同一会话用固定 id 可 **更新** 通知而非堆叠（`show` 同 id 覆盖）。
3. **payload**：只放路由所需 id，勿放敏感信息。
4. **权限**：iOS 首次需请求；Android 13+ 需 `POST_NOTIFICATIONS`。
5. **点击冷启动**：`getNotificationAppLaunchDetails()` 处理进程被杀后点通知进入。

## 相关链接

- [[24-firebase_messaging详解]]
- [[13-消息系统设计]]
- [[22-社交应用实战]]
- [[00-第三方库索引]]
