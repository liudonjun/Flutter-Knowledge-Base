# Hero 动画详解

> 深入理解 Flutter 中的 Hero 动画。

## 📖 Hero 动画基础

### 1. 什么是 Hero 动画

```dart
// Hero 动画概念
class HeroAnimationConcept {
  void explain() {
    print('''
    Hero 动画概念：
    
    // 1. 什么是 Hero 动画
    // - 页面切换时的共享元素动画
    // - 将元素从一个页面飞到另一个页面
    // - 提供视觉连续性
    // - 增强用户体验
    
    // 2. Hero 动画的特点
    // - 共享元素：两个页面共享同一个元素
    // - 自动动画：自动计算动画路径
    // - 流畅过渡：提供流畅的视觉效果
    // - 易于使用：只需设置 Hero Widget
    
    // 3. Hero 动画的使用场景
    // - 列表到详情：点击列表项查看详情
    // - 图片预览：点击图片放大预览
    // - 页面切换：提供连续的视觉效果
    // - 交互反馈：响应用户点击
    ''');
  }
}
```

### 2. Hero 动画配置

```dart
// Hero 动画配置
class HeroAnimationConfiguration {
  void explain() {
    print('''
    Hero 动画配置：
    
    // 1. 基本配置
    // 源页面
    Hero(
      tag: 'hero-tag',
      child: Image.network('https://example.com/image.jpg'),
    )
    
    // 目标页面
    Hero(
      tag: 'hero-tag',
      child: Image.network('https://example.com/image.jpg'),
    )
    
    // 2. 使用 Navigator
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(),
      ),
    )
    
    // 3. 使用 PageRouteBuilder
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
    ''');
  }
}
```

## 🔧 Hero 动画使用

### 1. 自定义 Hero 动画

```dart
// 自定义 Hero 动画
class CustomHeroAnimation {
  void explain() {
    print('''
    自定义 Hero 动画：
    
    // 1. 使用 flightShuttleBuilder
    Hero(
      tag: 'hero-tag',
      flightShuttleBuilder: (flightContext, animation, flightDirection, fromHeroContext, toHeroContext) {
        return RotationTransition(
          turns: animation,
          child: Icon(Icons.star),
        );
      },
      child: Icon(Icons.star),
    )
    
    // 2. 使用 createRectTween
    Hero(
      tag: 'hero-tag',
      createRectTween: (begin, end) {
        return MaterialRectCenterArcTween(begin: begin, end: end);
      },
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 3. 使用 placeholderBuilder
    Hero(
      tag: 'hero-tag',
      placeholderBuilder: (context, heroSize, child) {
        return Container(
          width: heroSize.width,
          height: heroSize.height,
          color: Colors.grey,
        );
      },
      child: Image.network('https://example.com/image.jpg'),
    )
    ''');
  }
}
```

### 2. Hero 动画最佳实践

```dart
// Hero 动画最佳实践
class HeroAnimationBestPractices {
  void explain() {
    print('''
    Hero 动画最佳实践：
    
    // 1. 使用唯一的 tag
    // 确保每个 Hero 的 tag 是唯一的
    Hero(
      tag: 'unique-tag-$id',  // 使用 ID 确保唯一性
      child: Image.network('https://example.com/image.jpg'),
    )
    
    // 2. 保持 Hero Widget 简单
    // Hero Widget 应该简单，避免复杂动画
    Hero(
      tag: 'hero-tag',
      child: Image.network('https://example.com/image.jpg'),
    )
    
    // 3. 考虑动画性能
    // 使用简单的 Widget 作为 Hero
    Hero(
      tag: 'hero-tag',
      child: Image.network('https://example.com/image.jpg'),
    )
    
    // 4. 测试不同设备
    // 在不同设备上测试 Hero 动画
    // 确保动画流畅
    ''');
  }
}
```

## ⚠️ 注意事项

1. **Hero 的 tag 必须唯一**
2. **Hero Widget 应该简单**
3. **注意动画性能**
4. **测试不同设备**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由动画详解]]
- [[AnimatedContainer详解]]

---

> Hero 动画是提升用户体验的重要手段，掌握它对于创建流畅的应用非常重要。