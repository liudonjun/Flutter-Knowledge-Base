# Adaptive Widgets 详解

> 按平台自动或手动切换 Material / Cupertino 组件，提升跨平台原生体验。

## 概述

Flutter 没有单一 `adaptive` 包；「Adaptive Widgets」指 **平台自适应 UI 模式**，常用：

| 方式 | 说明 |
| --- | --- |
| `flutter/platform.dart` | `Platform.isIOS` / `defaultTargetPlatform` |
| Material 3 自适应组件 | 如 `Switch.adaptive()`、`Slider.adaptive()` |
| 自行封装 | 根据平台返回 Material 或 Cupertino 子树 |

## 基本模式

```dart
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

bool get isApple {
  if (kIsWeb) return false;
  return Platform.isIOS || Platform.isMacOS;
}

Widget adaptiveSwitch({
  required bool value,
  required ValueChanged<bool> onChanged,
}) {
  if (isApple) {
    return CupertinoSwitch(value: value, onChanged: onChanged);
  }
  return Switch(value: value, onChanged: onChanged);
}
```

## Material 内置 adaptive

```dart
Switch.adaptive(value: on, onChanged: (v) => setState(() => on = v));
Slider.adaptive(value: v, onChanged: (x) => setState(() => v = x));
```

## 最佳实践

1. **交互控件优先 adaptive**：Switch、Slider、ProgressIndicator。
2. **导航结构按平台**：iOS 常用底部 Tab + 大标题；Android 用 NavigationBar/Drawer。
3. **不要过度分裂**：业务逻辑共用，仅 UI 层分支。
4. **测试双平台**：Widget 测试可 mock `debugDefaultTargetPlatformOverride`。

## 相关链接

- [[53-Material组件详解]]
- [[54-Cupertino组件详解]]
- [[03-iOS平台集成]]
- [[05-UI组件库详解]]
