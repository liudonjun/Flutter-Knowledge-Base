# CupertinoNavigationBar 详解

> 深入理解 Flutter CupertinoNavigationBar Widget。

## 📖 CupertinoNavigationBar 概念

### 1. 什么是 CupertinoNavigationBar

```dart
// CupertinoNavigationBar 概念
class CupertinoNavigationBarConcept {
  void explain() {
    print('''
    CupertinoNavigationBar 概念：
    
    // 1. 什么是 CupertinoNavigationBar
    // - iOS 风格导航栏 Widget
    // - 显示在页面顶部
    // - 包含标题、操作按钮等
    // - 支持多种样式
    
    // 2. CupertinoNavigationBar 的特点
    // - iOS 风格设计
    // - 支持标题
    // - 支持操作按钮
    // - 支持返回按钮
    
    // 3. CupertinoNavigationBar 的使用场景
    // - iOS 风格应用
    // - 页面标题
    // - 导航控制
    // - 操作按钮
    
    // 4. CupertinoNavigationBar 的属性
    // - middle：中间 Widget
    // - leading：前导 Widget
    // - trailing：尾部 Widget
    // - backgroundColor：背景颜色
    ''');
  }
}
```

### 2. CupertinoNavigationBar 示例

```dart
// CupertinoNavigationBar 示例
class CupertinoNavigationBarExample {
  void explain() {
    print('''
    CupertinoNavigationBar 示例：
    
    // 1. 基本 CupertinoNavigationBar
    CupertinoNavigationBar(
      middle: Text('My App'),
    )
    
    // 2. 带返回按钮的 CupertinoNavigationBar
    CupertinoNavigationBar(
      middle: Text('My App'),
      leading: CupertinoButton(
        child: Icon(CupertinoIcons.back),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
    )
    
    // 3. 带操作按钮的 CupertinoNavigationBar
    CupertinoNavigationBar(
      middle: Text('My App'),
      trailing: CupertinoButton(
        child: Icon(CupertinoIcons.search),
        onPressed: () {
          // 搜索
        },
      ),
    )
    
    // 4. 自定义样式的 CupertinoNavigationBar
    CupertinoNavigationBar(
      middle: Text('My App'),
      backgroundColor: Colors.blue,
      border: Border(
        bottom: BorderSide(
          color: Colors.grey,
          width: 0.5,
        ),
      ),
    )
    ''');
  }
}
```

## 🔧 CupertinoNavigationBar 实现

### 1. CupertinoNavigationBar 属性

```dart
// CupertinoNavigationBar 属性
class CupertinoNavigationBarProperties {
  void explain() {
    print('''
    CupertinoNavigationBar 属性：
    
    // 1. 主要属性
    // - middle：中间 Widget
    // - leading：前导 Widget
    // - trailing：尾部 Widget
    // - backgroundColor：背景颜色
    
    // 2. 样式属性
    // - border：边框
    // - automaticallyImplyLeading：自动添加返回按钮
    // - automaticallyImplyMiddle：自动添加中间 Widget
    // - padding：内边距
    
    // 3. 示例
    CupertinoNavigationBar(
      middle: Text('My App'),
      leading: CupertinoButton(
        child: Icon(CupertinoIcons.back),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
      trailing: CupertinoButton(
        child: Icon(CupertinoIcons.search),
        onPressed: () {
          // 搜索
        },
      ),
      backgroundColor: Colors.blue,
      border: Border(
        bottom: BorderSide(
          color: Colors.grey,
          width: 0.5,
        ),
      ),
      automaticallyImplyLeading: true,
      automaticallyImplyMiddle: true,
      padding: EdgeInsetsDirectional.only(start: 16, end: 16),
    )
    ''');
  }
}
```

### 2. CupertinoNavigationBar 最佳实践

```dart
// CupertinoNavigationBar 最佳实践
class CupertinoNavigationBarBestPractices {
  void explain() {
    print('''
    CupertinoNavigationBar 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多操作按钮
    // - 使用图标而不是文字
    // - 保持标题简洁
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的图标
    // - 提供反馈
    
    // 5. 示例
    CupertinoNavigationBar(
      middle: const Text('My App'),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CupertinoNavigationBar 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **iOS 风格**：遵循 iOS 设计规范
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[CupertinoApp]]
- [[CupertinoTabBar]]
- [[CupertinoPageRoute]]
- [[CupertinoButton]]

---

> CupertinoNavigationBar 是 iOS 风格应用的重要组成部分，掌握 CupertinoNavigationBar 可以提升用户体验。