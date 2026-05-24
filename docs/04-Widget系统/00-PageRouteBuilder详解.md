# PageRouteBuilder 详解

> 深入理解 Flutter PageRouteBuilder Widget。

## 📖 PageRouteBuilder 概念

### 1. 什么是 PageRouteBuilder

```dart
// PageRouteBuilder 概念
class PageRouteBuilderConcept {
  void explain() {
    print('''
    PageRouteBuilder 概念：
    
    // 1. 什么是 PageRouteBuilder
    // - 自定义页面路由
    // - 支持自定义转场动画
    // - 支持页面导航
    // - 支持多种样式
    
    // 2. PageRouteBuilder 的特点
    // - 支持自定义转场动画
    // - 支持页面导航
    // - 支持页面转场动画
    // - 支持多种样式
    
    // 3. PageRouteBuilder 的使用场景
    // - 自定义转场动画
    // - 页面导航
    // - 页面转场
    // - 页面动画
    
    // 4. PageRouteBuilder 的属性
    // - pageBuilder：页面构建器
    // - transitionsBuilder：转场构建器
    // - transitionDuration：转场持续时间
    // - reverseTransitionDuration：反向转场持续时间
    ''');
  }
}
```

### 2. PageRouteBuilder 示例

```dart
// PageRouteBuilder 示例
class PageRouteBuilderExample {
  void explain() {
    print('''
    PageRouteBuilder 示例：
    
    // 1. 基本 PageRouteBuilder
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return NextPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(
            opacity: animation,
            child: child,
          );
        },
      ),
    )
    
    // 2. 带滑动转场的 PageRouteBuilder
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return NextPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return SlideTransition(
            position: Tween<Offset>(
              begin: Offset(1, 0),
              end: Offset.zero,
            ).animate(animation),
            child: child,
          );
        },
      ),
    )
    
    // 3. 带缩放转场的 PageRouteBuilder
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return NextPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return ScaleTransition(
            scale: animation,
            child: child,
          );
        },
      ),
    )
    
    // 4. 带旋转转场的 PageRouteBuilder
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return NextPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return RotationTransition(
            turns: animation,
            child: child,
          );
        },
      ),
    )
    ''');
  }
}
```

## 🔧 PageRouteBuilder 实现

### 1. PageRouteBuilder 属性

```dart
// PageRouteBuilder 属性
class PageRouteBuilderProperties {
  void explain() {
    print('''
    PageRouteBuilder 属性：
    
    // 1. 主要属性
    // - pageBuilder：页面构建器
    // - transitionsBuilder：转场构建器
    // - transitionDuration：转场持续时间
    // - reverseTransitionDuration：反向转场持续时间
    
    // 2. 样式属性
    // - opaque：是否不透明
    // - barrierDismissible：是否可点击关闭
    // - barrierColor：遮罩颜色
    // - barrierLabel：遮罩标签
    
    // 3. 示例
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) {
        return NextPage();
      },
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          opacity: animation,
          child: child,
        );
      },
      transitionDuration: Duration(milliseconds: 300),
      reverseTransitionDuration: Duration(milliseconds: 300),
      opaque: true,
      barrierDismissible: false,
      barrierColor: Colors.black54,
      barrierLabel: 'Dismiss',
    )
    ''');
  }
}
```

### 2. PageRouteBuilder 最佳实践

```dart
// PageRouteBuilder 最佳实践
class PageRouteBuilderBestPractices {
  void explain() {
    print('''
    PageRouteBuilder 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多转场动画
    // - 使用适当的转场动画
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的转场动画
    // - 提供反馈
    
    // 5. 示例
    Navigator.push(
      context,
      PageRouteBuilder(
        pageBuilder: (context, animation, secondaryAnimation) {
          return NextPage();
        },
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(
            opacity: animation,
            child: child,
          );
        },
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：PageRouteBuilder 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **转场动画**：合理使用转场动画
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Hero]]
- [[AnimatedContainer]]
- [[AnimatedOpacity]]
- [[TweenAnimationBuilder]]

---

> PageRouteBuilder 是自定义转场动画的重要工具，掌握 PageRouteBuilder 可以提升用户体验。