# GetX 路由详解

> 深入理解 GetX 路由系统。

## 📖 GetX 路由基础

### 1. 什么是 GetX 路由

```dart
// GetX 路由概念
class GetXRoutingConcept {
  void explain() {
    print('''
    GetX 路由概念：
    
    // 1. 什么是 GetX 路由
    // - GetX 框架的路由系统
    // - 无需 context 的导航
    // - 支持命名路由
    // - 支持动态路由
    
    // 2. GetX 路由的特点
    // - 简单易用：API 简洁
    // - 无需 context：可以在任何地方导航
    // - 性能优化：减少重建
    // - 功能丰富：支持中间件、动画等
    
    // 3. GetX 路由的使用场景
    // - 快速导航：无需传递 context
    // - 复杂路由：支持嵌套路由
    // - 权限控制：路由中间件
    // - 动画转场：自定义转场动画
    ''');
  }
}
```

### 2. GetX 路由配置

```dart
// GetX 路由配置
class GetXRoutingConfiguration {
  void explain() {
    print('''
    GetX 路由配置：
    
    // 1. 配置路由
    class AppRoutes {
      static const String HOME = '/';
      static const String DETAILS = '/details';
      static const String SETTINGS = '/settings';
    }
    
    class AppPages {
      static final pages = [
        GetPage(
          name: AppRoutes.HOME,
          page: () => HomePage(),
        ),
        GetPage(
          name: AppRoutes.DETAILS,
          page: () => DetailsPage(),
          transition: Transition.fadeIn,
        ),
        GetPage(
          name: AppRoutes.SETTINGS,
          page: () => SettingsPage(),
          middlewares: [AuthMiddleware()],
        ),
      ];
    }
    
    // 2. 配置 GetMaterialApp
    GetMaterialApp(
      initialRoute: AppRoutes.HOME,
      getPages: AppPages.pages,
    )
    ''');
  }
}
```

## 🔧 GetX 路由使用

### 1. 基本导航

```dart
// 基本导航
class BasicNavigation {
  void explain() {
    print('''
    基本导航：
    
    // 1. 导航到新页面
    Get.to(DetailsPage());
    
    // 2. 使用命名路由
    Get.toNamed(AppRoutes.DETAILS);
    
    // 3. 返回上一页
    Get.back();
    
    // 4. 替换当前页面
    Get.off(DetailsPage());
    
    // 5. 清空导航栈
    Get.offAll(HomePage());
    
    // 6. 带参数导航
    Get.to(DetailsPage(), arguments: {'id': 42});
    
    // 7. 获取参数
    final args = Get.arguments;
    final id = args['id'];
    ''');
  }
}
```

### 2. 路由中间件

```dart
// 路由中间件
class RouteMiddleware {
  void explain() {
    print('''
    路由中间件：
    
    // 1. 创建中间件
    class AuthMiddleware extends GetMiddleware {
      @override
      RouteSettings? redirect(String? route) {
        final authService = Get.find<AuthService>();
        if (!authService.isLoggedIn) {
          return RouteSettings(name: AppRoutes.LOGIN);
        }
        return null;
      }
    }
    
    // 2. 使用中间件
    GetPage(
      name: AppRoutes.SETTINGS,
      page: () => SettingsPage(),
      middlewares: [AuthMiddleware()],
    )
    
    // 3. 中间件优先级
    class PriorityMiddleware extends GetMiddleware {
      @override
      int? get priority => 1;
    }
    
    // 4. 多个中间件
    GetPage(
      name: AppRoutes.SETTINGS,
      page: () => SettingsPage(),
      middlewares: [
        AuthMiddleware(),
        LoggingMiddleware(),
      ],
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **GetX 路由无需 context**
2. **注意路由生命周期**
3. **合理使用路由中间件**
4. **考虑性能优化**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由守卫详解]]
- [[GetX详解]]

---

> GetX 路由是 Flutter 中简洁高效的路由解决方案，理解它对于提高开发效率非常重要。