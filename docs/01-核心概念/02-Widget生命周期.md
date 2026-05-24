# Widget 生命周期

> 深入理解 Flutter Widget 的生命周期，掌握状态管理和 Widget 更新机制。

## 📖 Widget 类型

### 1. StatelessWidget

```dart
// StatelessWidget 生命周期
class StatelessWidgetLifecycle {
  /*
  StatelessWidget 生命周期：
  1. 构造函数
  2. build()
  
  特点：
  - 不可变
  - 没有状态
  - 只能通过父 Widget 重建来更新
  */
  
  void explain() {
    print('''
    StatelessWidget 生命周期：
    
    1. 构造函数
       - 接收参数
       - 初始化配置
    
    2. build()
       - 构建 UI
       - 返回 Widget 树
    
    特点：
    - 不可变配置
    - 无状态管理
    - 依赖父 Widget 更新
    ''');
  }
}

// StatelessWidget 示例
class MyStatelessWidget extends StatelessWidget {
  final String title;
  
  const MyStatelessWidget({super.key, required this.title});
  
  @override
  Widget build(BuildContext context) {
    print('StatelessWidget build 被调用');
    return Container(
      child: Text(title),
    );
  }
}
```

### 2. StatefulWidget

```dart
// StatefulWidget 生命周期
class StatefulWidgetLifecycle {
  /*
  StatefulWidget 生命周期：
  1. createState()
  2. initState()
  3. didChangeDependencies()
  4. build()
  5. didUpdateWidget()
  6. setState()
  7. deactivate()
  8. dispose()
  
  特点：
  - 有状态
  - 可以更新
  - 需要管理生命周期
  */
  
  void explain() {
    print('''
    StatefulWidget 生命周期：
    
    1. createState()
       - 创建 State 对象
       - 只调用一次
    
    2. initState()
       - 初始化状态
       - 只调用一次
       - 可以调用 setState()
    
    3. didChangeDependencies()
       - 依赖关系改变时调用
       - 在 initState() 之后调用
       - 当 InheritedWidget 改变时调用
    
    4. build()
       - 构建 UI
       - 每次状态改变时调用
    
    5. didUpdateWidget()
       - Widget 配置改变时调用
       - 在 build() 之前调用
    
    6. setState()
       - 更新状态
       - 触发重建
    
    7. deactivate()
       - 从树中移除时调用
       - 可能重新插入
    
    8. dispose()
       - 永久移除时调用
       - 清理资源
    ''');
  }
}

// StatefulWidget 示例
class MyStatefulWidget extends StatefulWidget {
  final String title;
  
  const MyStatefulWidget({super.key, required this.title});
  
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _counter = 0;
  
  @override
  void initState() {
    super.initState();
    print('initState 被调用');
    // 初始化操作
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies 被调用');
  }
  
  @override
  void didUpdateWidget(covariant MyStatefulWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget 被调用');
    if (oldWidget.title != widget.title) {
      print('标题从 ${oldWidget.title} 变为 ${widget.title}');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    print('build 被调用');
    return Column(
      children: [
        Text(widget.title),
        Text('计数: $_counter'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter++;
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
  
  @override
  void deactivate() {
    super.deactivate();
    print('deactivate 被调用');
  }
  
  @override
  void dispose() {
    print('dispose 被调用');
    // 清理资源
    super.dispose();
  }
}
```

## 📖 State 生命周期

### 1. 初始化阶段

```dart
// State 初始化阶段
class StateInitialization {
  /*
  初始化阶段：
  1. createState()
  2. initState()
  3. didChangeDependencies()
  
  注意：
  - initState() 中可以调用 setState()
  - 不要在 initState() 中调用依赖 context 的方法
  */
  
  void explain() {
    print('''
    State 初始化阶段：
    
    1. createState()
       - 由框架调用
       - 创建 State 实例
       - 只调用一次
    
    2. initState()
       - State 初始化
       - 初始化变量
       - 添加监听器
       - 可以调用 setState()
    
    3. didChangeDependencies()
       - 依赖关系改变
       - 在 initState() 之后调用
       - 当 InheritedWidget 改变时调用
    
    初始化顺序：
    createState() → initState() → didChangeDependencies() → build()
    ''');
  }
}

// 初始化示例
class InitializationExample extends StatefulWidget {
  @override
  _InitializationExampleState createState() => _InitializationExampleState();
}

class _InitializationExampleState extends State<InitializationExample> {
  late String _data;
  StreamSubscription? _subscription;
  
  @override
  void initState() {
    super.initState();
    print('initState: 初始化状态');
    
    // 初始化变量
    _data = '初始数据';
    
    // 添加监听器
    _subscription = Stream.periodic(Duration(seconds: 1)).listen((_) {
      print('流事件');
    });
    
    // 可以调用 setState
    setState(() {
      _data = '更新后的数据';
    });
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies: 依赖关系改变');
    
    // 获取 InheritedWidget 数据
    final inheritedWidget = MyInheritedWidget.of(context);
    if (inheritedWidget != null) {
      print('获取到 InheritedWidget 数据');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Text(_data);
  }
}
```

### 2. 更新阶段

```dart
// State 更新阶段
class StateUpdate {
  /*
  更新阶段：
  1. didUpdateWidget()
  2. setState()
  3. build()
  
  触发条件：
  - 父 Widget 重建
  - 调用 setState()
  - InheritedWidget 改变
  */
  
  void explain() {
    print('''
    State 更新阶段：
    
    1. didUpdateWidget()
       - Widget 配置改变
       - 在 build() 之前调用
       - 可以比较新旧配置
    
    2. setState()
       - 更新状态
       - 标记为 dirty
       - 触发重建
    
    3. build()
       - 构建 UI
       - 每次状态改变时调用
    
    更新顺序：
    didUpdateWidget() → build()
    
    或者：
    setState() → build()
    ''');
  }
}

// 更新示例
class UpdateExample extends StatefulWidget {
  final String title;
  
  const UpdateExample({super.key, required this.title});
  
  @override
  _UpdateExampleState createState() => _UpdateExampleState();
}

class _UpdateExampleState extends State<UpdateExample> {
  int _counter = 0;
  String _lastUpdate = '';
  
  @override
  void didUpdateWidget(covariant UpdateExample oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget: Widget 配置改变');
    
    if (oldWidget.title != widget.title) {
      setState(() {
        _lastUpdate = '标题从 ${oldWidget.title} 变为 ${widget.title}';
      });
    }
  }
  
  void _incrementCounter() {
    setState(() {
      _counter++;
      _lastUpdate = '计数器增加到 $_counter';
    });
  }
  
  @override
  Widget build(BuildContext context) {
    print('build: 构建 UI');
    return Column(
      children: [
        Text('标题: ${widget.title}'),
        Text('计数: $_counter'),
        Text('最后更新: $_lastUpdate'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

### 3. 销毁阶段

```dart
// State 销毁阶段
class StateDisposal {
  /*
  销毁阶段：
  1. deactivate()
  2. dispose()
  
  注意：
  - deactivate() 中 Widget 可能重新插入
  - dispose() 中 Widget 永久移除
  - 在 dispose() 中清理资源
  */
  
  void explain() {
    print('''
    State 销毁阶段：
    
    1. deactivate()
       - 从树中移除
       - 可能重新插入
       - 很少使用
    
    2. dispose()
       - 永久移除
       - 清理资源
       - 取消监听器
       - 关闭控制器
    
    销毁顺序：
    deactivate() → dispose()
    
    资源清理：
    - 取消 StreamSubscription
    - 关闭 TextEditingController
    - 移除监听器
    - 取消定时器
    ''');
  }
}

// 销毁示例
class DisposalExample extends StatefulWidget {
  @override
  _DisposalExampleState createState() => _DisposalExampleState();
}

class _DisposalExampleState extends State<DisposalExample> {
  final TextEditingController _controller = TextEditingController();
  StreamSubscription? _subscription;
  Timer? _timer;
  
  @override
  void initState() {
    super.initState();
    
    // 添加监听器
    _controller.addListener(() {
      print('文本改变: ${_controller.text}');
    });
    
    // 订阅流
    _subscription = Stream.periodic(Duration(seconds: 1)).listen((_) {
      print('流事件');
    });
    
    // 创建定时器
    _timer = Timer.periodic(Duration(seconds: 2), (_) {
      print('定时器事件');
    });
  }
  
  @override
  void deactivate() {
    print('deactivate: 从树中移除');
    super.deactivate();
  }
  
  @override
  void dispose() {
    print('dispose: 永久移除，清理资源');
    
    // 清理控制器
    _controller.dispose();
    
    // 取消订阅
    _subscription?.cancel();
    
    // 取消定时器
    _timer?.cancel();
    
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
    );
  }
}
```

## 📖 生命周期钩子

### 1. 高级生命周期钩子

```dart
// 高级生命周期钩子
class AdvancedLifecycleHooks {
  /*
  高级生命周期钩子：
  1. didChangeAppLifecycleState()
  2. didChangePlatformBrightness()
  3. didChangeTextScaleFactor()
  4. didChangeLocales()
  5. didChangeMetrics()
  6. didChangeAccessibilityFeatures()
  
  需要混入 WidgetsBindingObserver
  */
  
  void explain() {
    print('''
    高级生命周期钩子：
    
    1. didChangeAppLifecycleState()
       - 应用生命周期改变
       - resumed, inactive, paused, detached
    
    2. didChangePlatformBrightness()
       - 平台亮度改变
       - 明暗模式切换
    
    3. didChangeTextScaleFactor()
       - 文本缩放因子改变
    
    4. didChangeLocales()
       - 本地化改变
    
    5. didChangeMetrics()
       - 屏幕尺寸改变
    
    6. didChangeAccessibilityFeatures()
       - 无障碍功能改变
    
    使用方法：
    1. 混入 WidgetsBindingObserver
    2. 在 initState 中添加观察者
    3. 在 dispose 中移除观察者
    ''');
  }
}

// 高级生命周期示例
class AdvancedLifecycleExample extends StatefulWidget {
  @override
  _AdvancedLifecycleExampleState createState() => _AdvancedLifecycleExampleState();
}

class _AdvancedLifecycleExampleState extends State<AdvancedLifecycleExample> 
    with WidgetsBindingObserver {
  AppLifecycleState? _lastLifecycleState;
  
  @override
  void initState() {
    super.initState();
    // 添加观察者
    WidgetsBinding.instance.addObserver(this);
  }
  
  @override
  void dispose() {
    // 移除观察者
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }
  
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    setState(() {
      _lastLifecycleState = state;
    });
    print('应用生命周期改变: $state');
    
    switch (state) {
      case AppLifecycleState.resumed:
        print('应用恢复');
        break;
      case AppLifecycleState.inactive:
        print('应用不活跃');
        break;
      case AppLifecycleState.paused:
        print('应用暂停');
        break;
      case AppLifecycleState.detached:
        print('应用分离');
        break;
    }
  }
  
  @override
  void didChangePlatformBrightness() {
    final brightness = WidgetsBinding.instance.platformDispatcher.platformBrightness;
    print('平台亮度改变: $brightness');
  }
  
  @override
  void didChangeTextScaleFactor() {
    final scaleFactor = WidgetsBinding.instance.platformDispatcher.textScaleFactor;
    print('文本缩放因子改变: $scaleFactor');
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('最后生命周期状态: $_lastLifecycleState');
  }
}
```

### 2. 帧回调

```dart
// 帧回调
class FrameCallbacks {
  /*
  帧回调：
  1. addPostFrameCallback()
     - 在帧绘制后调用
     - 用于测量尺寸
  
  2. addPersistentFrameCallback()
     - 每帧都调用
     - 用于动画
  
  3. scheduleFrame()
     - 调度帧
     - 强制重建
  */
  
  void explain() {
    print('''
    帧回调：
    
    1. addPostFrameCallback()
       - 在帧绘制后调用
       - 可以获取 Widget 尺寸
       - 只调用一次
    
    2. addPersistentFrameCallback()
       - 每帧都调用
       - 用于动画循环
       - 持续调用
    
    3. scheduleFrame()
       - 调度新帧
       - 强制重建
       - 用于自定义更新
    
    使用场景：
    - 测量 Widget 尺寸
    - 执行动画
    - 自定义更新逻辑
    ''');
  }
}

// 帧回调示例
class FrameCallbackExample extends StatefulWidget {
  @override
  _FrameCallbackExampleState createState() => _FrameCallbackExampleState();
}

class _FrameCallbackExampleState extends State<FrameCallbackExample> {
  final GlobalKey _textKey = GlobalKey();
  Size? _textSize;
  
  @override
  void initState() {
    super.initState();
    
    // 在帧绘制后获取尺寸
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _measureText();
    });
  }
  
  void _measureText() {
    final RenderBox? renderBox = _textKey.currentContext?.findRenderObject() as RenderBox?;
    if (renderBox != null) {
      setState(() {
        _textSize = renderBox.size;
      });
      print('文本尺寸: $_textSize');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          '测量这个文本',
          key: _textKey,
          style: TextStyle(fontSize: 24),
        ),
        if (_textSize != null)
          Text('尺寸: ${_textSize!.width.toStringAsFixed(2)} x ${_textSize!.height.toStringAsFixed(2)}'),
      ],
    );
  }
}
```

## 📖 生命周期最佳实践

### 1. 资源管理

```dart
// 资源管理最佳实践
class ResourceManagement {
  /*
  资源管理：
  1. 在 initState 中初始化
  2. 在 dispose 中清理
  3. 使用 late 初始化
  4. 避免内存泄漏
  */
  
  void explain() {
    print('''
    资源管理最佳实践：
    
    1. 初始化资源
       - 在 initState 中初始化
       - 使用 late 延迟初始化
       - 避免在 build 中初始化
    
    2. 清理资源
       - 在 dispose 中清理
       - 取消监听器
       - 关闭控制器
       - 取消定时器
    
    3. 避免内存泄漏
       - 不要在 dispose 后调用 setState
       - 检查 mounted 状态
       - 使用弱引用
    
    4. 常见资源：
       - TextEditingController
       - ScrollController
       - AnimationController
       - StreamSubscription
       - Timer
    ''');
  }
}

// 资源管理示例
class ResourceExample extends StatefulWidget {
  @override
  _ResourceExampleState createState() => _ResourceExampleState();
}

class _ResourceExampleState extends State<ResourceExample> {
  // 使用 late 延迟初始化
  late TextEditingController _controller;
  late AnimationController _animationController;
  StreamSubscription? _subscription;
  Timer? _timer;
  
  @override
  void initState() {
    super.initState();
    
    // 初始化控制器
    _controller = TextEditingController();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 1),
    );
    
    // 添加监听器
    _controller.addListener(_handleTextChange);
    
    // 订阅流
    _subscription = Stream.periodic(Duration(seconds: 1)).listen(_handleStreamEvent);
    
    // 创建定时器
    _timer = Timer.periodic(Duration(seconds: 2), _handleTimerEvent);
  }
  
  void _handleTextChange() {
    // 检查 mounted 状态
    if (!mounted) return;
    
    print('文本改变: ${_controller.text}');
  }
  
  void _handleStreamEvent(_) {
    if (!mounted) return;
    print('流事件');
  }
  
  void _handleTimerEvent(_) {
    if (!mounted) return;
    print('定时器事件');
  }
  
  @override
  void dispose() {
    // 清理所有资源
    _controller.removeListener(_handleTextChange);
    _controller.dispose();
    _animationController.dispose();
    _subscription?.cancel();
    _timer?.cancel();
    
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _controller,
    );
  }
}
```

### 2. 状态管理

```dart
// 状态管理最佳实践
class StateManagement {
  /*
  状态管理：
  1. 局部状态
     - 使用 setState
     - 适用于简单状态
  
  2. 全局状态
     - 使用状态管理方案
     - Provider, Bloc, Riverpod 等
  
  3. 状态提升
     - 将状态提升到父 Widget
     - 通过回调更新
  */
  
  void explain() {
    print('''
    状态管理最佳实践：
    
    1. 局部状态
       - 使用 setState
       - 状态只在当前 Widget 使用
       - 适用于简单 UI 状态
    
    2. 全局状态
       - 使用状态管理方案
       - 状态在多个 Widget 共享
       - 适用于复杂业务逻辑
    
    3. 状态提升
       - 将状态提升到共同父 Widget
       - 通过构造函数传递状态
       - 通过回调更新状态
    
    4. 状态管理方案：
       - Provider：简单易用
       - Bloc：响应式编程
       - Riverpod：类型安全
       - GetX：轻量级
    ''');
  }
}

// 状态提升示例
class StateLiftingExample extends StatefulWidget {
  @override
  _StateLiftingExampleState createState() => _StateLiftingExampleState();
}

class _StateLiftingExampleState extends State<StateLiftingExample> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CounterDisplay(counter: _counter),
        CounterButton(onPressed: _incrementCounter),
      ],
    );
  }
}

class CounterDisplay extends StatelessWidget {
  final int counter;
  
  const CounterDisplay({super.key, required this.counter});
  
  @override
  Widget build(BuildContext context) {
    return Text('计数: $counter');
  }
}

class CounterButton extends StatelessWidget {
  final VoidCallback onPressed;
  
  const CounterButton({super.key, required this.onPressed});
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text('增加'),
    );
  }
}
```

## 📖 生命周期调试

### 1. 生命周期日志

```dart
// 生命周期日志
class LifecycleLogging {
  /*
  生命周期日志：
  1. 添加日志到每个生命周期方法
  2. 使用 debugPrint
  3. 使用断点调试
  */
  
  void explain() {
    print('''
    生命周期调试：
    
    1. 添加日志
       - 在每个生命周期方法添加 print
       - 使用 debugPrint
       - 添加时间戳
    
    2. 使用断点
       - 在生命周期方法设置断点
       - 观察调用顺序
       - 检查状态值
    
    3. 使用 DevTools
       - 查看 Widget 树
       - 监控状态变化
       - 分析性能
    
    调试技巧：
    - 使用 const 构造函数
    - 避免不必要的重建
    - 检查 mounted 状态
    ''');
  }
}

// 生命周期日志示例
class LoggingExample extends StatefulWidget {
  @override
  _LoggingExampleState createState() => _LoggingExampleState();
}

class _LoggingExampleState extends State<LoggingExample> {
  @override
  void initState() {
    super.initState();
    debugPrint('${DateTime.now()}: initState');
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    debugPrint('${DateTime.now()}: didChangeDependencies');
  }
  
  @override
  void didUpdateWidget(covariant LoggingExample oldWidget) {
    super.didUpdateWidget(oldWidget);
    debugPrint('${DateTime.now()}: didUpdateWidget');
  }
  
  @override
  Widget build(BuildContext context) {
    debugPrint('${DateTime.now()}: build');
    return Container();
  }
  
  @override
  void deactivate() {
    debugPrint('${DateTime.now()}: deactivate');
    super.deactivate();
  }
  
  @override
  void dispose() {
    debugPrint('${DateTime.now()}: dispose');
    super.dispose();
  }
}
```

## 📖 总结

### Widget 生命周期核心概念

| 阶段 | 方法 | 描述 | 重要性 |
|------|------|------|--------|
| **初始化** | initState() | 初始化状态 | 必须掌握 |
| **依赖** | didChangeDependencies() | 依赖关系改变 | 重要 |
| **构建** | build() | 构建 UI | 核心 |
| **更新** | didUpdateWidget() | Widget 配置改变 | 重要 |
| **状态更新** | setState() | 更新状态 | 核心 |
| **销毁** | dispose() | 清理资源 | 必须掌握 |

### 最佳实践

1. **初始化**：在 initState 中初始化资源
2. **更新**：使用 setState 更新状态
3. **销毁**：在 dispose 中清理资源
4. **状态管理**：选择合适的状态管理方案
5. **性能优化**：避免不必要的重建

### 常见陷阱

1. **内存泄漏**：未在 dispose 中清理资源
2. **状态不一致**：在 dispose 后调用 setState
3. **过度重建**：不必要的 setState 调用
4. **资源未释放**：未取消监听器和订阅

### 下一步学习

- **Flutter 渲染原理**：理解渲染机制
- **状态管理**：学习高级状态管理
- **性能优化**：优化 Widget 性能

---

> 深入理解 Widget 的生命周期，掌握状态管理和 Widget 更新机制。这将帮助你编写更高效、更稳定的 Flutter 应用。