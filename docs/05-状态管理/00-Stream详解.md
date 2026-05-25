# Stream 详解

> 深入理解 Flutter 中的 Stream。

## 📖 Stream 基础

### 1. 什么是 Stream

```dart
// Stream 概念
class StreamConcept {
  void explain() {
    print('''
    Stream 概念：
    
    // 1. 什么是 Stream
    // - 异步数据流
    // - 可以发送多个值
    // - 支持异步操作
    // - 响应式编程基础
    
    // 2. Stream 的特点
    // - 异步：支持异步操作
    // - 多值：可以发送多个值
    // - 可监听：可以监听数据
    // - 可转换：可以转换数据
    
    // 3. Stream 的类型
    // - 单订阅 Stream：只能有一个监听器
    // - 多订阅 Stream：可以有多个监听器
    // - 广播 Stream：支持多个监听器
    
    // 4. Stream 的使用场景
    // - 状态管理
    // - 数据流处理
    // - 异步操作
    // - 事件处理
    ''');
  }
}
```

### 2. Stream 实现

```dart
// Stream 实现
class StreamImplementation {
  void explain() {
    print('''
    Stream 实现：
    
    // 1. 创建 Stream
    Stream<int> counterStream() async* {
      int count = 0;
      while (true) {
        await Future.delayed(Duration(seconds: 1));
        yield count++;
      }
    }
    
    // 2. 监听 Stream
    counterStream().listen((value) {
      print('Value: $value');
    });
    
    // 3. 使用 StreamBuilder
    StreamBuilder<int>(
      stream: counterStream(),
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          return Text('Count: ${snapshot.data}');
        } else {
          return CircularProgressIndicator();
        }
      },
    )
    
    // 4. Stream 操作
    counterStream()
      .where((value) => value % 2 == 0)
      .map((value) => value * 2)
      .listen((value) {
        print('Mapped: $value');
      });
    ''');
  }
}
```

## 🔗 相关链接

- [[Future]]
- [[Stream状态]]
- [[RxDart]]
- [[响应式状态]]

---

> Stream 是 Dart 异步编程的重要概念，掌握它对于理解响应式编程非常重要。