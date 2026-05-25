# mqtt_client 详解

> Flutter 通过 MQTT 订阅/发布消息：物联网、设备状态、轻量广播（wiki：`[[mqtt_client]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [mqtt_client](https://pub.dev/packages/mqtt_client) |
| **协议** | MQTT 3.1.1 / 5.0（视 Broker 与客户端配置） |
| **适用** | 传感器上报、智能家居、车队定位、服务端广播 |
| **不太适合** | 强 IM（已读、会话、复杂 ACK）— 见 [[41-socket_io_client详解]] |
| **站内** | [[03-网络请求库详解]]、[[18-地图系统集成]]（设备轨迹类场景） |

MQTT 是 **发布/订阅** 模型，经 Broker 中转；客户端不直接点对点，Topic 设计是关键。

## 安装

```yaml
dependencies:
  mqtt_client: ^10.0.0
```

Broker 示例：Eclipse Mosquitto、EMQX、AWS IoT Core、HiveMQ。

## 连接与订阅

```dart
import 'package:mqtt_client/mqtt_client.dart';
import 'package:mqtt_client/mqtt_server_client.dart';

MqttServerClient buildClient(String broker, String clientId) {
  final client = MqttServerClient.withPort(broker, clientId, 8883);
  client.secure = true;
  client.keepAlivePeriod = 30;
  client.onConnected = () => debugPrint('MQTT connected');
  client.onDisconnected = () => debugPrint('MQTT disconnected');
  client.pongCallback = () => debugPrint('Ping response');
  return client;
}

Future<void> connect(MqttServerClient client, {required String username, required String password}) async {
  final conn = MqttConnectMessage()
      .withClientIdentifier(client.clientIdentifier)
      .authenticateAs(username, password)
      .startClean()
      .withWillQos(MqttQos.atLeastOnce);

  client.connectionMessage = conn;
  await client.connect();
}

void subscribeDeviceTelemetry(MqttServerClient client, String deviceId) {
  final topic = 'devices/$deviceId/telemetry';
  client.subscribe(topic, MqttQos.atLeastOnce);

  client.updates!.listen((events) {
    for (final m in events) {
      final rec = m.payload as MqttPublishMessage;
      final body = MqttPublishPayload.bytesToStringAsString(rec.payload.message);
      debugPrint('$topic => $body');
    }
  });
}
```

## 发布消息

```dart
void publishJson(MqttServerClient client, String topic, Map<String, dynamic> data) {
  final builder = MqttClientPayloadBuilder();
  builder.addString(jsonEncode(data));
  client.publishMessage(topic, MqttQos.atLeastOnce, builder.payload!);
}

// 设备上报示例
publishJson(client, 'devices/$deviceId/telemetry', {
  'temp': 26.5,
  'ts': DateTime.now().toIso8601String(),
});
```

## QoS 与 Topic 设计

| QoS | 含义 | 场景 |
| --- | --- | --- |
| 0 | 至多一次 | 高频可丢数据 |
| 1 | 至少一次 | 常规 telemetry |
| 2 | 恰好一次 | 计费、关键指令 |

Topic 示例：

```text
devices/{id}/telemetry     # 设备 → 云
devices/{id}/command       # 云 → 设备
users/{uid}/notify         # 广播通知（非 IM 会话）
```

用 `+`、`#` 通配符时严格控制 ACL，防越权订阅。

## Flutter 集成注意

1. **后台**：Android/iOS 后台 MQTT 连接受系统限制，常配合推送唤醒。
2. **TLS**：生产 `8883` + 证书校验；IoT 可用客户端证书。
3. **clientId 唯一**：同 ID 互踢，重连加随机后缀。
4. **与 WS 对比**：MQTT 更省流量、适合弱网多设备；聊天仍优先 WS/Socket.IO。

## 相关链接

- [[26-web_socket_channel详解]]
- [[41-socket_io_client详解]]
- [[03-网络请求库详解]]
- [[00-第三方库索引]]
