# GridView 详解

> 深入理解 Flutter 中的网格布局 Widget - GridView。

## 📖 GridView 基础

### 1. 基本用法

```dart
// GridView 基本用法
class GridViewBasics {
  void explain() {
    print('''
    GridView 基本用法：
    
    // 方式1：GridView.count
    GridView.count(
      crossAxisCount: 2,  // 每行2个
      children: [
        Container(color: Colors.red),
        Container(color: Colors.blue),
        Container(color: Colors.green),
        Container(color: Colors.yellow),
      ],
    )
    
    // 方式2：GridView.extent
    GridView.extent(
      maxCrossAxisExtent: 150,  // 每项最大宽度
      children: [...],
    )
    
    // 方式3：GridView.builder（推荐）
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: 100,
      itemBuilder: (context, index) {
        return Container(color: Colors.blue[index % 9 * 100]);
      },
    )
    
    // 方式4：GridView.custom
    GridView.custom(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
      childrenDelegate: SliverChildBuilderDelegate(
        (context, index) => Container(color: Colors.blue[index % 9 * 100]),
        childCount: 100,
      ),
    )
    ''');
  }
}
```

### 2. GridDelegate

```dart
// GridDelegate 详解
class GridDelegates {
  void explain() {
    print('''
    GridDelegate 类型：
    
    // 1. SliverGridDelegateWithFixedCrossAxisCount
    // 固定每行数量
    SliverGridDelegateWithFixedCrossAxisCount(
      crossAxisCount: 3,           // 每行3个
      mainAxisSpacing: 10,         // 主轴间距
      crossAxisSpacing: 10,        // 交叉轴间距
      childAspectRatio: 1.0,       // 宽高比
    )
    
    // 2. SliverGridDelegateWithMaxCrossAxisExtent
    // 固定最大宽度
    SliverGridDelegateWithMaxCrossAxisExtent(
      maxCrossAxisExtent: 150,     // 最大宽度
      mainAxisSpacing: 10,
      crossAxisSpacing: 10,
      childAspectRatio: 1.0,
    )
    
    // 示例
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 8,
        crossAxisSpacing: 8,
        childAspectRatio: 0.75,  // 宽:高 = 3:4
      ),
      itemCount: 20,
      itemBuilder: (context, index) {
        return Container(
          color: Colors.blue[index % 9 * 100],
          child: Center(child: Text('$index')),
        );
      },
    )
    ''');
  }
}
```

## 📖 GridView 高级用法

### 1. 瀑布流布局

```dart
// 瀑布流布局
class WaterfallLayout {
  void explain() {
    print('''
    瀑布流布局（使用 staggered_grid_view 包）：
    
    // pubspec.yaml
    dependencies:
      flutter_staggered_grid_view: ^0.6.0
    
    // 使用
    import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
    
    // 方式1：MasonryGridView
    MasonryGridView.count(
      crossAxisCount: 2,
      mainAxisSpacing: 4,
      crossAxisSpacing: 4,
      itemCount: 20,
      itemBuilder: (context, index) {
        return Container(
          height: (index % 3 + 1) * 100.0,  // 不同高度
          color: Colors.blue[index % 9 * 100],
          child: Center(child: Text('$index')),
        );
      },
    )
    
    // 方式2：StaggeredGrid
    StaggeredGrid.count(
      crossAxisCount: 4,
      mainAxisSpacing: 4,
      crossAxisSpacing: 4,
      children: [
        StaggeredGridTile.count(crossAxisCellCount: 2, mainAxisCellCount: 2, child: Tile(0)),
        StaggeredGridTile.count(crossAxisCellCount: 1, mainAxisCellCount: 1, child: Tile(1)),
        StaggeredGridTile.count(crossAxisCellCount: 1, mainAxisCellCount: 1, child: Tile(2)),
      ],
    )
    ''');
  }
}
```

### 2. 嵌套滚动

```dart
// 嵌套滚动
class NestedScrollView {
  void explain() {
    print('''
    NestedScrollView 嵌套滚动：
    
    NestedScrollView(
      headerSliverBuilder: (context, innerBoxIsScrolled) {
        return [
          SliverAppBar(
            title: Text('标题'),
            floating: true,
            pinned: true,
          ),
          SliverPersistentHeader(
            pinned: true,
            delegate: MyHeaderDelegate(),
          ),
        ];
      },
      body: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
        itemCount: 100,
        itemBuilder: (context, index) {
          return Container(color: Colors.blue[index % 9 * 100]);
        },
      ),
    )
    
    // CustomScrollView + SliverGrid
    CustomScrollView(
      slivers: [
        SliverAppBar(title: Text('标题')),
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2),
          delegate: SliverChildBuilderDelegate(
            (context, index) => Container(color: Colors.blue[index % 9 * 100]),
            childCount: 100,
          ),
        ),
      ],
    )
    ''');
  }
}
```

---

> GridView 是 Flutter 中实现网格布局的常用 Widget，掌握它的各种用法能让你构建出丰富的网格界面。