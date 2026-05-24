# AnimatedPositioned 详解

> 深入理解 Flutter AnimatedPositioned Widget。

## 📖 AnimatedPositioned 概念

### 1. 什么是 AnimatedPositioned

```dart
// AnimatedPositioned 概念
class AnimatedPositionedConcept {
  void explain() {
    print('''
    AnimatedPositioned 概念：
    
    // 1. 什么是 AnimatedPositioned
    // - 动画定位 Widget
    // - 支持位置动画
    // - 支持曲线动画
    // - 支持持续时间
    
    // 2. AnimatedPositioned 的特点
    // - 支持位置动画
    // - 支持曲线动画
    // - 支持持续时间
    // - 支持多种属性
    
    // 3. AnimatedPositioned 的使用场景
    // - 位置动画
    // - 移动动画
    // - 布局动画
    // - 交互动画
    
    // 4. AnimatedPositioned 的属性
    // - child：子 Widget
    // - duration：持续时间
    // - curve：曲线
    // - left：左边距
    ''');
  }
}
```

### 2. AnimatedPositioned 示例

```dart
// AnimatedPositioned 示例
class AnimatedPositionedExample {
  void explain() {
    print('''
    AnimatedPositioned 示例：
    
    // 1. 基本 AnimatedPositioned
    Stack(
      children: [
        AnimatedPositioned(
          left: _isMoved ? 200 : 0,
          top: _isMoved ? 200 : 0,
          duration: Duration(seconds: 1),
          child: Container(
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        ),
      ],
    )
    
    // 2. 带曲线的 AnimatedPositioned
    Stack(
      children: [
        AnimatedPositioned(
          left: _isMoved ? 200 : 0,
          top: _isMoved ? 200 : 0,
          duration: Duration(seconds: 1),
          curve: Curves.easeInOut,
          child: Container(
            width: 100,
            height: 100,
            color: Colors.blue,
          ),
        ),
      ],
    )
    
    // 3. 带多个位置的 AnimatedPositioned
    Stack(
      children: [
        AnimatedPositioned(
          left: _isMoved ? 200 : 0,
          top: _isMoved ? 200 : 0,
          right: _isMoved ? 0 : 200,
          bottom: _isMoved ? 0 : 200,
          duration: Duration(seconds: 1),
          child: Container(
            color: Colors.blue,
          ),
        ),
      ],
    )
    ''');
  }
}
```

## 🔧 AnimatedPositioned 实现

### 1. AnimatedPositioned 属性

```dart
// AnimatedPositioned 属性
class AnimatedPositionedProperties {
  void explain() {
    print('''
    AnimatedPositioned 属性：
    
    // 1. 主要属性
    // - child：子 Widget
    // - duration：持续时间
    // - curve：曲线
    // - left：左边距
    
    // 2. 示例
    AnimatedPositioned(
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      duration: Duration(seconds: 1),
      curve: Curves.easeInOut,
      child: Container(),
    )
    ''');
  }
}
```

### 2. AnimatedPositioned 最佳实践

```dart
// AnimatedPositioned 最佳实践
class AnimatedPositionedBestPractices {
  void explain() {
    print('''
    AnimatedPositioned 最佳实践：
    
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
    AnimatedPositioned(
      left: 0,
      top: 0,
      duration: const Duration(seconds: 1),
      child: Container(),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：AnimatedPositioned 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **动画性能**：优化动画性能
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AnimatedContainer]]
- [[AnimatedOpacity]]
- [[AnimatedDefaultTextStyle]]
- [[TweenAnimationBuilder]]

---

> AnimatedPositioned 是位置动画的重要工具，掌握 AnimatedPositioned 可以提升用户体验。