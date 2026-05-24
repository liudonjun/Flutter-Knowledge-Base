# 自定义 Widget 详解

> 掌握如何创建自定义 Widget，包括组合、继承、绘制等高级技巧。

## 📖 自定义 Widget 基础

### 1. 自定义 Widget 类型

```dart
// 自定义 Widget 类型
class CustomWidgetTypes {
  /*
  自定义 Widget 类型：
  
  1. 组合 Widget
     - 组合现有 Widget
     - 简单易用
     - 推荐使用
  
  2. 继承 Widget
     - 继承现有 Widget
     - 扩展功能
     - 需要理解生命周期
  
  3. 绘制 Widget
     - 自定义绘制
     - 高性能
     - 复杂图形
  
  4. 渲染对象 Widget
     - 自定义布局
     - 自定义绘制
     - 最底层控制
  */
  
  void explain() {
    print('''
    自定义 Widget 类型：
    
    1. 组合 Widget
       - 组合现有 Widget
       - 简单易用
       - 推荐使用
       - 适合大多数场景
    
    2. 继承 Widget
       - 继承现有 Widget
       - 扩展功能
       - 需要理解生命周期
       - 适合扩展功能
    
    3. 绘制 Widget
       - 自定义绘制
       - 高性能
       - 复杂图形
       - 适合复杂图形
    
    4. 渲染对象 Widget
       - 自定义布局
       - 自定义绘制
       - 最底层控制
       - 适合特殊布局
    
    选择建议：
    - 简单组合：使用组合 Widget
    - 扩展功能：使用继承 Widget
    - 复杂图形：使用绘制 Widget
    - 特殊布局：使用渲染对象 Widget
    ''');
  }
}
```

### 2. 组合 Widget

```dart
// 组合 Widget
class CompositionWidget {
  /*
  组合 Widget：
  
  1. 功能
     - 组合现有 Widget
     - 创建新的 Widget
     - 简单易用
  
  2. 使用场景
     - 创建可复用的 UI 组件
     - 封装复杂逻辑
     - 提高代码复用性
  
  3. 最佳实践
     - 保持简单
     - 使用 const 构造函数
     - 避免过度封装
  */
  
  void explain() {
    print('''
    组合 Widget：
    
    1. 功能
       - 组合现有 Widget
       - 创建新的 Widget
       - 简单易用
       - 提高代码复用性
    
    2. 使用场景
       - 创建可复用的 UI 组件
       - 封装复杂逻辑
       - 提高代码复用性
       - 简化代码结构
    
    3. 最佳实践
       - 保持简单
       - 使用 const 构造函数
       - 避免过度封装
       - 提供清晰的接口
    
    示例：
    class CustomButton extends StatelessWidget {
      final String text;
      final VoidCallback onPressed;
      
      const CustomButton({
        super.key,
        required this.text,
        required this.onPressed,
      });
      
      @override
      Widget build(BuildContext context) {
        return ElevatedButton(
          onPressed: onPressed,
          child: Text(text),
        );
      }
    }
    ''');
  }
}

// 组合 Widget 示例
class CustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? textColor;
  
  const CustomButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.backgroundColor,
    this.textColor,
  });
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
        foregroundColor: textColor ?? Colors.white,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(
        text,
        style: const TextStyle(fontSize: 16),
      ),
    );
  }
}

// 使用组合 Widget
class CompositionExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CustomButton(
          text: '按钮1',
          onPressed: () => print('按钮1点击'),
          backgroundColor: Colors.blue,
        ),
        const SizedBox(height: 10),
        CustomButton(
          text: '按钮2',
          onPressed: () => print('按钮2点击'),
          backgroundColor: Colors.green,
        ),
      ],
    );
  }
}
```

## 📖 继承 Widget

### 1. 继承 StatelessWidget

```dart
// 继承 StatelessWidget
class InheritStatelessWidget {
  /*
  继承 StatelessWidget：
  
  1. 功能
     - 扩展 StatelessWidget
     - 添加新功能
     - 重写 build() 方法
  
  2. 使用场景
     - 扩展现有 Widget
     - 添加新功能
     - 创建变体 Widget
  
  3. 最佳实践
     - 调用 super.build()
     - 保持简单
     - 避免复杂逻辑
  */
  
  void explain() {
    print('''
    继承 StatelessWidget：
    
    1. 功能
       - 扩展 StatelessWidget
       - 添加新功能
       - 重写 build() 方法
       - 继承父类功能
    
    2. 使用场景
       - 扩展现有 Widget
       - 添加新功能
       - 创建变体 Widget
       - 提高代码复用性
    
    3. 最佳实践
       - 调用 super.build()
       - 保持简单
       - 避免复杂逻辑
       - 提供清晰的接口
    
    示例：
    class MyCustomButton extends ElevatedButton {
      const MyCustomButton({
        super.key,
        required super.onPressed,
        required super.child,
      });
      
      @override
      Widget build(BuildContext context) {
        return super.build(context);
      }
    }
    ''');
  }
}

// 继承 StatelessWidget 示例
class CustomCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final Color? color;
  final double? elevation;
  
  const CustomCard({
    super.key,
    required this.child,
    this.padding,
    this.margin,
    this.color,
    this.elevation,
  });
  
  @override
  Widget build(BuildContext context) {
    return Card(
      color: color ?? Theme.of(context).cardColor,
      elevation: elevation ?? 2,
      margin: margin ?? const EdgeInsets.all(8),
      child: Padding(
        padding: padding ?? const EdgeInsets.all(16),
        child: child,
      ),
    );
  }
}

// 使用继承 Widget
class InheritExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomCard(
      color: Colors.blue[50],
      elevation: 4,
      child: const Column(
        children: [
          Text('标题'),
          SizedBox(height: 8),
          Text('内容'),
        ],
      ),
    );
  }
}
```

### 2. 继承 StatefulWidget

```dart
// 继承 StatefulWidget
class InheritStatefulWidget {
  /*
  继承 StatefulWidget：
  
  1. 功能
     - 扩展 StatefulWidget
     - 添加新功能
     - 重写生命周期方法
  
  2. 使用场景
     - 扩展现有 Widget
     - 添加状态管理
     - 创建复杂 Widget
  
  3. 最佳实践
     - 调用 super 方法
     - 管理生命周期
     - 避免内存泄漏
  */
  
  void explain() {
    print('''
    继承 StatefulWidget：
    
    1. 功能
       - 扩展 StatefulWidget
       - 添加新功能
       - 重写生命周期方法
       - 继承父类功能
    
    2. 使用场景
       - 扩展现有 Widget
       - 添加状态管理
       - 创建复杂 Widget
       - 提高代码复用性
    
    3. 最佳实践
       - 调用 super 方法
       - 管理生命周期
       - 避免内存泄漏
       - 保持简单
    
    示例：
    class MyAnimatedButton extends StatefulWidget {
      final String text;
      final VoidCallback onPressed;
      
      const MyAnimatedButton({
        super.key,
        required this.text,
        required this.onPressed,
      });
      
      @override
      _MyAnimatedButtonState createState() => _MyAnimatedButtonState();
    }
    
    class _MyAnimatedButtonState extends State<MyAnimatedButton> 
        with SingleTickerProviderStateMixin {
      late AnimationController _controller;
      
      @override
      void initState() {
        super.initState();
        _controller = AnimationController(
          vsync: this,
          duration: const Duration(milliseconds: 200),
        );
      }
      
      @override
      void dispose() {
        _controller.dispose();
        super.dispose();
      }
      
      @override
      Widget build(BuildContext context) {
        return GestureDetector(
          onTapDown: (_) => _controller.forward(),
          onTapUp: (_) => _controller.reverse(),
          onTapCancel: () => _controller.reverse(),
          onTap: widget.onPressed,
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Transform.scale(
                scale: 1 - _controller.value * 0.1,
                child: child,
              );
            },
            child: ElevatedButton(
              onPressed: widget.onPressed,
              child: Text(widget.text),
            ),
          ),
        );
      }
    }
    ''');
  }
}

// 继承 StatefulWidget 示例
class AnimatedButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  
  const AnimatedButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.backgroundColor,
  });
  
  @override
  _AnimatedButtonState createState() => _AnimatedButtonState();
}

class _AnimatedButtonState extends State<AnimatedButton> 
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 200),
    );
    
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    ));
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  void _handleTapDown(TapDownDetails details) {
    _controller.forward();
  }
  
  void _handleTapUp(TapUpDetails details) {
    _controller.reverse();
  }
  
  void _handleTapCancel() {
    _controller.reverse();
  }
  
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTapCancel: _handleTapCancel,
      onTap: widget.onPressed,
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: _scaleAnimation.value,
            child: child,
          );
        },
        child: ElevatedButton(
          onPressed: widget.onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: widget.backgroundColor ?? Theme.of(context).primaryColor,
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          ),
          child: Text(
            widget.text,
            style: const TextStyle(fontSize: 16),
          ),
        ),
      ),
    );
  }
}

// 使用继承 StatefulWidget
class InheritStatefulExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        AnimatedButton(
          text: '动画按钮1',
          onPressed: () => print('按钮1点击'),
          backgroundColor: Colors.blue,
        ),
        const SizedBox(height: 10),
        AnimatedButton(
          text: '动画按钮2',
          onPressed: () => print('按钮2点击'),
          backgroundColor: Colors.green,
        ),
      ],
    );
  }
}
```

## 📖 绘制 Widget

### 1. CustomPaint

```dart
// CustomPaint
class CustomPaintWidget {
  /*
  CustomPaint：
  
  1. 功能
     - 自定义绘制
     - 高性能绘制
     - 复杂图形
  
  2. 使用场景
     - 复杂图形绘制
     - 自定义图表
     - 游戏开发
     - 特殊效果
  
  3. 最佳实践
     - 使用 Canvas API
     - 优化绘制性能
     - 避免复杂计算
  */
  
  void explain() {
    print('''
    CustomPaint：
    
    1. 功能
       - 自定义绘制
       - 高性能绘制
       - 复杂图形
       - 使用 Canvas API
    
    2. 使用场景
       - 复杂图形绘制
       - 自定义图表
       - 游戏开发
       - 特殊效果
       - 自定义图标
    
    3. 最佳实践
       - 使用 Canvas API
       - 优化绘制性能
       - 避免复杂计算
       - 使用 RepaintBoundary
    
    4. Canvas API
       - drawLine：绘制线条
       - drawRect：绘制矩形
       - drawCircle：绘制圆形
       - drawPath：绘制路径
       - drawImage：绘制图片
    
    示例：
    class MyPainter extends CustomPainter {
      @override
      void paint(Canvas canvas, Size size) {
        final paint = Paint()
          ..color = Colors.blue
          ..style = PaintingStyle.fill;
        
        canvas.drawRect(
          Rect.fromLTWH(0, 0, size.width, size.height),
          paint,
        );
      }
      
      @override
      bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
    }
    ''');
  }
}

// CustomPaint 示例
class CirclePainter extends CustomPainter {
  final Color color;
  final double radius;
  
  CirclePainter({
    required this.color,
    required this.radius,
  });
  
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      radius,
      paint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CirclePainter oldDelegate) {
    return oldDelegate.color != color || oldDelegate.radius != radius;
  }
}

class CustomPaintExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: CirclePainter(
        color: Colors.blue,
        radius: 50,
      ),
      size: const Size(100, 100),
    );
  }
}
```

### 2. 高级绘制

```dart
// 高级绘制
class AdvancedPainting {
  /*
  高级绘制：
  
  1. 路径绘制
     - 复杂路径
     - 曲线绘制
     - 贝塞尔曲线
  
  2. 渐变填充
     - 线性渐变
     - 径向渐变
     - 扫描渐变
  
  3. 变换操作
     - 平移
     - 旋转
     - 缩放
     - 倾斜
  */
  
  void explain() {
    print('''
    高级绘制：
    
    1. 路径绘制
       - 复杂路径：使用 Path 类
       - 曲线绘制：使用 quadraticBezierTo 和 cubicBezierTo
       - 贝塞尔曲线：创建平滑曲线
       - 路径组合：使用 addPath
    
    2. 渐变填充
       - 线性渐变：LinearGradient
       - 径向渐变：RadialGradient
       - 扫描渐变：SweepGradient
       - 创建画笔：Paint.shader
    
    3. 变换操作
       - 平移：canvas.translate
       - 旋转：canvas.rotate
       - 缩放：canvas.scale
       - 倾斜：canvas.skew
    
    4. 高级技巧
       - 裁剪：canvas.clipRect, clipPath
       - 图层：canvas.saveLayer, restore
       - 混合模式：Paint.blendMode
       - 阴影：Paint.maskFilter
    
    示例：
    class AdvancedPainter extends CustomPainter {
      @override
      void paint(Canvas canvas, Size size) {
        // 创建渐变画笔
        final paint = Paint()
          ..shader = LinearGradient(
            colors: [Colors.blue, Colors.green],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
        
        // 创建路径
        final path = Path()
          ..moveTo(0, size.height / 2)
          ..quadraticBezierTo(
            size.width / 4, size.height,
            size.width / 2, size.height / 2,
          )
          ..quadraticBezierTo(
            size.width * 3 / 4, 0,
            size.width, size.height / 2,
          );
        
        // 绘制路径
        canvas.drawPath(path, paint);
      }
      
      @override
      bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
    }
    ''');
  }
}

// 高级绘制示例
class GradientPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // 创建渐变画笔
    final paint = Paint()
      ..shader = LinearGradient(
        colors: [Colors.blue, Colors.green, Colors.yellow],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    
    // 绘制矩形
    canvas.drawRect(
      Rect.fromLTWH(0, 0, size.width, size.height),
      paint,
    );
    
    // 创建圆形路径
    final circlePaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;
    
    canvas.drawCircle(
      Offset(size.width / 2, size.height / 2),
      size.width / 3,
      circlePaint,
    );
  }
  
  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class AdvancedPaintingExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: GradientPainter(),
      size: const Size(200, 200),
    );
  }
}
```

## 📖 渲染对象 Widget

### 1. RenderObjectWidget

```dart
// RenderObjectWidget
class RenderObjectWidgetExplanation {
  /*
  RenderObjectWidget：
  
  1. 功能
     - 最底层的 Widget
     - 自定义布局和绘制
     - 完全控制渲染
  
  2. 使用场景
     - 自定义布局
     - 高性能 Widget
     - 特殊渲染需求
  
  3. 最佳实践
     - 理解渲染管线
     - 优化性能
     - 避免复杂实现
  */
  
  void explain() {
    print('''
    RenderObjectWidget：
    
    1. 功能
       - 最底层的 Widget
       - 自定义布局和绘制
       - 完全控制渲染
       - 高性能
    
    2. 使用场景
       - 自定义布局
       - 高性能 Widget
       - 特殊渲染需求
       - 游戏开发
    
    3. 最佳实践
       - 理解渲染管线
       - 优化性能
       - 避免复杂实现
       - 使用现有 Widget
    
    4. 相关类
       - RenderObjectWidget：创建 RenderObject
       - RenderBox：盒模型渲染对象
       - RenderObject：渲染对象基类
       - RenderProxyBox：代理渲染对象
    
    示例：
    class CustomLayout extends SingleChildRenderObjectWidget {
      const CustomLayout({super.key, super.child});
      
      @override
      RenderObject createRenderObject(BuildContext context) {
        return RenderCustomLayout();
      }
    }
    
    class RenderCustomLayout extends RenderBox with RenderObjectWithChildMixin<RenderBox> {
      @override
      void performLayout() {
        // 自定义布局逻辑
      }
      
      @override
      void paint(PaintingContext context, Offset offset) {
        // 自定义绘制逻辑
      }
    }
    ''');
  }
}

// RenderObjectWidget 示例
class CustomSingleChildLayout extends SingleChildRenderObjectWidget {
  final double width;
  final double height;
  
  const CustomSingleChildLayout({
    super.key,
    required this.width,
    required this.height,
    super.child,
  });
  
  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderCustomSingleChildLayout(
      width: width,
      height: height,
    );
  }
  
  @override
  void updateRenderObject(BuildContext context, covariant RenderCustomSingleChildLayout renderObject) {
    renderObject
      ..width = width
      ..height = height;
  }
}

class RenderCustomSingleChildLayout extends RenderBox with RenderObjectWithChildMixin<RenderBox> {
  double _width;
  double _height;
  
  RenderCustomSingleChildLayout({
    required double width,
    required double height,
  }) : _width = width, _height = height;
  
  double get width => _width;
  set width(double value) {
    if (_width != value) {
      _width = value;
      markNeedsLayout();
    }
  }
  
  double get height => _height;
  set height(double value) {
    if (_height != value) {
      _height = value;
      markNeedsLayout();
    }
  }
  
  @override
  void performLayout() {
    // 设置自己的大小
    size = Size(_width, _height);
    
    // 布局子节点
    if (child != null) {
      child!.layout(
        BoxConstraints.tightFor(width: _width, height: _height),
        parentUsesSize: true,
      );
      
      // 设置子节点位置
      final childParentData = child!.parentData as BoxParentData;
      childParentData.offset = Offset.zero;
    }
  }
  
  @override
  void paint(PaintingContext context, Offset offset) {
    if (child != null) {
      final childParentData = child!.parentData as BoxParentData;
      context.paintChild(child!, offset + childParentData.offset);
    }
  }
}

class RenderObjectWidgetExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomSingleChildLayout(
      width: 200,
      height: 100,
      child: Container(
        color: Colors.blue,
        child: const Center(
          child: Text('自定义布局'),
        ),
      ),
    );
  }
}
```

### 2. 多子节点 RenderObjectWidget

```dart
// 多子节点 RenderObjectWidget
class MultiChildRenderObjectWidgetExplanation {
  /*
  多子节点 RenderObjectWidget：
  
  1. 功能
     - 管理多个子节点
     - 自定义布局
     - 自定义绘制
  
  2. 使用场景
     - 自定义布局
     - 复杂布局
     - 特殊排列
  
  3. 最佳实践
     - 管理子节点生命周期
     - 优化布局性能
     - 避免复杂实现
  */
  
  void explain() {
    print('''
    多子节点 RenderObjectWidget：
    
    1. 功能
       - 管理多个子节点
       - 自定义布局
       - 自定义绘制
       - 完全控制
    
    2. 使用场景
       - 自定义布局
       - 复杂布局
       - 特殊排列
       - 游戏开发
    
    3. 最佳实践
       - 管理子节点生命周期
       - 优化布局性能
       - 避免复杂实现
       - 使用现有 Widget
    
    4. 相关类
       - MultiChildRenderObjectWidget：多子节点 Widget
       - ContainerRenderObjectMixin：容器渲染对象混入
       - RenderBoxContainerDefaultsMixin：默认实现
    
    示例：
    class CustomMultiChildLayout extends MultiChildRenderObjectWidget {
      const CustomMultiChildLayout({super.key, required super.children});
      
      @override
      RenderObject createRenderObject(BuildContext context) {
        return RenderCustomMultiChildLayout();
      }
    }
    
    class RenderCustomMultiChildLayout extends RenderBox 
        with ContainerRenderObjectMixin<RenderBox, MultiChildLayoutParentData>,
             RenderBoxContainerDefaultsMixin<RenderBox, MultiChildLayoutParentData> {
      @override
      void performLayout() {
        // 自定义布局逻辑
      }
      
      @override
      void paint(PaintingContext context, Offset offset) {
        // 自定义绘制逻辑
        defaultPaint(context, offset);
      }
    }
    ''');
  }
}

// 多子节点 RenderObjectWidget 示例
class CustomWrap extends MultiChildRenderObjectWidget {
  final double spacing;
  final double runSpacing;
  
  const CustomWrap({
    super.key,
    required super.children,
    this.spacing = 0.0,
    this.runSpacing = 0.0,
  });
  
  @override
  RenderObject createRenderObject(BuildContext context) {
    return RenderCustomWrap(
      spacing: spacing,
      runSpacing: runSpacing,
    );
  }
  
  @override
  void updateRenderObject(BuildContext context, covariant RenderCustomWrap renderObject) {
    renderObject
      ..spacing = spacing
      ..runSpacing = runSpacing;
  }
}

class RenderCustomWrap extends RenderBox 
    with ContainerRenderObjectMixin<RenderBox, MultiChildLayoutParentData>,
         RenderBoxContainerDefaultsMixin<RenderBox, MultiChildLayoutParentData> {
  double _spacing;
  double _runSpacing;
  
  RenderCustomWrap({
    required double spacing,
    required double runSpacing,
  }) : _spacing = spacing, _runSpacing = runSpacing;
  
  double get spacing => _spacing;
  set spacing(double value) {
    if (_spacing != value) {
      _spacing = value;
      markNeedsLayout();
    }
  }
  
  double get runSpacing => _runSpacing;
  set runSpacing(double value) {
    if (_runSpacing != value) {
      _runSpacing = value;
      markNeedsLayout();
    }
  }
  
  @override
  void performLayout() {
    // 简单的换行布局
    double x = 0;
    double y = 0;
    double lineHeight = 0;
    
    RenderBox? child = firstChild;
    while (child != null) {
      final childParentData = child.parentData as MultiChildLayoutParentData;
      
      child.layout(constraints, parentUsesSize: true);
      
      if (x + child.size.width > constraints.maxWidth) {
        x = 0;
        y += lineHeight + _runSpacing;
        lineHeight = 0;
      }
      
      childParentData.offset = Offset(x, y);
      
      x += child.size.width + _spacing;
      lineHeight = lineHeight > child.size.height ? lineHeight : child.size.height;
      
      child = childParentData.nextSibling;
    }
    
    size = Size(constraints.maxWidth, y + lineHeight);
  }
  
  @override
  void paint(PaintingContext context, Offset offset) {
    defaultPaint(context, offset);
  }
}

class MultiChildRenderObjectWidgetExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return CustomWrap(
      spacing: 8,
      runSpacing: 8,
      children: List.generate(
        10,
        (index) => Container(
          width: 50,
          height: 50,
          color: Colors.blue[index * 100],
          child: Center(child: Text('$index')),
        ),
      ),
    );
  }
}
```

## 📖 自定义 Widget 最佳实践

### 1. 设计原则

```dart
// 自定义 Widget 设计原则
class CustomWidgetDesignPrinciples {
  /*
  自定义 Widget 设计原则：
  
  1. 单一职责
     - 每个 Widget 只做一件事
     - 保持简单
     - 易于理解和维护
  
  2. 可复用性
     - 设计通用接口
     - 支持配置
     - 易于扩展
  
  3. 性能优化
     - 使用 const 构造函数
     - 避免不必要的重建
     - 优化绘制性能
  
  4. 易于测试
     - 清晰的接口
     - 可预测的行为
     - 易于模拟
  */
  
  void explain() {
    print('''
    自定义 Widget 设计原则：
    
    1. 单一职责
       - 每个 Widget 只做一件事
       - 保持简单
       - 易于理解和维护
       - 避免过度封装
    
    2. 可复用性
       - 设计通用接口
       - 支持配置
       - 易于扩展
       - 提高代码复用性
    
    3. 性能优化
       - 使用 const 构造函数
       - 避免不必要的重建
       - 优化绘制性能
       - 使用合适的 Widget
    
    4. 易于测试
       - 清晰的接口
       - 可预测的行为
       - 易于模拟
       - 支持单元测试
    
    5. 文档和示例
       - 提供清晰的文档
       - 提供使用示例
       - 说明使用场景
       - 提供最佳实践
    
    设计建议：
    - 保持简单
    - 设计清晰的接口
    - 优化性能
    - 提供文档和示例
    ''');
  }
}
```

### 2. 代码组织

```dart
// 自定义 Widget 代码组织
class CustomWidgetCodeOrganization {
  /*
  自定义 Widget 代码组织：
  
  1. 文件结构
     - 每个 Widget 一个文件
     - 相关 Widget 放在一起
     - 使用清晰的命名
  
  2. 代码结构
     - 构造函数
     - 属性定义
     - 生命周期方法
     - 辅助方法
  
  3. 文档注释
     - 类注释
     - 方法注释
     - 属性注释
     - 使用示例
  */
  
  void explain() {
    print('''
    自定义 Widget 代码组织：
    
    1. 文件结构
       - 每个 Widget 一个文件
       - 相关 Widget 放在一起
       - 使用清晰的命名
       - 组织代码结构
    
    2. 代码结构
       - 构造函数：定义参数
       - 属性定义：定义属性
       - 生命周期方法：实现生命周期
       - 辅助方法：实现功能
    
    3. 文档注释
       - 类注释：描述 Widget 功能
       - 方法注释：描述方法功能
       - 属性注释：描述属性用途
       - 使用示例：提供使用示例
    
    示例文件结构：
    lib/
      widgets/
        custom_button.dart
        custom_card.dart
        custom_list.dart
        custom_form.dart
    
    示例代码结构：
    /// 自定义按钮 Widget
    /// 
    /// 提供可配置的按钮样式和行为
    class CustomButton extends StatelessWidget {
      /// 按钮文本
      final String text;
      
      /// 点击回调
      final VoidCallback onPressed;
      
      /// 背景颜色
      final Color? backgroundColor;
      
      /// 构造函数
      const CustomButton({
        super.key,
        required this.text,
        required this.onPressed,
        this.backgroundColor,
      });
      
      @override
      Widget build(BuildContext context) {
        return ElevatedButton(
          onPressed: onPressed,
          style: ElevatedButton.styleFrom(
            backgroundColor: backgroundColor ?? Theme.of(context).primaryColor,
          ),
          child: Text(text),
        );
      }
    }
    ''');
  }
}
```

## 📖 总结

### 自定义 Widget 类型

| 类型 | 描述 | 使用场景 | 难度 |
|------|------|----------|------|
| **组合 Widget** | 组合现有 Widget | 简单 UI 组件 | 简单 |
| **继承 Widget** | 继承现有 Widget | 扩展功能 | 中等 |
| **绘制 Widget** | 自定义绘制 | 复杂图形 | 复杂 |
| **渲染对象 Widget** | 自定义布局和绘制 | 特殊布局 | 最复杂 |

### 最佳实践总结

1. **设计原则**：单一职责、可复用性、性能优化、易于测试
2. **代码组织**：清晰的文件结构、代码结构、文档注释
3. **性能优化**：使用 const、避免重建、优化绘制
4. **选择建议**：根据需求选择合适的 Widget 类型

### 学习路径

1. **组合 Widget**：学习如何组合现有 Widget
2. **继承 Widget**：学习如何扩展现有 Widget
3. **绘制 Widget**：学习如何自定义绘制
4. **渲染对象 Widget**：学习如何自定义布局和绘制

### 下一步学习

- **高级绘制技术**：学习更多绘制技巧
- **性能优化**：深入学习性能优化
- **测试和调试**：学习如何测试自定义 Widget

---

> 掌握如何创建自定义 Widget，包括组合、继承、绘制等高级技巧。自定义 Widget 是 Flutter 开发的重要技能，将帮助你创建更灵活、更高效的 UI 组件。