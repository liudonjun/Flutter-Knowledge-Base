# TabBar 导航详解

> 深入理解 Flutter 中的 TabBar 导航。

## 📖 TabBar 导航基础

### 1. 什么是 TabBar 导航

```dart
// TabBar 导航概念
class TabBarNavigationConcept {
  void explain() {
    print('''
    TabBar 导航概念：
    
    // 1. 什么是 TabBar 导航
    // - 标签页导航方式
    // - 在同一页面切换内容
    // - 支持图标和文字
    // - 遵循 Material Design
    
    // 2. TabBar 导航的特点
    // - 快速切换：在同一页面切换
    // - 状态保持：保持每个 Tab 的状态
    // - 可定制：支持自定义样式
    // - 响应式：适配不同屏幕
    
    // 3. TabBar 导航的使用场景
    // - 主要导航：应用主导航
    // - 内容分类：分类展示内容
    // - 功能分组：相关功能分组
    // - 数据筛选：筛选不同数据
    ''');
  }
}
```

### 2. TabBar 导航配置

```dart
// TabBar 导航配置
class TabBarNavigationConfiguration {
  void explain() {
    print('''
    TabBar 导航配置：
    
    // 1. 基本配置
    DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: [
              Tab(icon: Icon(Icons.home), text: 'Home'),
              Tab(icon: Icon(Icons.search), text: 'Search'),
              Tab(icon: Icon(Icons.person), text: 'Profile'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            HomePage(),
            SearchPage(),
            ProfilePage(),
          ],
        ),
      ),
    )
    
    // 2. 使用 TabController
    class MyWidget extends StatefulWidget {
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    
    class _MyWidgetState extends State<MyWidget>
        with SingleTickerProviderStateMixin {
      late TabController _controller;
      
      @override
      void initState() {
        super.initState();
        _controller = TabController(length: 3, vsync: this);
      }
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              controller: _controller,
              tabs: [
                Tab(text: 'Tab 1'),
                Tab(text: 'Tab 2'),
                Tab(text: 'Tab 3'),
              ],
            ),
          ),
          body: TabBarView(
            controller: _controller,
            children: [
              Center(child: Text('Tab 1')),
              Center(child: Text('Tab 2')),
              Center(child: Text('Tab 3')),
            ],
          ),
        );
      }
      
      @override
      void dispose() {
        _controller.dispose();
        super.dispose();
      }
    }
    ''');
  }
}
```

## 🔧 TabBar 导航使用

### 1. 状态保持

```dart
// 状态保持
class StatePreservation {
  void explain() {
    print('''
    状态保持：
    
    // 1. 使用 AutomaticKeepAliveClientMixin
    class KeepAlivePage extends StatefulWidget {
      @override
      _KeepAlivePageState createState() => _KeepAlivePageState();
    }
    
    class _KeepAlivePageState extends State<KeepAlivePage>
        with AutomaticKeepAliveClientMixin {
      @override
      bool get wantKeepAlive => true;
      
      @override
      Widget build(BuildContext context) {
        super.build(context);
        return Center(
          child: Text('This page will be kept alive'),
        );
      }
    }
    
    // 2. 使用 IndexedStack
    class IndexedStackExample extends StatefulWidget {
      @override
      _IndexedStackExampleState createState() => _IndexedStackExampleState();
    }
    
    class _IndexedStackExampleState extends State<IndexedStackExample> {
      int _currentIndex = 0;
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: IndexedStack(
            index: _currentIndex,
            children: [
              HomePage(),
              SearchPage(),
              ProfilePage(),
            ],
          ),
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) => setState(() => _currentIndex = index),
            items: [
              BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
              BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
              BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
            ],
          ),
        );
      }
    }
    ''');
  }
}
```

### 2. 自定义样式

```dart
// 自定义样式
class CustomStyling {
  void explain() {
    print('''
    自定义样式：
    
    // 1. 自定义 TabBar
    TabBar(
      indicatorColor: Colors.blue,
      indicatorWeight: 3,
      indicatorSize: TabBarIndicatorSize.label,
      labelColor: Colors.blue,
      unselectedLabelColor: Colors.grey,
      labelStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      unselectedLabelStyle: TextStyle(fontSize: 14),
      tabs: [
        Tab(text: 'Tab 1'),
        Tab(text: 'Tab 2'),
        Tab(text: 'Tab 3'),
      ],
    )
    
    // 2. 自定义 Tab
    Tab(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.star),
          SizedBox(width: 8),
          Text('Custom Tab'),
        ],
      ),
    )
    
    // 3. 使用 BoxDecoration
    Container(
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: TabBar(
        tabs: [
          Tab(text: 'Tab 1'),
          Tab(text: 'Tab 2'),
        ],
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **TabBar 需要 TabController**
2. **注意状态保持**
3. **考虑性能优化**
4. **自定义样式要适度**

## 🔗 相关链接

- [[底部导航详解]]
- [[侧边栏和标签页导航]]
- [[Scaffold详解]]
- [[AppBar详解]]

---

> TabBar 导航是应用中常用的导航方式，掌握它对于构建良好的用户体验非常重要。