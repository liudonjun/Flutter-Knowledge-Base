# Isolates 详解

> 深入理解 Dart 中的 Isolates 概念。

## 📖 Isolates 基础

### 1. 什么是 Isolates

```dart
// Isolates 概念
class IsolatesConcept {
  void explain() {
    print('''
    Isolates 概念：
    
    // 1. 什么是 Isolates
    // - Dart 的并发模型
    // - 独立的内存空间
    // - 不共享内存
    // - 通过消息通信
    
    // 2. Isolates 的特点
    // - 独立内存：每个 Isolate 有自己的内存
    // - 消息通信：通过消息传递数据
    // - 无锁：不需要锁机制
    // - 轻量级：比线程更轻量
    
    // 3. Isolates 的使用场景
    // - CPU 密集型任务：复杂计算
    // - 大数据处理：数据转换
    // - 图像处理：图像解码
    // - 网络请求：并发请求
    
    // 4. Isolates 的优势
    // - 避免阻塞主线程
    // - 提高应用性能
    // - 简化并发编程
    // - 避免竞态条件
    ''');
  }
}
```

### 2. Isolates 使用示例

```dart
// Isolates 使用示例
class IsolatesExample {
  void explain() {
    print('''
    Isolates 使用示例：
    
    // 1. 使用 compute
    Future<int> heavyComputation() async {
      return compute(_doHeavyComputation, 1000000);
    }
    
    int _doHeavyComputation(int count) {
      int sum = 0;
      for (int i = 0; i < count; i++) {
        sum += i;
      }
      return sum;
    }
    
    // 2. 使用 Isolate.spawn
    Future<void> spawnIsolate() async {
      final receivePort = ReceivePort();
      
      await Isolate.spawn(
        _isolateEntry,
        receivePort.sendPort,
      );
      
      final sendPort = await receivePort.first as SendPort;
      
      final response = ReceivePort();
      sendPort.send([response.sendPort, 'Hello']);
      
      final message = await response.first;
      print('Message: $message');
    }
    
    void _isolateEntry(SendPort sendPort) {
      final port = ReceivePort();
      sendPort.send(port.sendPort);
      
      port.listen((message) {
        final sendPort = message[0] as SendPort;
        final data = message[1] as String;
        sendPort.send('Received: $data');
      });
    }
    
    // 3. 使用 Isolate.run (Dart 2.19+)
    Future<int> runIsolate() async {
      return Isolate.run(() {
        int sum = 0;
        for (int i = 0; i < 1000000; i++) {
          sum += i;
        }
        return sum;
      });
    }
    ''');
  }
}
```

## 🔧 Isolates 高级用法

### 1. 消息传递

```dart
// 消息传递
class MessagePassing {
  void explain() {
    print('''
    消息传递：
    
    // 1. 可传递的数据类型
    // - null
    // - 数字
    // - 字符串
    // - 布尔值
    // - List（可传递的元素）
    // - Map（可传递的键值）
    // - SendPort
    
    // 2. 不可传递的数据类型
    // - 复杂对象
    // - 函数
    // - 闭包
    // - 类实例
    
    // 3. 消息传递示例
    Future<void> sendMessage() async {
      final receivePort = ReceivePort();
      
      await Isolate.spawn(
        _messageEntry,
        receivePort.sendPort,
      );
      
      final sendPort = await receivePort.first as SendPort;
      
      final response = ReceivePort();
      sendPort.send({
        'port': response.sendPort,
        'data': [1, 2, 3, 4, 5],
      });
      
      final result = await response.first;
      print('Result: $result');
    }
    
    void _messageEntry(SendPort sendPort) {
      final port = ReceivePort();
      sendPort.send(port.sendPort);
      
      port.listen((message) {
        final sendPort = message['port'] as SendPort;
        final data = message['data'] as List<int>;
        
        final sum = data.reduce((a, b) => a + b);
        sendPort.send(sum);
      });
    }
    ''');
  }
}
```

### 2. 错误处理

```dart
// 错误处理
class ErrorHandling {
  void explain() {
    print('''
    错误处理：
    
    // 1. 捕获错误
    Future<void> handleError() async {
      final receivePort = ReceivePort();
      final errorPort = ReceivePort();
      
      await Isolate.spawn(
        _errorEntry,
        receivePort.sendPort,
        onError: errorPort.sendPort,
      );
      
      errorPort.listen((error) {
        print('Error: $error');
      });
      
      receivePort.listen((message) {
        print('Message: $message');
      });
    }
    
    void _errorEntry(SendPort sendPort) {
      sendPort.send('Starting');
      throw Exception('Something went wrong');
    }
    
    // 2. 使用 try-catch
    Future<void> safeCompute() async {
      try {
        final result = await compute(_unsafeComputation, 100);
        print('Result: $result');
      } catch (error) {
        print('Error: $error');
      }
    }
    
    int _unsafeComputation(int value) {
      if (value < 0) {
        throw ArgumentError('Value must be positive');
      }
      return value * 2;
    }
    ''');
  }
}
```

## ⚠️ 注意事项

1. **理解 Isolates 的独立内存特性**
2. **注意消息传递的限制**
3. **合理使用 Isolates 避免性能问题**
4. **注意错误处理**

## 🔗 相关链接

- [[Future]]
- [[Stream]]
- [[异步编程详解]]
- [[性能优化基础]]

---

> Isolates 是 Dart 的并发模型，理解它对于构建高性能应用非常重要。