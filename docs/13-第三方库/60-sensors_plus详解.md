# sensors_plus 详解

> 读取加速度计、陀螺仪、磁力计等传感器数据（wiki：`[[sensors_plus]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [sensors_plus](https://pub.dev/packages/sensors_plus) |
| **适用** | 摇一摇、计步、水平仪、简单游戏控制 |
| **注意** | 高频采样耗电；需处理 stream 订阅生命周期 |

## 安装

```yaml
dependencies:
  sensors_plus: ^6.0.0
```

## 加速度计

```dart
import 'package:sensors_plus/sensors_plus.dart';
import 'dart:async';

class ShakeDetector {
  ShakeDetector({required this.onShake});
  final VoidCallback onShake;
  StreamSubscription<AccelerometerEvent>? _sub;
  static const _threshold = 15.0;

  void start() {
    _sub = accelerometerEventStream().listen((e) {
      final g = e.x * e.x + e.y * e.y + e.z * e.z;
      if (g > _threshold * _threshold) onShake();
    });
  }

  void dispose() => _sub?.cancel();
}
```

## 陀螺仪 / 磁力计

```dart
gyroscopeEventStream().listen((GyroscopeEvent e) {
  debugPrint('gyro x:${e.x} y:${e.y} z:${e.z}');
});

magnetometerEventStream().listen((MagnetometerEvent e) {
  // 指南针需融合算法，简单场景可用
});
```

## 用户加速度（去重力）

```dart
userAccelerometerEventStream().listen((UserAccelerometerEvent e) {
  // 更适合检测用户施加的线性加速度
});
```

## 最佳实践

1. **节流**：业务层限制处理频率（如 50ms 一次）。
2. **dispose 必 cancel**：防内存与后台耗电。
3. **权限**：部分厂商无额外权限；仍测真机。
4. **Web/Desktop**：支持有限，`kIsWeb` 分支。
5. **精计步**：生产用 `pedometer` 或 HealthKit/Google Fit。

## 相关链接

- [[58-geolocator详解]]
- [[59-bluetooth详解]]
- [[00-第三方库索引]]
