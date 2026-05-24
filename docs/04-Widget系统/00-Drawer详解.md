# Drawer 详解

> 深入理解 Flutter Drawer Widget。

## 📖 Drawer 概念

### 1. 什么是 Drawer

```dart
// Drawer 概念
class DrawerConcept {
  void explain() {
    print('''
    Drawer 概念：
    
    // 1. 什么是 Drawer
    // - 抽屉菜单 Widget
    // - 从屏幕边缘滑出
    // - 包含导航链接
    // - 支持多种样式
    
    // 2. Drawer 的特点
    // - 从边缘滑出
    // - 支持导航
    // - 支持自定义内容
    // - 支持多种样式
    
    // 3. Drawer 的使用场景
    // - 导航菜单
    // - 用户信息
    // - 设置页面
    // - 帮助页面
    
    // 4. Drawer 的属性
    // - child：子 Widget
    // - elevation：阴影
    // - semanticLabel：语义标签
    ''');
  }
}
```

### 2. Drawer 示例

```dart
// Drawer 示例
class DrawerExample {
  void explain() {
    print('''
    Drawer 示例：
    
    // 1. 基本 Drawer
    Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text('Header'),
          ),
          ListTile(
            title: Text('Item 1'),
            onTap: () {
              // 点击事件
            },
          ),
          ListTile(
            title: Text('Item 2'),
            onTap: () {
              // 点击事件
            },
          ),
        ],
      ),
    )
    
    // 2. 带用户信息的 Drawer
    Drawer(
      child: ListView(
        children: [
          UserAccountsDrawerHeader(
            accountName: Text('John Doe'),
            accountEmail: Text('john@example.com'),
            currentAccountPicture: CircleAvatar(
              child: Text('JD'),
            ),
          ),
          ListTile(
            title: Text('Home'),
            leading: Icon(Icons.home),
            onTap: () {
              // 导航到首页
            },
          ),
          ListTile(
            title: Text('Settings'),
            leading: Icon(Icons.settings),
            onTap: () {
              // 导航到设置
            },
          ),
        ],
      ),
    )
    
    // 3. 自定义样式的 Drawer
    Drawer(
      elevation: 16,
      child: Container(
        color: Colors.white,
        child: ListView(
          children: [
            // 自定义内容
          ],
        ),
      ),
    )
    ''');
  }
}
```

## 🔧 Drawer 实现

### 1. Drawer 属性

```dart
// Drawer 属性
class DrawerProperties {
  void explain() {
    print('''
    Drawer 属性：
    
    // 1. 主要属性
    // - child：子 Widget
    // - elevation：阴影高度
    // - semanticLabel：语义标签
    
    // 2. 样式属性
    // - backgroundColor：背景颜色
    // - width：宽度
    // - shape：形状
    
    // 3. 行为属性
    // - isScrollControlled：是否可滚动控制
    // - enableDrag：是否可拖拽
    
    // 4. 示例
    Drawer(
      child: ListView(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text('Header'),
          ),
          ListTile(
            title: Text('Item 1'),
            onTap: () {
              // 点击事件
            },
          ),
        ],
      ),
      elevation: 16,
      semanticLabel: 'Navigation menu',
    )
    ''');
  }
}
```

### 2. Drawer 最佳实践

```dart
// Drawer 最佳实践
class DrawerBestPractices {
  void explain() {
    print('''
    Drawer 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多菜单项
    // - 使用图标和文字
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的导航
    // - 使用适当的图标
    // - 提供反馈
    
    // 5. 示例
    Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text('Header'),
          ),
          ListTile(
            title: const Text('Home'),
            leading: const Icon(Icons.home),
            onTap: () {
              // 导航到首页
            },
          ),
        ],
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Drawer 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **导航设计**：设计清晰的导航
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AppBar]]
- [[BottomNavigationBar]]
- [[Scaffold]]
- [[NavigationRail]]

---

> Drawer 是应用的重要组成部分，掌握 Drawer 可以提升用户体验。