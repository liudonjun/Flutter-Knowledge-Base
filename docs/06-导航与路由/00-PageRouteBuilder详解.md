# PageRouteBuilder 详解

> 深入理解 Flutter 中的 PageRouteBuilder。

## 📖 PageRouteBuilder 基础

### 1. 什么是 PageRouteBuilder

```dart
// PageRouteBuilder 概念
class PageRouteBuilderConcept {
  void explain() {
    print('''
    PageRouteBuilder 概念：
    
    // 1. 什么是 PageRouteBuilder
    // - 自定义页面路由构建器
    // - 支持自定义转场动画
    // - 提供灵活的路由配置
    // - 用于特殊路由需求
    
    // 2. PageRouteBuilder 的特点
    // - 自定义动画：可以自定义转场动画
    // - 灵活配置：支持各种配置选项
    // - 性能优化：可以优化动画性能
    // - 易于使用：API 简洁
    
    // 3. PageRouteBuilder 的使用场景
    // - 自定义转场：需要特殊转场效果
    // - 模态对话框：显示模态对话框
    // - 底部弹窗：显示底部弹窗
    // - 特殊动画：需要特殊动画效果
    ''');
  }
}
```

### 2. PageRouteBuilder 配置

```dart
// PageRouteBuilder 配置
class PageRouteBuilderConfiguration {
  void explain() {
    print('''
    PageRouteBuilder 配置：
    
    // 1. 基本配置
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return DetailsPage();
        },
      ),
    )
    
    // 2. 带转场动画
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return DetailsPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(
            opacity: animation,
            child: child,
          );
        },
      ),
    )
    
    // 3. 自定义转场动画
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return DetailsPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return SlideTransition(
            position: Tween<Offset>(
              begin: Offset(1.0, 0.0),
              end: Offset.zero,
            ).animate(CurvedAnimation(
              parent: animation,
              curve: Curves.ease,
            )),
            child: child,
          );
        },
      ),
    )
    ''');
  }
}
```

## 🔧 PageRouteBuilder 使用

### 1. 自定义转场动画

```dart
// 自定义转场动画
class CustomTransitionAnimation {
  void explain() {
    print('''
    自定义转场动画：
    
    // 1. 淡入淡出动画
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return DetailsPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: animation,
          child: child,
        );
      },
    )
    
    // 2. 滑动动画
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return DetailsPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return SlideTransition(
          position: Tween<Offset>(
            begin: Offset(1.0, 0.0),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.ease,
          )),
          child: child,
        );
      },
    )
    
    // 3. 缩放动画
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return DetailsPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return ScaleTransition(
          scale: animation,
          child: child,
        );
      },
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
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return DetailsPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        // 滑动动画
        final slideAnimation = Tween<Offset>(
          begin: Offset(1.0, 0.0),
          end: Offset.zero,
        ).animate(CurvedAnimation(
          parent: animation,
          curve: Curves.ease,
        ));
        
        // 淡入淡出动画
        final fadeAnimation = Tween<double>(
          begin: 0.0,
          end: 1.0,
        ).animate(CurvedAnimation(
          parent: animation,
          curve: Curves.ease,
        ));
        
        return SlideTransition(
          position: slideAnimation,
          child: FadeTransition(
            opacity: fadeAnimation,
            child: child,
          ),
        );
      },
    )
    
    // 2. 缩放 + 旋转
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return DetailsPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return ScaleTransition(
          scale: animation,
          child: RotationTransition(
            turns: animation,
            child: child,
          ),
        );
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **PageRouteBuilder 提供自定义转场动画**
2. **注意动画性能**
3. **考虑用户体验**
4. **测试不同设备**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由动画详解]]
- [[FadeTransition详解]]

---

> PageRouteBuilder 是自定义路由动画的重要工具，掌握它对于创建特殊效果非常重要。