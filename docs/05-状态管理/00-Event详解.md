# Event 详解

> 深入理解 Flutter 中的 Event 概念。

## 📖 Event 基础

### 1. 什么是 Event

```dart
// Event 概念
class EventConcept {
  void explain() {
    print('''
    Event 概念：
    
    // 1. 什么是 Event
    // - 事件是状态管理的输入
    // - 用户交互或系统事件
    // - 触发状态变化
    // - BLoC 模式的核心
    
    // 2. Event 的特点
    // - 不可变：Event 是不可变的
    // - 描述性：描述发生了什么
    // - 触发性：触发状态变化
    // - 可测试：易于测试
    
    // 3. Event 的类型
    // - 用户事件：用户交互
    // - 系统事件：系统通知
    // - 网络事件：网络请求
    // - 生命周期事件：应用生命周期
    
    // 4. Event 的使用场景
    // - BLoC 模式
    // - 事件驱动架构
    // - 用户交互处理
    // - 状态变化触发
    ''');
  }
}
```

### 2. Event 实现

```dart
// Event 实现
class EventImplementation {
  void explain() {
    print('''
    Event 实现：
    
    // 1. 定义 Event
    abstract class CounterEvent {}
    
    class IncrementEvent extends CounterEvent {}
    class DecrementEvent extends CounterEvent {}
    class ResetEvent extends CounterEvent {}
    
    // 2. 使用 Event
    BlocBuilder<CounterBloc, CounterState>(
      builder: (context, state) {
        return Column(
          children: [
            Text('Count: ${state.count}'),
            ElevatedButton(
              onPressed: () => context.read<CounterBloc>().add(IncrementEvent()),
              child: Text('Increment'),
            ),
            ElevatedButton(
              onPressed: () => context.read<CounterBloc>().add(DecrementEvent()),
              child: Text('Decrement'),
            ),
          ],
        );
      },
    )
    
    // 3. Event 最佳实践
    // - 保持 Event 简单
    // - 使用有意义的名称
    // - 避免复杂 Event
    // - 考虑 Event 粒度
    ''');
  }
}
```

## 🔗 相关链接

- [[BLoC基础]]
- [[BLoC模式详解]]
- [[State]]
- [[Stream]]

---

> Event 是 BLoC 模式的重要组成部分，掌握它对于理解 BLoC 非常重要。