# BLoC 模式详解

> 深入理解 Flutter 中的 BLoC 模式。

## 📖 BLoC 模式基础

### 1. BLoC 模式

```dart
// BLoC 模式
class BLoCPattern {
  void explain() {
    print('''
    BLoC 模式：
    
    // 1. 什么是 BLoC 模式
    // - Business Logic Component
    // - 业务逻辑组件模式
    // - 基于 Stream
    // - 实现关注点分离
    
    // 2. BLoC 模式的特点
    // - 分离 UI 和业务逻辑
    // - 基于 Stream 和 Sink
    // - 响应式编程
    // - 易于测试
    
    // 3. BLoC 模式的组成部分
    // - Event：事件（输入）
    // - State：状态（输出）
    // - BLoC：业务逻辑（处理）
    // - UI：用户界面（展示）
    
    // 4. BLoC 模式的使用场景
    // - 复杂业务逻辑
    // - 需要测试的代码
    // - 多页面共享状态
    // - 响应式数据流
    ''');
  }
}
```

### 2. BLoC 模式实现

```dart
// BLoC 模式实现
class BLoCPatternImplementation {
  void explain() {
    print('''
    BLoC 模式实现：
    
    // 1. 定义 Event
    abstract class CounterEvent {}
    
    class IncrementEvent extends CounterEvent {}
    class DecrementEvent extends CounterEvent {}
    
    // 2. 定义 State
    class CounterState {
      final int count;
      
      CounterState(this.count);
    }
    
    // 3. 定义 BLoC
    class CounterBloc extends Bloc<CounterEvent, CounterState> {
      CounterBloc() : super(CounterState(0)) {
        on<IncrementEvent>((event, emit) {
          emit(CounterState(state.count + 1));
        });
        
        on<DecrementEvent>((event, emit) {
          emit(CounterState(state.count - 1));
        });
      }
    }
    
    // 4. 使用 BLoC
    BlocProvider(
      create: (context) => CounterBloc(),
      child: BlocBuilder<CounterBloc, CounterState>(
        builder: (context, state) {
          return Text('Count: ${state.count}');
        },
      ),
    )
    ''');
  }
}
```

## 🔗 相关链接

- [[BLoC基础]]
- [[Event]]
- [[State]]
- [[Stream]]

---

> BLoC 模式是构建复杂应用的重要模式，掌握它对于团队协作非常重要。