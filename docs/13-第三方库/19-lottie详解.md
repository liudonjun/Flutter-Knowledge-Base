# Lottie 详解

> 在 Flutter 中播放 After Effects 导出的 JSON 矢量动画（wiki：`[[lottie]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [lottie](https://pub.dev/packages/lottie) |
| **资源** | `.json`（Bodymovin）或 `.zip` |
| **适用** | 空状态、加载、 onboarding、轻量庆祝动效 |
| **对比** | 复杂交互矢量用 [[48-rive详解]]；代码动画 [[28-flutter_animate详解]] |
| **站内** | [[03-动画系统详解]]、[[05-UI组件库详解]] |

Lottie 适合 **设计师交付** 的循环/一次性动画；高频列表 cell 内慎用多实例。

## 安装

```yaml
dependencies:
  lottie: ^3.1.0
```

`pubspec.yaml` 声明资源：

```yaml
flutter:
  assets:
    - assets/lottie/
```

## 基本用法

```dart
import 'package:lottie/lottie.dart';

class LoadingView extends StatelessWidget {
  const LoadingView({super.key});

  @override
  Widget build(BuildContext context) {
    return Lottie.asset(
      'assets/lottie/loading.json',
      width: 120,
      height: 120,
      repeat: true,
    );
  }
}
```

## 网络与控制器

```dart
class SuccessAnim extends StatefulWidget {
  const SuccessAnim({super.key, required this.onDone});
  final VoidCallback onDone;

  @override
  State<SuccessAnim> createState() => _SuccessAnimState();
}

class _SuccessAnimState extends State<SuccessAnim> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Lottie.network(
      'https://assets.example.com/success.json',
      controller: _controller,
      onLoaded: (composition) {
        _controller
          ..duration = composition.duration
          ..forward().whenComplete(widget.onDone);
      },
    );
  }
}
```

## 最佳实践

1. **precache**：首屏关键动画 `Lottie.asset(..., frameBuilder: ...)` 或启动页预加载，避免首次闪烁。
2. **RepaintBoundary**：大动画隔离重绘，尤其 overlay 上。
3. **文件体积**：JSON 过大用 [LottieFiles Optimize](https://lottiefiles.com/) 减点；复杂场景改 Rive/视频。
4. **列表**：同一 Lottie 用 **单例** + `Visibility` 控制，勿每 item 一个 Controller。
5. **无障碍**：纯装饰加 `ExcludeSemantics`；有意义动效保留语义说明。

## 与 Rive / 原生 Animation 选型

| 方案 | 场景 |
| --- | --- |
| **Lottie** | AE 工作流、静态时间轴 |
| Rive | 状态机、交互驱动 |
| flutter_animate | 纯代码 fade/slide，无设计文件 |

## 相关链接

- [[48-rive详解]]
- [[28-flutter_animate详解]]
- [[03-动画系统详解]]
- [[00-第三方库索引]]
