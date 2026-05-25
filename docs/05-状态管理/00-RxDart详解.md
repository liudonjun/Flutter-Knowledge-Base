# RxDart 详解

> 深入理解 Flutter 中的 RxDart。

## 📖 RxDart 基础

### 1. 什么是 RxDart

```dart
// RxDart 概念
class RxDartConcept {
  void explain() {
    print('''
    RxDart 概念：
    
    // 1. 什么是 RxDart
    // - Dart 的响应式扩展
    // - 基于 Stream
    // - 提供响应式操作符
    // - 简化异步编程
    
    // 2. RxDart 的特点
    // - 响应式：响应式编程
    // - 操作符：丰富的操作符
    // - 组合：支持组合操作
    // - 错误处理：完善的错误处理
    
    // 3. RxDart 的类型
    // - BehaviorSubject：带初始值的 Subject
    // - ReplaySubject：缓存历史值的 Subject
    // - PublishSubject：不缓存的 Subject
    
    // 4. RxDart 的使用场景
    // - 状态管理
    // - 数据流处理
    // - 异步操作
    // - 事件处理
    ''');
  }
}
```

### 2. RxDart 实现

```dart
// RxDart 实现
class RxDartImplementation {
  void explain() {
    print('''
    RxDart 实现：
    
    // 1. BehaviorSubject
    final subject = BehaviorSubject<int>();
    
    // 添加数据
    subject.add(1);
    subject.add(2);
    
    // 监听数据
    subject.listen((value) {
      print('Value: $value');
    });
    
    // 2. 操作符
    subject.stream
      .where((value) => value > 0)
      .map((value) => value * 2)
      .listen((value) {
        print('Mapped: $value');
      });
    
    // 3. 组合操作
    final subject1 = BehaviorSubject<int>();
    final subject2 = BehaviorSubject<int>();
    
    Rx.combineLatest2(
      subject1.stream,
      subject2.stream,
      (a, b) => a + b,
    ).listen((sum) {
      print('Sum: $sum');
    });
    
    // 4. 错误处理
    subject.stream.listen(
      (value) => print('Value: $value'),
      onError: (error) => print('Error: $error'),
      onDone: () => print('Done'),
    );
    ''');
  }
}
```

## 🔗 相关链接

- [[Stream]]
- [[响应式状态]]
- [[状态监听]]
- [[BLoC基础]]

---

> RxDart 是 Dart 的响应式扩展，掌握它对于构建响应式应用非常有帮助。