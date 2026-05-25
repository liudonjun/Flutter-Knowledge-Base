# BLoC 基础详解

> 深入理解 Flutter 中的 BLoC 状态管理。

## 📖 BLoC 基础

### 1. 什么是 BLoC

```dart
// BLoC 概念
class BLoCBasicsConcept {
  void explain() {
    print('''
    BLoC 概念：
    
    // 1. 什么是 BLoC
    // - Business Logic Component
    // - 业务逻辑组件
    // - 基于 Stream 的状态管理
    // - 实现关注点分离
    
    // 2. BLoC 的特点
    // - 分离 UI 和业务逻辑
    // - 基于 Stream 和 Sink
    // - 响应式编程
    // - 易于测试
    
    // 3. BLoC 的组成部分
    // - Event：事件（输入）
    // - State：状态（输出）
    // - BLoC：业务逻辑（处理）
    
    // 4. BLoC 的使用场景
    // - 复杂业务逻辑
    // - 需要测试的代码
    // - 多页面共享状态
    // - 响应式数据流
    ''');
  }
}
```

### 2. BLoC 实现

```dart
// BLoC 实现
class BLoCImplementation {
  void explain() {
    print('''
    BLoC 实现：
    
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

- [[BLoC模式详解]]
- [[Event]]
- [[State]]
- [[Stream]]

---

> BLoC 是 Flutter 中强大的状态管理方案，理解它对于构建复杂应用非常重要。