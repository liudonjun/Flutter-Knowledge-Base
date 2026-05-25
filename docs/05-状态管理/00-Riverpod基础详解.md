# Riverpod 基础详解

> 深入理解 Flutter 中的 Riverpod 状态管理。

## 📖 Riverpod 基础

### 1. 什么是 Riverpod

```dart
// Riverpod 概念
class RiverpodBasicsConcept {
  void explain() {
    print('''
    Riverpod 概念：
    
    // 1. 什么是 Riverpod
    // - Provider 的改进版
    // - 编译时安全
    // - 支持依赖注入
    // - 支持多种 Provider
    
    // 2. Riverpod 的特点
    // - 编译时安全
    // - 支持依赖注入
    // - 支持多种 Provider
    // - 易于测试
    
    // 3. Riverpod 的类型
    // - Provider：基本 Provider
    // - StateProvider：状态 Provider
    // - FutureProvider：异步 Provider
    // - StreamProvider：流 Provider
    // - ChangeNotifierProvider：通知 Provider
    
    // 4. Riverpod 的使用场景
    // - 状态管理
    // - 依赖注入
    // - 数据共享
    // - 配置管理
    ''');
  }
}
```

### 2. Riverpod 实现

```dart
// Riverpod 实现
class RiverpodImplementation {
  void explain() {
    print('''
    Riverpod 实现：
    
    // 1. 定义 Provider
    final counterProvider = StateProvider<int>((ref) => 0);
    
    // 2. 使用 Provider
    class MyWidget extends ConsumerWidget {
      @override
      Widget build(BuildContext context, WidgetRef ref) {
        final count = ref.watch(counterProvider);
        return Text('Count: $count');
      }
    }
    
    // 3. 更新状态
    ref.read(counterProvider.notifier).state++;
    
    // 4. 使用 ChangeNotifierProvider
    class Counter extends ChangeNotifier {
      int _count = 0;
      
      int get count => _count;
      
      void increment() {
        _count++;
        notifyListeners();
      }
    }
    
    final counterProvider = ChangeNotifierProvider<Counter>((ref) {
      return Counter();
    });
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[ChangeNotifier]]
- [[状态共享]]
- [[依赖管理]]

---

> Riverpod 是改进的 Provider，掌握它对于构建现代应用非常重要。