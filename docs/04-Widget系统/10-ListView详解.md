# ListView 详解

> 深入理解 Flutter 中的列表滚动 Widget - ListView。

## 📖 ListView 基础

### 1. 基本用法

```dart
// ListView 基本用法
class ListViewBasics {
  void explain() {
    print('''
    ListView 基本用法：
    
    // 方式1：直接使用 children
    ListView(
      children: [
        ListTile(title: Text('项目1')),
        ListTile(title: Text('项目2')),
        ListTile(title: Text('项目3')),
      ],
    )
    
    // 方式2：ListView.builder（推荐）
    ListView.builder(
      itemCount: 100,
      itemBuilder: (context, index) {
        return ListTile(title: Text('项目 $index'));
      },
    )
    
    // 方式3：ListView.separated（带分隔符）
    ListView.separated(
      itemCount: 100,
      itemBuilder: (context, index) => ListTile(title: Text('项目 $index')),
      separatorBuilder: (context, index) => Divider(),
    )
    
    // 方式4：ListView.custom
    ListView.custom(
      childrenDelegate: SliverChildBuilderDelegate(
        (context, index) => ListTile(title: Text('项目 $index')),
        childCount: 100,
      ),
    )
    ''');
  }
}
```

### 2. 性能优化

```dart
// ListView 性能优化
class ListViewPerformance {
  void explain() {
    print('''
    ListView 性能优化：
    
    // 1. 使用 builder 按需构建
    ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) => ItemWidget(items[index]),
    )
    
    // 2. 使用 itemExtent 固定高度
    ListView.builder(
      itemExtent: 80.0, // 固定每项高度
      itemCount: 100,
      itemBuilder: (context, index) => ItemWidget(index),
    )
    
    // 3. 使用 prototypeItem
    ListView.builder(
      prototypeItem: ListTile(title: Text('原型')),
      itemCount: 100,
      itemBuilder: (context, index) => ItemWidget(index),
    )
    
    // 4. 使用 cacheExtent
    ListView.builder(
      cacheExtent: 500, // 缓存区域
      itemCount: 100,
      itemBuilder: (context, index) => ItemWidget(index),
    )
    
    // 5. 使用 const 构造函数
    ListView.builder(
      itemCount: 100,
      itemBuilder: (context, index) => const ItemWidget(),
    )
    ''');
  }
}
```

## 📖 ListView 属性

### 1. 滚动控制

```dart
// ListView 滚动控制
class ListViewScrolling {
  void explain() {
    print('''
    ListView 滚动控制：
    
    // ScrollController
    final controller = ScrollController();
    
    ListView.builder(
      controller: controller,
      itemCount: 100,
      itemBuilder: (context, index) => ListTile(title: Text('$index')),
    )
    
    // 滚动到指定位置
    controller.animateTo(
      500,
      duration: Duration(seconds: 1),
      curve: Curves.ease,
    );
    
    // 跳转到指定位置
    controller.jumpTo(500);
    
    // 监听滚动
    controller.addListener(() {
      print('滚动位置: ${controller.offset}');
    });
    
    // 释放控制器
    @override
    void dispose() {
      controller.dispose();
      super.dispose();
    }
    ''');
  }
}
```

### 2. 滚动方向和行为

```dart
// 滚动方向和行为
class ListViewScrollDirection {
  void explain() {
    print('''
    滚动方向和行为：
    
    // 水平滚动
    ListView.builder(
      scrollDirection: Axis.horizontal,
      itemCount: 20,
      itemBuilder: (context, index) => Container(
        width: 100,
        color: Colors.blue[index % 9 * 100],
        child: Center(child: Text('$index')),
      ),
    )
    
    // 反向滚动
    ListView.builder(
      reverse: true,
      itemCount: 20,
      itemBuilder: (context, index) => ListTile(title: Text('$index')),
    )
    
    // 滚动物理效果
    ListView.builder(
      physics: BouncingScrollPhysics(), // iOS 风格
      // physics: ClampingScrollPhysics(), // Android 风格
      // physics: NeverScrollableScrollPhysics(), // 禁止滚动
      itemCount: 20,
      itemBuilder: (context, index) => ListTile(title: Text('$index')),
    )
    
    // 填充
    ListView.builder(
      padding: EdgeInsets.all(16),
      itemCount: 20,
      itemBuilder: (context, index) => ListTile(title: Text('$index')),
    )
    ''');
  }
}
```

## 📖 ListView 高级用法

### 1. 下拉刷新

```dart
// 下拉刷新
class ListViewRefresh {
  void explain() {
    print('''
    下拉刷新：
    
    // RefreshIndicator
    RefreshIndicator(
      onRefresh: () async {
        await Future.delayed(Duration(seconds: 1));
        // 刷新数据
      },
      child: ListView.builder(
        itemCount: 20,
        itemBuilder: (context, index) => ListTile(title: Text('$index')),
      ),
    )
    
    // 带加载状态
    class RefreshableList extends StatefulWidget {
      @override
      _RefreshableListState createState() => _RefreshableListState();
    }
    
    class _RefreshableListState extends State<RefreshableList> {
      List<String> items = [];
      bool isLoading = false;
      
      Future<void> _refresh() async {
        setState(() => isLoading = true);
        await Future.delayed(Duration(seconds: 1));
        setState(() {
          items = List.generate(20, (i) => '项目 $i');
          isLoading = false;
        });
      }
      
      @override
      Widget build(BuildContext context) {
        return RefreshIndicator(
          onRefresh: _refresh,
          child: ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) => ListTile(title: Text(items[index])),
          ),
        );
      }
    }
    ''');
  }
}
```

### 2. 上拉加载

```dart
// 上拉加载
class ListViewLoadMore {
  void explain() {
    print('''
    上拉加载更多：
    
    class LoadMoreList extends StatefulWidget {
      @override
      _LoadMoreListState createState() => _LoadMoreListState();
    }
    
    class _LoadMoreListState extends State<LoadMoreList> {
      List<int> items = [];
      bool isLoading = false;
      ScrollController _controller = ScrollController();
      
      @override
      void initState() {
        super.initState();
        _loadMore();
        _controller.addListener(_onScroll);
      }
      
      void _onScroll() {
        if (_controller.position.pixels == _controller.position.maxScrollExtent) {
          _loadMore();
        }
      }
      
      Future<void> _loadMore() async {
        if (isLoading) return;
        setState(() => isLoading = true);
        
        await Future.delayed(Duration(seconds: 1));
        setState(() {
          items.addAll(List.generate(20, (i) => items.length + i));
          isLoading = false;
        });
      }
      
      @override
      Widget build(BuildContext context) {
        return ListView.builder(
          controller: _controller,
          itemCount: items.length + 1,
          itemBuilder: (context, index) {
            if (index == items.length) {
              return Center(child: CircularProgressIndicator());
            }
            return ListTile(title: Text('项目 ${items[index]}'));
          },
        );
      }
    }
    ''');
  }
}
```

---

> ListView 是 Flutter 中最常用的滚动列表 Widget，掌握它的各种用法和性能优化技巧非常重要。