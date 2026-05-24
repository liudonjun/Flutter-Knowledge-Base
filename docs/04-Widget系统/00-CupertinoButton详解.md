# CupertinoButton 详解

> 深入理解 Flutter CupertinoButton Widget。

## 📖 CupertinoButton 概念

### 1. 什么是 CupertinoButton

```dart
// CupertinoButton 概念
class CupertinoButtonConcept {
  void explain() {
    print('''
    CupertinoButton 概念：
    
    // 1. 什么是 CupertinoButton
    // - iOS 风格按钮 Widget
    // - 支持点击事件
    // - 支持多种样式
    // - 支持禁用状态
    
    // 2. CupertinoButton 的特点
    // - iOS 风格设计
    // - 支持点击事件
    // - 支持样式设置
    // - 支持禁用状态
    
    // 3. CupertinoButton 的使用场景
    // - iOS 风格应用
    // - 按钮操作
    // - 表单提交
    // - 导航操作
    
    // 4. CupertinoButton 的属性
    // - child：子 Widget
    // - onPressed：点击回调
    // - color：颜色
    // - padding：内边距
    ''');
  }
}
```

### 2. CupertinoButton 示例

```dart
// CupertinoButton 示例
class CupertinoButtonExample {
  void explain() {
    print('''
    CupertinoButton 示例：
    
    // 1. 基本 CupertinoButton
    CupertinoButton(
      child: Text('Click Me'),
      onPressed: () {
        // 点击事件
      },
    )
    
    // 2. 带颜色的 CupertinoButton
    CupertinoButton(
      child: Text('Click Me'),
      onPressed: () {
        // 点击事件
      },
      color: Colors.blue,
    )
    
    // 3. 带填充的 CupertinoButton
    CupertinoButton.filled(
      child: Text('Click Me'),
      onPressed: () {
        // 点击事件
      },
    )
    
    // 4. 禁用的 CupertinoButton
    CupertinoButton(
      child: Text('Click Me'),
      onPressed: null, // 设置为 null 禁用
    )
    ''');
  }
}
```

## 🔧 CupertinoButton 实现

### 1. CupertinoButton 属性

```dart
// CupertinoButton 属性
class CupertinoButtonProperties {
  void explain() {
    print('''
    CupertinoButton 属性：
    
    // 1. 主要属性
    // - child：子 Widget
    // - onPressed：点击回调
    // - color：颜色
    // - padding：内边距
    
    // 2. 样式属性
    // - disabledColor：禁用颜色
    // - minSize：最小尺寸
    // - pressedOpacity：按下透明度
    // - borderRadius：圆角半径
    
    // 3. 行为属性
    // - alignment：对齐方式
    // - focusColor：焦点颜色
    // - focusNode：焦点节点
    // - autofocus：自动焦点
    
    // 4. 示例
    CupertinoButton(
      child: Text('Click Me'),
      onPressed: () {
        // 点击事件
      },
      color: Colors.blue,
      padding: EdgeInsets.all(16),
      disabledColor: Colors.grey,
      minSize: 44,
      pressedOpacity: 0.7,
      borderRadius: BorderRadius.circular(8),
      alignment: Alignment.center,
      focusColor: Colors.blue[100],
      focusNode: _focusNode,
      autofocus: false,
    )
    ''');
  }
}
```

### 2. CupertinoButton 最佳实践

```dart
// CupertinoButton 最佳实践
class CupertinoButtonBestPractices {
  void explain() {
    print('''
    CupertinoButton 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多按钮
    // - 使用适当的样式
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的反馈
    // - 提供验证
    
    // 5. 示例
    CupertinoButton(
      child: const Text('Click Me'),
      onPressed: () {
        // 点击事件
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CupertinoButton 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **iOS 风格**：遵循 iOS 设计规范
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[CupertinoNavigationBar]]
- [[CupertinoTabBar]]
- [[CupertinoPageRoute]]
- [[CupertinoTextField]]

---

> CupertinoButton 是 iOS 风格应用的重要组成部分，掌握 CupertinoButton 可以提升用户体验。