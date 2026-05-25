# InheritedWidget 基础详解

> 深入理解 Flutter 中的 InheritedWidget。

## 📖 InheritedWidget 基础

### 1. 什么是 InheritedWidget

```dart
// InheritedWidget 概念
class InheritedWidgetBasicsConcept {
  void explain() {
    print('''
    InheritedWidget 概念：
    
    // 1. 什么是 InheritedWidget
    // - Flutter 内置的数据共享 Widget
    // - 在 Widget 树中共享数据
    // - 支持数据变化通知
    // - 性能优化
    
    // 2. InheritedWidget 的特点
    // - 数据共享：在 Widget 树中共享数据
    // - 变化通知：数据变化时通知子 Widget
    // - 性能优化：只重建依赖的 Widget
    // - 内置支持：无需额外依赖
    
    // 3. InheritedWidget 的使用场景
    // - 主题数据共享
    // - 语言环境共享
    // - 用户信息共享
    // - 配置数据共享
    
    // 4. InheritedWidget 的优势
    // - 内置支持
    // - 性能优化
    // - 数据共享
    // - 变化通知
    ''');
  }
}
```

### 2. InheritedWidget 实现

```dart
// InheritedWidget 实现
class InheritedWidgetImplementation {
  void explain() {
    print('''
    InheritedWidget 实现：
    
    // 1. 定义 InheritedWidget
    class MyInheritedWidget extends InheritedWidget {
      final int data;
      
      const MyInheritedWidget({
        Key? key,
        required this.data,
        required Widget child,
      }) : super(key: key, child: child);
      
      static MyInheritedWidget? of(BuildContext context) {
        return context.dependOnInheritedWidgetOfExactType<MyInheritedWidget>();
      }
      
      @override
      bool updateShouldNotify(MyInheritedWidget oldWidget) {
        return data != oldWidget.data;
      }
    }
    
    // 2. 使用 InheritedWidget
    MyInheritedWidget(
      data: 42,
      child: MyWidget(),
    )
    
    // 3. 访问数据
    final inherited = MyInheritedWidget.of(context);
    final data = inherited?.data;
    
    // 4. 监听变化
    // 当 data 变化时，依赖的 Widget 会重建
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[数据共享]]
- [[状态共享]]
- [[生命周期]]

---

> InheritedWidget 是 Flutter 数据共享的基础，理解它对于掌握 Provider 非常重要。