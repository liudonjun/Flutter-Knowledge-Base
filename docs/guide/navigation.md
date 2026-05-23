# 导航与路由详解

> 导航与路由是移动应用的核心功能，掌握 Flutter 导航系统是开发多页面应用的基础。

## 🧭 导航基础

### 1. 基本导航
```dart
// 页面跳转
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);

// 页面返回
Navigator.pop(context);

// 页面传值
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => SecondScreen(data: 'Hello'),
  ),
);
```

### 2. 路由类型
```dart
// 基本路由
MaterialPageRoute(builder: (context) => MyScreen())

// 命名路由
routes: {
  '/': (context) => HomeScreen(),
  '/second': (context) => SecondScreen(),
}

// 动态路由
onGenerateRoute: (settings) {
  if (settings.name == '/detail') {
    final args = settings.arguments as Map<String, dynamic>;
    return MaterialPageRoute(
      builder: (context) => DetailScreen(data: args['data']),
    );
  }
  return null;
}
```

## 🚦 路由系统

### 1. 路由配置
```dart
// main.dart 中配置路由
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter App',
      initialRoute: '/',
      routes: {
        '/': (context) => HomeScreen(),
        '/second': (context) => SecondScreen(),
        '/third': (context) => ThirdScreen(),
      },
      onUnknownRoute: (settings) {
        return MaterialPageRoute(
          builder: (context) => NotFoundScreen(),
        );
      },
    );
  }
}
```

### 2. 路由管理
```dart
// 路由栈管理
class RouteManager {
  static void push(BuildContext context, String routeName, {Object? arguments}) {
    Navigator.pushNamed(context, routeName, arguments: arguments);
  }
  
  static void pushReplacement(BuildContext context, String routeName) {
    Navigator.pushReplacementNamed(context, routeName);
  }
  
  static void pop(BuildContext context) {
    Navigator.pop(context);
  }
  
  static void popUntil(BuildContext context, String routeName) {
    Navigator.popUntil(context, ModalRoute.withName(routeName));
  }
  
  static void pushAndRemoveUntil(BuildContext context, String routeName) {
    Navigator.pushNamedAndRemoveUntil(
      context,
      routeName,
      (route) => false,
    );
  }
}
```

## 🎯 高级导航

### 1. 嵌套路由
```dart
// 底部导航嵌套路由
class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = [
    HomeScreen(),
    SearchScreen(),
    ProfileScreen(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: '首页'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: '搜索'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: '我的'),
        ],
      ),
    );
  }
}
```

### 2. 深度链接
```dart
// 配置深度链接
class DeepLinkHandler {
  static void init() {
    // 获取初始链接
    getInitialLink().then((link) {
      if (link != null) {
        _handleLink(link);
      }
    });
    
    // 监听链接变化
    linkStream.listen((link) {
      if (link != null) {
        _handleLink(link);
      }
    });
  }
  
  static void _handleLink(String link) {
    final uri = Uri.parse(link);
    if (uri.path == '/detail') {
      // 导航到详情页
    }
  }
}
```

## 🛠️ 路由库

### 1. GoRouter
```dart
// 配置 GoRouter
final GoRouter _router = GoRouter(
  routes: <RouteBase>[
    GoRoute(
      path: '/',
      builder: (BuildContext context, GoRouterState state) {
        return const HomeScreen();
      },
      routes: <RouteBase>[
        GoRoute(
          path: 'detail/:id',
          builder: (BuildContext context, GoRouterState state) {
            final String id = state.params['id']!;
            return DetailScreen(id: id);
          },
        ),
      ],
    ),
  ],
);

// 使用 GoRouter
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
    );
  }
}

// 导航
context.go('/detail/123');
context.push('/detail/123');
context.pop();
```

### 2. AutoRoute
```dart
// 配置 AutoRoute
@MaterialAutoRouter(
  replaceInRouteName: 'Screen,Route',
  routes: <AutoRoute>[
    AutoRoute(page: HomeScreen, initial: true),
    AutoRoute(page: DetailScreen),
    AutoRoute(page: SettingsScreen),
  ],
)
class AppRouter extends _$AppRouter {}

// 使用 AutoRoute
class MyApp extends StatelessWidget {
  final _appRouter = AppRouter();
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerDelegate: _appRouter.delegate(),
      routeInformationParser: _appRouter.defaultRouteParser(),
    );
  }
}

// 导航
context.router.push(DetailRoute(id: 123));
context.router.pop();
```

## 🎨 路由动画

### 1. 内置动画
```dart
// 淡入淡出动画
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => DetailScreen(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    return FadeTransition(opacity: animation, child: child);
  },
)

// 滑动动画
PageRouteBuilder(
  pageBuilder: (context, animation, secondaryAnimation) => DetailScreen(),
  transitionsBuilder: (context, animation, secondaryAnimation, child) {
    const begin = Offset(1.0, 0.0);
    const end = Offset.zero;
    const curve = Curves.ease;
    
    var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));
    
    return SlideTransition(
      position: animation.drive(tween),
      child: child,
    );
  },
)
```

### 2. Hero 动画
```dart
// 源页面
Hero(
  tag: 'hero-tag',
  child: Image.network('https://example.com/image.jpg'),
)

// 目标页面
Hero(
  tag: 'hero-tag',
  child: Image.network('https://example.com/image.jpg'),
)

// 导航时自动执行 Hero 动画
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailScreen()),
);
```

## 📱 平台特定导航

### 1. 平台适配
```dart
// 根据平台选择路由样式
PageRouteBuilder _buildPageRoute(Widget page) {
  if (Theme.of(context).platform == TargetPlatform.iOS) {
    return CupertinoPageRoute(builder: (context) => page);
  } else {
    return MaterialPageRoute(builder: (context) => page);
  }
}
```

### 2. 平台集成
```dart
// Android 返回键处理
WillPopScope(
  onWillPop: () async {
    // 处理返回逻辑
    return true;
  },
  child: Scaffold(...),
)

// iOS 滑动返回
CupertinoPageRoute(
  builder: (context) => DetailScreen(),
)
```

## 🔧 导航调试

### 1. 调试工具
```dart
// 打印路由栈
void printRouteStack(BuildContext context) {
  Navigator.of(context).popUntil((route) {
    print('Route: ${route.settings.name}');
    return true;
  });
}

// 监听路由变化
class RouteObserver extends NavigatorObserver {
  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    print('Push: ${route.settings.name}');
  }
  
  @override
  void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    print('Pop: ${route.settings.name}');
  }
}
```

### 2. 常见问题
- **路由冲突**: 检查路由名称
- **参数丢失**: 检查参数传递
- **内存泄漏**: 正确清理资源

## 🚀 导航最佳实践

### 1. 路由命名规范
```dart
// 使用常量定义路由名称
class AppRoutes {
  static const String home = '/';
  static const String detail = '/detail';
  static const String settings = '/settings';
  
  // 带参数的路由
  static String detailWithId(String id) => '/detail/$id';
}
```

### 2. 路由权限控制
```dart
// 路由守卫
class RouteGuard {
  static Route<dynamic> guardRoute(RouteSettings settings) {
    if (settings.name == '/admin') {
      // 检查权限
      if (!isAdmin) {
        return MaterialPageRoute(
          builder: (context) => UnauthorizedScreen(),
        );
      }
    }
    return MaterialPageRoute(
      builder: (context) => _getScreen(settings.name!),
    );
  }
  
  static Widget _getScreen(String routeName) {
    switch (routeName) {
      case '/':
        return HomeScreen();
      case '/admin':
        return AdminScreen();
      default:
        return NotFoundScreen();
    }
  }
}
```

### 3. 路由性能优化
```dart
// 使用 Navigator 2.0 优化性能
class RouterDelegate extends RouterDelegate<RouteInformation>
    with ChangeNotifier, PopNavigatorRouterDelegateMixin<RouteInformation> {
  
  @override
  Widget build(BuildContext context) {
    return Navigator(
      key: navigatorKey,
      pages: [
        MaterialPage(child: HomeScreen()),
        if (_selectedItem != null)
          MaterialPage(child: DetailScreen(item: _selectedItem!)),
      ],
      onPopPage: (route, result) {
        if (!route.didPop(result)) return false;
        _selectedItem = null;
        notifyListeners();
        return true;
      },
    );
  }
}
```

## 📚 学习资源

- [Flutter 导航官方文档](https://flutter.dev/docs/development/ui/navigation)
- [Navigator 2.0 文档](https://flutter.dev/docs/development/ui/navigation/advanced)
- [GoRouter 官方文档](https://pub.dev/packages/go_router)
- [AutoRoute 官方文档](https://pub.dev/packages/auto_route)

## 🔗 相关链接

- [Widget 系统](/guide/widgets) - Widget 系统
- [状态管理](/guide/state-management) - 状态管理
- [架构概览](/core/architecture) - Flutter 架构
- [电商应用](/projects/ecommerce) - 实战项目

---
*最后更新: 2026年5月23日*