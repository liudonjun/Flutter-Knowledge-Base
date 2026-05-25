# flutter_animate 详解

> 链式声明式 UI 动画：fade、slide、scale 与交错延迟（wiki：`[[flutter_animate]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [flutter_animate](https://pub.dev/packages/flutter_animate) |
| **特点** | 扩展 `Widget.animate()`，无需手写 `AnimationController` |
| **适用** | 列表入场、页面过渡、按钮微交互 |
| **对比** | 设计稿 JSON 动效用 [[19-lottie详解]]；复杂曲线仍可用原生 `AnimationController` |
| **站内** | [[03-动画系统详解]] |

遵循 **局部动画** 原则：只动需要动的子树，避免整页 rebuild。

## 安装

```yaml
dependencies:
  flutter_animate: ^4.5.0
```

## 基本用法

```dart
import 'package:flutter_animate/flutter_animate.dart';

Text('Hello')
    .animate()
    .fadeIn(duration: 300.ms)
    .slideY(begin: 0.2, end: 0);

Icon(Icons.check)
    .animate(onPlay: (c) => c.repeat(reverse: true))
    .scale(begin: const Offset(1, 1), end: const Offset(1.1, 1.1), duration: 600.ms);
```

扩展由包提供：`300.ms`、`0.5.seconds` 等。

## 列表交错（stagger）

```dart
Column(
  children: [
    for (var i = 0; i < items.length; i++)
      ListTile(title: Text(items[i]))
          .animate()
          .fadeIn(delay: (50 * i).ms, duration: 250.ms)
          .slideX(begin: 0.05, end: 0),
  ],
);
```

或用 `.animate(interval: 50.ms)` 在 `ListView` children 上统一间隔。

## 与 flutter_animate 效果枚举

```dart
Card(
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: const Text('Dashboard'),
  ),
)
    .animate()
    .shimmer(duration: 1200.ms, color: Colors.white24) // 骨架屏风格
    .then() // 串联下一段
    .shake(hz: 4, curve: Curves.easeInOut);
```

常用：`.fadeIn`、`.fadeOut`、`.slideX/Y`、`.scale`、`.blur`、`.toggle`（显隐）。

## 最佳实践

1. **duration 克制**：微交互 150–300ms，页面级 300–500ms。
2. **reduce motion**：系统开启减少动画时跳过或缩短：

```dart
final reduce = MediaQuery.of(context).disableAnimations;
if (reduce) return child;
return child.animate().fadeIn();
```

3. **性能**：动画作用在 **单 Widget** 上；大列表用 `interval` 而非超长 delay 链。
4. **与 Hero 共存**：Hero 负责共享元素；入场用 flutter_animate 补充。
5. **测试**：`WidgetTester.pump(duration)` 推进时间轴。

## 相关链接

- [[19-lottie详解]]
- [[03-动画系统详解]]
- [[04-手势处理详解]]
- [[00-第三方库索引]]
