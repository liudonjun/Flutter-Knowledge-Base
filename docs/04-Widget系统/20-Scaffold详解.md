# Scaffold 详解

> 深入理解 Flutter 中的页面脚手架 Widget - Scaffold。

## 📖 Scaffold 基础

### 1. 基本结构

```dart
// Scaffold 基本结构
class ScaffoldBasics {
  void explain() {
    print('''
    Scaffold 基本结构：
    
    Scaffold(
      appBar: AppBar(title: Text('标题')),  // 顶部应用栏
      body: Center(child: Text('内容')),     // 主体内容
      floatingActionButton: FloatingActionButton(  // 悬浮按钮
        onPressed: () {},
        child: Icon(Icons.add),
      ),
      drawer: Drawer(),                      // 左侧抽屉
      endDrawer: Drawer(),                   // 右侧抽屉
      bottomNavigationBar: BottomNavigationBar(  // 底部导航栏
        items: [...],
      ),
      bottomSheet: BottomSheet(...),         // 底部表单
      backgroundColor: Colors.white,         // 背景颜色
      resizeToAvoidBottomInset: true,        // 键盘弹出时调整大小
    )
    ''');
  }
}
```

### 2. AppBar 详解

```dart
// AppBar 详解
class AppBarExample {
  void explain() {
    print('''
    AppBar 详解：
    
    AppBar(
      title: Text('标题'),                    // 标题
      leading: IconButton(                    // 左侧按钮
        icon: Icon(Icons.menu),
        onPressed: () {},
      ),
      actions: [                              // 右侧按钮
        IconButton(icon: Icon(Icons.search), onPressed: () {}),
        IconButton(icon: Icon(Icons.more_vert), onPressed: () {}),
      ],
      backgroundColor: Colors.blue,           // 背景颜色
      elevation: 4,                           // 阴影高度
      centerTitle: true,                      // 标题居中
      automaticallyImplyLeading: true,        // 自动添加返回按钮
      flexibleSpace: FlexibleSpaceBar(        // 灵活空间
        title: Text('标题'),
        background: Image.network('...'),
      ),
    )
    
    // SliverAppBar（可折叠）
    SliverAppBar(
      expandedHeight: 200,
      floating: false,
      pinned: true,
      flexibleSpace: FlexibleSpaceBar(
        title: Text('标题'),
        background: Image.network('...', fit: BoxFit.cover),
      ),
    )
    ''');
  }
}
```

### 3. BottomNavigationBar

```dart
// BottomNavigationBar
class BottomNavExample {
  void explain() {
    print('''
    BottomNavigationBar：
    
    BottomNavigationBar(
      type: BottomNavigationBarType.fixed,    // 固定类型
      currentIndex: 0,                        // 当前选中
      onTap: (index) {},                      // 点击回调
      items: [
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: '首页',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.search),
          label: '搜索',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: '我的',
        ),
      ],
      selectedItemColor: Colors.blue,         // 选中颜色
      unselectedItemColor: Colors.grey,       // 未选中颜色
      backgroundColor: Colors.white,          // 背景颜色
    )
    
    // 底部导航页面切换
    class HomePage extends StatefulWidget {
      @override
      _HomePageState createState() => _HomePageState();
    }
    
    class _HomePageState extends State<HomePage> {
      int _currentIndex = 0;
      
      final List<Widget> _pages = [
        HomeScreen(),
        SearchScreen(),
        ProfileScreen(),
      ];
      
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          body: _pages[_currentIndex],
          bottomNavigationBar: BottomNavigationBar(
            currentIndex: _currentIndex,
            onTap: (index) => setState(() => _currentIndex = index),
            items: [...],
          ),
        );
      }
    }
    ''');
  }
}
```

### 4. Drawer

```dart
// Drawer 抽屉
class DrawerExample {
  void explain() {
    print('''
    Drawer 抽屉：
    
    Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(color: Colors.blue),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(radius: 30, backgroundImage: NetworkImage('...')),
                SizedBox(height: 10),
                Text('用户名', style: TextStyle(color: Colors.white)),
              ],
            ),
          ),
          ListTile(
            leading: Icon(Icons.home),
            title: Text('首页'),
            onTap: () {
              Navigator.pop(context);
            },
          ),
          ListTile(
            leading: Icon(Icons.settings),
            title: Text('设置'),
            onTap: () {},
          ),
          Divider(),
          ListTile(
            leading: Icon(Icons.exit_to_app),
            title: Text('退出'),
            onTap: () {},
          ),
        ],
      ),
    )
    
    // 打开抽屉
    Scaffold(
      appBar: AppBar(
        leading: Builder(
          builder: (context) => IconButton(
            icon: Icon(Icons.menu),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
      ),
      drawer: Drawer(...),
    )
    ''');
  }
}
```

---

> Scaffold 是 Flutter 页面的基础骨架，掌握它的各种用法能让你快速构建出完整的应用界面。