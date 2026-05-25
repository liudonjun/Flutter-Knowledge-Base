# ScaleTransition 详解

> 深入理解 Flutter 中的 ScaleTransition。

## 📖 ScaleTransition 基础

### 1. 什么是 ScaleTransition

```dart
// ScaleTransition 概念
class ScaleTransitionConcept {
  void explain() {
    print('''
    ScaleTransition 概念：
    
    // 1. 什么是 ScaleTransition
    // - 缩放动画 Widget
    // - 控制子 Widget 的缩放比例
    // - 使用 Animation 驱动
    // - 常用于页面转场
    
    // 2. ScaleTransition 的特点
    // - 缩放动画：控制 Widget 的缩放比例
    // - 动画驱动：使用 Animation<double>
    // - 性能优化：使用合成层
    // - 易于组合：可与其他动画组合
    
    // 3. ScaleTransition 的使用场景
    // - 页面转场：缩放效果
    // - 弹窗动画：弹窗显示/隐藏
    // - 交互反馈：用户交互反馈
    // - 特殊效果：特殊动画效果
    ''');
  }
}
```

### 2. ScaleTransition 配置

```dart
// ScaleTransition 配置
class ScaleTransitionConfiguration {
  void explain() {
    print('''
    ScaleTransition 配置：
    
    // 1. 基本配置
    ScaleTransition(
      scale: _animation,
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
        return ScaleTransition(
          scale: _animation,
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

## 🔧 ScaleTransition 使用

### 1. 缩放动画

```dart
// 缩放动画
class ScaleAnimation {
  void explain() {
    print('''
    缩放动画：
    
    // 1. 缩放到特定大小
    ScaleTransition(
      scale: _animation,  // 0.0 到 1.0 表示缩放比例
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 缩放特定比例
    // 0.0 = 完全缩小（不可见）
    // 0.5 = 缩小到一半
    // 1.0 = 原始大小
    // 2.0 = 放大到两倍
    
    // 3. 连续缩放
    _controller.repeat();  // 重复缩放
    
    // 4. 往返缩放
    _controller.repeat(reverse: true);  // 往返缩放
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
    
    // 1. 缩放 + 旋转
    ScaleTransition(
      scale: _scaleAnimation,
      child: RotationTransition(
        turns: _rotationAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 2. 缩放 + 淡入淡出
    ScaleTransition(
      scale: _scaleAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 3. 缩放 + 滑动
    ScaleTransition(
      scale: _scaleAnimation,
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
4. **ScaleTransition 可以与其他动画组合使用**

## 🔗 相关链接

- [[FadeTransition]]
- [[RotationTransition]]
- [[SlideTransition]]
- [[AnimatedContainer详解]]

---

> ScaleTransition 是 Flutter 中常用的动画 Widget，掌握它对于创建缩放效果非常重要。