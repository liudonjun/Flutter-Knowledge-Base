# UI 设计与动画

> UI 设计和动画实现是提升用户体验的关键，掌握 Flutter UI 与动画技术能创建出色的应用。

## 🎨 UI 设计基础

### 1. Material Design
```dart
// Material 主题配置
MaterialApp(
  theme: ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.light,
    visualDensity: VisualDensity.adaptivePlatformDensity,
  ),
  darkTheme: ThemeData(
    primarySwatch: Colors.blue,
    brightness: Brightness.dark,
  ),
  home: MyHomePage(),
)
```

### 2. Cupertino 设计 (iOS 风格)
```dart
// Cupertino 主题配置
CupertinoApp(
  theme: CupertinoThemeData(
    primaryColor: CupertinoColors.systemBlue,
    brightness: Brightness.light,
    textTheme: CupertinoTextThemeData(
      primaryColor: CupertinoColors.systemBlue,
    ),
  ),
  home: MyHomePage(),
)
```

## 🎭 基础动画

### 1. 隐式动画
```dart
// AnimatedContainer
class AnimatedContainerExample extends StatefulWidget {
  @override
  _AnimatedContainerExampleState createState() => _AnimatedContainerExampleState();
}

class _AnimatedContainerExampleState extends State<AnimatedContainerExample> {
  bool _isExpanded = false;
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _isExpanded = !_isExpanded;
        });
      },
      child: AnimatedContainer(
        duration: Duration(milliseconds: 300),
        curve: Curves.easeInOut,
        width: _isExpanded ? 200 : 100,
        height: _isExpanded ? 200 : 100,
        color: _isExpanded ? Colors.blue : Colors.red,
        child: Center(
          child: Text(
            '点击我',
            style: TextStyle(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
```

### 2. 显式动画
```dart
// AnimationController
class ExplicitAnimationExample extends StatefulWidget {
  @override
  _ExplicitAnimationExampleState createState() => _ExplicitAnimationExampleState();
}

class _ExplicitAnimationExampleState extends State<ExplicitAnimationExample>
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
  
  void _startAnimation() {
    _controller.repeat();
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.rotate(
              angle: _animation.value,
              child: child,
            );
          },
          child: Icon(Icons.refresh, size: 50),
        ),
        ElevatedButton(
          onPressed: _startAnimation,
          child: Text('开始旋转'),
        ),
      ],
    );
  }
}
```

## 🎨 高级动画

### 1. Hero 动画
```dart
// 源页面
class SourcePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('源页面')),
      body: Center(
        child: GestureDetector(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => DetailPage()),
            );
          },
          child: Hero(
            tag: 'hero-tag',
            child: Image.network(
              'https://picsum.photos/200',
              width: 100,
              height: 100,
            ),
          ),
        ),
      ),
    );
  }
}

// 目标页面
class DetailPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('详情页面')),
      body: Center(
        child: Hero(
          tag: 'hero-tag',
          child: Image.network(
            'https://picsum.photos/400',
            width: 300,
            height: 300,
          ),
        ),
      ),
    );
  }
}
```

### 2. 物理动画
```dart
// 弹簧动画
class SpringAnimationExample extends StatefulWidget {
  @override
  _SpringAnimationExampleState createState() => _SpringAnimationExampleState();
}

class _SpringAnimationExampleState extends State<SpringAnimationExample>
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
    
    _animation = SpringSimulation(
      SpringDescription.withDampingRatio(
        mass: 1.0,
        stiffness: 100.0,
        ratio: 0.5,
      ),
      0.0,
      1.0,
      0.0,
    ).animate(_controller);
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  void _startAnimation() {
    _controller.forward(from: 0.0);
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedBuilder(
          animation: _animation,
          builder: (context, child) {
            return Transform.translate(
              offset: Offset(0, _animation.value * 100),
              child: child,
            );
          },
          child: Icon(Icons.star, size: 50),
        ),
        ElevatedButton(
          onPressed: _startAnimation,
          child: Text('开始弹跳'),
        ),
      ],
    );
  }
}
```

## 🖌️ 自定义绘制

### 1. Canvas 绘制
```dart
class CustomPainterExample extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.fill;
    
    // 绘制圆形
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      50,
      paint,
    );
    
    // 绘制矩形
    paint.color = Colors.red;
    canvas.drawRect(
      Rect.fromLTWH(50, 50, 100, 100),
      paint,
    );
    
    // 绘制线条
    paint.color = Colors.green;
    paint.strokeWidth = 5;
    paint.style = PaintingStyle.stroke;
    canvas.drawLine(
      Offset(0, 0),
      Offset(size.width, size.height),
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

// 使用 CustomPaint
CustomPaint(
  painter: CustomPainterExample(),
  size: Size(200, 200),
)
```

### 2. 路径绘制
```dart
class PathPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.blue
      ..style = PaintingStyle.stroke
      ..strokeWidth = 5;
    
    final path = Path();
    
    // 绘制心形
    path.moveTo(size.width / 2, size.height / 5);
    path.cubicTo(
      size.width / 2, size.height / 5,
      size.width / 2 + size.width / 4, 0,
      size.width / 2 + size.width / 4, size.height / 5,
    );
    path.cubicTo(
      size.width / 2 + size.width / 4, size.height / 5,
      size.width, size.height / 2,
      size.width / 2, size.height,
    );
    path.cubicTo(
      size.width / 2, size.height,
      0, size.height / 2,
      size.width / 2 - size.width / 4, size.height / 5,
    );
    path.cubicTo(
      size.width / 2 - size.width / 4, size.height / 5,
      size.width / 2, size.height / 5,
      size.width / 2, size.height / 5,
    );
    
    canvas.drawPath(path, paint);
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
```

## 🎯 手势交互

### 1. 基础手势
```dart
class GestureDetectorExample extends StatefulWidget {
  @override
  _GestureDetectorExampleState createState() => _GestureDetectorExampleState();
}

class _GestureDetectorExampleState extends State<GestureDetectorExample> {
  Offset _position = Offset.zero;
  double _scale = 1.0;
  double _rotation = 0.0;
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onPanUpdate: (details) {
        setState(() {
          _position += details.delta;
        });
      },
      onScaleUpdate: (details) {
        setState(() {
          _scale = details.scale;
          _rotation = details.rotation;
        });
      },
      child: Transform.translate(
        offset: _position,
        child: Transform.scale(
          scale: _scale,
          child: Transform.rotate(
            angle: _rotation,
            child: Container(
              width: 100,
              height: 100,
              color: Colors.blue,
              child: Center(
                child: Text(
                  '拖拽我',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```

### 2. 滑动操作
```dart
class SwipeExample extends StatefulWidget {
  @override
  _SwipeExampleState createState() => _SwipeExampleState();
}

class _SwipeExampleState extends State<SwipeExample> {
  final List<String> _items = List.generate(20, (index) => '项目 $index');
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: _items.length,
      itemBuilder: (context, index) {
        return Dismissible(
          key: Key(_items[index]),
          background: Container(
            color: Colors.red,
            alignment: Alignment.centerRight,
            padding: EdgeInsets.only(right: 20),
            child: Icon(Icons.delete, color: Colors.white),
          ),
          onDismissed: (direction) {
            setState(() {
              _items.removeAt(index);
            });
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('已删除 ${_items[index]}')),
            );
          },
          child: ListTile(
            title: Text(_items[index]),
            subtitle: Text('向左滑动删除'),
          ),
        );
      },
    );
  }
}
```

## 📱 响应式设计

### 1. 媒体查询
```dart
class ResponsiveExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final mediaQuery = MediaQuery.of(context);
    final screenWidth = mediaQuery.size.width;
    final screenHeight = mediaQuery.size.height;
    final orientation = mediaQuery.orientation;
    
    return Scaffold(
      appBar: AppBar(title: Text('响应式设计')),
      body: orientation == Orientation.portrait
          ? _buildPortraitLayout(screenWidth, screenHeight)
          : _buildLandscapeLayout(screenWidth, screenHeight),
    );
  }
  
  Widget _buildPortraitLayout(double width, double height) {
    return Column(
      children: [
        Container(
          height: height * 0.3,
          color: Colors.blue,
          child: Center(child: Text('顶部区域')),
        ),
        Expanded(
          child: Container(
            color: Colors.green,
            child: Center(child: Text('内容区域')),
          ),
        ),
      ],
    );
  }
  
  Widget _buildLandscapeLayout(double width, double height) {
    return Row(
      children: [
        Container(
          width: width * 0.3,
          color: Colors.blue,
          child: Center(child: Text('侧边栏')),
        ),
        Expanded(
          child: Container(
            color: Colors.green,
            child: Center(child: Text('内容区域')),
          ),
        ),
      ],
    );
  }
}
```

### 2. 布局构建器
```dart
class LayoutBuilderExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 600) {
          return _buildMobileLayout();
        } else if (constraints.maxWidth < 1200) {
          return _buildTabletLayout();
        } else {
          return _buildDesktopLayout();
        }
      },
    );
  }
  
  Widget _buildMobileLayout() {
    return ListView(
      children: [
        _buildItem('项目 1'),
        _buildItem('项目 2'),
        _buildItem('项目 3'),
      ],
    );
  }
  
  Widget _buildTabletLayout() {
    return GridView.count(
      crossAxisCount: 2,
      children: [
        _buildItem('项目 1'),
        _buildItem('项目 2'),
        _buildItem('项目 3'),
        _buildItem('项目 4'),
      ],
    );
  }
  
  Widget _buildDesktopLayout() {
    return GridView.count(
      crossAxisCount: 4,
      children: [
        _buildItem('项目 1'),
        _buildItem('项目 2'),
        _buildItem('项目 3'),
        _buildItem('项目 4'),
        _buildItem('项目 5'),
        _buildItem('项目 6'),
        _buildItem('项目 7'),
        _buildItem('项目 8'),
      ],
    );
  }
  
  Widget _buildItem(String title) {
    return Card(
      child: Center(child: Text(title)),
    );
  }
}
```

## 🚀 性能优化

### 1. 动画性能
```dart
// 使用 const Widget
const MyAnimatedWidget = const Icon(Icons.star);

// 使用 AnimatedBuilder 而不是 AnimatedWidget
AnimatedBuilder(
  animation: _animation,
  builder: (context, child) {
    return Transform.rotate(
      angle: _animation.value,
      child: child, // 使用传入的 child
    );
  },
  child: const Icon(Icons.star), // 使用 const
)

// 避免在动画中重建整个 Widget 树
class OptimizedAnimation extends StatefulWidget {
  @override
  _OptimizedAnimationState createState() => _OptimizedAnimationState();
}

class _OptimizedAnimationState extends State<OptimizedAnimation>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 1),
      vsync: this,
    );
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        // 只重建需要动画的部分
        return Transform.rotate(
          angle: _controller.value * 2 * pi,
          child: child,
        );
      },
      child: const Icon(Icons.star, size: 50), // 使用 const
    );
  }
}
```

### 2. 渲染优化
```dart
// 使用 RepaintBoundary 隔离绘制区域
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)

// 使用 Offstage 隐藏不需要的 Widget
Offstage(
  offstage: !_isVisible,
  child: MyWidget(),
)

// 使用 Visibility 控制可见性
Visibility(
  visible: _isVisible,
  child: MyWidget(),
)
```

## 📚 学习资源

- [Flutter UI 官方文档](https://flutter.dev/docs/development/ui)
- [动画官方文档](https://flutter.dev/docs/development/ui/animations)
- [自定义绘制文档](https://flutter.dev/docs/development/ui/advanced/custom-paint)
- [Material Design 指南](https://material.io/design)

## 🔗 相关链接

- [[Widget 系统]] - Widget 系统
- [[状态管理]] - 状态管理
- [[导航与路由]] - 导航与路由
- [[架构概览]] - Flutter 架构

---
*最后更新: 2026年5月23日*