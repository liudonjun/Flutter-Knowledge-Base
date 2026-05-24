# Stack 和 Positioned 详解

> 深入理解 Flutter 中的层叠布局 Widget - Stack 和 Positioned。

## 📖 Stack 基础

### 1. 基本用法

```dart
// Stack 基本用法
class StackBasics {
  void explain() {
    print('''
    Stack 基本用法：
    
    // 最简单的 Stack
    Stack(
      children: [
        Container(color: Colors.red, width: 200, height: 200),
        Container(color: Colors.blue, width: 150, height: 150),
        Container(color: Colors.green, width: 100, height: 100),
      ],
    )
    
    // 子组件会层叠显示
    // 后面的子组件显示在上面
    
    // 设置对齐方式
    Stack(
      alignment: Alignment.center,
      children: [
        Container(color: Colors.red, width: 200, height: 200),
        Container(color: Colors.blue, width: 100, height: 100),
      ],
    )
    
    // 设置适配方式
    Stack(
      fit: StackFit.expand,
      children: [...],
    )
    ''');
  }
}
```

### 2. StackFit

```dart
// StackFit 详解
class StackFitExample {
  void explain() {
    print('''
    StackFit 选项：
    
    // StackFit.loose（默认）
    // 子组件可以比 Stack 小
    Stack(
      fit: StackFit.loose,
      children: [
        Container(width: 100, height: 100, color: Colors.red),
      ],
    )
    
    // StackFit.expand
    // 子组件扩展到 Stack 大小
    Stack(
      fit: StackFit.expand,
      children: [
        Container(color: Colors.red),
        Center(child: Text('居中')),
      ],
    )
    
    // StackFit.passthrough
    // 传递父组件的约束
    Stack(
      fit: StackFit.passthrough,
      children: [...],
    )
    ''');
  }
}
```

## 📖 Positioned

### 1. 绝对定位

```dart
// Positioned 定位
class PositionedExample {
  void explain() {
    print('''
    Positioned 定位：
    
    // 使用 left, top, right, bottom
    Stack(
      children: [
        Positioned(
          left: 20,
          top: 20,
          child: Container(color: Colors.red, width: 50, height: 50),
        ),
        Positioned(
          right: 20,
          bottom: 20,
          child: Container(color: Colors.blue, width: 50, height: 50),
        ),
      ],
    )
    
    // 使用 width, height
    Positioned(
      left: 10,
      top: 10,
      width: 100,
      height: 50,
      child: Container(color: Colors.green),
    )
    
    // 填充整个 Stack
    Positioned.fill(
      child: Container(color: Colors.yellow),
    )
    
    // 使用方向
    Positioned(
      left: 10,
      right: 10,
      top: 10,
      height: 50,
      child: Container(color: Colors.purple),
    )
    ''');
  }
}
```

### 2. 常见布局

```dart
// 常见布局示例
class CommonLayouts {
  void explain() {
    print('''
    常见布局：
    
    // 1. 角标
    Stack(
      children: [
        Icon(Icons.notifications, size: 40),
        Positioned(
          right: 0,
          top: 0,
          child: Container(
            padding: EdgeInsets.all(2),
            decoration: BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.circular(10),
            ),
            constraints: BoxConstraints(minWidth: 16, minHeight: 16),
            child: Text('5', style: TextStyle(color: Colors.white, fontSize: 10)),
          ),
        ),
      ],
    )
    
    // 2. 图片叠加文字
    Stack(
      children: [
        Image.network('https://example.com/image.jpg'),
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: Container(
            color: Colors.black54,
            padding: EdgeInsets.all(8),
            child: Text('标题', style: TextStyle(color: Colors.white)),
          ),
        ),
      ],
    )
    
    // 3. 浮动按钮
    Stack(
      children: [
        // 主要内容
        ListView(...),
        // 浮动按钮
        Positioned(
          right: 16,
          bottom: 16,
          child: FloatingActionButton(...),
        ),
      ],
    )
    ''');
  }
}
```

---

> Stack 和 Positioned 是实现层叠布局的关键，常用于浮动按钮、角标等场景。