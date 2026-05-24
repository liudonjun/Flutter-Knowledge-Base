# 常用 Widget 详解

> 掌握 Flutter 常用 Widget，快速构建精美 UI。

## 📊 Widget 分类

### 1. 基础 Widget
```dart
// 基础 Widget - 最常用的组件
// 1. Text - 文本显示
// 2. Icon - 图标显示
// 3. Image - 图片显示
// 4. Container - 容器
// 5. SizedBox - 尺寸盒子
```

### 2. 布局 Widget
```dart
// 布局 Widget - 控制布局
// 1. Row - 水平布局
// 2. Column - 垂直布局
// 3. Stack - 层叠布局
// 4. Flex - 弹性布局
// 5. Wrap - 流式布局
```

### 3. 滚动 Widget
```dart
// 滚动 Widget - 可滚动组件
// 1. ListView - 列表视图
// 2. GridView - 网格视图
// 3. SingleChildScrollView - 单子滚动
// 4. CustomScrollView - 自定义滚动
// 5. NestedScrollView - 嵌套滚动
```

## 🎯 基础 Widget

### 1. Text Widget
```dart
// Text - 文本显示
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 2.0,
    wordSpacing: 5.0,
    decoration: TextDecoration.underline,
    decorationColor: Colors.red,
    decorationStyle: TextDecorationStyle.dashed,
  ),
  textAlign: TextAlign.center,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
  softWrap: true,
)

// 富文本
RichText(
  text: TextSpan(
    text: 'Hello ',
    style: TextStyle(color: Colors.black, fontSize: 18),
    children: [
      TextSpan(
        text: 'Flutter',
        style: TextStyle(
          color: Colors.blue,
          fontWeight: FontWeight.bold,
        ),
      ),
      TextSpan(
        text: ' World!',
        style: TextStyle(
          color: Colors.red,
          fontStyle: FontStyle.italic,
        ),
      ),
    ],
  ),
)
```

### 2. Icon Widget
```dart
// Icon - 图标显示
Icon(
  Icons.star,
  size: 30,
  color: Colors.amber,
)

// 自定义图标
Icon(
  IconData(0xe900, fontFamily: 'CustomIcons'),
  size: 24,
  color: Colors.blue,
)

// 图标按钮
IconButton(
  onPressed: () {},
  icon: Icon(Icons.favorite),
  color: Colors.red,
  iconSize: 30,
)
```

### 3. Image Widget
```dart
// 网络图片
Image.network(
  'https://picsum.photos/200/300',
  width: 200,
  height: 300,
  fit: BoxFit.cover,
  loadingBuilder: (context, child, loadingProgress) {
    if (loadingProgress == null) return child;
    return Center(
      child: CircularProgressIndicator(
        value: loadingProgress.expectedTotalBytes != null
            ? loadingProgress.cumulativeBytesLoaded /
                loadingProgress.expectedTotalBytes!
            : null,
      ),
    );
  },
  errorBuilder: (context, error, stackTrace) {
    return Icon(Icons.error, size: 50);
  },
)

// 本地图片
Image.asset(
  'assets/images/logo.png',
  width: 100,
  height: 100,
)

// 文件图片
Image.file(
  File('/path/to/image.jpg'),
  width: 200,
  height: 200,
)
```

### 4. Container Widget
```dart
// Container - 容器
Container(
  width: 200,
  height: 200,
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.all(10),
  decoration: BoxDecoration(
    color: Colors.blue,
    borderRadius: BorderRadius.circular(10),
    boxShadow: [
      BoxShadow(
        color: Colors.grey.withOpacity(0.5),
        spreadRadius: 2,
        blurRadius: 5,
        offset: Offset(0, 3),
      ),
    ],
  ),
  child: Text('Container'),
)

// 渐变容器
Container(
  width: 200,
  height: 100,
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [Colors.blue, Colors.green],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
    borderRadius: BorderRadius.circular(10),
  ),
  child: Center(
    child: Text(
      '渐变容器',
      style: TextStyle(color: Colors.white, fontSize: 18),
    ),
  ),
)
```

### 5. SizedBox Widget
```dart
// SizedBox - 尺寸盒子
SizedBox(
  width: 200,
  height: 100,
  child: Text('固定尺寸'),
)

// 间距
SizedBox(height: 20), // 垂直间距
SizedBox(width: 10),  // 水平间距

// 强制尺寸
SizedBox.expand(
  child: Text('填充整个可用空间'),
)

SizedBox.shrink(
  child: Text('最小尺寸'),
)
```

## 📊 布局 Widget

### 1. Row Widget
```dart
// Row - 水平布局
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 弹性布局
Row(
  children: [
    Expanded(
      flex: 2,
      child: Container(color: Colors.red, height: 50),
    ),
    Expanded(
      flex: 1,
      child: Container(color: Colors.green, height: 50),
    ),
    Expanded(
      flex: 3,
      child: Container(color: Colors.blue, height: 50),
    ),
  ],
)
```

### 2. Column Widget
```dart
// Column - 垂直布局
Column(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)

// 交叉轴对齐
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 100, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)
```

### 3. Stack Widget
```dart
// Stack - 层叠布局
Stack(
  children: [
    Container(width: 200, height: 200, color: Colors.red),
    Positioned(
      top: 20,
      left: 20,
      child: Container(width: 100, height: 100, color: Colors.green),
    ),
    Positioned(
      bottom: 20,
      right: 20,
      child: Container(width: 100, height: 100, color: Colors.blue),
    ),
  ],
)

// 对齐层叠
Stack(
  alignment: Alignment.center,
  children: [
    Container(width: 200, height: 200, color: Colors.red),
    Container(width: 100, height: 100, color: Colors.green),
    Text('居中'),
  ],
)
```

### 4. Flex Widget
```dart
// Flex - 弹性布局
Flex(
  direction: Axis.horizontal,
  children: [
    Expanded(
      flex: 1,
      child: Container(height: 50, color: Colors.red),
    ),
    Expanded(
      flex: 2,
      child: Container(height: 50, color: Colors.green),
    ),
    Expanded(
      flex: 1,
      child: Container(height: 50, color: Colors.blue),
    ),
  ],
)

// 垂直弹性布局
Flex(
  direction: Axis.vertical,
  children: [
    Expanded(
      flex: 1,
      child: Container(width: 50, color: Colors.red),
    ),
    Expanded(
      flex: 2,
      child: Container(width: 50, color: Colors.green),
    ),
    Expanded(
      flex: 1,
      child: Container(width: 50, color: Colors.blue),
    ),
  ],
)
```

### 5. Wrap Widget
```dart
// Wrap - 流式布局
Wrap(
  spacing: 8.0, // 水平间距
  runSpacing: 4.0, // 垂直间距
  children: [
    Chip(label: Text('标签1')),
    Chip(label: Text('标签2')),
    Chip(label: Text('标签3')),
    Chip(label: Text('标签4')),
    Chip(label: Text('标签5')),
    Chip(label: Text('标签6')),
  ],
)

// 不同方向
Wrap(
  direction: Axis.vertical,
  spacing: 8.0,
  runSpacing: 4.0,
  children: [
    Container(width: 50, height: 50, color: Colors.red),
    Container(width: 50, height: 50, color: Colors.green),
    Container(width: 50, height: 50, color: Colors.blue),
  ],
)
```

## 🔄 滚动 Widget

### 1. ListView Widget
```dart
// ListView - 列表视图
ListView(
  children: [
    ListTile(title: Text('项目1')),
    ListTile(title: Text('项目2')),
    ListTile(title: Text('项目3')),
  ],
)

// 构建器列表
ListView.builder(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('项目 $index'),
      subtitle: Text('这是第 $index 个项目'),
      leading: Icon(Icons.star),
      trailing: Icon(Icons.arrow_forward),
    );
  },
)

// 分隔符列表
ListView.separated(
  itemCount: 100,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
  separatorBuilder: (context, index) {
    return Divider();
  },
)
```

### 2. GridView Widget
```dart
// GridView - 网格视图
GridView.count(
  crossAxisCount: 2,
  children: [
    Container(color: Colors.red),
    Container(color: Colors.green),
    Container(color: Colors.blue),
    Container(color: Colors.yellow),
  ],
)

// 构建器网格
GridView.builder(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,
    crossAxisSpacing: 10,
    mainAxisSpacing: 10,
    childAspectRatio: 1.5,
  ),
  itemCount: 100,
  itemBuilder: (context, index) {
    return Card(
      child: Center(child: Text('项目 $index')),
    );
  },
)

// 动态网格
GridView.extent(
  maxCrossAxisExtent: 200,
  children: [
    Container(color: Colors.red),
    Container(color: Colors.green),
    Container(color: Colors.blue),
  ],
)
```

### 3. SingleChildScrollView
```dart
// SingleChildScrollView - 单子滚动
SingleChildScrollView(
  child: Column(
    children: [
      Container(height: 200, color: Colors.red),
      Container(height: 200, color: Colors.green),
      Container(height: 200, color: Colors.blue),
      Container(height: 200, color: Colors.yellow),
    ],
  ),
)

// 水平滚动
SingleChildScrollView(
  scrollDirection: Axis.horizontal,
  child: Row(
    children: [
      Container(width: 200, color: Colors.red),
      Container(width: 200, color: Colors.green),
      Container(width: 200, color: Colors.blue),
    ],
  ),
)
```

## 🎨 交互 Widget

### 1. Button Widget
```dart
// ElevatedButton - 凸起按钮
ElevatedButton(
  onPressed: () {},
  child: Text('凸起按钮'),
  style: ElevatedButton.styleFrom(
    primary: Colors.blue,
    onPrimary: Colors.white,
    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(10),
    ),
  ),
)

// TextButton - 文本按钮
TextButton(
  onPressed: () {},
  child: Text('文本按钮'),
  style: TextButton.styleFrom(
    primary: Colors.blue,
    textStyle: TextStyle(fontSize: 16),
  ),
)

// OutlinedButton - 边框按钮
OutlinedButton(
  onPressed: () {},
  child: Text('边框按钮'),
  style: OutlinedButton.styleFrom(
    primary: Colors.blue,
    side: BorderSide(color: Colors.blue, width: 2),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8),
    ),
  ),
)

// FloatingActionButton - 悬浮操作按钮
FloatingActionButton(
  onPressed: () {},
  child: Icon(Icons.add),
  backgroundColor: Colors.blue,
  foregroundColor: Colors.white,
)
```

### 2. TextField Widget
```dart
// TextField - 输入框
TextField(
  decoration: InputDecoration(
    labelText: '用户名',
    hintText: '请输入用户名',
    prefixIcon: Icon(Icons.person),
    suffixIcon: Icon(Icons.clear),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    filled: true,
    fillColor: Colors.grey[100],
  ),
  onChanged: (value) {},
  onSubmitted: (value) {},
)

// 密码输入框
TextField(
  obscureText: true,
  decoration: InputDecoration(
    labelText: '密码',
    hintText: '请输入密码',
    prefixIcon: Icon(Icons.lock),
    suffixIcon: IconButton(
      icon: Icon(Icons.visibility),
      onPressed: () {},
    ),
    border: OutlineInputBorder(),
  ),
)
```

### 3. Checkbox Widget
```dart
// Checkbox - 复选框
Checkbox(
  value: true,
  onChanged: (value) {},
  activeColor: Colors.blue,
  checkColor: Colors.white,
)

// CheckboxListTile
CheckboxListTile(
  title: Text('选项1'),
  subtitle: Text('选项描述'),
  value: true,
  onChanged: (value) {},
  controlAffinity: ListTileControlAffinity.leading,
)

// Radio - 单选框
Radio(
  value: 1,
  groupValue: 1,
  onChanged: (value) {},
  activeColor: Colors.blue,
)

// RadioListTile
RadioListTile(
  title: Text('选项1'),
  value: 1,
  groupValue: 1,
  onChanged: (value) {},
)

// Switch - 开关
Switch(
  value: true,
  onChanged: (value) {},
  activeColor: Colors.blue,
  activeTrackColor: Colors.blue[200],
)

// SwitchListTile
SwitchListTile(
  title: Text('开关选项'),
  subtitle: Text('开关描述'),
  value: true,
  onChanged: (value) {},
)
```

## 🎯 高级 Widget

### 1. Card Widget
```dart
// Card - 卡片
Card(
  elevation: 4,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          '卡片标题',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Text('卡片内容'),
        SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            TextButton(
              onPressed: () {},
              child: Text('取消'),
            ),
            ElevatedButton(
              onPressed: () {},
              child: Text('确定'),
            ),
          ],
        ),
      ],
    ),
  ),
)
```

### 2. ListTile Widget
```dart
// ListTile - 列表项
ListTile(
  leading: CircleAvatar(
    backgroundImage: NetworkImage('https://picsum.photos/50'),
  ),
  title: Text('标题'),
  subtitle: Text('副标题'),
  trailing: Icon(Icons.arrow_forward),
  onTap: () {},
  onLongPress: () {},
)

// 带复选框的列表项
ListTile(
  leading: Checkbox(
    value: true,
    onChanged: (value) {},
  ),
  title: Text('待办事项'),
  subtitle: Text('截止日期: 2026-05-23'),
  trailing: IconButton(
    icon: Icon(Icons.delete),
    onPressed: () {},
  ),
)
```

### 3. AppBar Widget
```dart
// AppBar - 应用栏
AppBar(
  title: Text('标题'),
  centerTitle: true,
  backgroundColor: Colors.blue,
  foregroundColor: Colors.white,
  elevation: 4,
  leading: IconButton(
    icon: Icon(Icons.menu),
    onPressed: () {},
  ),
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {},
    ),
    IconButton(
      icon: Icon(Icons.more_vert),
      onPressed: () {},
    ),
  ],
)

// 带搜索的 AppBar
AppBar(
  title: TextField(
    decoration: InputDecoration(
      hintText: '搜索...',
      border: InputBorder.none,
      hintStyle: TextStyle(color: Colors.white70),
    ),
    style: TextStyle(color: Colors.white),
  ),
  actions: [
    IconButton(
      icon: Icon(Icons.search),
      onPressed: () {},
    ),
  ],
)
```

## 🔧 特殊 Widget

### 1. Drawer Widget
```dart
// Drawer - 抽屉
Drawer(
  child: ListView(
    padding: EdgeInsets.zero,
    children: [
      DrawerHeader(
        decoration: BoxDecoration(
          color: Colors.blue,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 30,
              backgroundImage: NetworkImage('https://picsum.photos/100'),
            ),
            SizedBox(height: 10),
            Text(
              '用户名',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18,
              ),
            ),
            Text(
              'user@example.com',
              style: TextStyle(
                color: Colors.white70,
                fontSize: 14,
              ),
            ),
          ],
        ),
      ),
      ListTile(
        leading: Icon(Icons.home),
        title: Text('首页'),
        onTap: () {},
      ),
      ListTile(
        leading: Icon(Icons.settings),
        title: Text('设置'),
        onTap: () {},
      ),
      ListTile(
        leading: Icon(Icons.exit_to_app),
        title: Text('退出'),
        onTap: () {},
      ),
    ],
  ),
)
```

### 2. BottomNavigationBar Widget
```dart
// BottomNavigationBar - 底部导航栏
BottomNavigationBar(
  type: BottomNavigationBarType.fixed,
  currentIndex: 0,
  onTap: (index) {},
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
      icon: Icon(Icons.favorite),
      label: '收藏',
    ),
    BottomNavigationBarItem(
      icon: Icon(Icons.person),
      label: '我的',
    ),
  ],
)
```

### 3. TabBar Widget
```dart
// TabBar - 标签栏
TabBar(
  controller: TabController(length: 3, vsync: this),
  tabs: [
    Tab(icon: Icon(Icons.home), text: '首页'),
    Tab(icon: Icon(Icons.search), text: '搜索'),
    Tab(icon: Icon(Icons.person), text: '我的'),
  ],
  indicatorColor: Colors.blue,
  labelColor: Colors.blue,
  unselectedLabelColor: Colors.grey,
)

// TabBarView
TabBarView(
  controller: TabController(length: 3, vsync: this),
  children: [
    Center(child: Text('首页')),
    Center(child: Text('搜索')),
    Center(child: Text('我的')),
  ],
)
```

## 📚 最佳实践

### 1. Widget 选择指南
```dart
// 根据需求选择 Widget
// 1. 简单文本: Text
// 2. 容器布局: Container, SizedBox
// 3. 水平布局: Row
// 4. 垂直布局: Column
// 5. 层叠布局: Stack
// 6. 弹性布局: Flex, Expanded
// 7. 流式布局: Wrap
// 8. 列表: ListView
// 9. 网格: GridView
// 10. 按钮: ElevatedButton, TextButton
```

### 2. 性能优化
```dart
// 使用 const
const myWidget = const Text('Hello');

// 使用 ListView.builder
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('项目 $index'));
  },
)

// 使用 RepaintBoundary
RepaintBoundary(
  child: CustomPaint(
    painter: MyPainter(),
  ),
)
```

## 📚 学习资源

### 官方文档
- [Flutter Widget 目录](https://flutter.dev/docs/development/ui/widgets)
- [Material Design Widget](https://flutter.dev/docs/development/ui/widgets/material)
- [Cupertino Widget](https://flutter.dev/docs/development/ui/widgets/cupertino)

### 示例项目
- [Flutter Widget 示例](https://github.com/niclin/flutter-widget-examples)
- [Material Design 示例](https://github.com/niclin/flutter-material-example)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Widget 系统详解]] - Widget 系统详解

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[布局系统详解]] - 布局系统详解
- [[UI 设计基础]] - UI 设计基础

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*