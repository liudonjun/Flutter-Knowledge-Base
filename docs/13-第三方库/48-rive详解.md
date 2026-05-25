# Rive 详解

> 交互式矢量动画：状态机驱动 UI（wiki：`[[rive]]` / Rive runtime）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [rive](https://pub.dev/packages/rive) |
| **资源** | `.riv`（Rive Editor 导出） |
| **适用** | 可交互 mascot、Tab 动效、游戏 UI |
| **对比** | 时间轴 JSON 用 [[19-lottie详解]] |

Rive 支持 **State Machine** 输入（bool/trigger/number），适合按钮态、加载完成切换。

## 安装

```yaml
dependencies:
  rive: ^0.13.0

flutter:
  assets:
    - assets/rive/
```

## 基本播放

```dart
import 'package:rive/rive.dart';

class RiveLogo extends StatelessWidget {
  const RiveLogo({super.key});

  @override
  Widget build(BuildContext context) {
    return const RiveAnimation.asset(
      'assets/rive/logo.riv',
      fit: BoxFit.contain,
    );
  }
}
```

## 状态机控制

```dart
class LikeButton extends StatefulWidget {
  @override
  State<LikeButton> createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  SMITrigger? _tap;
  StateMachineController? _controller;

  void _onRiveInit(Artboard artboard) {
    _controller = StateMachineController.fromArtboard(artboard, 'LikeMachine');
    if (_controller != null) {
      artboard.addController(_controller!);
      _tap = _controller!.findInput<SMITrigger>('tap');
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => _tap?.fire(),
      child: RiveAnimation.asset(
        'assets/rive/like.riv',
        onInit: _onRiveInit,
      ),
    );
  }
}
```

## 最佳实践

1. **文件体积**：Rive 通常比复杂 Lottie 更省；仍要控制网格点数。
2. **RepaintBoundary**：全屏 Rive 隔离重绘。
3. **dispose**：`StateMachineController` 在 dispose 移除。
4. **设计协作**：状态名与工程约定一致，避免改 artboard 崩客户端。

## 相关链接

- [[19-lottie详解]]
- [[28-flutter_animate详解]]
- [[03-动画系统详解]]
- [[00-第三方库索引]]
