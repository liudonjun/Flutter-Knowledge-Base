# animated_text_kit 详解

> 打字机、旋转、淡入淡出等 **文字动画** 预设（wiki：`[[animated_text_kit]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [animated_text_kit](https://pub.dev/packages/animated_text_kit) |
| **适用** | Splash 标语、空状态文案、引导页 |
| **对比** | 通用 Widget 动画 [[28-flutter_animate详解]] |

## 安装

```yaml
dependencies:
  animated_text_kit: ^4.2.2
```

## 基本用法

```dart
import 'package:animated_text_kit/animated_text_kit.dart';

AnimatedTextKit(
  animatedTexts: [
    TypewriterAnimatedText(
      'Hello Flutter',
      speed: const Duration(milliseconds: 80),
    ),
    FadeAnimatedText('Welcome back'),
    RotateAnimatedText('Build faster'),
  ],
  repeatForever: true,
  pause: const Duration(milliseconds: 500),
);
```

## 常用效果

| 类 | 效果 |
| --- | --- |
| `TypewriterAnimatedText` | 打字机 |
| `FadeAnimatedText` | 淡入切换 |
| `RotateAnimatedText` | 旋转切换 |
| `ScaleAnimatedText` | 缩放 |
| `ColorizeAnimatedText` | 彩虹色 |

## 最佳实践

1. **可读性**：循环动画勿过快；重要信息提供静态 fallback。
2. **无障碍**：装饰性动画 `ExcludeSemantics`；关键文案保留 Semantics。
3. **性能**：纯 Text 动画开销低；与 [[28-flutter_animate详解]] 组合时注意列表内少用。
4. **控制**：`AnimatedTextController` 暂停/继续（视版本 API）。

## 相关链接

- [[28-flutter_animate详解]]
- [[03-动画系统详解]]
- [[00-第三方库索引]]
