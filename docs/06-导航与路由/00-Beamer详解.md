# Beamer 详解

> 深入理解 Flutter 中的 Beamer 路由库。

## 📖 Beamer 基础

### 1. 什么是 Beamer

```dart
// Beamer 概念
class BeamerConcept {
  void explain() {
    print('''
    Beamer 概念：
    
    // 1. 什么是 Beamer
    // - Flutter 声明式路由库
    // - 基于 Navigator 2.0
    // - 支持深度链接
    // - 支持 URL 策略
    
    // 2. Beamer 的特点
    // - 声明式：使用配置定义路由
    // - 类型安全：编译时检查
    // - 灵活：支持各种路由场景
    // - 易于测试：便于单元测试
    
    // 3. Beamer 的优势
    // - 简化路由配置
    // - 支持复杂导航
    // - 易于维护
    // - 良好的文档
    ''');
  }
}
```

### 2. Beamer 安装与配置

```dart
// Beamer 安装
class BeamerInstallation {
  void explain() {
    print('''
    Beamer 安装：
    
    // 1. 添加依赖
    // pubspec.yaml
    dependencies:
      beamer: ^1.5.0
    
    // 2. 定义位置
    import 'package:beamer/beamer.dart';
    
    class HomeLocation extends BeamLocation<BeamState> {
      @override
      List<String> get pathPatterns => ['/'];
      
      @override
      List<BeamPage> buildPages(BuildContext context, BeamState state) {
        return [
          BeamPage(
            key: ValueKey('home'),
            child: HomePage(),
          ),
        ];
      }
    }
    
    class DetailsLocation extends BeamLocation<BeamState> {
      @override
      List<String> get pathPatterns => ['/details/:id'];
      
      @override
      List<BeamPage> buildPages(BuildContext context, BeamState state) {
        final id = state.pathParameters['id'];
        return [
          BeamPage(
            key: ValueKey('details-$id'),
            child: DetailsPage(id: id!),
          ),
        ];
      }
    }
    
    // 3. 配置路由
    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp.router(
          routerDelegate: BeamerRouterDelegate(
            locationBuilder: BeamerLocationBuilder(
              beamLocations: [
                HomeLocation(),
                DetailsLocation(),
              ],
            ),
          ),
        );
      }
    }
    ''');
  }
}
```

## 🔧 Beamer 使用

### 1. 基本导航

```dart
// 基本导航
class BasicNavigation {
  void explain() {
    print('''
    基本导航：
    
    // 1. 导航方法
    // 使用 BeamerProvider
    Beamer.of(context).beamToNamed('/details/42');
    
    // 使用 BeamLocation
    Beamer.of(context).beamTo(DetailsLocation());
    
    // 2. 返回
    Beamer.of(context).beamBack();
    
    // 3. 替换
    Beamer.of(context).beamToReplacementNamed('/details/42');
    
    // 4. 清空历史
    Beamer.of(context).beamToNamed(
      '/details/42',
      stacked: false,
    );
    
    // 5. 导航状态
    final currentLocation = Beamer.of(context).currentLocation;
    final uri = currentLocation.state.uri;
    print('Current path: ${uri.path}');
    ''');
  }
}
```

### 2. 深度链接

```dart
// 深度链接
class DeepLinking {
  void explain() {
    print('''
    深度链接：
    
    // 1. 配置深度链接
    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp.router(
          routerDelegate: BeamerRouterDelegate(
            locationBuilder: BeamerLocationBuilder(
              beamLocations: [
                HomeLocation(),
                DetailsLocation(),
              ],
            ),
          ),
          routeInformationParser: BeamerRouteInformationParser(),
        );
      }
    }
    
    // 2. 处理 URL
    // /details/42 -> DetailsPage(id: '42')
    
    // 3. URL 参数
    class DetailsLocation extends BeamLocation<BeamState> {
      @override
      List<String> get pathPatterns => ['/details/:id'];
      
      @override
      List<BeamPage> buildPages(BuildContext context, BeamState state) {
        final id = state.pathParameters['id'];
        final query = state.queryParameters['query'];
        
        return [
          BeamPage(
            key: ValueKey('details-$id'),
            child: DetailsPage(
              id: id!,
              query: query,
            ),
          ),
        ];
      }
    }
    ''');
  }
}
```

## ⚠️ 注意事项

1. **理解 Beamer 的声明式路由**
2. **合理组织 BeamLocation**
3. **处理深度链接**
4. **注意路由状态管理**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由守卫详解]]
- [[页面传值详解]]

---

> Beamer 是 Flutter 中基于 Navigator 2.0 的路由库，理解它对于构建现代应用非常重要。