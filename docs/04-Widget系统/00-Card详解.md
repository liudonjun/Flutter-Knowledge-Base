# Card 详解

> 深入理解 Flutter Card Widget。

## 📖 Card 概念

### 1. 什么是 Card

```dart
// Card 概念
class CardConcept {
  void explain() {
    print('''
    Card 概念：
    
    // 1. 什么是 Card
    // - 卡片 Widget
    // - 包含相关内容
    // - 支持阴影和圆角
    // - 支持多种样式
    
    // 2. Card 的特点
    // - 支持阴影
    // - 支持圆角
    // - 支持边距
    // - 支持多种样式
    
    // 3. Card 的使用场景
    // - 信息展示
    // - 列表项
    // - 详情页面
    // - 数据展示
    
    // 4. Card 的属性
    // - child：子 Widget
    // - elevation：阴影高度
    // - shape：形状
    // - color：颜色
    ''');
  }
}
```

### 2. Card 示例

```dart
// Card 示例
class CardExample {
  void explain() {
    print('''
    Card 示例：
    
    // 1. 基本 Card
    Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    
    // 2. 带阴影的 Card
    Card(
      elevation: 8,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    
    // 3. 带圆角的 Card
    Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    
    // 4. 带颜色的 Card
    Card(
      color: Colors.blue,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    ''');
  }
}
```

## 🔧 Card 实现

### 1. Card 属性

```dart
// Card 属性
class CardProperties {
  void explain() {
    print('''
    Card 属性：
    
    // 1. 主要属性
    // - child：子 Widget
    // - elevation：阴影高度
    // - shape：形状
    // - color：颜色
    
    // 2. 样式属性
    // - shadowColor：阴影颜色
    // - surfaceTintColor：表面颜色
    // - margin：外边距
    // - clipBehavior：裁剪行为
    
    // 3. 行为属性
    // - borderOnForeground：边框是否在前景
    // - semanticContainer：语义容器
    
    // 4. 示例
    Card(
      elevation: 8,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      color: Colors.white,
      shadowColor: Colors.black,
      surfaceTintColor: Colors.blue,
      margin: EdgeInsets.all(16),
      clipBehavior: Clip.antiAlias,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    ''');
  }
}
```

### 2. Card 最佳实践

```dart
// Card 最佳实践
class CardBestPractices {
  void explain() {
    print('''
    Card 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多内容
    // - 使用适当的边距
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的阴影
    // - 提供反馈
    
    // 5. 示例
    Card(
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text('Hello Card'),
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Card 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **视觉层次**：设计清晰的视觉层次
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[ListTile]]
- [[Container]]
- [[Scaffold]]
- [[AppBar]]

---

> Card 是应用的重要组成部分，掌握 Card 可以提升用户体验。