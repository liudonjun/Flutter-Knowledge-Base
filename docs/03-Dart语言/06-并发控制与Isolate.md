# 并发控制与 Isolate

> 深入理解 Dart 的并发模型，掌握 Isolate、并发控制和异步优化技巧。

## 📖 Dart 并发模型

### 1. 单线程模型

```dart
// Dart 单线程模型
class DartSingleThreadModel {
  /*
  Dart 单线程模型：
  
  1. 事件循环
     - 微任务队列
     - 事件队列
     - 单线程执行
  
  2. 异步机制
     - Future
     - async/await
     - Stream
  
  3. 阻塞问题
     - CPU 密集型任务
     - 长时间计算
     - 需要 Isolate
  */
  
  void explain() {
    print('''
    Dart 单线程模型：
    
    1. 事件循环
       // Dart 使用单线程事件循环
       // 任务在事件队列中排队执行
       
       Future(() => print('任务1'));
       Future(() => print('任务2'));
       Future(() => print('任务3'));
       
       // 执行顺序：任务1 → 任务2 → 任务3
    
    2. 异步机制
       // Future 异步执行
       Future.delayed(Duration(seconds: 1), () {
         print('延迟执行');
       });
       
       // async/await
       Future<void> fetchData() async {
         final data = await http.get(url);
         print(data);
       }
    
    3. 阻塞问题
       // 不推荐：阻塞主线程
       void heavyComputation() {
         int result = 0;
         for (int i = 0; i < 1000000000; i++) {
           result += i;
         }
         print(result); // 会阻塞 UI
       }
       
       // 推荐：使用 Isolate
       Future<void> heavyComputationAsync() async {
         final result = await compute(heavyFunction, 1000000000);
         print(result);
       }
    ''');
  }
}
```

### 2. Isolate 基础

```dart
// Isolate 基础
class IsolateBasics {
  /*
  Isolate 基础：
  
  1. Isolate 概念
     - 独立的内存空间
     - 独立的事件循环
     - 通过消息通信
  
  2. 创建 Isolate
     - Isolate.spawn
     - compute 函数
     - 自定义 Isolate
  
  3. 通信机制
     - SendPort
     - ReceivePort
     - 消息传递
  */
  
  void explain() {
    print('''
    Isolate 基础：
    
    1. Isolate 概念
       // Isolate 是独立的执行单元
       // 有自己的内存和事件循环
       // 通过消息传递通信
       // 不能直接共享内存
    
    2. 使用 compute 函数
       import 'package:flutter/foundation.dart';
       
       // 简单计算
       int heavyFunction(int n) {
         int sum = 0;
         for (int i = 0; i < n; i++) {
           sum += i;
         }
         return sum;
       }
       
       // 在 Isolate 中执行
       Future<int> computeHeavy() async {
         return await compute(heavyFunction, 1000000000);
       }
    
    3. 自定义 Isolate
       Future<void> customIsolate() async {
         final receivePort = ReceivePort();
         
         await Isolate.spawn(
           isolateEntryPoint,
           receivePort.sendPort,
         );
         
         final message = await receivePort.first;
         print('收到消息: $message');
       }
       
       void isolateEntryPoint(SendPort sendPort) {
         // 在 Isolate 中执行
         final result = heavyFunction(1000000000);
         sendPort.send(result);
       }
    ''');
  }
}
```

### 3. 高级 Isolate 使用

```dart
// 高级 Isolate 使用
class AdvancedIsolate {
  /*
  高级 Isolate 使用：
  
  1. 双向通信
     - SendPort 交换
     - 持续通信
     - 命令模式
  
  2. Isolate 池
     - 复用 Isolate
     - 任务队列
     - 负载均衡
  
  3. 错误处理
     - 捕获错误
     - 超时处理
     - 重启 Isolate
  */
  
  void explain() {
    print('''
    高级 Isolate 使用：
    
    1. 双向通信
       class IsolateCommunication {
         late SendPort _sendPort;
         final ReceivePort _receivePort = ReceivePort();
         
         Future<void> init() async {
           await Isolate.spawn(
             _isolateMain,
             _receivePort.sendPort,
           );
           
           _sendPort = await _receivePort.first;
         }
         
         Future<dynamic> sendCommand(String command, dynamic data) async {
           final responsePort = ReceivePort();
           _sendPort.send({
             'command': command,
             'data': data,
             'replyPort': responsePort.sendPort,
           });
           
           return await responsePort.first;
         }
         
         static void _isolateMain(SendPort sendPort) {
           final receivePort = ReceivePort();
           sendPort.send(receivePort.sendPort);
           
           receivePort.listen((message) {
             final command = message['command'];
             final data = message['data'];
             final replyPort = message['replyPort'] as SendPort;
             
             // 处理命令
             final result = _handleCommand(command, data);
             replyPort.send(result);
           });
         }
       }
    
    2. Isolate 池
       class IsolatePool {
         final int poolSize;
         final List<_IsolateWorker> _workers = [];
         final Queue<_Task> _taskQueue = Queue();
         
         IsolatePool({this.poolSize = 4});
         
         Future<void> init() async {
           for (int i = 0; i < poolSize; i++) {
             final worker = await _IsolateWorker.create();
             _workers.add(worker);
           }
         }
         
         Future<dynamic> execute(Function task, dynamic args) async {
           final completer = Completer<dynamic>();
           final task = _Task(task, args, completer);
           
           // 找空闲 worker
           final idleWorker = _workers.firstWhere(
             (w) => !w.isBusy,
             orElse: () => _workers.first,
           );
           
           await idleWorker.execute(task);
           return completer.future;
         }
       }
    
    3. 错误处理
       Future<dynamic> safeIsolateCompute(
         Function computation,
         dynamic message,
       ) async {
         try {
           return await compute(computation, message)
             .timeout(Duration(seconds: 30));
         } on TimeoutException {
           print('Isolate 执行超时');
           rethrow;
         } catch (e) {
           print('Isolate 执行错误: $e');
           rethrow;
         }
       }
    ''');
  }
}
```

## 📖 并发控制模式

### 1. Future 并发

```dart
// Future 并发
class FutureConcurrency {
  /*
  Future 并发：
  
  1. 并行执行
     - Future.wait
     - Future.any
     - Future.forEach
  
  2. 串行执行
     - 链式调用
     - 顺序处理
  
  3. 混合模式
     - 分组并行
     - 限流并发
  */
  
  void explain() {
    print('''
    Future 并发：
    
    1. 并行执行
       // Future.wait 等待所有完成
       Future<void> parallelExecution() async {
         final results = await Future.wait([
           fetchData1(),
           fetchData2(),
           fetchData3(),
         ]);
         
         print('所有结果: $results');
       }
       
       // Future.any 返回第一个完成的
       Future<void> anyExecution() async {
         final result = await Future.any([
           fetchData1(),
           fetchData2(),
           fetchData3(),
         ]);
         
         print('第一个完成: $result');
       }
    
    2. 串行执行
       Future<void> serialExecution() async {
         final result1 = await fetchData1();
         final result2 = await fetchData2(result1);
         final result3 = await fetchData3(result2);
         
         print('最终结果: $result3');
       }
    
    3. 限流并发
       Future<List<dynamic>> limitedConcurrency(
         List<Future<dynamic> Function()> tasks,
         int concurrency,
       ) async {
         final results = <dynamic>[];
         final executing = <Future>[];
         
         for (final task in tasks) {
           if (executing.length >= concurrency) {
             await Future.any(executing);
           }
           
           final future = task().then((result) {
             results.add(result);
             executing.remove(future);
           });
           
           executing.add(future);
         }
         
         await Future.wait(executing);
         return results;
       }
    ''');
  }
}
```

### 2. Stream 并发

```dart
// Stream 并发
class StreamConcurrency {
  /*
  Stream 并发：
  
  1. Stream 转换
     - map
     - asyncMap
     - expand
  
  2. 并发处理
     - 并发数控制
     - 背压处理
  
  3. 错误处理
     - 错误恢复
     - 重试机制
  */
  
  void explain() {
    print('''
    Stream 并发：
    
    1. asyncMap 并发处理
       Stream<int> processStream(Stream<int> input) {
         return input.asyncMap((value) async {
           // 并发处理每个值
           await Future.delayed(Duration(milliseconds: 100));
           return value * 2;
         });
       }
    
    2. 控制并发数
       Stream<T> limitedAsyncMap<S, T>(
         Stream<S> stream,
         Future<T> Function(S) mapper,
         int concurrency,
       ) async* {
         final pending = <Future<T>>[];
         
         await for (final value in stream) {
           final future = mapper(value);
           pending.add(future);
           
           if (pending.length >= concurrency) {
             final result = await pending.first;
             pending.removeAt(0);
             yield result;
           }
         }
         
         // 等待剩余的
         for (final future in pending) {
           yield await future;
         }
       }
    
    3. 错误恢复
       Stream<T> resilientStream<T>(
         Stream<T> stream,
         T Function(T) processor,
       ) {
         return stream.map((value) {
           try {
             return processor(value);
           } catch (e) {
             print('处理错误: $e');
             return value; // 返回原始值
           }
         });
       }
    ''');
  }
}
```

## 📖 异步优化技巧

### 1. 缓存与防抖

```dart
// 缓存与防抖
class CacheAndDebounce {
  /*
  缓存与防抖：
  
  1. 结果缓存
     - 缓存 Future 结果
     - 避免重复请求
  
  2. 防抖节流
     - Debounce
     - Throttle
  
  3. 重试机制
     - 指数退避
     - 最大重试次数
  */
  
  void explain() {
    print('''
    缓存与防抖：
    
    1. Future 缓存
       class FutureCache<T> {
         final Map<String, Future<T>> _cache = {};
         
         Future<T> get(String key, Future<T> Function() loader) {
           if (_cache.containsKey(key)) {
             return _cache[key]!;
           }
           
           final future = loader().whenComplete(() {
             _cache.remove(key);
           });
           
           _cache[key] = future;
           return future;
         }
       }
    
    2. Debounce
       class Debouncer {
         final Duration delay;
         Timer? _timer;
         
         Debouncer({this.delay = const Duration(milliseconds: 300)});
         
         void call(VoidCallback action) {
           _timer?.cancel();
           _timer = Timer(delay, action);
         }
         
         void dispose() {
           _timer?.cancel();
         }
       }
       
       // 使用
       final debouncer = Debouncer();
       onSearch: (query) {
         debouncer(() => search(query));
       }
    
    3. 重试机制
       Future<T> retry<T>(
         Future<T> Function() action, {
         int maxRetries = 3,
         Duration delay = const Duration(seconds: 1),
       }) async {
         for (int i = 0; i < maxRetries; i++) {
           try {
             return await action();
           } catch (e) {
             if (i == maxRetries - 1) rethrow;
             await Future.delayed(delay * (i + 1));
           }
         }
         throw Exception('重试失败');
       }
    ''');
  }
}
```

## 📖 总结

### 并发模型对比

| 方案 | 适用场景 | 优势 | 劣势 |
|------|----------|------|------|
| **Future** | I/O 操作 | 简单易用 | 单线程 |
| **Stream** | 流式数据 | 响应式 | 复杂性 |
| **Isolate** | CPU 密集 | 真正并行 | 通信开销 |

### 最佳实践

1. **I/O 操作**：使用 Future/async-await
2. **CPU 密集**：使用 Isolate/compute
3. **流式数据**：使用 Stream
4. **并发控制**：限制并发数，避免资源耗尽

### 下一步学习

- **性能优化**：学习更多优化技巧
- **内存管理**：优化内存使用
- **测试并发**：测试异步代码

---

> 掌握 Dart 并发模型，编写高效的异步代码。