# Card 和 ListTile 详解

> 深入理解 Flutter 中的卡片和列表项 Widget。

## 📖 Card Widget

### 1. 基本用法

```dart
// Card 基本用法
class CardBasics {
  void explain() {
    print('''
    Card 基本用法：
    
    // 最简单的 Card
    Card(
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Text('卡片内容'),
      ),
    )
    
    // 带标题的 Card
    Card(
      child: Column(
        children: [
          ListTile(
            leading: Icon(Icons.album),
            title: Text('标题'),
            subtitle: Text('副标题'),
          ),
          Text('卡片内容'),
        ],
      ),
    )
    
    // Card 属性
    Card(
      elevation: 4,                    // 阴影高度
      shadowColor: Colors.blue,        // 阴影颜色
      shape: RoundedRectangleBorder(   // 形状
        borderRadius: BorderRadius.circular(8),
      ),
      color: Colors.white,             // 背景色
      margin: EdgeInsets.all(8),       // 外边距
      clipBehavior: Clip.antiAlias,    // 裁剪
      child: ...,
    )
    ''');
  }
}
```

### 2. Card 样式

```dart
// Card 样式
class CardStyles {
  void explain() {
    print('''
    Card 样式：
    
    // 圆角 Card
    Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: ...,
    )
    
    // 圆形 Card
    Card(
      shape: CircleBorder(),
      child: Padding(
        padding: EdgeInsets.all(32),
        child: Icon(Icons.star),
      ),
    )
    
    // 带边框的 Card
    Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: BorderSide(color: Colors.blue, width: 2),
      ),
      child: ...,
    )
    
    // 渐变 Card
    Card(
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [Colors.blue, Colors.purple],
          ),
          borderRadius: BorderRadius.circular(8),
        ),
        child: ...,
      ),
    )
    ''');
  }
}
```

## 📖 ListTile

### 1. 基本用法

```dart
// ListTile 基本用法
class ListTileBasics {
  void explain() {
    print('''
    ListTile 基本用法：
    
    // 基本列表项
    ListTile(
      leading: Icon(Icons.star),
      title: Text('标题'),
      subtitle: Text('副标题'),
      trailing: Icon(Icons.arrow_forward),
      onTap: () {},
    )
    
    // 密集模式
    ListTile(
      dense: true,
      leading: Icon(Icons.star),
      title: Text('标题'),
    )
    
    // 选中状态
    ListTile(
      selected: true,
      selectedColor: Colors.blue,
      leading: Icon(Icons.star),
      title: Text('选中项'),
    )
    
    // 长按
    ListTile(
      onLongPress: () {
        print('长按');
      },
      title: Text('长按我'),
    )
    ''');
  }
}
```

### 2. ListTile 属性

```dart
// ListTile 属性
class ListTileProperties {
  void explain() {
    print('''
    ListTile 属性：
    
    ListTile(
      // 内容
      leading: Icon(Icons.star),          // 前置图标
      title: Text('标题'),                 // 标题
      subtitle: Text('副标题'),            // 副标题
      trailing: Icon(Icons.more_vert),    // 后置图标
      
      // 样式
      isThreeLine: false,                 // 是否三行
      dense: false,                       // 密集模式
      visualDensity: VisualDensity.compact,
      
      // 交互
      onTap: () {},                       // 点击
      onLongPress: () {},                 // 长按
      selected: false,                    // 是否选中
      
      // 颜色
      tileColor: Colors.white,            // 背景色
      selectedTileColor: Colors.blue[50], // 选中背景色
      selectedColor: Colors.blue,         // 选中文字色
      iconColor: Colors.grey,             // 图标颜色
      textColor: Colors.black,            // 文字颜色
      
      // 布局
      contentPadding: EdgeInsets.symmetric(horizontal: 16),
      horizontalTitleGap: 16,
      minVerticalPadding: 8,
      minLeadingWidth: 40,
    )
    ''');
  }
}
```

### 3. 常见列表样式

```dart
// 常见列表样式
class CommonListStyles {
  void explain() {
    print('''
    常见列表样式：
    
    // 1. 消息列表
    ListTile(
      leading: CircleAvatar(
        backgroundImage: NetworkImage('头像URL'),
      ),
      title: Text('发送者名称'),
      subtitle: Text('最后一条消息'),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('12:30'),
          CircleAvatar(radius: 10, child: Text('3')),
        ],
      ),
    )
    
    // 2. 设置列表
    ListTile(
      leading: Icon(Icons.notifications),
      title: Text('通知设置'),
      trailing: Switch(value: true, onChanged: (v) {}),
    )
    
    // 3. 选择列表
    ListTile(
      leading: Radio(value: true, groupValue: true, onChanged: (v) {}),
      title: Text('选项一'),
    )
    
    // 4. 文件列表
    ListTile(
      leading: Icon(Icons.insert_drive_file, color: Colors.blue),
      title: Text('文件名.pdf'),
      subtitle: Text('2.5 MB'),
      trailing: IconButton(icon: Icon(Icons.more_vert), onPressed: () {}),
    )
    ''');
  }
}
```

---

> Card 和 ListTile 是构建列表界面的常用组合，掌握它们能让你快速构建出美观的列表页面。