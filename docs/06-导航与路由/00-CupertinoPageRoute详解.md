# CupertinoPageRoute 详解

> 深入理解 Flutter 中的 CupertinoPageRoute。

## 📖 CupertinoPageRoute 基础

### 1. 什么是 CupertinoPageRoute

```dart
// CupertinoPageRoute 概念
class CupertinoPageRouteConcept {
  void explain() {
    print('''
    CupertinoPageRoute 概念：
    
    // 1. 什么是 CupertinoPageRoute
    // - iOS 风格的页面路由
    // - 提供滑动返回手势
    // - 支持页面转场动画
    // - 遵循 iOS 设计规范
    
    // 2. CupertinoPageRoute 的特点
    // - iOS 风格：符合 iOS 设计规范
    // - 滑动返回：支持右滑返回
    // - 转场动画：平滑的页面切换
    // - 导航栏：自动处理导航栏
    
    // 3. CupertinoPageRoute 的使用场景
    // - iOS 应用：需要 iOS 风格
    // - 跨平台：保持平台一致性
    // - 用户体验：提供原生体验
    ''');
  }
}
```

### 2. CupertinoPageRoute 使用示例

```dart
// CupertinoPageRoute 使用示例
class CupertinoPageRouteExample {
  void explain() {
    print('''
    CupertinoPageRoute 使用示例：
    
    // 1. 基本使用
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => DetailsPage(),
      ),
    );
    
    // 2. 带标题的路由
    Navigator.push(
      context,
      CupertinoPageRoute(
        title: 'Details',
        builder: (context) => DetailsPage(),
      ),
    );
    
    // 3. 自定义转场动画
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => DetailsPage(),
        fullscreenDialog: true,  // 全屏对话框样式
      ),
    );
    
    // 4. 在 CupertinoApp 中使用
    CupertinoApp(
      routes: {
        '/': (context) => HomePage(),
        '/details': (context) => DetailsPage(),
      },
    );
    ''');
  }
}
```

## 🔧 CupertinoPageRoute 属性

### 1. 主要属性

```dart
// 主要属性
class CupertinoPageRouteProperties {
  void explain() {
    print('''
    CupertinoPageRoute 主要属性：
    
    // 1. builder
    // - 页面构建器
    // - 必需属性
    // - 返回要显示的 Widget
    
    // 2. title
    // - 页面标题
    // - 显示在导航栏中
    // - 用于路由历史
    
    // 3. fullscreenDialog
    // - 是否全屏对话框
    // - 影响转场动画
    // - 默认 false
    
    // 4. maintainState
    // - 是否维护状态
    // - 默认 true
    // - 影响内存使用
    
    // 5. settings
    // - 路由设置
    // - 包含路由名称
    // - 用于路由管理
    
    // 示例
    CupertinoPageRoute(
      builder: (context) => DetailsPage(),
      title: 'Details',
      fullscreenDialog: false,
      maintainState: true,
      settings: RouteSettings(name: '/details'),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **CupertinoPageRoute 主要用于 iOS 风格应用**
2. **注意 fullscreenDialog 对转场动画的影响**
3. **合理使用 title 属性**
4. **考虑 maintainState 对内存的影响**

## 🔗 相关链接

- [[CupertinoNavigationBar]]
- [[CupertinoTabBar]]
- [[Navigator基础]]
- [[页面跳转详解]]

---

> CupertinoPageRoute 是 iOS 风格应用的重要组成部分，掌握它对于构建原生体验的应用非常重要。