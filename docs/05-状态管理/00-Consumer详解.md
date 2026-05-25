# Consumer 详解

> 深入理解 Flutter 中的 Consumer。

## 📖 Consumer 基础

### 1. 什么是 Consumer

```dart
// Consumer 概念
class ConsumerConcept {
  void explain() {
    print('''
    Consumer 概念：
    
    // 1. 什么是 Consumer
    // - Provider 的消费者
    // - 监听状态变化
    // - 自动重建 UI
    // - 优化性能
    
    // 2. Consumer 的特点
    // - 自动监听
    // - 局部重建
    // - 性能优化
    // - 易于使用
    
    // 3. Consumer 的使用场景
    // - 监听状态
    // - 更新 UI
    // - 局部重建
    // - 性能优化
    
    // 4. Consumer 的优势
    // - 减少重建范围
    // - 提高性能
    // - 代码简洁
    // - 易于维护
    ''');
  }
}
```

### 2. Consumer 实现

```dart
// Consumer 实现
class ConsumerImplementation {
  void explain() {
    print('''
    Consumer 实现：
    
    // 1. 基本使用
    Consumer<Counter>(
      builder: (context, counter, child) {
        return Text('Count: ${counter.count}');
      },
    )
    
    // 2. 使用 child 参数
    Consumer<Counter>(
      builder: (context, counter, child) {
        return Column(
          children: [
            child!,  // 不会重建
            Text('Count: ${counter.count}'),
          ],
        );
      },
      child: ExpensiveWidget(),  // 传入不变的 Widget
    )
    
    // 3. 多个 Consumer
    Consumer2<Counter, ThemeModel>(
      builder: (context, counter, theme, child) {
        return Text(
          'Count: ${counter.count}',
          style: TextStyle(color: theme.color),
        );
      },
    )
    
    // 4. Consumer 与 Selector 的区别
    // Consumer：监听整个对象
    // Selector：监听特定属性
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[ChangeNotifier]]
- [[Selector]]
- [[状态选择器]]

---

> Consumer 是 Provider 中常用的组件，掌握它对于优化性能非常重要。