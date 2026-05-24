# Dismissible 详解

> 深入理解 Flutter Dismissible Widget。

## 📖 Dismissible 概念

### 1. 什么是 Dismissible

```dart
// Dismissible 概念
class DismissibleConcept {
  void explain() {
    print('''
    Dismissible 概念：
    
    // 1. 什么是 Dismissible
    // - 滑动删除 Widget
    // - 支持滑动删除
    // - 支持滑动操作
    // - 支持多种样式
    
    // 2. Dismissible 的特点
    // - 支持滑动删除
    // - 支持滑动操作
    // - 支持样式设置
    // - 支持多种样式
    
    // 3. Dismissible 的使用场景
    // - 列表项删除
    // - 滑动操作
    // - 用户交互
    // - 数据管理
    
    // 4. Dismissible 的属性
    // - key：唯一标识
    // - child：子 Widget
    // - background：背景 Widget
    // - onDismissed：删除回调
    ''');
  }
}
```

### 2. Dismissible 示例

```dart
// Dismissible 示例
class DismissibleExample {
  void explain() {
    print('''
    Dismissible 示例：
    
    // 1. 基本 Dismissible
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      onDismissed: (direction) {
        // 删除回调
      },
    )
    
    // 2. 带背景的 Dismissible
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      background: Container(
        color: Colors.red,
        child: Icon(Icons.delete),
      ),
      onDismissed: (direction) {
        // 删除回调
      },
    )
    
    // 3. 带确认的 Dismissible
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      confirmDismiss: (direction) async {
        // 确认删除
        return true;
      },
      onDismissed: (direction) {
        // 删除回调
      },
    )
    
    // 4. 带方向的 Dismissible
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      direction: DismissDirection.endToStart,
      onDismissed: (direction) {
        // 删除回调
      },
    )
    ''');
  }
}
```

## 🔧 Dismissible 实现

### 1. Dismissible 属性

```dart
// Dismissible 属性
class DismissibleProperties {
  void explain() {
    print('''
    Dismissible 属性：
    
    // 1. 主要属性
    // - key：唯一标识
    // - child：子 Widget
    // - background：背景 Widget
    // - onDismissed：删除回调
    
    // 2. 样式属性
    // - secondaryBackground：次要背景 Widget
    // - confirmDismiss：确认删除回调
    // - direction：滑动方向
    // - movementDuration：移动持续时间
    
    // 3. 示例
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      background: Container(
        color: Colors.red,
        child: Icon(Icons.delete),
      ),
      secondaryBackground: Container(
        color: Colors.green,
        child: Icon(Icons.archive),
      ),
      confirmDismiss: (direction) async {
        // 确认删除
        return true;
      },
      direction: DismissDirection.endToStart,
      movementDuration: Duration(milliseconds: 200),
    )
    ''');
  }
}
```

### 2. Dismissible 最佳实践

```dart
// Dismissible 最佳实践
class DismissibleBestPractices {
  void explain() {
    print('''
    Dismissible 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多滑动操作
    // - 使用适当的背景
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的滑动操作
    // - 提供反馈
    
    // 5. 示例
    Dismissible(
      key: Key('item_1'),
      child: ListTile(
        title: Text('Item 1'),
      ),
      onDismissed: (direction) {
        // 删除回调
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Dismissible 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **滑动操作**：合理使用滑动操作
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[GestureDetector]]
- [[InkWell]]
- [[Draggable]]
- [[LongPressDraggable]]

---

> Dismissible 是滑动删除的重要工具，掌握 Dismissible 可以提升用户体验。