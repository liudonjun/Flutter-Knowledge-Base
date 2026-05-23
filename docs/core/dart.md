# Dart 语言

> Dart 是 Flutter 的开发语言，掌握 Dart 是学好 Flutter 的基础。

## 📖 语言基础

### 1. 基本语法
```dart
// 变量声明
var name = 'Flutter';
String language = 'Dart';
int version = 3;

// 函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数
int multiply(int a, int b) => a * b;
```

### 2. 面向对象
```dart
// 类定义
class Animal {
  String name;
  int age;
  
  Animal(this.name, this.age);
  
  void speak() {
    print('$name says hello!');
  }
}

// 继承
class Dog extends Animal {
  Dog(String name, int age) : super(name, age);
  
  @override
  void speak() {
    print('$name barks!');
  }
}
```

### 3. 异步编程
```dart
// Future
Future<String> fetchData() async {
  await Future.delayed(Duration(seconds: 2));
  return 'Data loaded';
}

// 使用
void main() async {
  String data = await fetchData();
  print(data);
}
```

## 🎯 核心概念

### 类型系统
- **静态类型**: 编译时类型检查
- **类型推断**: 自动推断类型
- **空安全**: 可空和非空类型

### 函数式编程
- **一等函数**: 函数可以作为参数传递
- **闭包**: 函数可以访问外部变量
- **高阶函数**: 接受函数作为参数的函数

## 🔧 实践技巧

### 代码规范
- 使用有意义的变量名
- 保持函数简短
- 添加必要的注释

### 性能优化
- 使用 const 构造函数
- 避免不必要的对象创建
- 合理使用异步编程

## 📚 学习资源

- [Dart 官方文档](https://dart.dev/guides)
- [Dart 语言之旅](https://dart.dev/guides/language/language-tour)
- [Effective Dart](https://dart.dev/guides/language/effective-dart)

## 🔗 相关链接

### 核心概念
- [架构概览](/core/architecture) - Flutter 架构概览
- [一切皆 Widget](/core/widgets) - 一切皆 Widget
- [Dart 语言](/core/dart) - Dart 语言

### 指南
- [Widget 系统](/guide/widgets) - Widget 系统详解
- [状态管理](/guide/state-management) - 状态管理方案
- [导航与路由](/guide/navigation) - 导航与路由系统

### 实战项目
- [电商应用](/projects/ecommerce) - 电商应用实战
- [社交应用](/projects/social) - 社交应用开发

### 学习资源
- [官方资源](/resources/official) - 官方资源
- [社区资源](/resources/community) - 社区资源
- [书籍推荐](/resources/books) - 书籍推荐

---
*最后更新: 2026年5月23日*