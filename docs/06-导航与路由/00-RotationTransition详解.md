# RotationTransition 详解

> 深入理解 Flutter 中的 RotationTransition。

## 📖 RotationTransition 基础

### 1. 什么是 RotationTransition

```dart
// RotationTransition 概念
class RotationTransitionConcept {
  void explain() {
    print('''
    RotationTransition 概念：
    
    // 1. 什么是 RotationTransition
    // - 旋转动画 Widget
    // - 控制子 Widget 的旋转角度
    // - 使用 Animation 驱动
    // - 常用于页面转场
    
    // 2. RotationTransition 的特点
    // - 旋转动画：控制 Widget 的旋转角度
    // - 动画驱动：使用 Animation<double>
    // - 性能优化：使用合成层
    // - 易于组合：可与其他动画组合
    
    // 3. RotationTransition 的使用场景
    // - 页面转场：旋转效果
    // - 加载动画：加载指示器
    // - 交互反馈：用户交互反馈
    // - 特殊效果：特殊动画效果
    ''');
  }
}
```

### 2. RotationTransition 配置

```dart
// RotationTransition 配置
class RotationTransitionConfiguration {
  void explain() {
    print('''
    RotationTransition 配置：
    
    // 1. 基本配置
    RotationTransition(
      turns: _animation,
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 使用 AnimationController
    class MyWidget extends StatefulWidget {
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    
    class _MyWidgetState extends State<MyWidget>
        with SingleTickerProviderStateMixin {
      late AnimationController _controller;
      late Animation<double> _animation;
      
      @override
      void initState() {
        super.initState();
        _controller = AnimationController(
          duration: Duration(seconds: 1),
          vsync: this,
        );
        _animation = Tween<double>(begin: 0.0, end: 1.0).animate(
          CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
        );
      }
      
      @override
      Widget build(BuildContext context) {
        return RotationTransition(
          turns: _animation,
          child: Container(
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        );
      }
      
      @override
      void dispose() {
        _controller.dispose();
        super.dispose();
      }
    }
    ''');
  }
}
```

## 🔧 RotationTransition 使用

### 1. 旋转动画

```dart
// 旋转动画
class RotationAnimation {
  void explain() {
    print('''
    旋转动画：
    
    // 1. 旋转 360 度
    RotationTransition(
      turns: _animation,  // 0.0 到 1.0 表示 0 到 360 度
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 旋转特定角度
    // 0.25 = 90 度
    // 0.5 = 180 度
    // 0.75 = 270 度
    // 1.0 = 360 度
    
    // 3. 连续旋转
    _controller.repeat();  // 重复旋转
    
    // 4. 往返旋转
    _controller.repeat(reverse: true);  // 往返旋转
    ''');
  }
}
```

### 2. 组合动画

```dart
// 组合动画
class CombinedAnimations {
  void explain() {
    print('''
    组合动画：
    
    // 1. 旋转 + 缩放
    RotationTransition(
      turns: _rotationAnimation,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 2. 旋转 + 淡入淡出
    RotationTransition(
      turns: _rotationAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 3. 旋转 + 滑动
    RotationTransition(
      turns: _rotationAnimation,
      child: SlideTransition(
        position: _slideAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **需要 AnimationController 驱动动画**
2. **注意 dispose 时释放 AnimationController**
3. **考虑使用 CurvedAnimation 优化动画曲线**
4. **RotationTransition 可以与其他动画组合使用**

## 🔗 相关链接

- [[FadeTransition]]
- [[ScaleTransition]]
- [[SlideTransition]]
- [[AnimatedContainer详解]]

---

> RotationTransition 是 Flutter 中常用的动画 Widget，掌握它对于创建旋转效果非常重要。