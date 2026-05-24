# Draggable 详解

> 深入理解 Flutter Draggable Widget。

## 📖 Draggable 概念

### 1. 什么是 Draggable

```dart
// Draggable 概念
class DraggableConcept {
  void explain() {
    print('''
    Draggable 概念：
    
    // 1. 什么是 Draggable
    // - 拖拽 Widget
    // - 支持拖拽操作
    // - 支持拖拽反馈
    // - 支持多种样式
    
    // 2. Draggable 的特点
    // - 支持拖拽操作
    // - 支持拖拽反馈
    // - 支持样式设置
    // - 支持多种样式
    
    // 3. Draggable 的使用场景
    // - 拖拽排序
    // - 拖拽操作
    // - 用户交互
    // - 数据管理
    
    // 4. Draggable 的属性
    // - child：子 Widget
    // - feedback：拖拽反馈 Widget
    // - data：拖拽数据
    // - onDragStarted：拖拽开始回调
    ''');
  }
}
```

### 2. Draggable 示例

```dart
// Draggable 示例
class DraggableExample {
  void explain() {
    print('''
    Draggable 示例：
    
    // 1. 基本 Draggable
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 100,
        height: 100,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
    )
    
    // 2. 带拖拽反馈的 Draggable
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 120,
        height: 120,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
      feedbackOffset: Offset(0, 0),
    )
    
    // 3. 带拖拽事件的 Draggable
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 100,
        height: 100,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
      onDragStarted: () {
        // 拖拽开始
      },
      onDragCompleted: () {
        // 拖拽完成
      },
      onDraggableCanceled: (velocity, offset) {
        // 拖拽取消
      },
    )
    
    // 4. 带拖拽样式的 Draggable
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 100,
        height: 100,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
      childWhenDragging: Container(
        width: 100,
        height: 100,
        color: Colors.grey,
        child: Text('Dragging...'),
      ),
    )
    ''');
  }
}
```

## 🔧 Draggable 实现

### 1. Draggable 属性

```dart
// Draggable 属性
class DraggableProperties {
  void explain() {
    print('''
    Draggable 属性：
    
    // 1. 主要属性
    // - child：子 Widget
    // - feedback：拖拽反馈 Widget
    // - data：拖拽数据
    // - onDragStarted：拖拽开始回调
    
    // 2. 样式属性
    // - feedbackOffset：拖拽反馈偏移
    // - childWhenDragging：拖拽时的子 Widget
    // - axis：拖拽轴
    // - maxSimultaneousDrags：最大同时拖拽数
    
    // 3. 示例
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 100,
        height: 100,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
      feedbackOffset: Offset(0, 0),
      childWhenDragging: Container(
        width: 100,
        height: 100,
        color: Colors.grey,
        child: Text('Dragging...'),
      ),
      axis: null,
      maxSimultaneousDrags: 1,
    )
    ''');
  }
}
```

### 2. Draggable 最佳实践

```dart
// Draggable 最佳实践
class DraggableBestPractices {
  void explain() {
    print('''
    Draggable 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多拖拽操作
    // - 使用适当的拖拽反馈
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的拖拽操作
    // - 提供反馈
    
    // 5. 示例
    Draggable(
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
        child: Text('Drag me'),
      ),
      feedback: Container(
        width: 100,
        height: 100,
        color: Colors.red,
        child: Text('Dragging'),
      ),
      data: 'drag_data',
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Draggable 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **拖拽操作**：合理使用拖拽操作
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[GestureDetector]]
- [[InkWell]]
- [[Dismissible]]
- [[LongPressDraggable]]

---

> Draggable 是拖拽操作的重要工具，掌握 Draggable 可以提升用户体验。