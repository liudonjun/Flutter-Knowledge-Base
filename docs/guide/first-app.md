# 第一个应用

> 创建你的第一个 Flutter 应用，体验 Flutter 开发的乐趣。

## 🚀 创建项目

### 使用命令行
```bash
# 创建新项目
flutter create my_first_app

# 进入项目目录
cd my_first_app

# 运行应用
flutter run
```

### 使用 IDE
1. 打开 Android Studio 或 VS Code
2. 选择 "New Flutter Project"
3. 填写项目信息
4. 点击 "Finish"

## 📁 项目结构

```
my_first_app/
├── android/          # Android 平台代码
├── ios/              # iOS 平台代码
├── lib/              # Dart 源代码
│   └── main.dart     # 主入口文件
├── test/             # 测试代码
├── web/              # Web 平台代码
├── pubspec.yaml      # 项目配置文件
└── README.md         # 项目说明
```

## 🎨 第一个应用代码

### main.dart
```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 🎯 代码解析

### 1. 主函数
```dart
void main() {
  runApp(const MyApp());
}
```
- `main()`: 应用入口函数
- `runApp()`: 启动 Flutter 应用

### 2. 无状态 Widget
```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(...);
  }
}
```
- `StatelessWidget`: 无状态 Widget
- `build()`: 构建 UI 的方法

### 3. 有状态 Widget
```dart
class MyHomePage extends StatefulWidget {
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;
  
  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }
}
```
- `StatefulWidget`: 有状态 Widget
- `setState()`: 更新状态的方法

## 🚀 运行应用

### 命令行运行
```bash
# 运行在默认设备上
flutter run

# 运行在 Chrome 浏览器
flutter run -d chrome

# 运行在 Android 模拟器
flutter run -d emulator-5554
```

### IDE 运行
1. 选择目标设备
2. 点击运行按钮
3. 等待应用启动

## 🔧 调试应用

### 热重载
- **保存文件**: 自动热重载
- **按 `r`**: 手动热重载
- **按 `R`**: 热重启

### 调试工具
- **Flutter Inspector**: 查看 Widget 树
- **DevTools**: 性能分析和调试
- **日志输出**: 查看控制台日志

## 🔗 相关链接

### 入门指南
- [[Flutter 简介]] - Flutter 简介
- [[环境搭建]] - 环境搭建
- [[第一个应用]] - 第一个应用

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Dart 语言]] - Dart 语言

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[状态管理]] - 状态管理方案
- [[导航与路由]] - 导航与路由系统

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

## 📚 下一步

- [[Widget 系统]] - Widget 系统
- [[状态管理]] - 状态管理
- [[导航与路由]] - 导航与路由

---
*最后更新: 2026年5月23日*