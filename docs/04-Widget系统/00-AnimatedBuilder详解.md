# AnimatedBuilder 详解

> 深入理解 Flutter AnimatedBuilder Widget。

## 📖 AnimatedBuilder 概念

### 1. 什么是 AnimatedBuilder

```dart
// AnimatedBuilder 概念
class AnimatedBuilderConcept {
  void explain() {
    print('''
    AnimatedBuilder 概念：
    
    // 1. 什么是 AnimatedBuilder
    // - 动画构建器 Widget
    // - 用于构建动画
    // - 支持自定义动画
    // - 支持性能优化
    
    // 2. AnimatedBuilder 的特点
    // - 支持自定义动画
    // - 支持性能优化
    // - 支持动画控制器
    // - 支持动画监听
    
    // 3. AnimatedBuilder 的使用场景
    // - 自定义动画
    // - 复杂动画
    // - 性能优化
    // - 动画组合
    
    // 4. AnimatedBuilder 的属性
    // - animation：动画
    // - builder：构建器
    // - child：子 Widget
    ''');
  }
}
```

### 2. AnimatedBuilder 示例

```dart
// AnimatedBuilder 示例
class AnimatedBuilderExample {
  void explain() {
    print('''
    AnimatedBuilder 示例：
    
    // 1. 基本 AnimatedBuilder
    AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * 2 * 3.14159,
          child: child,
        );
      },
      child: Icon(Icons.refresh),
    )
    
    // 2. 带子 Widget 的 AnimatedBuilder
    AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Opacity(
          opacity: _controller.value,
          child: child,
        );
      },
      child: Text('Hello'),
    )
    
    // 3. 带复杂动画的 AnimatedBuilder
    AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.scale(
          scale: _controller.value,
          child: Transform.rotate(
            angle: _controller.value * 2 * 3.14159,
            child: child,
          ),
        );
      },
      child: Icon(Icons.star),
    )
    ''');
  }
}
```

## 🔧 AnimatedBuilder 实现

### 1. AnimatedBuilder 属性

```dart
// AnimatedBuilder 属性
class AnimatedBuilderProperties {
  void explain() {
    print('''
    AnimatedBuilder 属性：
    
    // 1. 主要属性
    // - animation：动画
    // - builder：构建器
    // - child：子 Widget
    
    // 2. 示例
    AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * 2 * 3.14159,
          child: child,
        );
      },
      child: Icon(Icons.refresh),
    )
    ''');
  }
}
```

### 2. AnimatedBuilder 最佳实践

```dart
// AnimatedBuilder 最佳实践
class AnimatedBuilderBestPractices {
  void explain() {
    print('''
    AnimatedBuilder 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多动画
    // - 使用适当的持续时间
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的动画
    // - 提供反馈
    
    // 5. 示例
    AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return Transform.rotate(
          angle: _controller.value * 2 * 3.14159,
          child: child,
        );
      },
      child: const Icon(Icons.refresh),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：AnimatedBuilder 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **动画性能**：优化动画性能
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AnimatedContainer]]
- [[AnimatedOpacity]]
- [[TweenAnimationBuilder]]
- [[Hero]]

---

> AnimatedBuilder 是自定义动画的重要工具，掌握 AnimatedBuilder 可以提升用户体验。