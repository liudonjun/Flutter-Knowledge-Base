# geolocator 详解

> 跨平台获取设备地理位置：权限、单次定位与持续监听。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `geolocator` |
| **配合** | [[13-permission_handler详解]]、[[18-地图系统集成]] |
| **场景** | 附近门店、签到、轨迹、地图初始中心点 |

## 安装

```yaml
dependencies:
  geolocator: ^13.0.0
  permission_handler: ^11.0.0
```

Android：`ACCESS_FINE_LOCATION` 等；iOS：`NSLocationWhenInUseUsageDescription`。

## 基本用法

```dart
import 'package:geolocator/geolocator.dart';

Future<Position?> getCurrentPosition() async {
  var permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) return null;
  }
  if (permission == LocationPermission.deniedForever) return null;

  final serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) return null;

  return Geolocator.getCurrentPosition(
    locationSettings: const LocationSettings(
      accuracy: LocationAccuracy.high,
      timeLimit: Duration(seconds: 10),
    ),
  );
}

Stream<Position> watchPosition() {
  return Geolocator.getPositionStream(
    locationSettings: const LocationSettings(
      accuracy: LocationAccuracy.medium,
      distanceFilter: 10,
    ),
  );
}
```

## 最佳实践

1. **不要阻塞 UI**：定位放异步，页面先展示默认城市/上次缓存。
2. **精度与耗电**：导航用 high + stream；列表「附近」用 medium + 单次。
3. **错误 UX**：区分权限拒绝、GPS 关闭、超时，引导去设置。
4. **模拟器**：设置模拟坐标；真机必测。

## 相关链接

- [[18-地图系统集成]]
- [[13-permission_handler详解]]
- [[06-工具库详解]]
- [pub.dev · geolocator](https://pub.dev/packages/geolocator)
