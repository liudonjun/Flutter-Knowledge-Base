# Future 详解

> 深入理解 Dart 中的 Future 概念。

## 📖 Future 基础

### 1. 什么是 Future

```dart
// Future 概念
class FutureConcept {
  void explain() {
    print('''
    Future 概念：
    
    // 1. 什么是 Future
    // - 表示一个异步操作的结果
    // - 可能在未来某个时间完成
    // - 可能成功或失败
    // - 用于处理异步操作
    
    // 2. Future 的特点
    // - 异步：不会阻塞主线程
    // - 单次：只能完成一次
    // - 不可变：完成后的结果不可变
    // - 链式：支持链式调用
    
    // 3. Future 的状态
    // - 未完成：异步操作还在进行
    // - 已完成：异步操作已完成
    // - 已错误：异步操作出错
    
    // 4. Future 的使用场景
    // - 网络请求：HTTP 请求
    // - 文件读写：IO 操作
    // - 数据库操作：数据库查询
    // - 延迟操作：定时器
    ''');
  }
}
```

### 2. Future 使用示例

```dart
// Future 使用示例
class FutureExample {
  void explain() {
    print('''
    Future 使用示例：
    
    // 1. 创建 Future
    Future<int> getNumber() async {
      await Future.delayed(Duration(seconds: 1));
      return 42;
    }
    
    // 2. 使用 Future
    void useFuture() async {
      // 等待 Future 完成
      final number = await getNumber();
      print('Number: $number');
      
      // 使用 then
      getNumber().then((number) {
        print('Number: $number');
      });
      
      // 使用 catchError
      getNumber()
        .then((number) => print('Number: $number'))
        .catchError((error) => print('Error: $error'));
      
      // 使用 whenComplete
      getNumber()
        .then((number) => print('Number: $number'))
        .whenComplete(() => print('Complete'));
    }
    
    // 3. Future 组合
    void combineFutures() async {
      // 等待所有 Future 完成
      final results = await Future.wait([
        getNumber(),
        getNumber(),
        getNumber(),
      ]);
      print('Results: $results');
      
      // 使用 Future.any
      final first = await Future.any([
        getNumber(),
        getNumber(),
        getNumber(),
      ]);
      print('First: $first');
    }
    ''');
  }
}
```

## 🔧 Future 高级用法

### 1. Future 错误处理

```dart
// Future 错误处理
class FutureErrorHandling {
  void explain() {
    print('''
    Future 错误处理：
    
    // 1. 使用 try-catch
    void handleError() async {
      try {
        final number = await getNumber();
        print('Number: $number');
      } catch (error) {
        print('Error: $error');
      } finally {
        print('Finally');
      }
    }
    
    // 2. 使用 catchError
    void handleErrorWithCatchError() {
      getNumber()
        .then((number) => print('Number: $number'))
        .catchError((error) => print('Error: $error'));
    }
    
    // 3. 使用 timeout
    void handleTimeout() async {
      try {
        final number = await getNumber().timeout(Duration(seconds: 5));
        print('Number: $number');
      } catch (error) {
        print('Timeout: $error');
      }
    }
    
    // 4. 错误处理最佳实践
    // - 使用 try-catch 处理错误
    // - 使用 catchError 处理错误
    // - 使用 timeout 处理超时
    // - 记录错误信息
    ''');
  }
}
```

### 2. Future 组合

```dart
// Future 组合
class FutureComposition {
  void explain() {
    print('''
    Future 组合：
    
    // 1. Future.wait
    void waitFutures() async {
      final results = await Future.wait([
        getNumber(),
        getNumber(),
        getNumber(),
      ]);
      print('Results: $results');
    }
    
    // 2. Future.any
    void anyFuture() async {
      final first = await Future.any([
        getNumber(),
        getNumber(),
        getNumber(),
      ]);
      print('First: $first');
    }
    
    // 3. Future.forEach
    void forEachFuture() async {
      await Future.forEach([1, 2, 3], (number) async {
        final result = await getNumber();
        print('Result: $result');
      });
    }
    
    // 4. Future.doWhile
    void doWhileFuture() async {
      int count = 0;
      await Future.doWhile(() async {
        final result = await getNumber();
        count++;
        return count < 3;
      });
    }
    
    // 5. Future 组合最佳实践
    // - 使用 Future.wait 等待所有
    // - 使用 Future.any 等待第一个
    // - 使用 Future.forEach 遍历
    // - 使用 Future.doWhile 循环
    ''');
  }
}
```

## ⚠️ 注意事项

1. **理解 Future 的概念和特点**
2. **合理使用 Future 的方法**
3. **注意错误处理**
4. **考虑性能优化**

## 🔗 相关链接

- [[Stream]]
- [[Isolates]]
- [[异步编程详解]]
- [[错误处理详解]]

---

> Future 是 Dart 中处理异步操作的核心概念，理解它对于构建高性能应用非常重要。