# web_socket_channel 详解

> Flutter 使用原生 WebSocket：`web_socket_channel` 连接、心跳、重连与 JSON 消息（wiki：`[[web_socket_channel]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [web_socket_channel](https://pub.dev/packages/web_socket_channel) |
| **协议** | 标准 WebSocket（RFC 6455） |
| **适用** | 自建实时 API、行情、轻量聊天、游戏状态同步 |
| **对比** | 后端 Socket.IO 用 [[41-socket_io_client详解]] |
| **站内** | [[13-消息系统设计]]、[[22-社交应用实战]] |

无内置房间/重连，需在 **应用层** 实现心跳、重连与消息序号。

## 安装

```yaml
dependencies:
  web_socket_channel: ^3.0.0
```

## 基本连接

```dart
import 'package:web_socket_channel/web_socket_channel.dart';
import 'package:web_socket_channel/status.dart' as status;

WebSocketChannel connectWs(String url, {Map<String, String>? headers}) {
  final uri = Uri.parse(url);
  return WebSocketChannel.connect(uri, headers: headers);
}
```

带 Token 常见写法：`wss://api.example.com/ws?token=xxx` 或 `Authorization` 头（视服务端支持）。

## 封装：连接管理器

```dart
class WsClient {
  WsClient(this._url);
  final String _url;
  WebSocketChannel? _channel;
  StreamSubscription? _sub;
  int _retry = 0;

  final _incoming = StreamController<Map<String, dynamic>>.broadcast();
  Stream<Map<String, dynamic>> get messages => _incoming.stream;

  Future<void> connect() async {
    await _sub?.cancel();
    _channel?.sink.close(status.goingAway);

    _channel = WebSocketChannel.connect(Uri.parse(_url));
    _retry = 0;

    _sub = _channel!.stream.listen(
      (data) {
        final map = jsonDecode(data as String) as Map<String, dynamic>;
        _incoming.add(map);
      },
      onDone: _scheduleReconnect,
      onError: (_) => _scheduleReconnect,
      cancelOnError: true,
    );

    _startHeartbeat();
  }

  void send(Map<String, dynamic> payload) {
    _channel?.sink.add(jsonEncode(payload));
  }

  void _startHeartbeat() {
    Timer.periodic(const Duration(seconds: 30), (_) {
      send({'type': 'ping'});
    });
  }

  void _scheduleReconnect() {
    if (_retry > 5) return;
    final delay = Duration(seconds: 1 << _retry.clamp(0, 5));
    _retry++;
    Future.delayed(delay, connect);
  }

  Future<void> close() async {
    await _sub?.cancel();
    await _channel?.sink.close(status.normalClosure);
    await _incoming.close();
  }
}
```

## 消息协议建议

```json
{ "type": "chat", "seq": 1024, "payload": { "cid": "c1", "text": "hi" } }
```

- **seq / ack**：检测丢包与重复
- **type 枚举**：`auth`、`chat`、`ack`、`ping`、`pong`
- 首帧 `auth` 携带 JWT，服务端校验后再订阅频道

## 与 socket_io 选型

| 维度 | web_socket_channel | socket_io_client |
| --- | --- | --- |
| 服务端 | 任意 WS | 必须 Socket.IO |
| 房间/广播 | 自实现 | 内置 |
| 包体积 | 小 | 相对大 |
| 代理 | 标准 WS | 需 Socket.IO path |

## 最佳实践

1. **wss**：生产环境只用 `wss://`，禁止明文 `ws`。
2. **前台服务**：Android 长连后台需 Foreground Service + 合规说明。
3. **合并 REST**：历史消息 REST 分页拉取，WS 只推增量。
4. **测试**：`IOWebSocketChannel.connect` 可 mock；集成测用本地 WS 服务。
5. **关闭**：页面 dispose 时 `close()`，防泄漏。

## 相关链接

- [[41-socket_io_client详解]]
- [[40-mqtt_client详解]]
- [[13-消息系统设计]]
- [[03-网络请求库详解]]
- [[00-第三方库索引]]
