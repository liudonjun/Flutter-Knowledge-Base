# Navigator 2.0 详解

> 深入理解 Flutter 中的 Navigator 2.0。

## 📖 Navigator 2.0 基础

### 1. 什么是 Navigator 2.0

```dart
// Navigator 2.0 概念
class Navigator2Concept {
  void explain() {
    print('''
    Navigator 2.0 概念：
    
    // 1. 什么是 Navigator 2.0
    // - Flutter 新一代导航系统
    // - 基于声明式 API
    // - 支持深度链接
    // - 支持 URL 策略
    
    // 2. Navigator 2.0 的特点
    // - 声明式：使用声明式 API
    // - 类型安全：编译时检查
    // - 灵活：支持各种路由场景
    // - 易于测试：便于单元测试
    
    // 3. Navigator 2.0 的优势
    // - 简化路由配置
    // - 支持复杂导航
    // - 易于维护
    // - 良好的文档
    ''');
  }
}
```

### 2. Navigator 2.0 配置

```dart
// Navigator 2.0 配置
class Navigator2Configuration {
  void explain() {
    print('''
    Navigator 2.0 配置：
    
    // 1. 使用 Router
    MaterialApp.router(
      routerDelegate: MyRouterDelegate(),
      routeInformationParser: MyRouteInformationParser(),
    )
    
    // 2. 实现 RouterDelegate
    class MyRouterDelegate extends RouterDelegate<RouteInformation>
        with ChangeNotifier, PopNavigatorRouterDelegateMixin<RouteInformation> {
      @override
      final GlobalKey<NavigatorState> navigatorKey;
      
      List<Page> _pages = [];
      
      MyRouterDelegate() : navigatorKey = GlobalKey<NavigatorState>();
      
      @override
      Widget build(BuildContext context) {
        return Navigator(
          key: navigatorKey,
          pages: _pages,
          onPopPage: (route, result) {
            if (!route.didPop(result)) {
              return false;
            }
            _pages.removeLast();
            notifyListeners();
            return true;
          },
        );
      }
      
      @override
      Future<void> setNewRoutePath(RouteInformation configuration) async {
        // 解析路由信息
        final uri = Uri.parse(configuration.uri.toString());
        _pages = _parsePages(uri);
        notifyListeners();
      }
      
      @override
      RouteInformation? get currentConfiguration {
        // 返回当前路由信息
        return RouteInformation(
          uri: Uri.parse(_pages.last.name ?? '/'),
        );
      }
    }
    ''');
  }
}
```

## 🔧 Navigator 2.0 使用

### 1. 声明式导航

```dart
// 声明式导航
class DeclarativeNavigation {
  void explain() {
    print('''
    声明式导航：
    
    // 1. 使用 Page
    class MyRouterDelegate extends RouterDelegate<RouteInformation> {
      List<Page> _pages = [];
      
      @override
      Widget build(BuildContext context) {
        return Navigator(
          pages: _pages,
          onPopPage: (route, result) {
            if (!route.didPop(result)) {
              return false;
            }
            _pages.removeLast();
            notifyListeners();
            return true;
          },
        );
      }
    }
    
    // 2. 创建 Page
    MaterialPage(
      key: ValueKey('home'),
      child: HomePage(),
    )
    
    // 3. 添加 Page
    void navigateTo(String route) {
      _pages.add(MaterialPage(
        key: ValueKey(route),
        child: getPage(route),
      ));
      notifyListeners();
    }
    
    // 4. 移除 Page
    void goBack() {
      if (_pages.length > 1) {
        _pages.removeLast();
        notifyListeners();
      }
    }
    ''');
  }
}
```

### 2. 路由解析

```dart
// 路由解析
class RouteParsing {
  void explain() {
    print('''
    路由解析：
    
    // 1. 实现 RouteInformationParser
    class MyRouteInformationParser extends RouteInformationParser<RouteInformation> {
      @override
      Future<RouteInformation> parseRouteInformation(
        RouteInformation routeInformation,
      ) async {
        final uri = Uri.parse(routeInformation.uri.toString());
        // 解析路由
        return routeInformation;
      }
      
      @override
      RouteInformation? restoreRouteInformation(RouteInformation configuration) {
        // 恢复路由信息
        return configuration;
      }
    }
    
    // 2. 解析 URL
    List<Page> _parsePages(Uri uri) {
      final pages = <Page>[];
      
      // 添加首页
      pages.add(MaterialPage(
        key: ValueKey('home'),
        child: HomePage(),
      ));
      
      // 根据路径添加页面
      if (uri.path == '/details') {
        final id = uri.queryParameters['id'];
        pages.add(MaterialPage(
          key: ValueKey('details-$id'),
          child: DetailsPage(id: id!),
        ));
      }
      
      return pages;
    }
    ''');
  }
}
```

## ⚠️ 注意事项

1. **Navigator 2.0 是声明式的**
2. **注意路由状态管理**
3. **处理路由解析**
4. **考虑性能优化**

## 🔗 相关链接

- [[Navigator基础]]
- [[命名路由详解]]
- [[深度链接详解]]
- [[路由状态管理详解]]

---

> Navigator 2.0 是 Flutter 新一代导航系统，掌握它对于构建现代应用非常重要。