# Navigator 基础

> 掌握 Flutter 导航的基础 - Navigator 的使用方法。

## 📖 Navigator 概述

### 1. 基本概念

```dart
// Navigator 基本概念
class NavigatorBasics {
  void explain() {
    print('''
    Navigator 基本概念：
    
    // Navigator 是 Flutter 的路由管理器
    // 使用栈（Stack）结构管理页面
    // 新页面 push 入栈，返回时 pop 出栈
    
    Navigator 栈结构：
    ┌─────────────┐
    │   Page C    │  ← 当前页面（栈顶）
    ├─────────────┤
    │   Page B    │
    ├─────────────┤
    │   Page A    │  ← 首页（栈底）
    └─────────────┘
    ''');
  }
}
```

### 2. 基本导航

```dart
// 基本导航
class BasicNavigation {
  void explain() {
    print('''
    基本导航方法：
    
    // 1. push - 跳转到新页面
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NextPage()),
    );
    
    // 2. pop - 返回上一页
    Navigator.pop(context);
    
    // 3. push 返回 Future（获取返回值）
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => NextPage()),
    );
    
    // 4. pop 传递返回值
    Navigator.pop(context, '返回的数据');
    
    // 5. pushReplacement - 替换当前页面
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => NextPage()),
    );
    
    // 6. pushAndRemoveUntil - 清空栈并跳转
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(builder: (context) => HomePage()),
      (route) => false,  // 移除所有旧页面
    );
    ''');
  }
}
```

### 3. 路由类型

```dart
// 路由类型
class RouteTypes {
  void explain() {
    print('''
    路由类型：
    
    // 1. MaterialPageRoute - Material 风格
    MaterialPageRoute(
      builder: (context) => NextPage(),
      settings: RouteSettings(name: '/next'),
      fullscreenDialog: false,  // 是否全屏对话框
    )
    
    // 2. CupertinoPageRoute - iOS 风格
    CupertinoPageRoute(
      builder: (context) => NextPage(),
    )
    
    // 3. PageRouteBuilder - 自定义路由
    PageRouteBuilder(
      pageBuilder: (context, animation, secondaryAnimation) => NextPage(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        // 自定义转场动画
        return FadeTransition(opacity: animation, child: child);
      },
      transitionDuration: Duration(milliseconds: 300),
    )
    ''');
  }
}
```

## 📖 命名路由

### 1. 定义命名路由

```dart
// 命名路由定义
class NamedRoutes {
  void explain() {
    print('''
    命名路由：
    
    // 方式1：在 MaterialApp 中定义
    MaterialApp(
      initialRoute: '/',
      routes: {
        '/': (context) => HomePage(),
        '/detail': (context) => DetailPage(),
        '/settings': (context) => SettingsPage(),
      },
    )
    
    // 方式2：使用 onGenerateRoute
    MaterialApp(
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (context) => HomePage());
          case '/detail':
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (context) => DetailPage(id: args['id']),
            );
          default:
            return MaterialPageRoute(builder: (context) => NotFoundPage());
        }
      },
    )
    
    // 使用命名路由
    Navigator.pushNamed(context, '/detail', arguments: {'id': 123});
    Navigator.popUntil(context, ModalRoute.withName('/'));
    ''');
  }
}
```

## 📖 路由传参

### 1. 传递参数

```dart
// 路由传参
class RouteParameters {
  void explain() {
    print('''
    路由传参方式：
    
    // 方式1：构造函数传参
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailPage(id: 123, title: '标题'),
      ),
    );
    
    class DetailPage extends StatelessWidget {
      final int id;
      final String title;
      
      DetailPage({required this.id, required this.title});
    }
    
    // 方式2：命名路由传参
    Navigator.pushNamed(
      context,
      '/detail',
      arguments: {'id': 123, 'title': '标题'},
    );
    
    // 获取参数
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;
    final id = args['id'];
    final title = args['title'];
    
    // 方式3：返回值
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SelectionPage()),
    );
    
    // 在 SelectionPage 中返回
    Navigator.pop(context, '选择的结果');
    ''');
  }
}
```

---

> Navigator 是 Flutter 导航的基础，掌握这些基本用法是学习路由管理的第一步。