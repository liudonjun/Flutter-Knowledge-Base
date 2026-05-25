# Canvas 基础详解

> 深入理解 Flutter 中的 Canvas 绘制。

## 📖 Canvas 基础

### 1. 什么是 Canvas

```dart
// Canvas 概念
class CanvasConcept {
  void explain() {
    print('''
    Canvas 概念：
    
    // 1. 什么是 Canvas
    // - Flutter 的绘制画布
    // - 提供底层绘制 API
    // - 支持自定义绘制
    // - 高性能绘制
    
    // 2. Canvas 的特点
    // - 底层 API：提供底层绘制
    // - 高性能：高性能绘制
    // - 可定制：支持自定义绘制
    // - 灵活性：灵活的绘制方式
    
    // 3. Canvas 的功能
    // - 绘制形状
    // - 绘制文本
    // - 绘制图片
    // - 变换操作
    
    // 4. Canvas 的使用场景
    // - 自定义绘制
    // - 图表绘制
    // - 游戏开发
    // - 特殊效果
    ''');
  }
}
```

### 2. Canvas 实现

```dart
// Canvas 实现
class CanvasImplementation {
  void explain() {
    print('''
    Canvas 实现：
    
    // 1. 使用 CustomPaint
    CustomPaint(
      painter: MyPainter(),
      size: Size(200, 200),
    )
    
    // 2. 自定义 Painter
    class MyPainter extends CustomPainter {
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
        canvas.drawRect(
          Rect.fromLTWH(0, 0, 100, 100),
          paint,
        );
        
        // 绘制线条
        canvas.drawLine(
          Offset(0, 0),
          Offset(100, 100),
          paint,
        );
      }
      
      @override
      bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
    }
    
    // 3. Canvas 最佳实践
    // - 使用 shouldRepaint
    // - 优化绘制性能
    // - 使用 save/restore
    // - 考虑绘制层次
    ''');
  }
}
```

## 🔗 相关链接

- [[画笔设置]]
- [[路径绘制]]
- [[CustomPainter]]
- [[动画基础]]

---

> Canvas 是 Flutter 底层绘制的基础，掌握它对于自定义绘制非常重要。