# TabBar 详解

> 深入理解 Flutter TabBar Widget。

## 📖 TabBar 概念

### 1. 什么是 TabBar

```dart
// TabBar 概念
class TabBarConcept {
  void explain() {
    print('''
    TabBar 概念：
    
    // 1. 什么是 TabBar
    // - 标签栏 Widget
    // - 显示在 AppBar 底部
    // - 包含标签页
    // - 支持多种样式
    
    // 2. TabBar 的特点
    // - 支持标签页
    // - 支持图标和文字
    // - 支持选中状态
    // - 支持多种样式
    
    // 3. TabBar 的使用场景
    // - 页面分类
    // - 内容切换
    // - 功能分组
    // - 导航
    
    // 4. TabBar 的属性
    // - tabs：标签列表
    // - controller：控制器
    // - isScrollable：是否可滚动
    // - indicatorColor：指示器颜色
    ''');
  }
}
```

### 2. TabBar 示例

```dart
// TabBar 示例
class TabBarExample {
  void explain() {
    print('''
    TabBar 示例：
    
    // 1. 基本 TabBar
    TabBar(
      tabs: [
        Tab(text: 'Tab 1'),
        Tab(text: 'Tab 2'),
        Tab(text: 'Tab 3'),
      ],
    )
    
    // 2. 带图标的 TabBar
    TabBar(
      tabs: [
        Tab(icon: Icon(Icons.home), text: 'Home'),
        Tab(icon: Icon(Icons.search), text: 'Search'),
        Tab(icon: Icon(Icons.person), text: 'Profile'),
      ],
    )
    
    // 3. 带控制器的 TabBar
    TabController(
      length: 3,
      vsync: this,
      child: TabBar(
        controller: _tabController,
        tabs: [
          Tab(text: 'Tab 1'),
          Tab(text: 'Tab 2'),
          Tab(text: 'Tab 3'),
        ],
      ),
    )
    
    // 4. 自定义样式的 TabBar
    TabBar(
      tabs: [
        Tab(text: 'Tab 1'),
        Tab(text: 'Tab 2'),
      ],
      indicatorColor: Colors.blue,
      labelColor: Colors.blue,
      unselectedLabelColor: Colors.grey,
      indicatorSize: TabBarIndicatorSize.label,
    )
    ''');
  }
}
```

## 🔧 TabBar 实现

### 1. TabBar 属性

```dart
// TabBar 属性
class TabBarProperties {
  void explain() {
    print('''
    TabBar 属性：
    
    // 1. 主要属性
    // - tabs：标签列表
    // - controller：控制器
    // - isScrollable：是否可滚动
    // - indicatorColor：指示器颜色
    
    // 2. 样式属性
    // - labelColor：选中标签颜色
    // - unselectedLabelColor：未选中标签颜色
    // - labelStyle：选中标签样式
    // - unselectedLabelStyle：未选中标签样式
    
    // 3. 行为属性
    // - indicatorWeight：指示器高度
    // - indicatorPadding：指示器内边距
    // - indicator：自定义指示器
    // - automaticIndicatorColorAdjustment：自动调整指示器颜色
    
    // 4. 示例
    TabBar(
      tabs: [
        Tab(text: 'Tab 1'),
        Tab(text: 'Tab 2'),
      ],
      controller: _tabController,
      isScrollable: false,
      indicatorColor: Colors.blue,
      labelColor: Colors.blue,
      unselectedLabelColor: Colors.grey,
      labelStyle: TextStyle(fontSize: 16),
      unselectedLabelStyle: TextStyle(fontSize: 14),
      indicatorWeight: 2,
      indicatorPadding: EdgeInsets.symmetric(horizontal: 16),
    )
    ''');
  }
}
```

### 2. TabBar 最佳实践

```dart
// TabBar 最佳实践
class TabBarBestPractices {
  void explain() {
    print('''
    TabBar 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多标签
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
    TabBar(
      tabs: const [
        Tab(text: 'Tab 1'),
        Tab(text: 'Tab 2'),
      ],
      controller: _tabController,
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：TabBar 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **导航设计**：设计清晰的导航
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AppBar]]
- [[TabBarView]]
- [[Scaffold]]
- [[BottomNavigationBar]]

---

> TabBar 是应用的重要组成部分，掌握 TabBar 可以提升用户体验。