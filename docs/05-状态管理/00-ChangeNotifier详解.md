# ChangeNotifier 详解

> 深入理解 Flutter 中的 ChangeNotifier。

## 📖 ChangeNotifier 基础

### 1. 什么是 ChangeNotifier

```dart
// ChangeNotifier 概念
class ChangeNotifierConcept {
  void explain() {
    print('''
    ChangeNotifier 概念：
    
    // 1. 什么是 ChangeNotifier
    // - Flutter 提供的通知器
    // - 用于监听变化
    // - 实现观察者模式
    // - 常用于状态管理
    
    // 2. ChangeNotifier 的特点
    // - 简单易用
    // - 性能优化
    // - 支持多监听器
    // - 易于测试
    
    // 3. ChangeNotifier 的使用场景
    // - 状态管理
    // - 数据变化通知
    // - UI 更新
    // - 业务逻辑
    
    // 4. ChangeNotifier 的优势
    // - 内置支持
    // - 无需额外依赖
    // - 与 Provider 配合
    // - 性能良好
    ''');
  }
}
```

### 2. ChangeNotifier 实现

```dart
// ChangeNotifier 实现
class ChangeNotifierImplementation {
  void explain() {
    print('''
    ChangeNotifier 实现：
    
    // 1. 定义 ChangeNotifier
    class Counter extends ChangeNotifier {
      int _count = 0;
      
      int get count => _count;
      
      void increment() {
        _count++;
        notifyListeners();
      }
      
      void decrement() {
        _count--;
        notifyListeners();
      }
    }
    
    // 2. 使用 ChangeNotifierProvider
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    )
    
    // 3. 监听变化
    Consumer<Counter>(
      builder: (context, counter, child) {
        return Text('Count: ${counter.count}');
      },
    )
    
    // 4. 调用方法
    final counter = Provider.of<Counter>(context, listen: false);
    counter.increment();
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[Consumer]]
- [[Selector]]
- [[状态更新]]

---

> ChangeNotifier 是 Flutter 状态管理的基础，掌握它对于理解 Provider 非常重要。