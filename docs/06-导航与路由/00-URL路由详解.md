# URL 路由详解

> 深入理解 Flutter 中的 URL 路由。

## 📖 URL 路由基础

### 1. 什么是 URL 路由

```dart
// URL 路由概念
class URLRoutingConcept {
  void explain() {
    print('''
    URL 路由概念：
    
    // 1. 什么是 URL 路由
    // - 基于 URL 的路由系统
    // - 支持 Web 和移动端
    // - 支持深度链接
    // - 实现应用间跳转
    
    // 2. URL 路由的特点
    // - 直接导航：通过 URL 直接导航
    // - 参数传递：通过 URL 传递参数
    // - 跨平台：支持 Web、iOS、Android
    // - 用户体验：提高用户转化率
    
    // 3. URL 路由的使用场景
    // - Web 应用：支持浏览器 URL
    // - 深度链接：支持外部链接
    // - 内容分享：分享应用内内容
    // - 应用间协作：应用间数据传递
    ''');
  }
}
```

### 2. URL 路由配置

```dart
// URL 路由配置
class URLRoutingConfiguration {
  void explain() {
    print('''
    URL 路由配置：
    
    // 1. 使用 MaterialApp
    MaterialApp.router(
      routerDelegate: MyRouterDelegate(),
      routeInformationParser: MyRouteInformationParser(),
    )
    
    // 2. 实现 RouteInformationParser
    class MyRouteInformationParser extends RouteInformationParser<RouteInformation> {
      @override
      Future<RouteInformation> parseRouteInformation(
        RouteInformation routeInformation,
      ) async {
        final uri = Uri.parse(routeInformation.uri.toString());
        // 解析 URL
        return routeInformation;
      }
      
      @override
      RouteInformation? restoreRouteInformation(RouteInformation configuration) {
        // 恢复 URL
        return configuration;
      }
    }
    
    // 3. 实现 RouterDelegate
    class MyRouterDelegate extends RouterDelegate<RouteInformation> {
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
      
      @override
      Future<void> setNewRoutePath(RouteInformation configuration) async {
        // 解析 URL 并更新路由
        final uri = Uri.parse(configuration.uri.toString());
        _pages = _parsePages(uri);
        notifyListeners();
      }
    }
    ''');
  }
}
```

## 🔧 URL 路由使用

### 1. URL 解析

```dart
// URL 解析
class URLParsing {
  void explain() {
    print('''
    URL 解析：
    
    // 1. 解析 URL
    final uri = Uri.parse('https://example.com/product/42?color=red');
    
    // 获取路径
    final path = uri.path;  // /product/42
    
    // 获取路径参数
    final segments = uri.pathSegments;  // ['product', '42']
    
    // 获取查询参数
    final color = uri.queryParameters['color'];  // red
    
    // 2. 路由匹配
    class RouteParser {
      static RouteSettings parse(String url) {
        final uri = Uri.parse(url);
        
        if (uri.path == '/product') {
          final id = uri.queryParameters['id'];
          return RouteSettings(
            name: '/product',
            arguments: {'id': id},
          );
        }
        
        return RouteSettings(name: '/');
      }
    }
    
    // 3. 参数验证
    class ParameterValidator {
      static bool validate(Map<String, String> params) {
        if (params.containsKey('id')) {
          final id = int.tryParse(params['id']!);
          return id != null && id > 0;
        }
        return false;
      }
    }
    ''');
  }
}
```

### 2. 导航处理

```dart
// 导航处理
class NavigationHandling {
  void explain() {
    print('''
    导航处理：
    
    // 1. 使用 GetX 处理 URL
    class DeepLinkHandler {
      static void handle(String url) {
        final uri = Uri.parse(url);
        
        switch (uri.path) {
          case '/product':
            final id = uri.queryParameters['id'];
            Get.toNamed('/product/$id');
            break;
          case '/user':
            final username = uri.queryParameters['username'];
            Get.toNamed('/user/$username');
            break;
          default:
            Get.toNamed('/');
        }
      }
    }
    
    // 2. 使用 Navigator 处理 URL
    void handleURL(String url) {
      final uri = Uri.parse(url);
      
      if (uri.path == '/product') {
        final id = uri.queryParameters['id'];
        Navigator.pushNamed(context, '/product', arguments: {'id': id});
      }
    }
    
    // 3. 错误处理
    void handleURLWithError(String url) {
      try {
        final uri = Uri.parse(url);
        // 处理 URL
      } catch (e) {
        // 处理错误
        print('Invalid URL: $e');
      }
    }
    ''');
  }
}
```

## ⚠️ 注意事项

1. **URL 路由需要平台特定配置**
2. **注意 URL 格式验证**
3. **处理无效 URL**
4. **考虑安全性**

## 🔗 相关链接

- [[Navigator基础]]
- [[深度链接详解]]
- [[命名路由详解]]
- [[路由守卫详解]]

---

> URL 路由是支持 Web 应用的重要功能，掌握它对于构建跨平台应用非常重要。