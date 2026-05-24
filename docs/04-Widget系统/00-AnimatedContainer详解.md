# AnimatedContainer 详解

> 深入理解 Flutter AnimatedContainer Widget。

## 📖 AnimatedContainer 概念

### 1. 什么是 AnimatedContainer

```dart
// AnimatedContainer 概念
class AnimatedContainerConcept {
  void explain() {
    print('''
    AnimatedContainer 概念：
    
    // 1. 什么是 AnimatedContainer
    // - 动画容器 Widget
    // - 支持属性动画
    // - 支持曲线动画
    // - 支持持续时间
    
    // 2. AnimatedContainer 的特点
    // - 支持属性动画
    // - 支持曲线动画
    // - 支持持续时间
    // - 支持多种属性
    
    // 3. AnimatedContainer 的使用场景
    // - 尺寸动画
    // - 颜色动画
    // - 位置动画
    // - 形状动画
    
    // 4. AnimatedContainer 的属性
    // - duration：持续时间
    // - curve：曲线
    // - width：宽度
    // - height：高度
    ''');
  }
}
```

### 2. AnimatedContainer 示例

```dart
// AnimatedContainer 示例
class AnimatedContainerExample {
  void explain() {
    print('''
    AnimatedContainer 示例：
    
    // 1. 基本 AnimatedContainer
    AnimatedContainer(
      duration: Duration(seconds: 1),
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
      color: _isExpanded ? Colors.blue : Colors.red,
    )
    
    // 2. 带曲线的 AnimatedContainer
    AnimatedContainer(
      duration: Duration(seconds: 1),
      curve: Curves.easeInOut,
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
      color: _isExpanded ? Colors.blue : Colors.red,
    )
    
    // 3. 带装饰的 AnimatedContainer
    AnimatedContainer(
      duration: Duration(seconds: 1),
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
      decoration: BoxDecoration(
        color: _isExpanded ? Colors.blue : Colors.red,
        borderRadius: BorderRadius.circular(_isExpanded ? 20 : 10),
      ),
    )
    
    // 4. 带子 Widget 的 AnimatedContainer
    AnimatedContainer(
      duration: Duration(seconds: 1),
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
      color: _isExpanded ? Colors.blue : Colors.red,
      child: Text('Hello'),
    )
    ''');
  }
}
```

## 🔧 AnimatedContainer 实现

### 1. AnimatedContainer 属性

```dart
// AnimatedContainer 属性
class AnimatedContainerProperties {
  void explain() {
    print('''
    AnimatedContainer 属性：
    
    // 1. 主要属性
    // - duration：持续时间
    // - curve：曲线
    // - width：宽度
    // - height：高度
    
    // 2. 样式属性
    // - color：颜色
    // - decoration：装饰
    // - foregroundDecoration：前景装饰
    // - margin：外边距
    
    // 3. 行为属性
    // - alignment：对齐方式
    // - padding：内边距
    // - constraints：约束
    // - transform：变换
    
    // 4. 示例
    AnimatedContainer(
      duration: Duration(seconds: 1),
      curve: Curves.easeInOut,
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
      color: _isExpanded ? Colors.blue : Colors.red,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(_isExpanded ? 20 : 10),
      ),
      foregroundDecoration: BoxDecoration(
        border: Border.all(color: Colors.black),
      ),
      margin: EdgeInsets.all(16),
      alignment: Alignment.center,
      padding: EdgeInsets.all(16),
      constraints: BoxConstraints(
        minWidth: 50,
        maxWidth: 300,
        minHeight: 50,
        maxHeight: 300,
      ),
      transform: Matrix4.rotationZ(_isExpanded ? 0.1 : 0),
    )
    ''');
  }
}
```

### 2. AnimatedContainer 最佳实践

```dart
// AnimatedContainer 最佳实践
class AnimatedContainerBestPractices {
  void explain() {
    print('''
    AnimatedContainer 最佳实践：
    
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
    AnimatedContainer(
      duration: Duration(seconds: 1),
      width: _isExpanded ? 200 : 100,
      height: _isExpanded ? 200 : 100,
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：AnimatedContainer 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **动画性能**：优化动画性能
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AnimatedOpacity]]
- [[AnimatedPositioned]]
- [[AnimatedDefaultTextStyle]]
- [[TweenAnimationBuilder]]

---

> AnimatedContainer 是应用的重要组成部分，掌握 AnimatedContainer 可以提升用户体验。