# flutter_hooks 详解

> 在 Flutter Widget 中复用逻辑：`useState`、`useEffect` 等，减少 StatefulWidget 样板代码（wiki：`[[flutter_hooks]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [flutter_hooks](https://pub.dev/packages/flutter_hooks) |
| **作者** | 与 Riverpod 同作者（Remi Rousselet） |
| **适用** | 动画 Controller、订阅、分页控制器等局部逻辑 |
| **搭配** | [hooks_riverpod](https://pub.dev/packages/hooks_riverpod) |
| **站内** | [[01-状态管理基础]]、[[04-Riverpod详解]] |

Hooks **不替代** 全局状态管理；只抽离 Widget 内副作用与局部 state。

## 安装

```yaml
dependencies:
  flutter_hooks: ^0.20.5
```

## HookWidget 示例

```dart
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class CounterHook extends HookWidget {
  const CounterHook({super.key});

  @override
  Widget build(BuildContext context) {
    final count = useState(0);
    final controller = useAnimationController(duration: const Duration(milliseconds: 300));

    useEffect(() {
      controller.forward();
      return null;
    }, const []);

    return Column(
      children: [
        Text('${count.value}'),
        ElevatedButton(
          onPressed: () => count.value++,
          child: const Text('+1'),
        ),
      ],
    );
  }
}
```

## 常用 Hooks

| Hook | 作用 |
| --- | --- |
| `useState` | 局部可变状态 |
| `useMemoized` | 缓存昂贵对象 |
| `useEffect` | 副作用 + dispose |
| `useAnimationController` | 自动 dispose 动画控制器 |
| `useTextEditingController` | 输入框控制器 |
| `useStream` / `useFuture` | 订阅异步数据 |

```dart
final subscription = useMemoized(() => repo.watchItems(), [repo]);
final snapshot = useStream(subscription, initialData: const []);
```

## 与 Riverpod

```dart
class ProfilePage extends HookConsumerWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(currentUserProvider);
    final tab = useState(0);
    return Text(user.name);
  }
}
```

全局态用 Riverpod；Tab 索引、AnimationController 用 Hooks。

## 最佳实践

1. **Hook 顺序稳定**：勿在 if 里条件调用 Hook。
2. **useEffect 依赖**：第二个参数列表控制重建时机。
3. **大状态外移**：业务数据仍放 Bloc/Riverpod。
4. **测试**：HookWidget 与 StatelessWidget 一样 `pumpWidget` 测。

## 相关链接

- [[04-Riverpod详解]]
- [[03-Bloc模式详解]]
- [[00-第三方库索引]]
