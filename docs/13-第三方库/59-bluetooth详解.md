# bluetooth 详解

> Flutter 蓝牙 BLE 通信：`flutter_blue_plus` 等插件扫描、连接、读写特征值（wiki：`[[bluetooth]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **常用包** | [flutter_blue_plus](https://pub.dev/packages/flutter_blue_plus)（`flutter_blue` 继任） |
| **协议** | BLE 为主；经典蓝牙视平台与插件 |
| **配合** | [[13-permission_handler详解]] |
| **适用** | 手环、IoT、打印机、Beacon |

## 安装

```yaml
dependencies:
  flutter_blue_plus: ^1.32.0
```

Android 12+ 需 `BLUETOOTH_SCAN`、`BLUETOOTH_CONNECT`；iOS `NSBluetoothAlwaysUsageDescription`。

## 扫描与连接

```dart
import 'package:flutter_blue_plus/flutter_blue_plus.dart';

Future<void> scanAndConnect() async {
  await FlutterBluePlus.startScan(timeout: const Duration(seconds: 4));

  await for (final results in FlutterBluePlus.scanResults) {
    for (final r in results) {
      if (r.device.platformName.contains('MyDevice')) {
        await FlutterBluePlus.stopScan();
        await r.device.connect(autoConnect: false);
        return;
      }
    }
  }
}
```

## 读写特征值

```dart
Future<void> readBattery(BluetoothDevice device) async {
  final services = await device.discoverServices();
  for (final s in services) {
    for (final c in s.characteristics) {
      if (c.uuid.str128.toLowerCase().contains('battery')) {
        final value = await c.read();
        debugPrint('battery: $value');
      }
    }
  }
}

Future<void> writeCommand(BluetoothCharacteristic c, List<int> bytes) async {
  await c.write(bytes, withoutResponse: c.properties.writeWithoutResponse);
}
```

## 最佳实践

1. **权限与定位**：Android 扫描 BLE 常需位置权限（视版本）。
2. **连接管理**：页面 dispose 时 `disconnect()`，防泄漏。
3. **MTU**：大数据分包或协商 MTU。
4. **后台**：iOS/Android 后台 BLE 限制严格，读文档。
5. **与 [[40-mqtt_client详解]]**：设备经网关 MQTT 上报 vs 手机直连 BLE 选型不同。

## 相关链接

- [[13-permission_handler详解]]
- [[40-mqtt_client详解]]
- [[02-Android平台集成]]
- [[00-第三方库索引]]
