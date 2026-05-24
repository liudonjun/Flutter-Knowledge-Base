# Hero 详解

> 深入理解 Flutter Hero Widget。

## 📖 Hero 概念

### 1. 什么是 Hero

```dart
// Hero 概念
class HeroConcept {
  void explain() {
    print('''
    Hero 概念：
    
    // 1. 什么是 Hero
    // - Hero 动画 Widget
    // - 支持页面转场动画
    // - 支持 Hero 动画
    // - 支持多种样式
    
    // 2. Hero 的特点
    // - 支持页面转场动画
    // - 支持 Hero 动画
    // - 支持样式设置
    // - 支持多种样式
    
    // 3. Hero 的使用场景
    // - 页面转场动画
    // - 图片预览
    // - 详情页面
    // - 用户交互
    
    // 4. Hero 的属性
    // - tag：标签
    // - child：子 Widget
    // - flightShuttleBuilder：飞行构建器
    // - placeholderBuilder：占位符构建器
    ''');
  }
}
```

### 2. Hero 示例

```dart
// Hero 示例
class HeroExample {
  void explain() {
    print('''
    Hero 示例：
    
    // 1. 基本 Hero
    Hero(
      tag: 'hero_tag',
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 带飞行构建器的 Hero
    Hero(
      tag: 'hero_tag',
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
      flightShuttleBuilder: (flightContext, animation, flightDirection, fromHeroContext, toHeroContext) {
        return Container(
          width: 100,
          height: 100,
          color: Colors.red,
        );
      },
    )
    
    // 3. 带占位符构建器的 Hero
    Hero(
      tag: 'hero_tag',
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
      placeholderBuilder: (context, heroSize, child) {
        return Container(
          width: heroSize.width,
          height: heroSize.height,
          color: Colors.grey,
        );
      },
    )
    
    // 4. 带过渡动画的 Hero
    Hero(
      tag: 'hero_tag',
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
      createRectTween: (begin, end) {
        return RectTween(begin: begin, end: end);
      },
    )
    ''');
  }
}
```

## 🔧 Hero 实现

### 1. Hero 属性

```dart
// Hero 属性
class HeroProperties {
  void explain() {
    print('''
    Hero 属性：
    
    // 1. 主要属性
    // - tag：标签
    // - child：子 Widget
    // - flightShuttleBuilder：飞行构建器
    // - placeholderBuilder：占位符构建器
    
    // 2. 样式属性
    // - createRectTween：矩形补间
    // - transitionOnUserGestures：用户手势过渡
    
    // 3. 示例
    Hero(
      tag: 'hero_tag',
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
      flightShuttleBuilder: (flightContext, animation, flightDirection, fromHeroContext, toHeroContext) {
        return Container(
          width: 100,
          height: 100,
          color: Colors.red,
        );
      },
      placeholderBuilder: (context, heroSize, child) {
        return Container(
          width: heroSize.width,
          height: heroSize.height,
          color: Colors.grey,
        );
      },
      createRectTween: (begin, end) {
        return RectTween(begin: begin, end: end);
      },
      transitionOnUserGestures: false,
    )
    ''');
  }
}
```

### 2. Hero 最佳实践

```dart
// Hero 最佳实践
class HeroBestPractices {
  void explain() {
    print('''
    Hero 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多 Hero 动画
    // - 使用适当的标签
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的 Hero 动画
    // - 提供反馈
    
    // 5. 示例
    Hero(
      tag: 'hero_tag',
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

## ⚠️ 注意事项

1. **性能考虑**：Hero 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **Hero 动画**：合理使用 Hero 动画
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AnimatedContainer]]
- [[AnimatedOpacity]]
- [[AnimatedPositioned]]
- [[TweenAnimationBuilder]]

---

> Hero 是页面转场动画的重要工具，掌握 Hero 可以提升用户体验。