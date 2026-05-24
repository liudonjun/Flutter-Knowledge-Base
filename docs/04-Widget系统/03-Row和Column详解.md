# Row 和 Column 详解

> 深入理解 Flutter 中的线性布局 Widget - Row 和 Column。

## 📖 Row 水平布局

### 1. 基本用法

```dart
// Row 基本用法
class RowBasics {
  void explain() {
    print('''
    Row 基本用法：
    
    // 最简单的 Row
    Row(
      children: [
        Text('第一个'),
        Text('第二个'),
        Text('第三个'),
      ],
    )
    
    // 主轴对齐
    Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [...],
    )
    
    // 交叉轴对齐
    Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [...],
    )
    
    // 主轴大小
    Row(
      mainAxisSize: MainAxisSize.min,
      children: [...],
    )
    ''');
  }
}
```

### 2. 对齐方式

```dart
// Row 对齐方式
class RowAlignment {
  void explain() {
    print('''
    Row 对齐方式：
    
    // MainAxisAlignment
    MainAxisAlignment.start       // 起始位置
    MainAxisAlignment.end         // 结束位置
    MainAxisAlignment.center      // 居中
    MainAxisAlignment.spaceBetween // 两端对齐
    MainAxisAlignment.spaceAround // 等间距（两端一半）
    MainAxisAlignment.spaceEvenly // 完全等间距
    
    // CrossAxisAlignment
    CrossAxisAlignment.start      // 起始位置
    CrossAxisAlignment.end        // 结束位置
    CrossAxisAlignment.center     // 居中
    CrossAxisAlignment.stretch    // 拉伸
    CrossAxisAlignment.baseline   // 基线对齐
    
    // 示例
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Container(color: Colors.red, width: 50, height: 50),
        Container(color: Colors.green, width: 50, height: 100),
        Container(color: Colors.blue, width: 50, height: 50),
      ],
    )
    ''');
  }
}
```

### 3. Expanded 和 Flexible

```dart
// Expanded 和 Flexible
class ExpandedFlexible {
  void explain() {
    print('''
    Expanded 和 Flexible：
    
    // Expanded - 强制填充
    Row(
      children: [
        Expanded(
          flex: 2,
          child: Container(color: Colors.red),
        ),
        Expanded(
          flex: 1,
          child: Container(color: Colors.blue),
        ),
      ],
    )
    
    // Flexible - 灵活布局
    Row(
      children: [
        Flexible(
          flex: 1,
          child: Container(color: Colors.red),
        ),
        Flexible(
          flex: 2,
          fit: FlexFit.tight, // 或 FlexFit.loose
          child: Container(color: Colors.blue),
        ),
      ],
    )
    
    // 区别：
    // Expanded: Flexible(flex: x, fit: FlexFit.tight)
    // Expanded 强制子组件填充可用空间
    // Flexible 允许子组件更小
    ''');
  }
}
```

## 📖 Column 垂直布局

### 1. 基本用法

```dart
// Column 基本用法
class ColumnBasics {
  void explain() {
    print('''
    Column 基本用法：
    
    // 最简单的 Column
    Column(
      children: [
        Text('第一个'),
        Text('第二个'),
        Text('第三个'),
      ],
    )
    
    // 主轴（垂直）对齐
    Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [...],
    )
    
    // 交叉轴（水平）对齐
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [...],
    )
    
    // 实际上 Column 和 Row 的用法几乎一样
    // 只是方向不同
    ''');
  }
}
```

### 2. 常见问题

```dart
// Column 常见问题
class ColumnIssues {
  void explain() {
    print('''
    Column 常见问题：
    
    // 问题1：垂直溢出
    // 解决方案：使用 SingleChildScrollView
    SingleChildScrollView(
      child: Column(
        children: [...],
      ),
    )
    
    // 问题2：无限高度
    // Column 在 ListView 中会出错
    // 解决方案：使用 Expanded
    Column(
      children: [
        Text('固定内容'),
        Expanded(
          child: ListView(...),
        ),
      ],
    )
    
    // 问题3：子组件太大
    // 解决方案：使用 Expanded 或 Flexible
    Column(
      children: [
        Expanded(child: LargeWidget()),
      ],
    )
    ''');
  }
}
```

## 📖 布局组合

### 1. Row 和 Column 嵌套

```dart
// 布局组合
class LayoutCombination {
  void explain() {
    print('''
    Row 和 Column 组合：
    
    // 网格布局
    Column(
      children: [
        Row(
          children: [
            Expanded(child: Container(color: Colors.red)),
            Expanded(child: Container(color: Colors.blue)),
          ],
        ),
        Row(
          children: [
            Expanded(child: Container(color: Colors.green)),
            Expanded(child: Container(color: Colors.yellow)),
          ],
        ),
      ],
    )
    
    // 卡片布局
    Card(
      child: Column(
        children: [
          Row(
            children: [
              Icon(Icons.star),
              SizedBox(width: 8),
              Expanded(child: Text('标题')),
              Text('更多'),
            ],
          ),
          Text('内容'),
        ],
      ),
    )
    ''');
  }
}
```

---

> Row 和 Column 是 Flutter 布局的基础，掌握它们能让你构建出各种复杂的界面。