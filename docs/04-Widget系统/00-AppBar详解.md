# AppBar 详解

> 深入理解 Flutter AppBar Widget。

## 📖 AppBar 概念

### 1. 什么是 AppBar

```dart
// AppBar 概念
class AppBarConcept {
  void explain() {
    print('''
    AppBar 概念：
    
    // 1. 什么是 AppBar
    // - 应用栏 Widget
    // - 显示在页面顶部
    // - 包含标题、操作按钮等
    // - 支持多种样式
    
    // 2. AppBar 的特点
    // - 固定在顶部
    // - 支持标题
    // - 支持操作按钮
    // - 支持返回按钮
    // - 支持多种样式
    
    // 3. AppBar 的使用场景
    // - 页面标题
    // - 导航控制
    // - 操作按钮
    // - 搜索框
    // - 标签页
    
    // 4. AppBar 的属性
    // - title：标题
    // - leading：前导按钮
    // - actions：操作按钮
    // - backgroundColor：背景颜色
    // - elevation：阴影
    ''');
  }
}
```

### 2. AppBar 示例

```dart
// AppBar 示例
class AppBarExample {
  void explain() {
    print('''
    AppBar 示例：
    
    // 1. 基本 AppBar
    AppBar(
      title: Text('My App'),
    )
    
    // 2. 带返回按钮的 AppBar
    AppBar(
      title: Text('My App'),
      leading: IconButton(
        icon: Icon(Icons.arrow_back),
        onPressed: () {
          Navigator.pop(context);
        },
      ),
    )
    
    // 3. 带操作按钮的 AppBar
    AppBar(
      title: Text('My App'),
      actions: [
        IconButton(
          icon: Icon(Icons.search),
          onPressed: () {
            // 搜索
          },
        ),
        IconButton(
          icon: Icon(Icons.more_vert),
          onPressed: () {
            // 更多
          },
        ),
      ],
    )
    
    // 4. 自定义样式的 AppBar
    AppBar(
      title: Text('My App'),
      backgroundColor: Colors.blue,
      elevation: 4,
      centerTitle: true,
      titleTextStyle: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    )
    ''');
  }
}
```

## 🔧 AppBar 实现

### 1. AppBar 属性

```dart
// AppBar 属性
class AppBarProperties {
  void explain() {
    print('''
    AppBar 属性：
    
    // 1. 主要属性
    // - title：标题 Widget
    // - leading：前导 Widget
    // - actions：操作 Widget 列表
    // - backgroundColor：背景颜色
    // - elevation：阴影高度
    
    // 2. 样式属性
    // - centerTitle：标题居中
    // - titleTextStyle：标题样式
    // - iconTheme：图标主题
    // - actionsIconTheme：操作图标主题
    
    // 3. 行为属性
    // - automaticallyImplyLeading：自动添加返回按钮
    // - primary：是否在状态栏下方
    // - toolbarHeight：工具栏高度
    // - bottom：底部 Widget（如 TabBar）
    
    // 4. 示例
    AppBar(
      title: Text('My App'),
      leading: IconButton(
        icon: Icon(Icons.menu),
        onPressed: () {
          // 打开抽屉
        },
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.search),
          onPressed: () {
            // 搜索
          },
        ),
        IconButton(
          icon: Icon(Icons.more_vert),
          onPressed: () {
            // 更多
          },
        ),
      ],
      backgroundColor: Colors.blue,
      elevation: 4,
      centerTitle: true,
    )
    ''');
  }
}
```

### 2. AppBar 最佳实践

```dart
// AppBar 最佳实践
class AppBarBestPractices {
  void explain() {
    print('''
    AppBar 最佳实践：
    
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
    
    // 4. 响应式设计
    // - 考虑不同屏幕尺寸
    // - 使用灵活的布局
    // - 避免固定尺寸
    
    // 5. 示例
    AppBar(
      title: const Text('My App'),
      actions: [
        IconButton(
          icon: const Icon(Icons.search),
          onPressed: () {
            // 搜索
          },
        ),
      ],
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：AppBar 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **响应式设计**：考虑不同屏幕尺寸
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Scaffold]]
- [[Drawer]]
- [[BottomNavigationBar]]
- [[TabBar]]

---

> AppBar 是应用的重要组成部分，掌握 AppBar 可以提升用户体验。