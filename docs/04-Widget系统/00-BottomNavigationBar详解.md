# BottomNavigationBar 详解

> 深入理解 Flutter BottomNavigationBar Widget。

## 📖 BottomNavigationBar 概念

### 1. 什么是 BottomNavigationBar

```dart
// BottomNavigationBar 概念
class BottomNavigationBarConcept {
  void explain() {
    print('''
    BottomNavigationBar 概念：
    
    // 1. 什么是 BottomNavigationBar
    // - 底部导航栏 Widget
    // - 显示在页面底部
    // - 包含导航链接
    // - 支持多种样式
    
    // 2. BottomNavigationBar 的特点
    // - 固定在底部
    // - 支持图标和文字
    // - 支持选中状态
    // - 支持多种样式
    
    // 3. BottomNavigationBar 的使用场景
    // - 主要导航
    // - 页面切换
    // - 功能分类
    // - 快速访问
    
    // 4. BottomNavigationBar 的属性
    // - items：导航项列表
    // - currentIndex：当前选中索引
    // - onTap：点击回调
    // - type：类型（fixed、shifting）
    ''');
  }
}
```

### 2. BottomNavigationBar 示例

```dart
// BottomNavigationBar 示例
class BottomNavigationBarExample {
  void explain() {
    print('''
    BottomNavigationBar 示例：
    
    // 1. 基本 BottomNavigationBar
    BottomNavigationBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
    )
    
    // 2. 带颜色的 BottomNavigationBar
    BottomNavigationBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      selectedItemColor: Colors.blue,
      unselectedItemColor: Colors.grey,
      backgroundColor: Colors.white,
    )
    
    // 3. 带类型的 BottomNavigationBar
    BottomNavigationBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      type: BottomNavigationBarType.fixed,
    )
    ''');
  }
}
```

## 🔧 BottomNavigationBar 实现

### 1. BottomNavigationBar 属性

```dart
// BottomNavigationBar 属性
class BottomNavigationBarProperties {
  void explain() {
    print('''
    BottomNavigationBar 属性：
    
    // 1. 主要属性
    // - items：导航项列表
    // - currentIndex：当前选中索引
    // - onTap：点击回调
    // - type：类型
    
    // 2. 样式属性
    // - backgroundColor：背景颜色
    // - selectedItemColor：选中项颜色
    // - unselectedItemColor：未选中项颜色
    // - selectedFontSize：选中项字体大小
    // - unselectedFontSize：未选中项字体大小
    
    // 3. 行为属性
    // - fixedColor：固定颜色
    // - iconSize：图标大小
    // - elevation：阴影高度
    
    // 4. 示例
    BottomNavigationBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Search',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      backgroundColor: Colors.white,
      selectedItemColor: Colors.blue,
      unselectedItemColor: Colors.grey,
      selectedFontSize: 14,
      unselectedFontSize: 12,
      iconSize: 24,
      elevation: 8,
    )
    ''');
  }
}
```

### 2. BottomNavigationBar 最佳实践

```dart
// BottomNavigationBar 最佳实践
class BottomNavigationBarBestPractices {
  void explain() {
    print('''
    BottomNavigationBar 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多导航项
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
    BottomNavigationBar(
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: 'Search',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：BottomNavigationBar 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **导航设计**：设计清晰的导航
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[AppBar]]
- [[Drawer]]
- [[Scaffold]]
- [[NavigationRail]]

---

> BottomNavigationBar 是应用的重要组成部分，掌握 BottomNavigationBar 可以提升用户体验。