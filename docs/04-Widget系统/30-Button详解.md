# Button Widget 详解

> 深入理解 Flutter 中的各种按钮 Widget。

## 📖 Material Button

### 1. ElevatedButton

```dart
// ElevatedButton
class ElevatedButtonExample {
  void explain() {
    print('''
    ElevatedButton（凸起按钮）：
    
    // 基本用法
    ElevatedButton(
      onPressed: () {},
      child: Text('点击'),
    )
    
    // 带图标
    ElevatedButton.icon(
      onPressed: () {},
      icon: Icon(Icons.add),
      label: Text('添加'),
    )
    
    // 自定义样式
    ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.blue,        // 背景色
        foregroundColor: Colors.white,       // 前景色
        elevation: 4,                        // 阴影
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
        textStyle: TextStyle(fontSize: 16),
      ),
      child: Text('自定义按钮'),
    )
    
    // 禁用状态
    ElevatedButton(
      onPressed: null,  // 设为 null 即禁用
      child: Text('禁用'),
    )
    ''');
  }
}
```

### 2. TextButton 和 OutlinedButton

```dart
// TextButton 和 OutlinedButton
class OtherButtons {
  void explain() {
    print('''
    TextButton（文字按钮）：
    
    TextButton(
      onPressed: () {},
      child: Text('文字按钮'),
    )
    
    TextButton.icon(
      onPressed: () {},
      icon: Icon(Icons.info),
      label: Text('详情'),
    )
    
    OutlinedButton（边框按钮）：
    
    OutlinedButton(
      onPressed: () {},
      child: Text('边框按钮'),
    )
    
    OutlinedButton.icon(
      onPressed: () {},
      icon: Icon(Icons.save),
      label: Text('保存'),
    )
    
    // 样式设置与 ElevatedButton 类似
    OutlinedButton(
      onPressed: () {},
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: Colors.blue, width: 2),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
      child: Text('自定义边框'),
    )
    ''');
  }
}
```

### 3. IconButton

```dart
// IconButton
class IconButtonExample {
  void explain() {
    print('''
    IconButton（图标按钮）：
    
    // 基本用法
    IconButton(
      icon: Icon(Icons.favorite),
      onPressed: () {},
    )
    
    // 带颜色
    IconButton(
      icon: Icon(Icons.star),
      color: Colors.yellow,
      onPressed: () {},
    )
    
    // 带提示
    IconButton(
      icon: Icon(Icons.info),
      tooltip: '更多信息',
      onPressed: () {},
    )
    
    // 自定义大小
    IconButton(
      icon: Icon(Icons.add),
      iconSize: 48,
      onPressed: () {},
    )
    
    // 禁用状态
    IconButton(
      icon: Icon(Icons.lock),
      onPressed: null,  // 禁用
    )
    ''');
  }
}
```

## 📖 浮动按钮

### 1. FloatingActionButton

```dart
// FloatingActionButton
class FloatingActionButtonExample {
  void explain() {
    print('''
    FloatingActionButton（悬浮按钮）：
    
    // 基本用法
    FloatingActionButton(
      onPressed: () {},
      child: Icon(Icons.add),
    )
    
    // Mini 尺寸
    FloatingActionButton.small(
      onPressed: () {},
      child: Icon(Icons.add),
    )
    
    // 扩展尺寸
    FloatingActionButton.extended(
      onPressed: () {},
      icon: Icon(Icons.add),
      label: Text('添加'),
    )
    
    // 大尺寸
    FloatingActionButton.large(
      onPressed: () {},
      child: Icon(Icons.add),
    )
    
    // 自定义样式
    FloatingActionButton(
      onPressed: () {},
      backgroundColor: Colors.blue,
      foregroundColor: Colors.white,
      elevation: 8,
      shape: CircleBorder(),
      child: Icon(Icons.add),
    )
    ''');
  }
}
```

## 📖 其他按钮

### 1. DropdownButton

```dart
// DropdownButton
class DropdownButtonExample {
  void explain() {
    print('''
    DropdownButton（下拉按钮）：
    
    String selectedValue = '选项1';
    
    DropdownButton<String>(
      value: selectedValue,
      items: [
        DropdownMenuItem(value: '选项1', child: Text('选项1')),
        DropdownMenuItem(value: '选项2', child: Text('选项2')),
        DropdownMenuItem(value: '选项3', child: Text('选项3')),
      ],
      onChanged: (value) {
        setState(() {
          selectedValue = value!;
        });
      },
    )
    
    // 自定义样式
    DropdownButton<String>(
      value: selectedValue,
      items: items.map((item) => DropdownMenuItem(
        value: item,
        child: Text(item),
      )).toList(),
      onChanged: (value) {},
      hint: Text('请选择'),
      underline: Container(height: 2, color: Colors.blue),
      icon: Icon(Icons.arrow_drop_down),
      isExpanded: true,
    )
    ''');
  }
}
```

### 2. PopupMenuButton

```dart
// PopupMenuButton
class PopupMenuButtonExample {
  void explain() {
    print('''
    PopupMenuButton（弹出菜单）：
    
    PopupMenuButton<String>(
      onSelected: (value) {
        print('选择了: $value');
      },
      itemBuilder: (context) => [
        PopupMenuItem(value: 'edit', child: Text('编辑')),
        PopupMenuItem(value: 'delete', child: Text('删除')),
        PopupMenuDivider(),
        PopupMenuItem(value: 'share', child: Text('分享')),
      ],
      icon: Icon(Icons.more_vert),
      tooltip: '更多操作',
    )
    
    // 带图标的菜单项
    PopupMenuButton<String>(
      onSelected: (value) {},
      itemBuilder: (context) => [
        PopupMenuItem(
          value: 'edit',
          child: ListTile(
            leading: Icon(Icons.edit),
            title: Text('编辑'),
            contentPadding: EdgeInsets.zero,
          ),
        ),
      ],
    )
    ''');
  }
}
```

---

> 掌握各种 Button Widget 能让你的应用交互更加丰富和直观。