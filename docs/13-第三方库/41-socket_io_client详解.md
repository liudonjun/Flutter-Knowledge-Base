# socket_io_client 详解

> Flutter 接入 Socket.IO 服务端：房间、事件、重连与鉴权（wiki：`[[socket_io_client]]` / `socket_io_client`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [socket_io_client](https://pub.dev/packages/socket_io_client) |
| **协议** | Socket.IO（非裸 WebSocket；需服务端同为 Socket.IO） |
| **适用** | 聊天、协作、实时通知、在线状态 |
| **对比** | 裸 WS 用 [[26-web_socket_channel详解]]；IoT 用 [[40-mqtt_client详解]] |
| **站内** | [[13-消息系统设计]]、[[22-社交应用实战]]、[[24-firebase_messaging详解]] |

Socket.IO 自带心跳、重连、房间；比手写 WS 省心，但协议与 nginx 代理配置需与服务端一致。

## 安装

```yaml
dependencies:
  socket_io_client: ^3.0.0
```

Flutter 端建议 **强制 WebSocket 传输**，避免 long-polling 在移动端异常：

```dart
import 'package:socket_io_client/socket_io_client.dart' as io;
```

## 连接与鉴权

```dart
io.Socket createChatSocket({required String token}) {
  final socket = io.io(
    'https://api.example.com',
    io.OptionBuilder()
        .setTransports(['websocket'])
        .disableAutoConnect()
        .setAuth({'token': token})
        .setPath('/socket.io/')
        .enableReconnection()
        .setReconnectionDelay(1000)
        .setReconnectionDelayMax(5000)
        .build(),
  );

  socket.onConnect((_) => debugPrint('socket connected'));
  socket.onDisconnect((_) => debugPrint('socket disconnected'));
  socket.onConnectError((e) => debugPrint('connect error: $e'));

  socket.connect();
  return socket;
}
```

Token 过期：监听 `connect_error`，刷新 JWT 后 `disconnect()` + 更新 `auth` + 重连。

## 收发消息

```dart
void bindChatEvents(io.Socket socket, {
  required void Function(Map<String, dynamic> msg) onMessage,
}) {
  socket.on('message', (data) {
    if (data is Map) onMessage(Map<String, dynamic>.from(data));
  });

  socket.on('typing', (data) {
    // 对方正在输入
  });
}

void sendMessage(io.Socket socket, {
  required String conversationId,
  required String content,
}) {
  socket.emit('message', {
    'conversation_id': conversationId,
    'content': content,
    'client_msg_id': DateTime.now().millisecondsSinceEpoch.toString(),
  });
}

void joinRoom(io.Socket socket, String conversationId) {
  socket.emit('join', {'room': conversationId});
}
```

服务端应用 `client_msg_id` 做 **幂等**，避免重连重复入库。

## 与 FCM 分工

| 场景 | 方案 |
| --- | --- |
| App 前台 / 在线 | Socket 直推 |
| 后台 / 进程被杀 | [[24-firebase_messaging详解]] 唤醒或拉增量 |
| 本地横幅 | [[25-flutter_local_notifications详解]] |

## 生命周期

```dart
class ChatSocketHolder {
  io.Socket? _socket;

  void connect(String token) {
    _socket?.dispose();
    _socket = createChatSocket(token: token);
    bindChatEvents(_socket!, onMessage: _handleMessage);
  }

  void dispose() {
    _socket?.disconnect();
    _socket?.dispose();
    _socket = null;
  }
}
```

- 登出 / 进后台较久：可 `disconnect` 省电；回前台再连
- 使用 `WidgetsBindingObserver` 或 App lifecycle 协调重连

## 最佳实践

1. **`setTransports(['websocket'])`**：Flutter 必备，减少兼容问题。
2. **指数退避**：用内置 reconnection，避免疯狂重连打爆服务端。
3. **消息 ACK**：`emitWithAck` 或业务层 `sent/delivered` 状态机。
4. **本地库**：收到消息写 SQLite/Hive，UI 读本地 + socket 增量。
5. **代理**：Nginx 需配置 `Upgrade` / `Connection` 头，path 与后端一致。

## 选型对比

| 库 | 何时用 |
| --- | --- |
| **socket_io_client** | 后端已是 Socket.IO |
| **web_socket_channel** | 自建 JSON 协议、轻量 IM |
| **mqtt_client** | 设备上报、订阅广播，非强 IM |

## 相关链接

- [[26-web_socket_channel详解]]
- [[13-消息系统设计]]
- [[22-社交应用实战]]
- [[03-网络请求库详解]]
- [[00-第三方库索引]]
