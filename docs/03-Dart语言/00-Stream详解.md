# Stream 详解

> 深入理解 Dart 中的 Stream 概念。

## 📖 Stream 基础

### 1. 什么是 Stream

```dart
// Stream 概念
class StreamConcept {
  void explain() {
    print('''
    Stream 概念：
    
    // 1. 什么是 Stream
    // - 表示一系列异步事件
    // - 可以发送多个值
    // - 可以发送错误
    // - 可以完成
    
    // 2. Stream 的特点
    // - 异步：不会阻塞主线程
    // - 多次：可以发送多个值
    // - 顺序：事件按顺序发送
    // - 可监听：可以监听事件
    
    // 3. Stream 的类型
    // - 单订阅 Stream：只能有一个监听器
    // - 多订阅 Stream：可以有多个监听器
    
    // 4. Stream 的使用场景
    // - 用户输入：按钮点击、文本输入
    // - 网络数据：WebSocket、HTTP 流
    // - 文件读取：大文件读取
    // - 数据库查询：实时查询
    ''');
  }
}
```

### 2. Stream 使用示例

```dart
// Stream 使用示例
class StreamExample {
  void explain() {
    print('''
    Stream 使用示例：
    
    // 1. 创建 Stream
    Stream<int> getNumbers() async* {
      for (int i = 0; i < 5; i++) {
        await Future.delayed(Duration(seconds: 1));
        yield i;
      }
    }
    
    // 2. 监听 Stream
    void listenStream() {
      getNumbers().listen(
        (number) => print('Number: $number'),
        onError: (error) => print('Error: $error'),
        onDone: () => print('Done'),
      );
    }
    
    // 3. 使用 await for
    void awaitForStream() async {
      await for (final number in getNumbers()) {
        print('Number: $number');
      }
    }
    
    // 4. Stream 转换
    void transformStream() {
      getNumbers()
        .where((number) => number % 2 == 0)
        .map((number) => number * 2)
        .listen((number) => print('Number: $number'));
    }
    ''');
  }
}
```

## 🔧 Stream 高级用法

### 1. Stream 控制器

```dart
// Stream 控制器
class StreamControllerExample {
  void explain() {
    print('''
    Stream 控制器：
    
    // 1. 创建 StreamController
    final controller = StreamController<int>();
    
    // 2. 添加数据
    void addData() {
      controller.add(1);
      controller.add(2);
      controller.add(3);
    }
    
    // 3. 监听 Stream
    void listenController() {
      controller.stream.listen(
        (number) => print('Number: $number'),
        onError: (error) => print('Error: $error'),
        onDone: () => print('Done'),
      );
    }
    
    // 4. 关闭控制器
    void closeController() {
      controller.close();
    }
    
    // 5. 广播控制器
    final broadcastController = StreamController<int>.broadcast();
    
    // 6. 广播控制器监听
    void listenBroadcast() {
      broadcastController.stream.listen((number) => print('Listener 1: $number'));
      broadcastController.stream.listen((number) => print('Listener 2: $number'));
    }
    ''');
  }
}
```

### 2. Stream 转换

```dart
// Stream 转换
class StreamTransformation {
  void explain() {
    print('''
    Stream 转换：
    
    // 1. where 过滤
    void filterStream() {
      getNumbers()
        .where((number) => number % 2 == 0)
        .listen((number) => print('Even: $number'));
    }
    
    // 2. map 转换
    void mapStream() {
      getNumbers()
        .map((number) => number * 2)
        .listen((number) => print('Doubled: $number'));
    }
    
    // 3. expand 展开
    void expandStream() {
      getNumbers()
        .expand((number) => [number, number * 2])
        .listen((number) => print('Expanded: $number'));
    }
    
    // 4. reduce 聚合
    void reduceStream() async {
      final sum = await getNumbers().reduce((a, b) => a + b);
      print('Sum: $sum');
    }
    
    // 5. fold 折叠
    void foldStream() async {
      final sum = await getNumbers().fold(0, (a, b) => a + b);
      print('Sum: $sum');
    }
    
    // 6. Stream 转换最佳实践
    // - 使用 where 过滤数据
    // - 使用 map 转换数据
    // - 使用 expand 展开数据
    // - 使用 reduce 聚合数据
    ''');
  }
}
```

## ⚠️ 注意事项

1. **理解 Stream 的概念和特点**
2. **合理使用 Stream 的方法**
3. **注意错误处理**
4. **考虑性能优化**

## 🔗 相关链接

- [[Future]]
- [[Isolates]]
- [[异步编程详解]]
- [[错误处理详解]]

---

> Stream 是 Dart 中处理异步事件流的核心概念，理解它对于构建实时应用非常重要。