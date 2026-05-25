# AutoRoute 详解

> 深入理解 Flutter 中的 AutoRoute 路由库。

## 📖 AutoRoute 基础

### 1. 什么是 AutoRoute

```dart
// AutoRoute 概念
class AutoRouteConcept {
  void explain() {
    print('''
    AutoRoute 概念：
    
    // 1. 什么是 AutoRoute
    // - Flutter 路由生成器
    // - 基于代码生成
    // - 类型安全
    // - 支持深度链接
    
    // 2. AutoRoute 的特点
    // - 代码生成：自动生成路由代码
    // - 类型安全：编译时检查
    // - 声明式：使用注解声明路由
    // - 功能丰富：支持各种路由场景
    
    // 3. AutoRoute 的优势
    // - 减少样板代码
    // - 提高开发效率
    // - 避免路由错误
    // - 易于维护
    ''');
  }
}
```

### 2. AutoRoute 安装与配置

```dart
// AutoRoute 安装
class AutoRouteInstallation {
  void explain() {
    print('''
    AutoRoute 安装：
    
    // 1. 添加依赖
    // pubspec.yaml
    dependencies:
      auto_route: ^7.0.0
    
    dev_dependencies:
      auto_route_generator: ^7.0.0
      build_runner: ^2.0.0
    
    // 2. 创建路由配置
    import 'package:auto_route/auto_route.dart';
    
    @AutoRouterConfig()
    class AppRouter extends _\$AppRouter {
      @override
      List<AutoRoute> get routes => [
        AutoRoute(page: HomeRoute.page, path: '/'),
        AutoRoute(page: DetailsRoute.page, path: '/details'),
      ];
    }
    
    // 3. 生成代码
    // flutter packages pub run build_runner build
    
    // 4. 使用路由
    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp.router(
          routerConfig: AppRouter(),
        );
      }
    }
    ''');
  }
}
```

## 🔧 AutoRoute 使用

### 1. 基本路由

```dart
// 基本路由
class BasicRouting {
  void explain() {
    print('''
    基本路由：
    
    // 1. 定义页面
    import 'package:auto_route/auto_route.dart';
    
    @RoutePage()
    class HomePage extends StatelessWidget {
      const HomePage({Key? key}) : super(key: key);
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: ElevatedButton(
              onPressed: () => context.router.push(const DetailsRoute()),
              child: const Text('Go to Details'),
            ),
          ),
        );
      }
    }
    
    @RoutePage()
    class DetailsPage extends StatelessWidget {
      const DetailsPage({Key? key}) : super(key: key);
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: Text('Details Page'),
          ),
        );
      }
    }
    
    // 2. 导航方法
    // push
    context.router.push(const DetailsRoute());
    
    // replace
    context.router.replace(const DetailsRoute());
    
    // pop
    context.router.pop();
    
    // pushAndRemoveAll
    context.router.pushAndRemoveAll(
      const DetailsRoute(),
      predicate: (route) => false,
    );
    ''');
  }
}
```

### 2. 参数传递

```dart
// 参数传递
class ParameterPassing {
  void explain() {
    print('''
    参数传递：
    
    // 1. 定义带参数的页面
    @RoutePage()
    class DetailsPage extends StatelessWidget {
      final String title;
      final int id;
      
      const DetailsPage({
        Key? key,
        required this.title,
        required this.id,
      }) : super(key: key);
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: Center(
            child: Text('$title - $id'),
          ),
        );
      }
    }
    
    // 2. 生成路由
    @AutoRouterConfig()
    class AppRouter extends _\$AppRouter {
      @override
      List<AutoRoute> get routes => [
        AutoRoute(page: HomeRoute.page, path: '/'),
        AutoRoute(page: DetailsRoute.page, path: '/details'),
      ];
    }
    
    // 3. 传递参数
    context.router.push(
      DetailsRoute(title: 'Hello', id: 42),
    );
    
    // 4. 接收参数
    // 在 DetailsPage 中直接使用 title 和 id
    ''');
  }
}
```

## ⚠️ 注意事项

1. **理解 AutoRoute 的工作原理**
2. **注意代码生成步骤**
3. **合理组织路由结构**
4. **处理路由参数**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由守卫详解]]
- [[页面传值详解]]

---

> AutoRoute 是 Flutter 中强大的路由库，理解它对于构建复杂应用非常重要。