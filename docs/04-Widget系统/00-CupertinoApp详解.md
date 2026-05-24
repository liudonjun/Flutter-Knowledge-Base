# CupertinoApp 详解

> 深入理解 Flutter CupertinoApp Widget。

## 📖 CupertinoApp 概念

### 1. 什么是 CupertinoApp

```dart
// CupertinoApp 概念
class CupertinoAppConcept {
  void explain() {
    print('''
    CupertinoApp 概念：
    
    // 1. 什么是 CupertinoApp
    // - iOS 风格应用 Widget
    // - 提供 iOS 风格的主题
    // - 支持 iOS 风格的导航
    // - 支持多种样式
    
    // 2. CupertinoApp 的特点
    // - iOS 风格主题
    // - iOS 风格导航
    // - iOS 风格组件
    // - 支持多种样式
    
    // 3. CupertinoApp 的使用场景
    // - iOS 风格应用
    // - 跨平台应用
    // - 原生 iOS 体验
    // - 统一风格
    
    // 4. CupertinoApp 的属性
    // - home：首页
    // - routes：路由
    // - theme：主题
    // - title：标题
    ''');
  }
}
```

### 2. CupertinoApp 示例

```dart
// CupertinoApp 示例
class CupertinoAppExample {
  void explain() {
    print('''
    CupertinoApp 示例：
    
    // 1. 基本 CupertinoApp
    CupertinoApp(
      home: CupertinoPageScaffold(
        navigationBar: CupertinoNavigationBar(
          middle: Text('My App'),
        ),
        child: Center(
          child: Text('Hello World'),
        ),
      ),
    )
    
    // 2. 带主题的 CupertinoApp
    CupertinoApp(
      theme: CupertinoThemeData(
        primaryColor: Colors.blue,
        brightness: Brightness.light,
      ),
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello World'),
        ),
      ),
    )
    
    // 3. 带路由的 CupertinoApp
    CupertinoApp(
      routes: {
        '/': (context) => HomePage(),
        '/settings': (context) => SettingsPage(),
      },
      initialRoute: '/',
    )
    
    // 4. 带标题的 CupertinoApp
    CupertinoApp(
      title: 'My App',
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello World'),
        ),
      ),
    )
    ''');
  }
}
```

## 🔧 CupertinoApp 实现

### 1. CupertinoApp 属性

```dart
// CupertinoApp 属性
class CupertinoAppProperties {
  void explain() {
    print('''
    CupertinoApp 属性：
    
    // 1. 主要属性
    // - home：首页
    // - routes：路由
    // - theme：主题
    // - title：标题
    
    // 2. 样式属性
    // - color：颜色
    // - locale：语言环境
    // - localizationsDelegates：本地化代理
    // - supportedLocales：支持的语言环境
    
    // 3. 行为属性
    // - navigatorKey：导航键
    // - onGenerateRoute：生成路由
    // - onUnknownRoute：未知路由
    // - builder：构建器
    
    // 4. 示例
    CupertinoApp(
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello World'),
        ),
      ),
      theme: CupertinoThemeData(
        primaryColor: Colors.blue,
        brightness: Brightness.light,
      ),
      title: 'My App',
      color: Colors.blue,
      locale: Locale('en', 'US'),
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        Locale('en', 'US'),
        Locale('zh', 'CN'),
      ],
      navigatorKey: _navigatorKey,
      onGenerateRoute: (settings) {
        // 生成路由
      },
      onUnknownRoute: (settings) {
        // 未知路由
      },
      builder: (context, child) {
        // 构建器
        return child!;
      },
    )
    ''');
  }
}
```

### 2. CupertinoApp 最佳实践

```dart
// CupertinoApp 最佳实践
class CupertinoAppBestPractices {
  void explain() {
    print('''
    CupertinoApp 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多配置
    // - 使用适当的路由
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的导航
    // - 提供反馈
    
    // 5. 示例
    CupertinoApp(
      home: CupertinoPageScaffold(
        child: Center(
          child: Text('Hello World'),
        ),
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CupertinoApp 重建会影响性能
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

> CupertinoApp 是 iOS 风格应用的基础，掌握 CupertinoApp 可以提升用户体验。