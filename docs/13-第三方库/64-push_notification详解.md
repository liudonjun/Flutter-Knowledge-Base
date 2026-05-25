# 推送通知总览

> Flutter 推送体系梳理：远程推送、本地通知与到达策略（wiki：`[[push_notification]]`）。

## 概述

推送在 Flutter 中分两层：

| 类型 | 实现 | 文档 |
| --- | --- | --- |
| **远程推送** | FCM / APNs / 第三方 | [[24-firebase_messaging详解]]、[[63-onesignal详解]] |
| **本地通知** | 应用内触发 | [[25-flutter_local_notifications详解]] |

本文是 **架构总览**；具体 SDK 见上表。

## 到达路径

```
服务端 → FCM/APNs → 系统托盘
                    ↓
         App 前台：onMessage → 可选转本地通知
         App 后台：系统展示
         用户点击：onMessageOpenedApp / getInitialMessage → Deep Link
```

## Flutter 集成要点

### 1. 注册 Token

```dart
final token = await FirebaseMessaging.instance.getToken();
await api.bindDeviceToken(token, platform: Platform.isIOS ? 'ios' : 'android');
```

Token 会变：`onTokenRefresh` 重新上报。

### 2. 权限

- iOS：请求 alert/badge/sound
- Android 13+：`Permission.notification` — [[13-permission_handler详解]]

### 3. 前台行为

系统默认前台不弹横幅；需 [[25-flutter_local_notifications详解]] 或 in-app banner。

### 4. 数据 vs 通知消息

| 类型 | 后台展示 | data 字段 |
| --- | --- | --- |
| notification | 系统自动 | 部分平台受限 |
| data-only | 需自建通知 | 全在 data |

IM 场景常用 **data** + 本地通知自定义标题。

## 与业务模块

见 [[13-消息系统设计]]：

- 在线：WebSocket — [[41-socket_io_client详解]]
- 离线：推送唤醒 + 拉增量
- 未读：服务端 authoritative

## 平台配置清单

| 平台 | 项 |
| --- | --- |
| **Android** | `google-services.json`、通道 ID、图标 |
| **iOS** | APNs Key、Capabilities Push、Background Modes |
| **OneSignal** | 额外 SDK 初始化 — [[63-onesignal详解]] |

## 最佳实践

1. **幂等**：同 `msg_id` 只处理一次。
2. **静默推送**：iOS content-available 用于后台同步，勿滥用。
3. **合规**：营销推送提供退订；区分 transactional / marketing channel。
4. **测试**：真机 + 杀进程 + 点击通知路由。

## 相关链接

- [[24-firebase_messaging详解]]
- [[63-onesignal详解]]
- [[25-flutter_local_notifications详解]]
- [[13-消息系统设计]]
- [[00-第三方库索引]]
