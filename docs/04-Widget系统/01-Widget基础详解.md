# Widget 基础详解

> Widget 是 Flutter 的核心概念，掌握 Widget 是 Flutter 开发的关键。

## 🎯 Widget 基础概念

### 1. 什么是 Widget
```dart
// Widget 是 Flutter UI 的基本构建块
// 所有 UI 元素都是 Widget

// 基本 Widget 示例
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello Flutter'),
    );
  }
}
```

### 2. Widget 类型
```dart
// StatelessWidget - 无状态 Widget
class MyStatelessWidget extends StatelessWidget {
  final String title;
  
  const MyStatelessWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(title);
  }
}

// StatefulWidget - 有状态 Widget
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);
  
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _counter = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
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
}
```

## 📦 常用基础 Widget

### 1. Text Widget
```dart
// 基本文本
Text('Hello Flutter')

// 带样式的文本
Text(
  'Flutter 文本',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 2.0,
    wordSpacing: 5.0,
    decoration: TextDecoration.underline,
    decorationColor: Colors.red,
    decorationStyle: TextDecorationStyle.dashed,
  ),
)

// 文本对齐
Text(
  '居中对齐的文本',
  textAlign: TextAlign.center,
)

// 文本溢出处理
Text(
  '这是一段很长的文本，可能会超出容器宽度',
  overflow: TextOverflow.ellipsis, // 显示省略号
  maxLines: 2, // 最多显示2行
  softWrap: true, // 自动换行
)

// 富文本
RichText(
  text: TextSpan(
    text: 'Hello ',
    style: TextStyle(color: Colors.black, fontSize: 18),
    children: [
      TextSpan(
        text: 'Flutter',
        style: TextStyle(
          color: Colors.blue,
          fontWeight: FontWeight.bold,
        ),
      ),
      TextSpan(
        text: ' World!',
        style: TextStyle(
          color: Colors.red,
          fontStyle: FontStyle.italic,
        ),
      ),
    ],
  ),
)
```

### 2. Button Widget
```dart
// ElevatedButton - 凸起按钮
ElevatedButton(
  onPressed: () {
    print('按钮被点击');
  },
  child: Text('凸起按钮'),
  style: ElevatedButton.styleFrom(
    primary: Colors.blue, // 背景色
    onPrimary: Colors.white, // 文字色
    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10),
    ),
  ),
)

// TextButton - 文本按钮
TextButton(
  onPressed: () {
    print('文本按钮被点击');
  },
  child: Text('文本按钮'),
  style: TextButton.styleFrom(
    primary: Colors.blue,
    textStyle: TextStyle(fontSize: 16),
  ),
)

// OutlinedButton - 边框按钮
OutlinedButton(
  onPressed: () {
    print('边框按钮被点击');
  },
  child: Text('边框按钮'),
  style: OutlinedButton.styleFrom(
    primary: Colors.blue,
    side: BorderSide(color: Colors.blue, width: 2),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
)

// IconButton - 图标按钮
IconButton(
  onPressed: () {
    print('图标按钮被点击');
  },
  icon: Icon(Icons.favorite),
  color: Colors.red,
  iconSize: 30,
)

// FloatingActionButton - 悬浮操作按钮
FloatingActionButton(
  onPressed: () {
    print('悬浮按钮被点击');
  },
  child: Icon(Icons.add),
  backgroundColor: Colors.blue,
  foregroundColor: Colors.white,
)
```

### 3. Image Widget
```dart
// 网络图片
Image.network(
  'https://picsum.photos/200/300',
  width: 200,
  height: 300,
  fit: BoxFit.cover, // 图片填充方式
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
  errorBuilder: (context, error, stackTrace) {
    return Icon(Icons.error, size: 50);
  },
)

// 本地图片
Image.asset(
  'assets/images/logo.png',
  width: 100,
  height: 100,
)

// 文件图片
Image.file(
  File('/path/to/image.jpg'),
  width: 200,
  height: 200,
)

// 内存图片
Image.memory(
  Uint8List.fromList([/* 图片字节数据 */]),
  width: 100,
  height: 100,
)
```

### 4. Icon Widget
```dart
// 基本图标
Icon(Icons.star)

// 带样式的图标
Icon(
  Icons.favorite,
  size: 30,
  color: Colors.red,
)

// 自定义图标
Icon(
  IconData(0xe900, fontFamily: 'CustomIcons'),
  size: 24,
  color: Colors.blue,
)
```

## 🎨 容器 Widget

### 1. Container Widget
```dart
// 基本容器
Container(
  width: 200,
  height: 200,
  color: Colors.blue,
)

// 带内边距的容器
Container(
  padding: EdgeInsets.all(20),
  margin: EdgeInsets.all(10),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(10),
    boxShadow: [
      BoxShadow(
        color: Colors.grey.withOpacity(0.5),
        spreadRadius: 2,
        blurRadius: 5,
        offset: Offset(0, 3),
      ),
    ],
  ),
  child: Text('带样式的容器'),
)

// 渐变容器
Container(
  width: 200,
  height: 100,
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [Colors.blue, Colors.green],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
    borderRadius: BorderRadius.circular(10),
  ),
  child: Center(
    child: Text(
      '渐变容器',
      style: TextStyle(color: Colors.white, fontSize: 18),
    ),
  ),
)
```

### 2. Padding Widget
```dart
// 基本内边距
Padding(
  padding: EdgeInsets.all(16),
  child: Text('带内边距的文本'),
)

// 不同方向的内边距
Padding(
  padding: EdgeInsets.only(left: 20, top: 10, right: 20, bottom: 10),
  child: Text('自定义内边距'),
)

// 对称内边距
Padding(
  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
  child: Text('对称内边距'),
)
```

### 3. Center Widget
```dart
// 居中对齐
Center(
  child: Text('居中的文本'),
)

// 居中容器
Center(
  child: Container(
    width: 100,
    height: 100,
    color: Colors.blue,
  ),
)
```

### 4. SizedBox Widget
```dart
// 固定尺寸
SizedBox(
  width: 200,
  height: 100,
  child: Text('固定尺寸'),
)

// 间距
SizedBox(height: 20), // 垂直间距
SizedBox(width: 10),  // 水平间距

// 强制尺寸
SizedBox.expand(
  child: Text('填充整个可用空间'),
)

SizedBox.shrink(
  child: Text('最小尺寸'),
)
```

## 📊 布局 Widget

### 1. Row Widget (水平布局)
```dart
// 基本水平布局
Row(
  children: [
    Icon(Icons.star),
    Text('评分'),
    Icon(Icons.star),
  ],
)

// 主轴对齐
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 交叉轴对齐
Row(
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 100, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 弹性布局
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red, height: 50),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.green, height: 50),
    ),
    Expanded(
      flex: 3,
      child: Container(color: Colors.blue, height: 50),
    ),
  ],
)
```

### 2. Column Widget (垂直布局)
```dart
// 基本垂直布局
Column(
  children: [
    Text('标题'),
    Text('副标题'),
    Text('内容'),
  ],
)

// 主轴对齐
Column(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 交叉轴对齐
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 100, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 弹性布局
Column(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red, width: 50),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.green, width: 50),
    ),
    Expanded(
      flex: 3,
      child: Container(color: Colors.blue, width: 50),
    ),
  ],
)
```

### 3. Stack Widget (层叠布局)
```dart
// 基本层叠布局
Stack(
  children: [
    Container(width: 200, height: 200, color: Colors.red),
    Container(width: 150, height: 150, color: Colors.green),
    Container(width: 100, height: 100, color: Colors.blue),
  ],
)

// 定位层叠
Stack(
  children: [
    Container(width: 200, height: 200, color: Colors.red),
    Positioned(
      top: 20,
      left: 20,
      child: Container(width: 100, height: 100, color: Colors.green),
    ),
    Positioned(
      bottom: 20,
      right: 20,
      child: Container(width: 100, height: 100, color: Colors.blue),
    ),
  ],
)

// 对齐层叠
Stack(
  alignment: Alignment.center,
  children: [
    Container(width: 200, height: 200, color: Colors.red),
    Container(width: 100, height: 100, color: Colors.green),
    Text('居中'),
  ],
)
```

### 4. Flex Widget (弹性布局)
```dart
// 基本弹性布局
Flex(
  direction: Axis.horizontal,
  children: [
    Expanded(
      flex: 1,
      child: Container(height: 50, color: Colors.red),
    ),
    Expanded(
      flex: 2,
      child: Container(height: 50, color: Colors.green),
    ),
    Expanded(
      flex: 1,
      child: Container(height: 50, color: Colors.blue),
    ),
  ],
)

// 垂直弹性布局
Flex(
  direction: Axis.vertical,
  children: [
    Expanded(
      flex: 1,
      child: Container(width: 50, color: Colors.red),
    ),
    Expanded(
      flex: 2,
      child: Container(width: 50, color: Colors.green),
    ),
    Expanded(
      flex: 1,
      child: Container(width: 50, color: Colors.blue),
    ),
  ],
)
```

## 🔄 列表 Widget

### 1. ListView Widget
```dart
// 基本列表
ListView(
  children: [
    ListTile(title: Text('项目1')),
    ListTile(title: Text('项目2')),
    ListTile(title: Text('项目3')),
  ],
)

// 构建器列表
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('项目 $index'),
      subtitle: Text('这是第 $index 个项目'),
      leading: Icon(Icons.star),
      trailing: Icon(Icons.arrow_forward),
    );
  },
)

// 分隔符列表
ListView.separated(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
  separatorBuilder: (context, index) {
    return Divider();
  },
)
```

### 2. GridView Widget
```dart
// 网格列表
GridView.count(
  crossAxisCount: 2,
  children: [
    Container(color: Colors.red),
    Container(color: Colors.green),
    Container(color: Colors.blue),
    Container(color: Colors.yellow),
  ],
)

// 构建器网格
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 1.5,
  ),
  itemCount: 100,
  itemBuilder: (context, index) {
    return Card(
      child: Center(child: Text('项目 $index')),
    );
  },
)

// 动态网格
GridView.extent(
  maxCrossAxisExtent: 200,
  children: [
    Container(color: Colors.red),
    Container(color: Colors.green),
    Container(color: Colors.blue),
  ],
)
```

## 🎯 状态 Widget

### 1. StatefulWidget 生命周期
```dart
class LifecycleWidget extends StatefulWidget {
  const LifecycleWidget({Key? key}) : super(key: key);
  
  @override
  _LifecycleWidgetState createState() => _LifecycleWidgetState();
}

class _LifecycleWidgetState extends State<LifecycleWidget> {
  int _counter = 0;
  
  // 1. 初始化状态
  @override
  void initState() {
    super.initState();
    print('initState: 初始化状态');
  }
  
  // 2. 依赖变化
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies: 依赖变化');
  }
  
  // 3. 构建 UI
  @override
  Widget build(BuildContext context) {
    print('build: 构建 UI');
    return Column(
      children: [
        Text('计数: $_counter'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter++;
              print('setState: 状态更新');
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
  
  // 4. 状态更新
  @override
  void didUpdateWidget(LifecycleWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget: Widget 更新');
  }
  
  // 5. 清理资源
  @override
  void dispose() {
    print('dispose: 清理资源');
    super.dispose();
  }
}
```

### 2. 状态管理基础
```dart
// 简单状态管理
class CounterState {
  final int count;
  
  CounterState(this.count);
  
  CounterState copyWith({int? count}) {
    return CounterState(count ?? this.count);
  }
}

class CounterNotifier extends ChangeNotifier {
  CounterState _state = CounterState(0);
  
  CounterState get state => _state;
  
  void increment() {
    _state = _state.copyWith(count: _state.count + 1);
    notifyListeners();
  }
  
  void decrement() {
    _state = _state.copyWith(count: _state.count - 1);
    notifyListeners();
  }
}

// 使用状态管理
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => CounterNotifier(),
      child: Consumer<CounterNotifier>(
        builder: (context, counter, child) {
          return Column(
            children: [
              Text('计数: ${counter.state.count}'),
              ElevatedButton(
                onPressed: counter.increment,
                child: Text('增加'),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

## 🔧 Widget 调试

### 1. Flutter Inspector
```dart
// 使用 Flutter Inspector
// 1. 打开 Android Studio 或 VS Code
// 2. 运行应用
// 3. 打开 Flutter Inspector
// 4. 查看 Widget 树
// 5. 检查布局约束

// 调试 Widget
class DebugWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // 打印 Widget 信息
    debugPrint('构建 DebugWidget');
    
    // 使用 debug 模式
    if (kDebugMode) {
      print('调试信息');
    }
    
    return Container(
      child: Text('调试 Widget'),
    );
  }
}
```

### 2. 常见问题调试
```dart
// 布局溢出调试
class OverflowDebug extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      child: Text(
        '这是一段很长的文本，可能会导致布局溢出',
        overflow: TextOverflow.ellipsis,
        maxLines: 1,
      ),
    );
  }
}

// 状态调试
class StateDebug extends StatefulWidget {
  @override
  _StateDebugState createState() => _StateDebugState();
}

class _StateDebugState extends State<StateDebug> {
  int _count = 0;
  
  @override
  Widget build(BuildContext context) {
    debugPrint('当前计数: $_count');
    
    return Column(
      children: [
        Text('计数: $_count'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _count++;
              debugPrint('计数增加到: $_count');
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

## 📚 最佳实践

### 1. Widget 设计原则
```dart
// 保持 Widget 简单
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
  
  Widget _buildHeader() => Text('标题');
  Widget _buildContent() => Text('内容');
  Widget _buildFooter() => Text('页脚');
}

// 使用 const 构造函数
class ConstWidget extends StatelessWidget {
  const ConstWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return const Text('Const Widget');
  }
}

// 避免不必要的重建
class OptimizedWidget extends StatelessWidget {
  final String title;
  
  const OptimizedWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(title),
    );
  }
}
```

### 2. 性能优化
```dart
// 使用 const Widget
const myWidget = const Text('Hello');

// 使用 ListView.builder 而不是 ListView
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
)

// 使用 RepaintBoundary
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)
```

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Dart 语言]] - Dart 语言

### 指南
- [[状态管理]] - 状态管理方案
- [[导航与路由]] - 导航与路由系统
- [[UI 设计与动画]] - UI 设计与动画

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*