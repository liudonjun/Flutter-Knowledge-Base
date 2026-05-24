# GestureDetector 详解

> 深入理解 Flutter GestureDetector Widget。

## 📖 GestureDetector 概念

### 1. 什么是 GestureDetector

```dart
// GestureDetector 概念
class GestureDetectorConcept {
  void explain() {
    print('''
    GestureDetector 概念：
    
    // 1. 什么是 GestureDetector
    // - 手势检测 Widget
    // - 支持多种手势
    // - 支持手势识别
    // - 支持手势处理
    
    // 2. GestureDetector 的特点
    // - 支持多种手势
    // - 支持手势识别
    // - 支持手势处理
    // - 支持多种样式
    
    // 3. GestureDetector 的使用场景
    // - 点击事件
    // - 长按事件
    // - 拖拽事件
    // - 缩放事件
    
    // 4. GestureDetector 的属性
    // - onTap：点击回调
    // - onLongPress：长按回调
    // - onPanUpdate：拖拽回调
    // - onScaleUpdate：缩放回调
    ''');
  }
}
```

### 2. GestureDetector 示例

```dart
// GestureDetector 示例
class GestureDetectorExample {
  void explain() {
    print('''
    GestureDetector 示例：
    
    // 1. 基本 GestureDetector
    GestureDetector(
      onTap: () {
        // 点击事件
      },
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 2. 带长按的 GestureDetector
    GestureDetector(
      onLongPress: () {
        // 长按事件
      },
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 3. 带拖拽的 GestureDetector
    GestureDetector(
      onPanUpdate: (details) {
        // 拖拽事件
      },
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
      ),
    )
    
    // 4. 带缩放的 GestureDetector
    GestureDetector(
      onScaleUpdate: (details) {
        // 缩放事件
      },
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

## 🔧 GestureDetector 实现

### 1. GestureDetector 属性

```dart
// GestureDetector 属性
class GestureDetectorProperties {
  void explain() {
    print('''
    GestureDetector 属性：
    
    // 1. 主要属性
    // - onTap：点击回调
    // - onLongPress：长按回调
    // - onPanUpdate：拖拽回调
    // - onScaleUpdate：缩放回调
    
    // 2. 样式属性
    // - behavior：行为
    // - excludeFromSemantics：是否排除语义
    // - dragStartBehavior：拖拽开始行为
    // - hitTestBehavior：点击测试行为
    
    // 3. 示例
    GestureDetector(
      onTap: () {
        // 点击事件
      },
      onLongPress: () {
        // 长按事件
      },
      onPanUpdate: (details) {
        // 拖拽事件
      },
      onScaleUpdate: (details) {
        // 缩放事件
      },
      behavior: HitTestBehavior.opaque,
      excludeFromSemantics: false,
      dragStartBehavior: DragStartBehavior.start,
      hitTestBehavior: HitTestBehavior.deferToChild,
    )
    ''');
  }
}
```

### 2. GestureDetector 最佳实践

```dart
// GestureDetector 最佳实践
class GestureDetectorBestPractices {
  void explain() {
    print('''
    GestureDetector 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多手势
    // - 使用适当的手势
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的手势
    // - 提供反馈
    
    // 5. 示例
    GestureDetector(
      onTap: () {
        // 点击事件
      },
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

1. **性能考虑**：GestureDetector 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **手势识别**：合理使用手势识别
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[InkWell]]
- [[Dismissible]]
- [[Draggable]]
- [[LongPressDraggable]]

---

> GestureDetector 是手势识别的重要工具，掌握 GestureDetector 可以提升用户体验。