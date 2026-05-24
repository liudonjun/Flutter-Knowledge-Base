# 高级 Widget 详解

> 掌握 Flutter 高级 Widget，创建复杂和精美的用户界面。

## 🎯 高级布局 Widget

### 1. CustomScrollView
```dart
// CustomScrollView - 自定义滚动
CustomScrollView(
  slivers: [
    // 标题栏
    SliverAppBar(
      title: Text('自定义滚动'),
      floating: true,
      expandedHeight: 200,
      flexibleSpace: FlexibleSpaceBar(
        background: Image.network(
          'https://picsum.photos/400/200',
          fit: BoxFit.cover,
        ),
      ),
    ),
    
    // 网格
    SliverGrid(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
      ),
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return Card(
            child: Center(child: Text('项目 $index')),
          );
        },
        childCount: 20,
      ),
    ),
    
    // 列表
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return ListTile(title: Text('项目 $index'));
        },
        childCount: 50,
      ),
    ),
  ],
)
```

### 2. NestedScrollView
```dart
// NestedScrollView - 嵌套滚动
NestedScrollView(
  headerSliverBuilder: (context, innerBoxIsScrolled) {
    return [
      SliverAppBar(
        title: Text('嵌套滚动'),
        floating: true,
        expandedHeight: 200,
        flexibleSpace: FlexibleSpaceBar(
          background: Image.network(
            'https://picsum.photos/400/200',
            fit: BoxFit.cover,
          ),
        ),
      ),
    ];
  },
  body: TabBarView(
    children: [
      // 第一个标签页
      ListView.builder(
        itemCount: 50,
        itemBuilder: (context, index) {
          return ListTile(title: Text('标签1 项目 $index'));
        },
      ),
      // 第二个标签页
      GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
        ),
        itemCount: 50,
        itemBuilder: (context, index) {
          return Card(child: Center(child: Text('标签2 项目 $index')));
        },
      ),
    ],
  ),
)
```

### 3. Flow Widget
```dart
// Flow - 自定义布局
class FlowExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Flow(
      delegate: FlowDelegateExample(),
      children: [
        Container(width: 50, height: 50, color: Colors.red),
        Container(width: 50, height: 50, color: Colors.green),
        Container(width: 50, height: 50, color: Colors.blue),
        Container(width: 50, height: 50, color: Colors.yellow),
      ],
    );
  }
}

class FlowDelegateExample extends FlowDelegate {
  @override
  void paintChildren(FlowPaintingContext context) {
    // 自定义绘制逻辑
    for (int i = 0; i < context.childCount; i++) {
      context.paintChild(
        i,
        transform: Matrix4.translationValues(
          (i % 3) * 60.0,
          (i ~/ 3) * 60.0,
          0,
        ),
      );
    }
  }
  
  @override
  bool shouldRepaint(covariant FlowDelegate oldDelegate) => false;
}
```

## 🎨 高级交互 Widget

### 1. GestureDetector
```dart
// GestureDetector - 手势检测
GestureDetector(
  onTap: () {
    print('点击');
  },
  onDoubleTap: () {
    print('双击');
  },
  onLongPress: () {
    print('长按');
  },
  onPanUpdate: (details) {
    print('拖拽: ${details.delta}');
  },
  onScaleUpdate: (details) {
    print('缩放: ${details.scale}');
  },
  child: Container(
    width: 200,
    height: 200,
    color: Colors.blue,
    child: Center(
      child: Text('手势检测'),
    ),
  ),
)
```

### 2. Dismissible
```dart
// Dismissible - 可滑动删除
Dismissible(
  key: Key('item_1'),
  background: Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    padding: EdgeInsets.only(right: 20),
    child: Icon(Icons.delete, color: Colors.white),
  ),
  direction: DismissDirection.endToStart,
  onDismissed: (direction) {
    print('删除');
  },
  child: ListTile(
    title: Text('可滑动删除'),
    subtitle: Text('向左滑动删除'),
  ),
)
```

### 3. ReorderableListView
```dart
// ReorderableListView - 可拖拽排序
ReorderableListView(
  onReorder: (oldIndex, newIndex) {
    setState(() {
      if (oldIndex < newIndex) {
        newIndex -= 1;
      }
      final item = _items.removeAt(oldIndex);
      _items.insert(newIndex, item);
    });
  },
  children: [
    for (int i = 0; i < _items.length; i++)
      ListTile(
        key: ValueKey(_items[i]),
        title: Text(_items[i]),
        leading: Icon(Icons.drag_handle),
      ),
  ],
)
```

## 🎭 高级动画 Widget

### 1. AnimatedBuilder
```dart
// AnimatedBuilder - 动画构建器
class AnimationExample extends StatefulWidget {
  @override
  _AnimationExampleState createState() => _AnimationExampleState();
}

class _AnimationExampleState extends State<AnimationExample>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    );
    
    _animation = Tween<double>(begin: 0, end: 2 * pi).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Transform.rotate(
          angle: _animation.value,
          child: child,
        );
      },
      child: Icon(Icons.refresh, size: 50, color: Colors.blue),
    );
  }
}
```

### 2. Hero
```dart
// Hero - 页面转场动画
// 源页面
Hero(
  tag: 'hero-tag',
  child: Image.network(
    'https://picsum.photos/100',
    width: 100,
    height: 100,
  ),
)

// 目标页面
Hero(
  tag: 'hero-tag',
  child: Image.network(
    'https://picsum.photos/400',
    width: 400,
    height: 400,
  ),
)
```

### 3. TweenAnimationBuilder
```dart
// TweenAnimationBuilder - 补间动画构建器
TweenAnimationBuilder<double>(
  tween: Tween<double>(begin: 0, end: 1),
  duration: Duration(seconds: 2),
  builder: (context, value, child) {
    return Opacity(
      opacity: value,
      child: child,
    );
  },
  child: Text('渐变动画'),
)
```

## 🔧 高级容器 Widget

### 1. ConstrainedBox
```dart
// ConstrainedBox - 约束盒子
ConstrainedBox(
  constraints: BoxConstraints(
    minWidth: 100,
    maxWidth: 200,
    minHeight: 50,
    maxHeight: 100,
  ),
  child: Container(
    color: Colors.blue,
    child: Text('约束容器'),
  ),
)

// 松散约束
ConstrainedBox(
  constraints: BoxConstraints.loose(Size(200, 100)),
  child: Container(
    color: Colors.red,
    child: Text('松散约束'),
  ),
)
```

### 2. UnconstrainedBox
```dart
// UnconstrainedBox - 移除约束
UnconstrainedBox(
  child: Container(
    width: 300,
    height: 300,
    color: Colors.blue,
    child: Text('移除约束'),
  ),
)

// 限制方向
UnconstrainedBox(
  constrainedAxis: Axis.horizontal,
  child: Container(
    width: 300,
    height: 100,
    color: Colors.red,
    child: Text('只限制水平'),
  ),
)
```

### 3. OverflowBox
```dart
// OverflowBox - 允许溢出
OverflowBox(
  maxWidth: 300,
  maxHeight: 300,
  child: Container(
    width: 400,
    height: 400,
    color: Colors.blue,
    child: Text('允许溢出'),
  ),
)

// 对齐溢出
OverflowBox(
  alignment: Alignment.topLeft,
  child: Container(
    width: 200,
    height: 200,
    color: Colors.red,
    child: Text('左上角溢出'),
  ),
)
```

## 🎯 高级列表 Widget

### 1. SliverList
```dart
// SliverList - 银行列表
SliverList(
  delegate: SliverChildBuilderDelegate(
    (context, index) {
      return ListTile(title: Text('项目 $index'));
    },
    childCount: 100,
  ),
)

// SliverFixedExtentList
SliverFixedExtentList(
  itemExtent: 50,
  delegate: SliverChildBuilderDelegate(
    (context, index) {
      return Container(
        color: index.isEven ? Colors.grey[200] : Colors.white,
        child: Center(child: Text('项目 $index')),
      );
    },
    childCount: 100,
  ),
)
```

### 2. SliverGrid
```dart
// SliverGrid - 银行网格
SliverGrid(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 1.5,
  ),
  delegate: SliverChildBuilderDelegate(
    (context, index) {
      return Card(
        child: Center(child: Text('项目 $index')),
      );
    },
    childCount: 50,
  ),
)

// SliverGrid.extent
SliverGrid.extent(
  maxCrossAxisExtent: 200,
  children: [
    Container(color: Colors.red),
    Container(color: Colors.green),
    Container(color: Colors.blue),
  ],
)
```

### 3. SliverAppBar
```dart
// SliverAppBar - 银行应用栏
SliverAppBar(
  title: Text('标题'),
  floating: true,
  pinned: true,
  expandedHeight: 200,
  flexibleSpace: FlexibleSpaceBar(
    title: Text('弹性标题'),
    background: Image.network(
      'https://picsum.photos/400/200',
      fit: BoxFit.cover,
    ),
  ),
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {},
    ),
  ],
)
```

## 🎨 高级绘制 Widget

### 1. CustomPaint
```dart
// CustomPaint - 自定义绘制
CustomPaint(
  painter: MyPainter(),
  size: Size(300, 300),
)

class MyPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      50,
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
```

### 2. ClipRRect
```dart
// ClipRRect - 圆角裁剪
ClipRRect(
  borderRadius: BorderRadius.circular(20),
  child: Image.network(
    'https://picsum.photos/200',
    width: 200,
    height: 200,
  ),
)

// ClipOval - 椭圆裁剪
ClipOval(
  child: Image.network(
    'https://picsum.photos/200',
    width: 200,
    height: 200,
  ),
)

// ClipPath - 路径裁剪
ClipPath(
  clipper: MyClipper(),
  child: Container(
    width: 200,
    height: 200,
    color: Colors.blue,
  ),
)

class MyClipper extends CustomClipper<Path> {
  @override
  Path getClip(Size size) {
    final path = Path();
    path.moveTo(size.width / 2, 0);
    path.lineTo(size.width, size.height);
    path.lineTo(0, size.height);
    path.close();
    return path;
  }
  
  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) => false;
}
```

## 🔄 高级状态 Widget

### 1. InheritedWidget
```dart
// InheritedWidget - 数据共享
class CounterInheritedWidget extends InheritedWidget {
  final int count;
  final VoidCallback increment;
  
  const CounterInheritedWidget({
    Key? key,
    required this.count,
    required this.increment,
    required Widget child,
  }) : super(key: key, child: child);
  
  static CounterInheritedWidget? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CounterInheritedWidget>();
  }
  
  @override
  bool updateShouldNotify(CounterInheritedWidget oldWidget) {
    return count != oldWidget.count;
  }
}

// 使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final inherited = CounterInheritedWidget.of(context);
    return Column(
      children: [
        Text('计数: ${inherited?.count}'),
        ElevatedButton(
          onPressed: inherited?.increment,
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

### 2. Builder
```dart
// Builder - 获取上下文
Builder(
  builder: (context) {
    return ElevatedButton(
      onPressed: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('点击了按钮')),
        );
      },
      child: Text('显示 SnackBar'),
    );
  },
)

// LayoutBuilder - 布局构建器
LayoutBuilder(
  builder: (context, constraints) {
    if (constraints.maxWidth < 600) {
      return _buildMobileLayout();
    } else {
      return _buildDesktopLayout();
    }
  },
)
```

### 3. OrientationBuilder
```dart
// OrientationBuilder - 方向构建器
OrientationBuilder(
  builder: (context, orientation) {
    if (orientation == Orientation.portrait) {
      return _buildPortraitLayout();
    } else {
      return _buildLandscapeLayout();
    }
  },
)
```

## 🎯 高级交互 Widget

### 1. Tooltip
```dart
// Tooltip - 工具提示
Tooltip(
  message: '这是一个工具提示',
  child: Icon(Icons.info),
  preferBelow: false,
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(8),
  ),
  textStyle: TextStyle(color: Colors.white),
)
```

### 2. PopupMenuButton
```dart
// PopupMenuButton - 弹出菜单
PopupMenuButton<String>(
  onSelected: (value) {
    print('选择: $value');
  },
  itemBuilder: (context) => [
    PopupMenuItem(
      value: 'edit',
      child: Text('编辑'),
    ),
    PopupMenuItem(
      value: 'delete',
      child: Text('删除'),
    ),
    PopupMenuItem(
      value: 'share',
      child: Text('分享'),
    ),
  ],
  child: Icon(Icons.more_vert),
)
```

### 3. DropdownButton
```dart
// DropdownButton - 下拉按钮
DropdownButton<String>(
  value: '选项1',
  items: [
    DropdownMenuItem(value: '选项1', child: Text('选项1')),
    DropdownMenuItem(value: '选项2', child: Text('选项2')),
    DropdownMenuItem(value: '选项3', child: Text('选项3')),
  ],
  onChanged: (value) {
    print('选择: $value');
  },
)
```

## 🎨 高级主题 Widget

### 1. Theme
```dart
// Theme - 主题
Theme(
  data: ThemeData(
    primarySwatch: Colors.blue,
    textTheme: TextTheme(
      bodyLarge: TextStyle(color: Colors.red),
    ),
  ),
  child: Text('自定义主题'),
)
```

### 2. MediaQuery
```dart
// MediaQuery - 媒体查询
MediaQuery(
  data: MediaQueryData(
    textScaleFactor: 1.5,
  ),
  child: Text('放大文本'),
)

// 获取屏幕尺寸
final screenWidth = MediaQuery.of(context).size.width;
final screenHeight = MediaQuery.of(context).size.height;
final orientation = MediaQuery.of(context).orientation;
```

### 3. SafeArea
```dart
// SafeArea - 安全区域
SafeArea(
  child: Column(
    children: [
      // 内容会避开状态栏和底部安全区域
    ],
  ),
)

// 限制方向
SafeArea(
  top: true,
  bottom: false,
  left: false,
  right: false,
  child: Container(),
)
```

## 🚀 性能优化 Widget

### 1. RepaintBoundary
```dart
// RepaintBoundary - 重绘边界
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)
```

### 2. AutomaticKeepAlive
```dart
// AutomaticKeepAlive - 自动保持活跃
class KeepAliveWidget extends StatefulWidget {
  @override
  _KeepAliveWidgetState createState() => _KeepAliveWidgetState();
}

class _KeepAliveWidgetState extends State<KeepAliveWidget>
    with AutomaticKeepAliveClientMixin {
  @override
  bool get wantKeepAlive => true;
  
  @override
  Widget build(BuildContext context) {
    super.build(context);
    return Container();
  }
}
```

### 3. Visibility
```dart
// Visibility - 可见性控制
Visibility(
  visible: true,
  child: Text('可见'),
  replacement: Text('隐藏'),
  maintainState: true,
  maintainAnimation: true,
  maintainSize: true,
)
```

## 📚 最佳实践

### 1. 高级 Widget 选择
```dart
// 根据需求选择高级 Widget
// 1. 复杂滚动: CustomScrollView, NestedScrollView
// 2. 自定义布局: Flow, CustomMultiChildLayout
// 3. 复杂动画: AnimatedBuilder, TweenAnimationBuilder
// 4. 自定义绘制: CustomPaint, ClipPath
// 5. 数据共享: InheritedWidget, Provider
```

### 2. 性能考虑
```dart
// 1. 使用 const Widget
const myWidget = const Text('Hello');

// 2. 使用 RepaintBoundary
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)

// 3. 避免在 build 中创建新对象
class OptimizedWidget extends StatelessWidget {
  final List<String> items = const ['A', 'B', 'C'];
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Text(items[index]);
      },
    );
  }
}
```

## 📚 学习资源

### 官方文档
- [Flutter Widget 目录](https://flutter.dev/docs/development/ui/widgets)
- [高级 Widget 文档](https://flutter.dev/docs/development/ui/advanced)
- [自定义绘制](https://flutter.dev/docs/development/ui/advanced/custom-paint)

### 示例项目
- [高级 Widget 示例](https://github.com/niclin/flutter-advanced-widgets)
- [自定义绘制示例](https://github.com/niclin/flutter-custom-paint-examples)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Widget 系统详解]] - Widget 系统详解

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[布局系统详解]] - 布局系统详解
- [[自定义绘制详解]] - 自定义绘制详解

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*