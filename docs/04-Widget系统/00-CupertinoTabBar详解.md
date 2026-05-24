# CupertinoTabBar 详解

> 深入理解 Flutter CupertinoTabBar Widget。

## 📖 CupertinoTabBar 概念

### 1. 什么是 CupertinoTabBar

```dart
// CupertinoTabBar 概念
class CupertinoTabBarConcept {
  void explain() {
    print('''
    CupertinoTabBar 概念：
    
    // 1. 什么是 CupertinoTabBar
    // - iOS 风格标签栏 Widget
    // - 显示在页面底部
    // - 包含导航链接
    // - 支持多种样式
    
    // 2. CupertinoTabBar 的特点
    // - iOS 风格设计
    // - 支持图标和文字
    // - 支持选中状态
    // - 支持多种样式
    
    // 3. CupertinoTabBar 的使用场景
    // - iOS 风格应用
    // - 主要导航
    // - 页面切换
    // - 功能分类
    
    // 4. CupertinoTabBar 的属性
    // - items：导航项列表
    // - currentIndex：当前选中索引
    // - onTap：点击回调
    // - backgroundColor：背景颜色
    ''');
  }
}
```

### 2. CupertinoTabBar 示例

```dart
// CupertinoTabBar 示例
class CupertinoTabBarExample {
  void explain() {
    print('''
    CupertinoTabBar 示例：
    
    // 1. 基本 CupertinoTabBar
    CupertinoTabBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.search),
          label: 'Search',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.person),
          label: 'Profile',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
    )
    
    // 2. 带颜色的 CupertinoTabBar
    CupertinoTabBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.search),
          label: 'Search',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      activeColor: Colors.blue,
      inactiveColor: Colors.grey,
      backgroundColor: Colors.white,
    )
    
    // 3. 带边框的 CupertinoTabBar
    CupertinoTabBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.search),
          label: 'Search',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      border: Border(
        top: BorderSide(
          color: Colors.grey,
          width: 0.5,
        ),
      ),
    )
    ''');
  }
}
```

## 🔧 CupertinoTabBar 实现

### 1. CupertinoTabBar 属性

```dart
// CupertinoTabBar 属性
class CupertinoTabBarProperties {
  void explain() {
    print('''
    CupertinoTabBar 属性：
    
    // 1. 主要属性
    // - items：导航项列表
    // - currentIndex：当前选中索引
    // - onTap：点击回调
    // - backgroundColor：背景颜色
    
    // 2. 样式属性
    // - activeColor：选中颜色
    // - inactiveColor：未选中颜色
    // - iconSize：图标大小
    // - border：边框
    
    // 3. 示例
    CupertinoTabBar(
      items: [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.search),
          label: 'Search',
        ),
      ],
      currentIndex: _selectedIndex,
      onTap: _onItemTapped,
      activeColor: Colors.blue,
      inactiveColor: Colors.grey,
      backgroundColor: Colors.white,
      iconSize: 24,
      border: Border(
        top: BorderSide(
          color: Colors.grey,
          width: 0.5,
        ),
      ),
    )
    ''');
  }
}
```

### 2. CupertinoTabBar 最佳实践

```dart
// CupertinoTabBar 最佳实践
class CupertinoTabBarBestPractices {
  void explain() {
    print('''
    CupertinoTabBar 最佳实践：
    
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
    // - 提供清晰的视觉层次
    // - 使用适当的图标
    // - 提供反馈
    
    // 5. 示例
    CupertinoTabBar(
      items: const [
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(CupertinoIcons.search),
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

1. **性能考虑**：CupertinoTabBar 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **iOS 风格**：遵循 iOS 设计规范
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[CupertinoNavigationBar]]
- [[CupertinoPageRoute]]
- [[CupertinoButton]]
- [[CupertinoTextField]]

---

> CupertinoTabBar 是 iOS 风格应用的重要组成部分，掌握 CupertinoTabBar 可以提升用户体验。