# 一切皆 Widget 详解

> 深入理解 Flutter "一切皆 Widget" 的设计理念。

## 📖 一切皆 Widget 基础

### 1. 什么是一切皆 Widget

```dart
// 一切皆 Widget 概念
class EverythingIsWidgetConcept {
  void explain() {
    print('''
    一切皆 Widget 概念：
    
    // 1. 什么是一切皆 Widget
    // - Flutter 的核心设计理念
    // - UI 由 Widget 组成
    // - Widget 是不可变的配置
    // - Widget 通过组合构建 UI
    
    // 2. 一切皆 Widget 的特点
    // - 组合性：Widget 可以组合
    // - 不可变性：Widget 是不可变的
    // - 声明式：声明式 UI 构建
    // - 响应式：响应式更新
    
    // 3. 一切皆 Widget 的范围
    // - 布局：Container, Row, Column
    // - 文本：Text, RichText
    // - 按钮：ElevatedButton, TextButton
    // - 输入：TextField, TextFormField
    // - 图片：Image, Icon
    // - 动画：AnimatedContainer
    // - 手势：GestureDetector, InkWell
    
    // 4. 一切皆 Widget 的优势
    // - 一致性：统一的构建方式
    // - 灵活性：灵活的组合方式
    // - 可维护性：易于维护
    // - 可测试性：易于测试
    ''');
  }
}
```

### 2. 一切皆 Widget 实现

```dart
// 一切皆 Widget 实现
class EverythingIsWidgetImplementation {
  void explain() {
    print('''
    一切皆 Widget 实现：
    
    // 1. Widget 组合
    Container(
      padding: EdgeInsets.all(16),
      child: Column(
        children: [
          Text('Hello'),
          ElevatedButton(
            onPressed: () {},
            child: Text('Click'),
          ),
        ],
      ),
    )
    
    // 2. Widget 嵌套
    Scaffold(
      appBar: AppBar(title: Text('My App')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.star),
            Text('Welcome'),
          ],
        ),
      ),
    )
    
    // 3. Widget 复用
    class MyButton extends StatelessWidget {
      final String text;
      final VoidCallback onPressed;
      
      const MyButton({required this.text, required this.onPressed});
      
      @override
      Widget build(BuildContext context) {
        return ElevatedButton(
          onPressed: onPressed,
          child: Text(text),
        );
      }
    }
    ''');
  }
}
```

## 🔗 相关链接

- [[Widget基础详解]]
- [[StatelessWidget]]
- [[StatefulWidget]]
- [[组合vs继承]]

---

> 一切皆 Widget 是 Flutter 的核心设计理念，理解它对于掌握 Flutter 开发非常重要。