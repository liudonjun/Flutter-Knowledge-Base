# MaterialPageRoute 详解

> 深入理解 Flutter 中的 MaterialPageRoute。

## 📖 MaterialPageRoute 基础

### 1. 什么是 MaterialPageRoute

```dart
// MaterialPageRoute 概念
class MaterialPageRouteConcept {
  void explain() {
    print('''
    MaterialPageRoute 概念：
    
    // 1. 什么是 MaterialPageRoute
    // - Material Design 风格的页面路由
    // - 提供标准的页面转场动画
    // - 支持页面标题和返回按钮
    // - 遵循 Material Design 规范
    
    // 2. MaterialPageRoute 的特点
    // - 标准动画：提供标准的转场动画
    // - 导航栏：自动处理导航栏
    // - 返回手势：支持滑动返回
    // - 页面标题：自动设置页面标题
    
    // 3. MaterialPageRoute 的使用场景
    // - 标准导航：提供标准的页面切换
    // - 详情页面：显示详细信息
    // - 设置页面：应用设置页面
    // - 表单页面：数据输入页面
    ''');
  }
}
```

### 2. MaterialPageRoute 配置

```dart
// MaterialPageRoute 配置
class MaterialPageRouteConfiguration {
  void explain() {
    print('''
    MaterialPageRoute 配置：
    
    // 1. 基本配置
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(),
      ),
    )
    
    // 2. 带标题的路由
    Navigator.push(
      context,
      MaterialPageRoute(
        title: 'Details',
        builder: (context) => DetailsPage(),
      ),
    )
    
    // 3. 带参数的路由
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(id: 42),
      ),
    )
    
    // 4. 全屏对话框
    Navigator.push(
      context,
      MaterialPageRoute(
        fullscreenDialog: true,
        builder: (context) => DialogPage(),
      ),
    )
    ''');
  }
}
```

## 🔧 MaterialPageRoute 使用

### 1. 路由参数

```dart
// 路由参数
class RouteParameters {
  void explain() {
    print('''
    路由参数：
    
    // 1. 传递参数
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(
          id: 42,
          title: 'Hello',
        ),
      ),
    )
    
    // 2. 接收参数
    class DetailsPage extends StatelessWidget {
      final int id;
      final String title;
      
      const DetailsPage({
        Key? key,
        required this.id,
        required this.title,
      }) : super(key: key);
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(title: Text(title)),
          body: Center(child: Text('ID: $id')),
        );
      }
    }
    
    // 3. 返回结果
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(),
      ),
    ).then((result) {
      // 处理返回结果
      print('Result: $result');
    });
    
    // 4. 返回带结果
    Navigator.pop(context, {'id': 42, 'title': 'Hello'});
    ''');
  }
}
```

### 2. 页面生命周期

```dart
// 页面生命周期
class PageLifecycle {
  void explain() {
    print('''
    页面生命周期：
    
    // 1. 页面进入
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => DetailsPage(),
      ),
    );
    // 触发 DetailsPage 的 initState
    
    // 2. 页面返回
    Navigator.pop(context);
    // 触发 DetailsPage 的 dispose
    
    // 3. 页面替换
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(
        builder: (context) => NewPage(),
      ),
    );
    // 旧页面被移除，新页面被添加
    
    // 4. 页面清除
    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (context) => HomePage(),
      ),
      (route) => false,
    );
    // 清除所有页面，添加新页面
    ''');
  }
}
```

## ⚠️ 注意事项

1. **MaterialPageRoute 提供标准的转场动画**
2. **注意页面生命周期**
3. **合理传递参数**
4. **考虑页面返回结果**

## 🔗 相关链接

- [[Navigator基础]]
- [[页面跳转详解]]
- [[路由守卫详解]]
- [[页面传值详解]]

---

> MaterialPageRoute 是 Flutter 中最常用的路由方式，掌握它对于构建标准应用非常重要。