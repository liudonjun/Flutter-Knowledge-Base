# SlideTransition 详解

> 深入理解 Flutter 中的 SlideTransition。

## 📖 SlideTransition 基础

### 1. 什么是 SlideTransition

```dart
// SlideTransition 概念
class SlideTransitionConcept {
  void explain() {
    print('''
    SlideTransition 概念：
    
    // 1. 什么是 SlideTransition
    // - 滑动动画 Widget
    // - 控制子 Widget 的位置
    // - 使用 Animation 驱动
    // - 常用于页面转场
    
    // 2. SlideTransition 的特点
    // - 滑动动画：控制 Widget 的位置
    // - 动画驱动：使用 Animation<Offset>
    // - 性能优化：使用合成层
    // - 易于组合：可与其他动画组合
    
    // 3. SlideTransition 的使用场景
    // - 页面转场：滑动效果
    // - 侧边栏：侧边栏滑出
    // - 底部弹窗：底部弹窗滑出
    // - 交互反馈：用户交互反馈
    ''');
  }
}
```

### 2. SlideTransition 配置

```dart
// SlideTransition 配置
class SlideTransitionConfiguration {
  void explain() {
    print('''
    SlideTransition 配置：
    
    // 1. 基本配置
    SlideTransition(
      position: _animation,
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
      late Animation<Offset> _animation;
      
      @override
      void initState() {
        super.initState();
        _controller = AnimationController(
          duration: Duration(seconds: 1),
          vsync: this,
        );
        _animation = Tween<Offset>(
          begin: Offset(1.0, 0.0),
          end: Offset.zero,
        ).animate(CurvedAnimation(
          parent: _controller,
          curve: Curves.ease,
        ));
      }
      
      @override
      Widget build(BuildContext context) {
        return SlideTransition(
          position: _animation,
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

## 🔧 SlideTransition 使用

### 1. 滑动动画

```dart
// 滑动动画
class SlideAnimation {
  void explain() {
    print('''
    滑动动画：
    
    // 1. 从右向左滑动
    SlideTransition(
      position: Tween<Offset>(
        begin: Offset(1.0, 0.0),  // 从右边开始
        end: Offset.zero,  // 滑动到原点
      ).animate(_controller),
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 从左向右滑动
    SlideTransition(
      position: Tween<Offset>(
        begin: Offset(-1.0, 0.0),  // 从左边开始
        end: Offset.zero,  // 滑动到原点
      ).animate(_controller),
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 3. 从上向下滑动
    SlideTransition(
      position: Tween<Offset>(
        begin: Offset(0.0, -1.0),  // 从上面开始
        end: Offset.zero,  // 滑动到原点
      ).animate(_controller),
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
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
    
    // 1. 滑动 + 淡入淡出
    SlideTransition(
      position: _slideAnimation,
      child: FadeTransition(
        opacity: _fadeAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 2. 滑动 + 缩放
    SlideTransition(
      position: _slideAnimation,
      child: ScaleTransition(
        scale: _scaleAnimation,
        child: Container(
          width: 100,
          height: 100,
          color: Colors.blue,
        ),
      ),
    )
    
    // 3. 滑动 + 旋转
    SlideTransition(
      position: _slideAnimation,
      child: RotationTransition(
        turns: _rotationAnimation,
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
4. **SlideTransition 可以与其他动画组合使用**

## 🔗 相关链接

- [[FadeTransition]]
- [[ScaleTransition]]
- [[RotationTransition]]
- [[AnimatedContainer详解]]

---

> SlideTransition 是 Flutter 中常用的动画 Widget，掌握它对于创建滑动效果非常重要。