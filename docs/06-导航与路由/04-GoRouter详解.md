# GoRouter 详解

> 深入理解 Flutter 中的 GoRouter 路由管理方案，掌握现代路由管理的最佳实践。

## 📖 GoRouter 基础

### 1. GoRouter 概述

```dart
// GoRouter 概述
class GoRouterOverview {
  /*
  GoRouter 是 Flutter 官方推荐的现代路由管理方案：
  
  1. 核心特性
     - 声明式路由：使用声明式配置
     - 类型安全：编译时检查
     - 深层链接：支持深层链接
     - 路由守卫：支持路由守卫
  
  2. 优势
     - 简单易用：API 简洁
     - 类型安全：编译时检查
     - 深层链接：支持深层链接
     - 路由守卫：支持权限控制
     - 官方推荐：Flutter 官方维护
  
  3. 适用场景
     - 新项目：推荐使用
     - 需要深层链接：需要深层链接支持
     - 需要类型安全：需要类型安全
     - 需要路由守卫：需要权限控制
  */
  
  void explain() {
    print('''
    GoRouter 概述：
    
    1. 核心特性
       - 声明式路由：使用声明式配置
       - 类型安全：编译时检查
       - 深层链接：支持深层链接
       - 路由守卫：支持路由守卫
       - 路由参数：支持参数传递
    
    2. 优势
       - 简单易用：API 简洁
       - 类型安全：编译时检查
       - 深层链接：支持深层链接
       - 路由守卫：支持权限控制
       - 官方推荐：Flutter 官方维护
       - 易于测试：支持路由测试
    
    3. 适用场景
       - 新项目：推荐使用
       - 需要深层链接：需要深层链接支持
       - 需要类型安全：需要类型安全
       - 需要路由守卫：需要权限控制
       - 需要现代路由：需要现代路由管理
    
    4. 核心概念
       - GoRouter：路由器
       - GoRoute：路由配置
       - GoRouterState：路由状态
       - 路由守卫：权限控制
    
    示例：
    final router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => HomePage(),
        ),
        GoRoute(
          path: '/detail/:id',
          builder: (context, state) {
            final id = state.params['id'];
            return DetailPage(id: id);
          },
        ),
      ],
    );
    ''');
  }
}
```

### 2. 基本使用

```dart
// GoRouter 基本使用
class GoRouterBasicUsage {
  /*
  GoRouter 基本使用：
  
  1. 添加依赖
     - pubspec.yaml 添加 go_router 包
     - 运行 flutter pub get
  
  2. 配置 GoRouter
     - 创建 GoRouter 实例
     - 定义路由配置
     - 设置初始路由
  
  3. 使用 GoRouter
     - 使用 MaterialApp.router
     - 使用 context.go
     - 使用 context.push
  */
  
  void explain() {
    print('''
    GoRouter 基本使用：
    
    1. 添加依赖
       # pubspec.yaml
       dependencies:
         go_router: ^10.0.0
    
    2. 配置 GoRouter
       final router = GoRouter(
         routes: [
           GoRoute(
             path: '/',
             builder: (context, state) => HomePage(),
           ),
           GoRoute(
             path: '/detail',
             builder: (context, state) => DetailPage(),
           ),
         ],
       );
    
    3. 使用 GoRouter
       // MaterialApp.router
       MaterialApp.router(
         routerConfig: router,
       )
       
       // 导航
       context.go('/detail');
       context.push('/detail');
       context.pop();
    
    示例：
    void main() {
      runApp(MyApp());
    }
    
    class MyApp extends StatelessWidget {
      @override
      Widget build(BuildContext context) {
        return MaterialApp.router(
          routerConfig: router,
        );
      }
    }
    
    final router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) => HomePage(),
        ),
        GoRoute(
          path: '/detail',
          builder: (context, state) => DetailPage(),
        ),
      ],
    );
    ''');
  }
}

// GoRouter 基本使用示例
void goRouterBasicUsageExample() {
  print('''
  // GoRouter 基本使用示例：
  
  import 'package:flutter/material.dart';
  import 'package:go_router/go_router.dart';
  
  // 1. 配置 GoRouter
  final router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => HomePage(),
      ),
      GoRoute(
        path: '/detail',
        builder: (context, state) => DetailPage(),
      ),
      GoRoute(
        path: '/settings',
        builder: (context, state) => SettingsPage(),
      ),
    ],
  );
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp.router(
        routerConfig: router,
      );
    }
  }
  
  class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('首页'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  // 使用 context.go
                  context.go('/detail');
                },
                child: Text('跳转到详情页'),
              ),
              ElevatedButton(
                onPressed: () {
                  // 使用 context.push
                  context.push('/settings');
                },
                child: Text('跳转到设置页'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class DetailPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('详情页'),
        ),
        body: Center(
          child: ElevatedButton(
            onPressed: () {
              // 返回
              context.pop();
            },
            child: Text('返回'),
          ),
        ),
      );
    }
  }
  
  class SettingsPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('设置页'),
        ),
        body: Center(
          child: ElevatedButton(
            onPressed: () {
              context.pop();
            },
            child: Text('返回'),
          ),
        ),
      );
    }
  }
  ''');
}
```

## 📖 GoRouter 路由配置

### 1. 路由定义

```dart
// GoRouter 路由定义
class GoRouterRouteDefinition {
  /*
  GoRouter 路由定义：
  
  1. GoRoute
     - path：路由路径
     - builder：页面构建器
     - routes：子路由
     - redirect：重定向
  
  2. 路由参数
     - 路径参数：/user/:id
     - 查询参数：/user?id=1
     - 额外参数：通过 state.extra
  
  3. 路由嵌套
     - 子路由：在 routes 中定义
     - 父路由：包含子路由
     - 相对路径：子路由使用相对路径
  */
  
  void explain() {
    print('''
    GoRouter 路由定义：
    
    1. GoRoute
       - path：路由路径
       - builder：页面构建器
       - routes：子路由
       - redirect：重定向
       - pageBuilder：页面构建器
    
    2. 路由参数
       - 路径参数：/user/:id
       - 查询参数：/user?id=1
       - 额外参数：通过 state.extra
       - 多个参数：/user/:id/post/:postId
    
    3. 路由嵌套
       - 子路由：在 routes 中定义
       - 父路由：包含子路由
       - 相对路径：子路由使用相对路径
       - ShellRoute：外壳路由
    
    示例：
    GoRoute(
      path: '/user/:id',
      builder: (context, state) {
        final id = state.params['id'];
        return UserPage(id: id);
      },
      routes: [
        GoRoute(
          path: 'post/:postId',
          builder: (context, state) {
            final userId = state.params['id'];
            final postId = state.params['postId'];
            return PostPage(userId: userId, postId: postId);
          },
        ),
      ],
    )
    ''');
  }
}

// GoRouter 路由定义示例
void goRouterRouteDefinitionExample() {
  print('''
  // GoRouter 路由定义示例：
  
  import 'package:flutter/material.dart';
  import 'package:go_router/go_router.dart';
  
  // 1. 配置 GoRouter
  final router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => HomePage(),
      ),
      GoRoute(
        path: '/user/:id',
        builder: (context, state) {
          final id = state.params['id'];
          return UserPage(id: id);
        },
        routes: [
          GoRoute(
            path: 'post/:postId',
            builder: (context, state) {
              final userId = state.params['id'];
              final postId = state.params['postId'];
              return PostPage(userId: userId, postId: postId);
            },
          ),
        ],
      ),
      GoRoute(
        path: '/search',
        builder: (context, state) {
          final query = state.queryParams['q'];
          return SearchPage(query: query);
        },
      ),
    ],
  );
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp.router(
        routerConfig: router,
      );
    }
  }
  
  class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('首页'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  // 路径参数
                  context.go('/user/1');
                },
                child: Text('用户1'),
              ),
              ElevatedButton(
                onPressed: () {
                  // 嵌套路由
                  context.go('/user/1/post/100');
                },
                child: Text('用户1的帖子100'),
              ),
              ElevatedButton(
                onPressed: () {
                  // 查询参数
                  context.go('/search?q=flutter');
                },
                child: Text('搜索flutter'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class UserPage extends StatelessWidget {
    final String? id;
    
    const UserPage({Key? key, this.id}) : super(key: key);
    
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('用户页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('用户ID: $id'),
              ElevatedButton(
                onPressed: () {
                  context.go('/user/$id/post/100');
                },
                child: Text('查看帖子'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class PostPage extends StatelessWidget {
    final String? userId;
    final String? postId;
    
    const PostPage({Key? key, this.userId, this.postId}) : super(key: key);
    
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('帖子页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('用户ID: $userId'),
              Text('帖子ID: $postId'),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class SearchPage extends StatelessWidget {
    final String? query;
    
    const SearchPage({Key? key, this.query}) : super(key: key);
    
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('搜索页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('搜索词: $query'),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  ''');
}
```

### 2. 路由导航

```dart
// GoRouter 路由导航
class GoRouterNavigation {
  /*
  GoRouter 路由导航：
  
  1. 导航方法
     - context.go：替换当前路由
     - context.push：压入新路由
     - context.pop：弹出当前路由
     - context.goNamed：使用命名路由
  
  2. 参数传递
     - 路径参数：通过路径传递
     - 查询参数：通过查询参数传递
     - 额外参数：通过 extra 传递
  
  3. 返回值
     - 使用 Future 获取返回值
     - 在页面中返回值
  */
  
  void explain() {
    print('''
    GoRouter 路由导航：
    
    1. 导航方法
       - context.go：替换当前路由
       - context.push：压入新路由
       - context.pop：弹出当前路由
       - context.goNamed：使用命名路由
       - context.pushNamed：使用命名路由压入
    
    2. 参数传递
       - 路径参数：通过路径传递
       - 查询参数：通过查询参数传递
       - 额外参数：通过 extra 传递
       - 多个参数：支持多个参数
    
    3. 返回值
       - 使用 Future 获取返回值
       - 在页面中返回值
       - 支持异步操作
    
    示例：
    // 基本导航
    context.go('/detail');
    context.push('/detail');
    context.pop();
    
    // 带参数导航
    context.go('/user/1');
    context.go('/user/1', extra: {'name': '张三'});
    
    // 查询参数
    context.go('/search?q=flutter');
    
    // 获取返回值
    final result = await context.push('/result');
    ''');
  }
}

// GoRouter 路由导航示例
void goRouterNavigationExample() {
  print('''
  // GoRouter 路由导航示例：
  
  import 'package:flutter/material.dart';
  import 'package:go_router/go_router.dart';
  
  // 1. 配置 GoRouter
  final router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => HomePage(),
      ),
      GoRoute(
        path: '/detail',
        builder: (context, state) => DetailPage(),
      ),
      GoRoute(
        path: '/result',
        builder: (context, state) => ResultPage(),
      ),
    ],
  );
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp.router(
        routerConfig: router,
      );
    }
  }
  
  class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('首页'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                onPressed: () {
                  // 使用 context.go
                  context.go('/detail');
                },
                child: Text('使用 go 跳转'),
              ),
              ElevatedButton(
                onPressed: () {
                  // 使用 context.push
                  context.push('/detail');
                },
                child: Text('使用 push 跳转'),
              ),
              ElevatedButton(
                onPressed: () async {
                  // 获取返回值
                  final result = await context.push('/result');
                  
                  if (result != null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('返回值: $result')),
                    );
                  }
                },
                child: Text('获取返回值'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class DetailPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('详情页'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('这是详情页'),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class ResultPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('返回值页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('选择返回值:'),
              ElevatedButton(
                onPressed: () {
                  context.pop('选项1');
                },
                child: Text('选项1'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.pop('选项2');
                },
                child: Text('选项2'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.pop('选项3');
                },
                child: Text('选项3'),
              ),
            ],
          ),
        ),
      );
    }
  }
  ''');
}
```

## 📖 GoRouter 高级特性

### 1. 路由守卫

```dart
// GoRouter 路由守卫
class GoRouterRouteGuards {
  /*
  GoRouter 路由守卫：
  
  1. 重定向
     - redirect：重定向函数
     - 条件重定向：根据条件重定向
     - 权限控制：进行权限验证
  
  2. 路由监听
     - navigatorObservers：路由观察者
     - 路由变化监听：监听路由变化
     - 日志记录：记录路由日志
  
  3. 错误处理
     - errorBuilder：错误页面构建器
     - 未知路由处理：处理未知路由
     - 错误恢复：错误恢复机制
  */
  
  void explain() {
    print('''
    GoRouter 路由守卫：
    
    1. 重定向
       - redirect：重定向函数
       - 条件重定向：根据条件重定向
       - 权限控制：进行权限验证
       - 登录检查：检查用户登录
    
    2. 路由监听
       - navigatorObservers：路由观察者
       - 路由变化监听：监听路由变化
       - 日志记录：记录路由日志
       - 性能监控：监控路由性能
    
    3. 错误处理
       - errorBuilder：错误页面构建器
       - 未知路由处理：处理未知路由
       - 错误恢复：错误恢复机制
       - 用户友好：提供用户友好提示
    
    示例：
    final router = GoRouter(
      redirect: (context, state) {
        // 检查登录状态
        final isLoggedIn = AuthService.isLoggedIn;
        
        if (!isLoggedIn && state.location.startsWith('/admin')) {
          return '/login';
        }
        
        return null;
      },
      errorBuilder: (context, state) => ErrorPage(error: state.error),
    );
    ''');
  }
}

// GoRouter 路由守卫示例
void goRouterRouteGuardsExample() {
  print('''
  // GoRouter 路由守卫示例：
  
  import 'package:flutter/material.dart';
  import 'package:go_router/go_router.dart';
  
  // 模拟登录状态
  class AuthService {
    static bool isLoggedIn = false;
    
    static void login() {
      isLoggedIn = true;
    }
    
    static void logout() {
      isLoggedIn = false;
    }
  }
  
  // 1. 配置 GoRouter
  final router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => HomePage(),
      ),
      GoRoute(
        path: '/login',
        builder: (context, state) => LoginPage(),
      ),
      GoRoute(
        path: '/admin',
        builder: (context, state) => AdminPage(),
      ),
      GoRoute(
        path: '/profile',
        builder: (context, state) => ProfilePage(),
      ),
    ],
    // 路由守卫
    redirect: (context, state) {
      print('路由守卫: ${state.location}');
      
      // 检查登录状态
      final isLoggedIn = AuthService.isLoggedIn;
      final isLoginRoute = state.location == '/login';
      final isAdminRoute = state.location.startsWith('/admin');
      
      // 未登录且访问管理员页面
      if (!isLoggedIn && isAdminRoute) {
        return '/login';
      }
      
      // 已登录且访问登录页面
      if (isLoggedIn && isLoginRoute) {
        return '/';
      }
      
      return null;
    },
    // 错误处理
    errorBuilder: (context, state) => ErrorPage(error: state.error),
    // 路由观察者
    observers: [MyRouteObserver()],
  );
  
  void main() {
    runApp(MyApp());
  }
  
  class MyApp extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return MaterialApp.router(
        routerConfig: router,
      );
    }
  }
  
  class MyRouteObserver extends NavigatorObserver {
    @override
    void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
      super.didPush(route, previousRoute);
      print('Push: ${route.settings.name}');
    }
    
    @override
    void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
      super.didPop(route, previousRoute);
      print('Pop: ${route.settings.name}');
    }
  }
  
  class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('首页'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('登录状态: ${AuthService.isLoggedIn ? "已登录" : "未登录"}'),
              ElevatedButton(
                onPressed: () {
                  context.go('/admin');
                },
                child: Text('访问管理员页面'),
              ),
              ElevatedButton(
                onPressed: () {
                  context.go('/profile');
                },
                child: Text('访问个人资料'),
              ),
              ElevatedButton(
                onPressed: () {
                  if (AuthService.isLoggedIn) {
                    AuthService.logout();
                  } else {
                    AuthService.login();
                  }
                  context.go('/');
                },
                child: Text(AuthService.isLoggedIn ? '退出登录' : '登录'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class LoginPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('登录页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('请先登录'),
              ElevatedButton(
                onPressed: () {
                  AuthService.login();
                  context.go('/');
                },
                child: Text('登录'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class AdminPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('管理员页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('管理员页面内容'),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class ProfilePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('个人资料'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('个人资料页面'),
              ElevatedButton(
                onPressed: () {
                  context.pop();
                },
                child: Text('返回'),
              ),
            ],
          ),
        ),
      );
    }
  }
  
  class ErrorPage extends StatelessWidget {
    final Exception? error;
    
    const ErrorPage({Key? key, this.error}) : super(key: key);
    
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text('错误页面'),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('发生错误: ${error?.toString() ?? "未知错误"}'),
              ElevatedButton(
                onPressed: () {
                  context.go('/');
                },
                child: Text('返回首页'),
              ),
            ],
          ),
        ),
      );
    }
  }
  ''');
}
```

## 📖 GoRouter 最佳实践

### 1. 代码组织

```dart
// GoRouter 代码组织
class GoRouterCodeOrganization {
  /*
  GoRouter 代码组织：
  
  1. 文件结构
     - 路由配置文件：集中管理路由
     - 路由常量：定义路由路径
     - 路由守卫：定义路由守卫
  
  2. 代码结构
     - 路由配置：定义路由
     - 路由守卫：定义守卫
     - 路由参数：定义参数
     - 路由测试：测试路由
  
  3. 最佳实践
     - 集中管理路由
     - 使用路由常量
     - 定义路由守卫
     - 进行路由测试
  */
  
  void explain() {
    print('''
    GoRouter 代码组织：
    
    1. 文件结构
       lib/
         router/
           app_router.dart
           route_constants.dart
           route_guards.dart
         pages/
           home_page.dart
           detail_page.dart
    
    2. 代码结构
       - 路由配置：定义路由
       - 路由守卫：定义守卫
       - 路由参数：定义参数
       - 路由测试：测试路由
    
    3. 最佳实践
       - 集中管理路由
       - 使用路由常量
       - 定义路由守卫
       - 进行路由测试
       - 使用类型安全
    
    示例文件结构：
    lib/
      router/
        app_router.dart
        route_constants.dart
        route_guards.dart
      pages/
        home_page.dart
        detail_page.dart
        settings_page.dart
    ''');
  }
}
```

### 2. 测试

```dart
// GoRouter 测试
class GoRouterTesting {
  /*
  GoRouter 测试：
  
  1. 路由测试
     - 测试路由配置
     - 测试路由导航
     - 测试路由守卫
  
  2. 测试工具
     - go_router：测试支持
     - flutter_test：测试框架
     - mockito：模拟对象
  
  3. 最佳实践
     - 测试所有路由
     - 测试路由守卫
     - 测试参数传递
     - 测试错误处理
  */
  
  void explain() {
    print('''
    GoRouter 测试：
    
    1. 路由测试
       - 测试路由配置：测试路由配置
       - 测试路由导航：测试路由导航
       - 测试路由守卫：测试路由守卫
       - 测试参数传递：测试参数传递
    
    2. 测试工具
       - go_router：测试支持
       - flutter_test：测试框架
       - mockito：模拟对象
       - testWidgets：Widget 测试
    
    3. 最佳实践
       - 测试所有路由
       - 测试路由守卫
       - 测试参数传递
       - 测试错误处理
       - 测试边缘情况
    
    示例：
    testWidgets('测试路由导航', (tester) async {
      final router = GoRouter(
        routes: [
          GoRoute(
            path: '/',
            builder: (context, state) => HomePage(),
          ),
          GoRoute(
            path: '/detail',
            builder: (context, state) => DetailPage(),
          ),
        ],
      );
      
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: router,
        ),
      );
      
      expect(find.text('首页'), findsOneWidget);
      
      router.go('/detail');
      await tester.pumpAndSettle();
      
      expect(find.text('详情页'), findsOneWidget);
    });
    ''');
  }
}

// GoRouter 测试示例
void goRouterTestingExample() {
  print('''
  // GoRouter 测试示例：
  
  import 'package:flutter/material.dart';
  import 'package:flutter_test/flutter_test.dart';
  import 'package:go_router/go_router.dart';
  
  // 1. 定义页面
  class HomePage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(title: Text('首页')),
        body: Center(child: Text('首页内容')),
      );
    }
  }
  
  class DetailPage extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(title: Text('详情页')),
        body: Center(child: Text('详情页内容')),
      );
    }
  }
  
  // 2. 测试
  void main() {
    group('GoRouter 测试', () {
      testWidgets('测试路由导航', (tester) async {
        final router = GoRouter(
          routes: [
            GoRoute(
              path: '/',
              builder: (context, state) => HomePage(),
            ),
            GoRoute(
              path: '/detail',
              builder: (context, state) => DetailPage(),
            ),
          ],
        );
        
        await tester.pumpWidget(
          MaterialApp.router(
            routerConfig: router,
          ),
        );
        
        // 验证首页
        expect(find.text('首页'), findsOneWidget);
        expect(find.text('首页内容'), findsOneWidget);
        
        // 导航到详情页
        router.go('/detail');
        await tester.pumpAndSettle();
        
        // 验证详情页
        expect(find.text('详情页'), findsOneWidget);
        expect(find.text('详情页内容'), findsOneWidget);
      });
      
      testWidgets('测试路由参数', (tester) async {
        final router = GoRouter(
          routes: [
            GoRoute(
              path: '/',
              builder: (context, state) => HomePage(),
            ),
            GoRoute(
              path: '/user/:id',
              builder: (context, state) {
                final id = state.params['id'];
                return Scaffold(
                  appBar: AppBar(title: Text('用户页面')),
                  body: Center(child: Text('用户ID: $id')),
                );
              },
            ),
          ],
        );
        
        await tester.pumpWidget(
          MaterialApp.router(
            routerConfig: router,
          ),
        );
        
        // 导航到用户页面
        router.go('/user/123');
        await tester.pumpAndSettle();
        
        // 验证参数
        expect(find.text('用户页面'), findsOneWidget);
        expect(find.text('用户ID: 123'), findsOneWidget);
      });
    });
  }
  ''');
}
```

## 📖 总结

### GoRouter 核心概念

| 概念 | 描述 | 使用场景 |
|------|------|----------|
| **GoRouter** | 路由器 | 管理应用路由 |
| **GoRoute** | 路由配置 | 定义路由 |
| **context.go** | 路由导航 | 页面跳转 |
| **路由守卫** | 路由拦截 | 权限控制 |
| **深层链接** | 外部链接 | 应用链接 |

### 最佳实践总结

1. **路由管理**：使用声明式路由配置
2. **类型安全**：利用类型安全特性
3. **路由守卫**：进行权限控制和登录检查
4. **代码组织**：集中管理路由配置
5. **测试**：进行路由测试

### 适用场景

1. **新项目**：推荐使用 GoRouter
2. **需要深层链接**：需要深层链接支持
3. **需要类型安全**：需要类型安全
4. **需要路由守卫**：需要权限控制

### 学习路径

1. **基础使用**：学习基本路由配置
2. **路由参数**：学习参数传递
3. **路由守卫**：学习路由守卫
4. **高级特性**：学习高级特性

---

> 深入理解 Flutter 中的 GoRouter 路由管理方案，掌握现代路由管理的最佳实践。GoRouter 是 Flutter 官方推荐的现代路由管理方案。