# CupertinoAlertDialog 详解

> 深入理解 Flutter CupertinoAlertDialog Widget。

## 📖 CupertinoAlertDialog 概念

### 1. 什么是 CupertinoAlertDialog

```dart
// CupertinoAlertDialog 概念
class CupertinoAlertDialogConcept {
  void explain() {
    print('''
    CupertinoAlertDialog 概念：
    
    // 1. 什么是 CupertinoAlertDialog
    // - iOS 风格对话框 Widget
    // - 显示警告信息
    // - 支持多种操作
    // - 支持多种样式
    
    // 2. CupertinoAlertDialog 的特点
    // - iOS 风格设计
    // - 支持标题和内容
    // - 支持多个操作按钮
    // - 支持多种样式
    
    // 3. CupertinoAlertDialog 的使用场景
    // - iOS 风格应用
    // - 警告信息
    // - 确认操作
    // - 用户交互
    
    // 4. CupertinoAlertDialog 的属性
    // - title：标题
    // - content：内容
    // - actions：操作按钮
    // - scrollController：滚动控制器
    ''');
  }
}
```

### 2. CupertinoAlertDialog 示例

```dart
// CupertinoAlertDialog 示例
class CupertinoAlertDialogExample {
  void explain() {
    print('''
    CupertinoAlertDialog 示例：
    
    // 1. 基本 CupertinoAlertDialog
    showCupertinoDialog(
      context: context,
      builder: (context) {
        return CupertinoAlertDialog(
          title: Text('Warning'),
          content: Text('Are you sure?'),
          actions: [
            CupertinoDialogAction(
              child: Text('Cancel'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            CupertinoDialogAction(
              child: Text('OK'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    )
    
    // 2. 带多个操作的 CupertinoAlertDialog
    showCupertinoDialog(
      context: context,
      builder: (context) {
        return CupertinoAlertDialog(
          title: Text('Choose Option'),
          content: Text('Select one option'),
          actions: [
            CupertinoDialogAction(
              child: Text('Option 1'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            CupertinoDialogAction(
              child: Text('Option 2'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            CupertinoDialogAction(
              child: Text('Option 3'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    )
    ''');
  }
}
```

## 🔧 CupertinoAlertDialog 实现

### 1. CupertinoAlertDialog 属性

```dart
// CupertinoAlertDialog 属性
class CupertinoAlertDialogProperties {
  void explain() {
    print('''
    CupertinoAlertDialog 属性：
    
    // 1. 主要属性
    // - title：标题
    // - content：内容
    // - actions：操作按钮
    // - scrollController：滚动控制器
    
    // 2. 示例
    CupertinoAlertDialog(
      title: Text('Warning'),
      content: Text('Are you sure?'),
      actions: [
        CupertinoDialogAction(
          child: Text('Cancel'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        CupertinoDialogAction(
          child: Text('OK'),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ],
      scrollController: ScrollController(),
    )
    ''');
  }
}
```

### 2. CupertinoAlertDialog 最佳实践

```dart
// CupertinoAlertDialog 最佳实践
class CupertinoAlertDialogBestPractices {
  void explain() {
    print('''
    CupertinoAlertDialog 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多操作按钮
    // - 使用适当的标题和内容
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的操作按钮
    // - 提供反馈
    
    // 5. 示例
    showCupertinoDialog(
      context: context,
      builder: (context) {
        return CupertinoAlertDialog(
          title: const Text('Warning'),
          content: const Text('Are you sure?'),
          actions: [
            CupertinoDialogAction(
              child: const Text('Cancel'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
            CupertinoDialogAction(
              child: const Text('OK'),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        );
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CupertinoAlertDialog 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **iOS 风格**：遵循 iOS 设计规范
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[CupertinoNavigationBar]]
- [[CupertinoTabBar]]
- [[CupertinoPageRoute]]
- [[CupertinoButton]]

---

> CupertinoAlertDialog 是 iOS 风格应用的重要组成部分，掌握 CupertinoAlertDialog 可以提升用户体验。