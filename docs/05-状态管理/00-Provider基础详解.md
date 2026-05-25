# Provider 基础详解

> 深入理解 Flutter 中的 Provider 状态管理。

## 📖 Provider 基础

### 1. 什么是 Provider

```dart
// Provider 概念
class ProviderBasicsConcept {
  void explain() {
    print('''
    Provider 概念：
    
    // 1. 什么是 Provider
    // - Flutter 官方推荐的状态管理方案
    // - 基于 InheritedWidget
    // - 提供依赖注入
    // - 简化状态共享
    
    // 2. Provider 的特点
    // - 简单易用
    // - 性能优化
    // - 支持多种类型
    // - 易于测试
    
    // 3. Provider 的类型
    // - Provider：基本提供者
    // - ChangeNotifierProvider：监听变化
    // - FutureProvider：异步数据
    // - StreamProvider：流数据
    // - MultiProvider：多个提供者
    
    // 4. Provider 的使用场景
    // - 共享状态
    // - 依赖注入
    // - 主题管理
    // - 用户信息
    ''');
  }
}
```

### 2. Provider 实现

```dart
// Provider 实现
class ProviderImplementation {
  void explain() {
    print('''
    Provider 实现：
    
    // 1. 定义 Model
    class Counter with ChangeNotifier {
      int _count = 0;
      
      int get count => _count;
      
      void increment() {
        _count++;
        notifyListeners();
      }
    }
    
    // 2. 使用 Provider
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    )
    
    // 3. 访问 Provider
    // 方式 1：Provider.of
    final counter = Provider.of<Counter>(context);
    
    // 方式 2：Consumer
    Consumer<Counter>(
      builder: (context, counter, child) {
        return Text('Count: ${counter.count}');
      },
    )
    
    // 方式 3：context.watch (Flutter 1.23+)
    final counter = context.watch<Counter>();
    
    // 方式 4：context.read (Flutter 1.23+)
    final counter = context.read<Counter>();
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider类型]]
- [[ChangeNotifier]]
- [[Consumer]]
- [[Selector]]

---

> Provider 是 Flutter 官方推荐的状态管理方案，掌握它对于构建应用非常重要。