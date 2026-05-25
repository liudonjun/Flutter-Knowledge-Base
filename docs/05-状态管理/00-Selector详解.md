# Selector 详解

> 深入理解 Flutter 中的 Selector。

## 📖 Selector 基础

### 1. 什么是 Selector

```dart
// Selector 概念
class SelectorConcept {
  void explain() {
    print('''
    Selector 概念：
    
    // 1. 什么是 Selector
    // - Provider 的选择器
    // - 监听特定属性
    // - 优化重建范围
    // - 提高性能
    
    // 2. Selector 的特点
    // - 精确监听
    // - 减少重建
    // - 性能优化
    // - 易于使用
    
    // 3. Selector 的使用场景
    // - 监听特定属性
    // - 优化性能
    // - 减少重建
    // - 复杂对象
    
    // 4. Selector 的优势
    // - 精确控制
    // - 减少重建
    // - 提高性能
    // - 代码简洁
    ''');
  }
}
```

### 2. Selector 实现

```dart
// Selector 实现
class SelectorImplementation {
  void explain() {
    print('''
    Selector 实现：
    
    // 1. 基本使用
    Selector<Counter, int>(
      selector: (context, counter) => counter.count,
      builder: (context, count, child) {
        return Text('Count: $count');
      },
    )
    
    // 2. 监听多个属性
    Selector<User, Map<String, dynamic>>(
      selector: (context, user) => {
        'name': user.name,
        'age': user.age,
      },
      builder: (context, data, child) {
        return Text('${data['name']} - ${data['age']}');
      },
    )
    
    // 3. 使用 shouldRebuild
    Selector<Counter, int>(
      selector: (context, counter) => counter.count,
      shouldRebuild: (previous, next) => previous != next,
      builder: (context, count, child) {
        return Text('Count: $count');
      },
    )
    
    // 4. Selector 与 Consumer 的区别
    // Consumer：监听整个对象
    // Selector：监听特定属性
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[ChangeNotifier]]
- [[Consumer]]
- [[状态选择器]]

---

> Selector 是优化 Provider 性能的重要组件，掌握它对于提高应用性能非常重要。