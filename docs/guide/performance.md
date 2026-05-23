# 性能优化策略

> 性能优化是 Flutter 开发中的重要环节，掌握性能优化技术能创建流畅的应用体验。

## 🚀 性能基础

### 1. 性能指标
```dart
// 监控帧率
class PerformanceMonitor {
  static int _frameCount = 0;
  static int _lastTimestamp = 0;
  
  static void startMonitoring() {
    WidgetsBinding.instance.addTimingsCallback((timings) {
      for (final timing in timings) {
        final duration = timing.totalSpan.inMilliseconds;
        if (duration > 16) { // 超过 60fps
          print('帧耗时: $duration ms');
        }
      }
    });
  }
  
  static void trackFrame() {
    _frameCount++;
    final now = DateTime.now().millisecondsSinceEpoch;
    if (now - _lastTimestamp >= 1000) {
      print('FPS: $_frameCount');
      _frameCount = 0;
      _lastTimestamp = now;
    }
  }
}
```

### 2. 性能分析
```dart
// 使用 DevTools 分析
void analyzePerformance() {
  // 1. 打开 Flutter Inspector
  // 2. 查看 Widget 树
  // 3. 检查重建次数
  // 4. 分析内存使用
}

// 代码性能分析
class PerformanceProfiler {
  static final Map<String, int> _timers = {};
  
  static void startTimer(String name) {
    _timers[name] = DateTime.now().microsecondsSinceEpoch;
  }
  
  static void endTimer(String name) {
    final start = _timers[name];
    if (start != null) {
      final duration = DateTime.now().microsecondsSinceEpoch - start;
      print('$name 耗时: ${duration / 1000} ms');
      _timers.remove(name);
    }
  }
  
  static Future<T> measureAsync<T>(
    String name,
    Future<T> Function() operation,
  ) async {
    startTimer(name);
    try {
      return await operation();
    } finally {
      endTimer(name);
    }
  }
}
```

## 🔧 Widget 优化

### 1. 减少重建
```dart
// ❌ 不好的实践：每次 build 都创建新对象
class BadWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello'), // 每次重建
    );
  }
}

// ✅ 好的实践：使用 const 和缓存
class GoodWidget extends StatelessWidget {
  const GoodWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Text('Hello'), // 使用 const
    );
  }
}

// 使用 const 构造函数
const myWidget = const Text('Hello');
const myIcon = const Icon(Icons.star);
```

### 2. Widget 拆分
```dart
// ❌ 不好的实践：过于复杂的 Widget
class ComplexWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 100 行代码...
      ],
    );
  }
}

// ✅ 好的实践：拆分 Widget
class SimpleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildHeader(),
        _buildContent(),
        _buildFooter(),
      ],
    );
  }
  
  Widget _buildHeader() => const Text('标题');
  Widget _buildContent() => const Text('内容');
  Widget _buildFooter() => const Text('页脚');
}
```

### 3. 使用 GlobalKey 谨慎
```dart
// ❌ 不好的实践：过度使用 GlobalKey
final globalKey = GlobalKey();

// ✅ 好的实践：合理使用 GlobalKey
class MyWidget extends StatefulWidget {
  const MyWidget({Key? key}) : super(key: key);
  
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  final _formKey = GlobalKey<FormState>();
  
  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // 表单验证通过
              }
            },
            child: Text('提交'),
          ),
        ],
      ),
    );
  }
}
```

## 💾 内存优化

### 1. 内存泄漏检测
```dart
// 检测内存泄漏
class MemoryLeakDetector {
  static final Map<String, WeakReference<Object>> _references = {};
  
  static void track(Object object, String name) {
    _references[name] = WeakReference(object);
  }
  
  static void checkLeaks() {
    for (final entry in _references.entries) {
      if (entry.value.target == null) {
        print('内存泄漏: ${entry.key}');
      }
    }
  }
}

// 正确清理资源
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  StreamSubscription? _subscription;
  
  @override
  void initState() {
    super.initState();
    _subscription = someStream.listen((data) {
      // 处理数据
    });
  }
  
  @override
  void dispose() {
    _subscription?.cancel(); // 清理资源
    super.dispose();
  }
}
```

### 2. 图片优化
```dart
// 使用缓存图片
class CachedImage extends StatelessWidget {
  final String imageUrl;
  
  const CachedImage({Key? key, required this.imageUrl}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Image.network(
      imageUrl,
      // 启用缓存
      cacheWidth: 200,
      cacheHeight: 200,
      // 使用占位符
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return Center(
          child: CircularProgressIndicator(
            value: loadingProgress.expectedTotalBytes != null
                ? loadingProgress.cumulativeBytesLoaded /
                    loadingProgress.expectedTotalBytes!
                : null,
          ),
        );
      },
      // 使用错误处理
      errorBuilder: (context, error, stackTrace) {
        return Icon(Icons.error);
      },
    );
  }
}

// 使用 precacheImage 预加载
void precacheImages(BuildContext context) {
  precacheImage(NetworkImage('https://example.com/image1.jpg'), context);
  precacheImage(NetworkImage('https://example.com/image2.jpg'), context);
}
```

## ⚡ 启动优化

### 1. 冷启动优化
```dart
// 延迟初始化
class LazyInitialization {
  static final Map<String, dynamic> _cache = {};
  
  static T get<T>(String key, T Function() factory) {
    if (!_cache.containsKey(key)) {
      _cache[key] = factory();
    }
    return _cache[key] as T;
  }
}

// 使用 Isolate 进行耗时操作
Future<void> heavyComputation() async {
  final result = await compute(_heavyFunction, 'input');
  print('计算结果: $result');
}

String _heavyFunction(String input) {
  // 耗时计算
  return '结果';
}
```

### 2. 热启动优化
```dart
// 状态恢复
class StateRestoration extends StatefulWidget {
  @override
  _StateRestorationState createState() => _StateRestorationState();
}

class _StateRestorationState extends State<StateRestoration>
    with RestorationMixin {
  final RestorableInt _counter = RestorableInt(0);
  
  @override
  String? get restorationId => 'state_restoration';
  
  @override
  void restoreState(RestorationBucket? oldBucket, bool initialRestore) {
    registerForRestoration(_counter, 'counter');
  }
  
  @override
  void dispose() {
    _counter.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('计数: ${_counter.value}'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter.value++;
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

## 📱 列表优化

### 1. ListView 优化
```dart
// ❌ 不好的实践：使用 ListView
ListView(
  children: List.generate(1000, (index) {
    return ListTile(title: Text('项目 $index'));
  }),
)

// ✅ 好的实践：使用 ListView.builder
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
)

// 使用 ListView.separated 添加分隔符
ListView.separated(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
  separatorBuilder: (context, index) {
    return Divider();
  },
)
```

### 2. GridView 优化
```dart
// 使用 GridView.builder
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    childAspectRatio: 1.0,
  ),
  itemCount: 1000,
  itemBuilder: (context, index) {
    return Card(
      child: Center(child: Text('项目 $index')),
    );
  },
)

// 使用 SliverGrid
CustomScrollView(
  slivers: [
    SliverGrid(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return Card(
            child: Center(child: Text('项目 $index')),
          );
        },
        childCount: 1000,
      ),
    ),
  ],
)
```

## 🎯 网络优化

### 1. 请求优化
```dart
// 请求合并
class RequestBatcher {
  static final Map<String, List<Completer>> _pendingRequests = {};
  
  static Future<T> batchRequest<T>(
    String key,
    Future<T> Function() request,
  ) async {
    if (_pendingRequests.containsKey(key)) {
      final completer = Completer<T>();
      _pendingRequests[key]!.add(completer);
      return completer.future;
    }
    
    _pendingRequests[key] = [];
    
    try {
      final result = await request();
      for (final completer in _pendingRequests[key]!) {
        completer.complete(result);
      }
      return result;
    } catch (error) {
      for (final completer in _pendingRequests[key]!) {
        completer.completeError(error);
      }
      rethrow;
    } finally {
      _pendingRequests.remove(key);
    }
  }
}
```

### 2. 缓存策略
```dart
class CacheManager {
  static final Map<String, CacheItem> _cache = {};
  
  static Future<T> get<T>(
    String key,
    Future<T> Function() fetcher, {
    Duration maxAge = const Duration(minutes: 5),
  }) async {
    final item = _cache[key];
    if (item != null && !item.isExpired(maxAge)) {
      return item.value as T;
    }
    
    final value = await fetcher();
    _cache[key] = CacheItem(value);
    return value;
  }
  
  static void clear() {
    _cache.clear();
  }
}

class CacheItem {
  final dynamic value;
  final DateTime createdAt;
  
  CacheItem(this.value) : createdAt = DateTime.now();
  
  bool isExpired(Duration maxAge) {
    return DateTime.now().difference(createdAt) > maxAge;
  }
}
```

## 🔧 渲染优化

### 1. 减少重绘
```dart
// 使用 RepaintBoundary
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)

// 使用 shouldRepaint 优化
class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 绘制逻辑
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    // 只在需要时重绘
    return oldDelegate != this;
  }
}
```

### 2. 合成优化
```dart
// 使用 Transform 而不是 Container
Transform.translate(
  offset: Offset(10, 10),
  child: MyWidget(),
)

// 使用 Opacity 而不是 Color.withOpacity
Opacity(
  opacity: 0.5,
  child: MyWidget(),
)

// 使用 ShaderMask 创建复杂效果
ShaderMask(
  shaderCallback: (bounds) {
    return LinearGradient(
      colors: [Colors.red, Colors.blue],
    ).createShader(bounds);
  },
  child: MyWidget(),
)
```

## 📊 性能监控

### 1. 性能监控工具
```dart
class PerformanceMonitor {
  static final List<FrameTiming> _frameTimings = [];
  
  static void startMonitoring() {
    WidgetsBinding.instance.addTimingsCallback((timings) {
      _frameTimings.addAll(timings);
      _analyzeFrameTimings();
    });
  }
  
  static void _analyzeFrameTimings() {
    if (_frameTimings.isEmpty) return;
    
    final totalFrames = _frameTimings.length;
    final slowFrames = _frameTimings.where((t) {
      return t.totalSpan.inMilliseconds > 16;
    }).length;
    
    print('总帧数: $totalFrames');
    print('慢帧数: $slowFrames');
    print('慢帧比例: ${(slowFrames / totalFrames * 100).toStringAsFixed(2)}%');
    
    _frameTimings.clear();
  }
}
```

### 2. 内存监控
```dart
class MemoryMonitor {
  static void startMonitoring() {
    Timer.periodic(Duration(seconds: 5), (timer) {
      final info = ProcessInfo.currentRss;
      print('内存使用: ${info ~/ 1024 ~/ 1024} MB');
    });
  }
  
  static void printMemoryUsage() {
    final info = ProcessInfo.currentRss;
    print('当前内存使用: ${info ~/ 1024 ~/ 1024} MB');
  }
}
```

## 🚀 最佳实践

### 1. 性能优化清单
```dart
class PerformanceChecklist {
  static List<String> check() {
    return [
      '✅ 使用 const Widget',
      '✅ 使用 ListView.builder',
      '✅ 使用 GridView.builder',
      '✅ 避免在 build 中创建新对象',
      '✅ 使用 RepaintBoundary',
      '✅ 合理使用 GlobalKey',
      '✅ 及时清理资源',
      '✅ 使用缓存策略',
      '✅ 优化图片加载',
      '✅ 使用 Isolate 处理耗时操作',
    ];
  }
}
```

### 2. 性能优化流程
```dart
class PerformanceOptimization {
  static Future<void> optimize() async {
    // 1. 性能分析
    await _analyzePerformance();
    
    // 2. 识别瓶颈
    final bottlenecks = await _identifyBottlenecks();
    
    // 3. 实施优化
    await _applyOptimizations(bottlenecks);
    
    // 4. 验证结果
    await _verifyResults();
  }
  
  static Future<void> _analyzePerformance() async {
    // 使用 DevTools 分析
  }
  
  static Future<List<String>> _identifyBottlenecks() async {
    // 识别性能瓶颈
    return [];
  }
  
  static Future<void> _applyOptimizations(List<String> bottlenecks) async {
    // 应用优化
  }
  
  static Future<void> _verifyResults() async {
    // 验证优化结果
  }
}
```

## 📚 学习资源

- [Flutter 性能优化官方文档](https://flutter.dev/docs/perf)
- [性能分析工具](https://flutter.dev/docs/development/tools/devtools/performance)
- [最佳实践](https://flutter.dev/docs/perf/best-practices)
- [渲染性能](https://flutter.dev/docs/perf/rendering)

## 🔗 相关链接

- [[guide/widgets]] - Widget 系统
- [[guide/state-management]] - 状态管理
- [[guide/navigation]] - 导航与路由
- [[core/architecture]] - Flutter 架构

---
*最后更新: 2026年5月23日*