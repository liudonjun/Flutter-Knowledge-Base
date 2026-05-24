# Widget 生命周期详解

> 深入理解 Flutter Widget 的生命周期，掌握状态管理和 Widget 更新机制。

## 📖 Widget 生命周期概述

### 1. 生命周期阶段

```dart
// Widget 生命周期阶段
class WidgetLifecycleStages {
  /*
  Widget 生命周期阶段：
  
  1. 创建阶段
     - 构造函数
     - createState()
     - initState()
  
  2. 更新阶段
     - didUpdateWidget()
     - setState()
     - build()
  
  3. 销毁阶段
     - deactivate()
     - dispose()
  
  4. 依赖阶段
     - didChangeDependencies()
  */
  
  void explain() {
    print('''
    Widget 生命周期阶段：
    
    1. 创建阶段
       - 构造函数：接收参数
       - createState()：创建 State 对象
       - initState()：初始化状态
    
    2. 更新阶段
       - didUpdateWidget()：Widget 配置改变
       - setState()：更新状态
       - build()：构建 UI
    
    3. 销毁阶段
       - deactivate()：从树中移除
       - dispose()：永久移除，清理资源
    
    4. 依赖阶段
       - didChangeDependencies()：依赖关系改变
    
    生命周期顺序：
    创建：构造函数 → createState() → initState() → didChangeDependencies() → build()
    更新：didUpdateWidget() → build() 或 setState() → build()
    销毁：deactivate() → dispose()
    ''');
  }
}
```

### 2. 生命周期图

```dart
// 生命周期图
class LifecycleDiagram {
  /*
  生命周期图：
  
  StatefulWidget:
  1. createState()
  2. initState()
  3. didChangeDependencies()
  4. build()
  5. didUpdateWidget() [可选]
  6. setState() [可选]
  7. deactivate()
  8. dispose()
  
  StatelessWidget:
  1. 构造函数
  2. build()
  */
  
  void explain() {
    print('''
    生命周期图：
    
    StatefulWidget 生命周期：
    ┌─────────────────────────────────────────┐
    │  createState()                          │
    │  ↓                                      │
    │  initState()                            │
    │  ↓                                      │
    │  didChangeDependencies()                │
    │  ↓                                      │
    │  build() ←──────────────────┐           │
    │  ↓                          │           │
    │  didUpdateWidget() ─────────┘ [可选]    │
    │  ↓                          │           │
    │  setState() ────────────────┘ [可选]    │
    │  ↓                                      │
    │  deactivate()                           │
    │  ↓                                      │
    │  dispose()                              │
    └─────────────────────────────────────────┘
    
    StatelessWidget 生命周期：
    ┌─────────────────────────────────────────┐
    │  构造函数                               │
    │  ↓                                      │
    │  build()                                │
    └─────────────────────────────────────────┘
    
    关键点：
    - initState() 只调用一次
    - build() 可能调用多次
    - dispose() 只调用一次
    - didChangeDependencies() 在 initState() 后调用
    ''');
  }
}
```

## 📖 创建阶段

### 1. createState()

```dart
// createState() 方法
class CreateStateMethod {
  /*
  createState() 方法：
  
  1. 功能
     - 创建 State 对象
     - 只调用一次
     - 返回 State 实例
  
  2. 注意事项
     - 不要在这里调用 setState()
     - 不要访问 context
     - 只用于创建 State
  
  3. 最佳实践
     - 保持简单
     - 只返回 State 实例
     - 不要执行复杂逻辑
  */
  
  void explain() {
    print('''
    createState() 方法：
    
    1. 功能
       - 创建 State 对象
       - 由框架调用
       - 只调用一次
       - 返回 State 实例
    
    2. 注意事项
       - 不要在这里调用 setState()
       - 不要访问 context
       - 不要执行复杂逻辑
       - 只用于创建 State
    
    3. 最佳实践
       - 保持简单
       - 只返回 State 实例
       - 不要执行初始化操作
       - 初始化操作放在 initState()
    
    示例：
    @override
    _MyWidgetState createState() => _MyWidgetState();
    ''');
  }
}

// createState() 示例
class MyWidget extends StatefulWidget {
  final String title;
  
  const MyWidget({super.key, required this.title});
  
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  @override
  Widget build(BuildContext context) {
    return Text(widget.title);
  }
}
```

### 2. initState()

```dart
// initState() 方法
class InitStateMethod {
  /*
  initState() 方法：
  
  1. 功能
     - 初始化状态
     - 只调用一次
     - 可以调用 setState()
  
  2. 使用场景
     - 初始化变量
     - 添加监听器
     - 初始化控制器
     - 启动动画
  
  3. 注意事项
     - 调用 super.initState()
     - 不要依赖 context
     - 不要执行耗时操作
  */
  
  void explain() {
    print('''
    initState() 方法：
    
    1. 功能
       - 初始化状态
       - 只调用一次
       - 在 build() 之前调用
       - 可以调用 setState()
    
    2. 使用场景
       - 初始化变量
       - 添加监听器
       - 初始化控制器
       - 启动动画
       - 初始化订阅
    
    3. 注意事项
       - 必须调用 super.initState()
       - 不要依赖 context（此时 context 不完全可用）
       - 不要执行耗时操作
       - 可以调用 setState()
    
    4. 最佳实践
       - 初始化变量
       - 添加监听器
       - 初始化控制器
       - 启动动画
       - 初始化订阅
    
    示例：
    @override
    void initState() {
      super.initState();
      // 初始化变量
      _counter = 0;
      // 添加监听器
      _controller.addListener(_handleControllerChange);
      // 初始化控制器
      _textController = TextEditingController();
      // 启动动画
      _animationController = AnimationController(
        vsync: this,
        duration: Duration(seconds: 1),
      );
    }
    ''');
  }
}

// initState() 示例
class InitStateExample extends StatefulWidget {
  @override
  _InitStateExampleState createState() => _InitStateExampleState();
}

class _InitStateExampleState extends State<InitStateExample> {
  late TextEditingController _controller;
  late AnimationController _animationController;
  int _counter = 0;
  
  @override
  void initState() {
    super.initState();
    
    // 初始化控制器
    _controller = TextEditingController();
    
    // 添加监听器
    _controller.addListener(() {
      print('文本改变: ${_controller.text}');
    });
    
    // 初始化动画控制器
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(seconds: 1),
    );
    
    // 初始化变量
    _counter = 0;
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(controller: _controller),
        Text('计数: $_counter'),
      ],
    );
  }
}
```

### 3. didChangeDependencies()

```dart
// didChangeDependencies() 方法
class DidChangeDependenciesMethod {
  /*
  didChangeDependencies() 方法：
  
  1. 功能
     - 依赖关系改变时调用
     - 在 initState() 之后调用
     - 当 InheritedWidget 改变时调用
  
  2. 使用场景
     - 获取 InheritedWidget 数据
     - 响应依赖变化
     - 更新依赖数据
  
  3. 注意事项
     - 调用 super.didChangeDependencies()
     - 可能调用多次
     - 不要执行耗时操作
  */
  
  void explain() {
    print('''
    didChangeDependencies() 方法：
    
    1. 功能
       - 依赖关系改变时调用
       - 在 initState() 之后调用
       - 当 InheritedWidget 改变时调用
       - 可能调用多次
    
    2. 使用场景
       - 获取 InheritedWidget 数据
       - 响应依赖变化
       - 更新依赖数据
       - 初始化依赖数据
    
    3. 注意事项
       - 必须调用 super.didChangeDependencies()
       - 可能调用多次
       - 不要执行耗时操作
       - 可以安全地访问 context
    
    4. 最佳实践
       - 获取 InheritedWidget 数据
       - 响应依赖变化
       - 更新依赖数据
       - 初始化依赖数据
    
    示例：
    @override
    void didChangeDependencies() {
      super.didChangeDependencies();
      // 获取 InheritedWidget 数据
      final inheritedWidget = MyInheritedWidget.of(context);
      if (inheritedWidget != null) {
        // 更新依赖数据
        setState(() {
          _data = inheritedWidget.data;
        });
      }
    }
    ''');
  }
}

// didChangeDependencies() 示例
class DidChangeDependenciesExample extends StatefulWidget {
  @override
  _DidChangeDependenciesExampleState createState() => _DidChangeDependenciesExampleState();
}

class _DidChangeDependenciesExampleState extends State<DidChangeDependenciesExample> {
  String _data = '';
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    
    // 获取 InheritedWidget 数据
    final inheritedWidget = MyInheritedWidget.of(context);
    if (inheritedWidget != null) {
      setState(() {
        _data = inheritedWidget.data;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('数据: $_data');
  }
}
```

## 📖 更新阶段

### 1. didUpdateWidget()

```dart
// didUpdateWidget() 方法
class DidUpdateWidgetMethod {
  /*
  didUpdateWidget() 方法：
  
  1. 功能
     - Widget 配置改变时调用
     - 在 build() 之前调用
     - 可以比较新旧配置
  
  2. 使用场景
     - 响应 Widget 配置变化
     - 更新内部状态
     - 重新初始化资源
  
  3. 注意事项
     - 调用 super.didUpdateWidget()
     - 比较新旧配置
     - 可能调用多次
  */
  
  void explain() {
    print('''
    didUpdateWidget() 方法：
    
    1. 功能
       - Widget 配置改变时调用
       - 在 build() 之前调用
       - 可以比较新旧配置
       - 可能调用多次
    
    2. 使用场景
       - 响应 Widget 配置变化
       - 更新内部状态
       - 重新初始化资源
       - 响应父 Widget 变化
    
    3. 注意事项
       - 必须调用 super.didUpdateWidget()
       - 比较新旧配置
       - 可能调用多次
       - 不要执行耗时操作
    
    4. 最佳实践
       - 比较新旧配置
       - 更新内部状态
       - 重新初始化资源
       - 响应父 Widget 变化
    
    示例：
    @override
    void didUpdateWidget(covariant MyWidget oldWidget) {
      super.didUpdateWidget(oldWidget);
      // 比较新旧配置
      if (oldWidget.title != widget.title) {
        // 更新内部状态
        setState(() {
          _title = widget.title;
        });
      }
    }
    ''');
  }
}

// didUpdateWidget() 示例
class DidUpdateWidgetExample extends StatefulWidget {
  final String title;
  
  const DidUpdateWidgetExample({super.key, required this.title});
  
  @override
  _DidUpdateWidgetExampleState createState() => _DidUpdateWidgetExampleState();
}

class _DidUpdateWidgetExampleState extends State<DidUpdateWidgetExample> {
  String _title = '';
  
  @override
  void initState() {
    super.initState();
    _title = widget.title;
  }
  
  @override
  void didUpdateWidget(covariant DidUpdateWidgetExample oldWidget) {
    super.didUpdateWidget(oldWidget);
    
    // 比较新旧配置
    if (oldWidget.title != widget.title) {
      setState(() {
        _title = widget.title;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Text('标题: $_title');
  }
}
```

### 2. setState()

```dart
// setState() 方法
class SetStateMethod {
  /*
  setState() 方法：
  
  1. 功能
     - 更新状态
     - 标记为 dirty
     - 触发重建
  
  2. 使用场景
     - 更新状态变量
     - 响应用户交互
     - 响应数据变化
  
  3. 注意事项
     - 不要在 build() 中调用
     - 不要在 dispose() 中调用
     - 不要执行耗时操作
  */
  
  void explain() {
    print('''
    setState() 方法：
    
    1. 功能
       - 更新状态
       - 标记为 dirty
       - 触发重建
       - 调用 build()
    
    2. 使用场景
       - 更新状态变量
       - 响应用户交互
       - 响应数据变化
       - 更新 UI
    
    3. 注意事项
       - 不要在 build() 中调用
       - 不要在 dispose() 中调用
       - 不要执行耗时操作
       - 检查 mounted 状态
    
    4. 最佳实践
       - 只更新状态
       - 不要执行复杂逻辑
       - 检查 mounted 状态
       - 避免不必要的调用
    
    示例：
    void _incrementCounter() {
      setState(() {
        _counter++;
      });
    }
    
    或者：
    void _updateData() {
      if (!mounted) return;
      setState(() {
        _data = newData;
      });
    }
    ''');
  }
}

// setState() 示例
class SetStateExample extends StatefulWidget {
  @override
  _SetStateExampleState createState() => _SetStateExampleState();
}

class _SetStateExampleState extends State<SetStateExample> {
  int _counter = 0;
  String _data = '初始数据';
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  void _updateData() {
    // 检查 mounted 状态
    if (!mounted) return;
    
    setState(() {
      _data = '更新后的数据';
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('计数: $_counter'),
        Text('数据: $_data'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: Text('增加计数'),
        ),
        ElevatedButton(
          onPressed: _updateData,
          child: Text('更新数据'),
        ),
      ],
    );
  }
}
```

### 3. build()

```dart
// build() 方法
class BuildMethod {
  /*
  build() 方法：
  
  1. 功能
     - 构建 UI
     - 返回 Widget 树
     - 可能调用多次
  
  2. 使用场景
     - 构建 UI
     - 响应状态变化
     - 更新界面
  
  3. 注意事项
     - 不要执行耗时操作
     - 不要修改状态
     - 保持纯净
  */
  
  void explain() {
    print('''
    build() 方法：
    
    1. 功能
       - 构建 UI
       - 返回 Widget 树
       - 可能调用多次
       - 响应状态变化
    
    2. 使用场景
       - 构建 UI
       - 响应状态变化
       - 更新界面
       - 组合 Widget
    
    3. 注意事项
       - 不要执行耗时操作
       - 不要修改状态
       - 保持纯净
       - 使用 const 构造函数
    
    4. 最佳实践
       - 保持简单
       - 使用 const 构造函数
       - 避免复杂逻辑
       - 使用提取的 Widget
    
    示例：
    @override
    Widget build(BuildContext context) {
      return Column(
        children: [
          Text('标题: ${widget.title}'),
          Text('计数: $_counter'),
          ElevatedButton(
            onPressed: _incrementCounter,
            child: Text('增加'),
          ),
        ],
      );
    }
    ''');
  }
}

// build() 示例
class BuildExample extends StatefulWidget {
  final String title;
  
  const BuildExample({super.key, required this.title});
  
  @override
  _BuildExampleState createState() => _BuildExampleState();
}

class _BuildExampleState extends State<BuildExample> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    // 使用 const 构造函数
    return Column(
      children: [
        Text('标题: ${widget.title}'),
        Text('计数: $_counter'),
        ElevatedButton(
          onPressed: _incrementCounter,
          child: const Text('增加'), // 使用 const
        ),
      ],
    );
  }
}
```

## 📖 销毁阶段

### 1. deactivate()

```dart
// deactivate() 方法
class DeactivateMethod {
  /*
  deactivate() 方法：
  
  1. 功能
     - 从树中移除时调用
     - 可能重新插入
     - 很少使用
  
  2. 使用场景
     - 清理临时资源
     - 响应移除事件
     - 准备重新插入
  
  3. 注意事项
     - 调用 super.deactivate()
     - Widget 可能重新插入
     - 不要清理永久资源
  */
  
  void explain() {
    print('''
    deactivate() 方法：
    
    1. 功能
       - 从树中移除时调用
       - 可能重新插入
       - 很少使用
       - 在 dispose() 之前调用
    
    2. 使用场景
       - 清理临时资源
       - 响应移除事件
       - 准备重新插入
       - 临时清理
    
    3. 注意事项
       - 必须调用 super.deactivate()
       - Widget 可能重新插入
       - 不要清理永久资源
       - 可能调用多次
    
    4. 最佳实践
       - 很少使用
       - 只用于临时清理
       - 不要清理永久资源
       - 考虑使用 dispose()
    
    示例：
    @override
    void deactivate() {
      super.deactivate();
      // 临时清理
      print('Widget 从树中移除');
    }
    ''');
  }
}

// deactivate() 示例
class DeactivateExample extends StatefulWidget {
  @override
  _DeactivateExampleState createState() => _DeactivateExampleState();
}

class _DeactivateExampleState extends State<DeactivateExample> {
  @override
  void deactivate() {
    super.deactivate();
    print('deactivate: Widget 从树中移除');
  }
  
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

### 2. dispose()

```dart
// dispose() 方法
class DisposeMethod {
  /*
  dispose() 方法：
  
  1. 功能
     - 永久移除时调用
     - 清理资源
     - 只调用一次
  
  2. 使用场景
     - 清理控制器
     - 取消监听器
     - 关闭流
     - 取消定时器
  
  3. 注意事项
     - 调用 super.dispose()
     - 不要调用 setState()
     - 确保清理所有资源
  */
  
  void explain() {
    print('''
    dispose() 方法：
    
    1. 功能
       - 永久移除时调用
       - 清理资源
       - 只调用一次
       - 在 deactivate() 之后调用
    
    2. 使用场景
       - 清理控制器
       - 取消监听器
       - 关闭流
       - 取消定时器
       - 释放内存
    
    3. 注意事项
       - 必须调用 super.dispose()
       - 不要调用 setState()
       - 确保清理所有资源
       - 不要访问 context
    
    4. 最佳实践
       - 清理所有资源
       - 取消所有订阅
       - 关闭所有控制器
       - 取消所有定时器
    
    示例：
    @override
    void dispose() {
      // 清理控制器
      _controller.dispose();
      // 取消监听器
      _subscription?.cancel();
      // 关闭流
      _streamController.close();
      // 取消定时器
      _timer?.cancel();
      super.dispose();
    }
    ''');
  }
}

// dispose() 示例
class DisposeExample extends StatefulWidget {
  @override
  _DisposeExampleState createState() => _DisposeExampleState();
}

class _DisposeExampleState extends State<DisposeExample> {
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
  void dispose() {
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

## 📖 生命周期最佳实践

### 1. 资源管理

```dart
// 资源管理最佳实践
class ResourceManagementBestPractices {
  /*
  资源管理最佳实践：
  
  1. 初始化资源
     - 在 initState() 中初始化
     - 使用 late 延迟初始化
     - 避免在 build() 中初始化
  
  2. 清理资源
     - 在 dispose() 中清理
     - 取消监听器
     - 关闭控制器
     - 取消定时器
  
  3. 避免内存泄漏
     - 不要在 dispose() 后调用 setState()
     - 检查 mounted 状态
     - 使用弱引用
  */
  
  void explain() {
    print('''
    资源管理最佳实践：
    
    1. 初始化资源
       - 在 initState() 中初始化
       - 使用 late 延迟初始化
       - 避免在 build() 中初始化
       - 使用构造函数传递配置
    
    2. 清理资源
       - 在 dispose() 中清理
       - 取消监听器
       - 关闭控制器
       - 取消定时器
       - 关闭流
    
    3. 避免内存泄漏
       - 不要在 dispose() 后调用 setState()
       - 检查 mounted 状态
       - 使用弱引用
       - 避免循环引用
    
    4. 常见资源：
       - TextEditingController
       - ScrollController
       - AnimationController
       - StreamSubscription
       - Timer
       - FocusNode
    
    资源清理清单：
    ✅ 控制器：dispose()
    ✅ 监听器：removeListener()
    ✅ 订阅：cancel()
    ✅ 定时器：cancel()
    ✅ 流：close()
    ✅ 焦点：dispose()
    ''');
  }
}
```

### 2. 状态管理

```dart
// 状态管理最佳实践
class StateManagementBestPractices {
  /*
  状态管理最佳实践：
  
  1. 局部状态
     - 使用 setState()
     - 状态只在当前 Widget 使用
     - 适用于简单状态
  
  2. 全局状态
     - 使用状态管理方案
     - 状态在多个 Widget 共享
     - 适用于复杂业务逻辑
  
  3. 状态提升
     - 将状态提升到父 Widget
     - 通过构造函数传递状态
     - 通过回调更新状态
  */
  
  void explain() {
    print('''
    状态管理最佳实践：
    
    1. 局部状态
       - 使用 setState()
       - 状态只在当前 Widget 使用
       - 适用于简单 UI 状态
       - 例如：开关状态、计数器
    
    2. 全局状态
       - 使用状态管理方案
       - 状态在多个 Widget 共享
       - 适用于复杂业务逻辑
       - 例如：用户信息、主题设置
    
    3. 状态提升
       - 将状态提升到共同父 Widget
       - 通过构造函数传递状态
       - 通过回调更新状态
       - 适用于兄弟 Widget 通信
    
    4. 状态管理方案：
       - Provider：简单易用
       - Bloc：响应式编程
       - Riverpod：类型安全
       - GetX：轻量级
       - Redux：状态容器
    
    选择建议：
    - 简单状态：setState()
    - 复杂应用：Bloc 或 Riverpod
    - 快速开发：GetX
    - 需要测试：Bloc 或 Riverpod
    ''');
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
  */
  
  void explain() {
    print('''
    生命周期调试：
    
    1. 添加日志
       - 在每个生命周期方法添加 print
       - 使用 debugPrint
       - 添加时间戳
       - 记录状态值
    
    2. 使用断点
       - 在生命周期方法设置断点
       - 观察调用顺序
       - 检查状态值
       - 分析执行流程
    
    3. 使用 DevTools
       - 查看 Widget 树
       - 监控状态变化
       - 分析性能
       - 检查内存使用
    
    调试技巧：
    - 使用 const 构造函数
    - 避免不必要的重建
    - 检查 mounted 状态
    - 使用 debugPrint 而不是 print
    ''');
  }
}

// 生命周期日志示例
class LifecycleLoggingExample extends StatefulWidget {
  @override
  _LifecycleLoggingExampleState createState() => _LifecycleLoggingExampleState();
}

class _LifecycleLoggingExampleState extends State<LifecycleLoggingExample> {
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
  void didUpdateWidget(covariant LifecycleLoggingExample oldWidget) {
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

### Widget 生命周期核心方法

| 阶段 | 方法 | 描述 | 调用次数 |
|------|------|------|----------|
| **创建** | createState() | 创建 State 对象 | 1 次 |
| **创建** | initState() | 初始化状态 | 1 次 |
| **依赖** | didChangeDependencies() | 依赖关系改变 | 多次 |
| **更新** | didUpdateWidget() | Widget 配置改变 | 多次 |
| **更新** | setState() | 更新状态 | 多次 |
| **更新** | build() | 构建 UI | 多次 |
| **销毁** | deactivate() | 从树中移除 | 多次 |
| **销毁** | dispose() | 永久移除 | 1 次 |

### 最佳实践总结

1. **初始化**：在 initState() 中初始化资源
2. **更新**：使用 setState() 更新状态
3. **销毁**：在 dispose() 中清理资源
4. **状态管理**：选择合适的状态管理方案
5. **性能优化**：避免不必要的重建

### 常见陷阱

1. **内存泄漏**：未在 dispose() 中清理资源
2. **状态不一致**：在 dispose() 后调用 setState()
3. **过度重建**：不必要的 setState() 调用
4. **资源未释放**：未取消监听器和订阅

### 下一步学习

- **Flutter 渲染原理**：理解渲染机制
- **状态管理**：学习高级状态管理
- **性能优化**：优化 Widget 性能

---

> 深入理解 Widget 的生命周期，掌握状态管理和 Widget 更新机制。这将帮助你编写更高效、更稳定的 Flutter 应用。