# Dialog 和 BottomSheet 详解

> 深入理解 Flutter 中的对话框和底部表单 Widget。

## 📖 AlertDialog

### 1. 基本用法

```dart
// AlertDialog 基本用法
class AlertDialogBasics {
  void explain() {
    print('''
    AlertDialog 基本用法：
    
    // 显示对话框
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('标题'),
        content: Text('这是对话框内容'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text('取消'),
          ),
          TextButton(
            onPressed: () {
              // 确认操作
              Navigator.pop(context);
            },
            child: Text('确定'),
          ),
        ],
      ),
    )
    
    // 带图标
    AlertDialog(
      icon: Icon(Icons.warning, color: Colors.orange),
      title: Text('警告'),
      content: Text('确定要删除吗？'),
      actions: [...],
    )
    ''');
  }
}
```

### 2. 高级用法

```dart
// AlertDialog 高级用法
class AlertDialogAdvanced {
  void explain() {
    print('''
    AlertDialog 高级用法：
    
    // 单选对话框
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('选择选项'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            RadioListTile(
              title: Text('选项1'),
              value: 1,
              groupValue: selectedValue,
              onChanged: (v) => setState(() => selectedValue = v!),
            ),
            RadioListTile(
              title: Text('选项2'),
              value: 2,
              groupValue: selectedValue,
              onChanged: (v) => setState(() => selectedValue = v!),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: Text('取消')),
          TextButton(onPressed: () => Navigator.pop(context, selectedValue), child: Text('确定')),
        ],
      ),
    )
    
    // 输入对话框
    final controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('输入'),
        content: TextField(
          controller: controller,
          decoration: InputDecoration(hintText: '请输入内容'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: Text('取消')),
          TextButton(onPressed: () => Navigator.pop(context, controller.text), child: Text('确定')),
        ],
      ),
    )
    ''');
  }
}
```

## 📖 SimpleDialog

### 1. 选择对话框

```dart
// SimpleDialog
class SimpleDialogExample {
  void explain() {
    print('''
    SimpleDialog：
    
    showDialog(
      context: context,
      builder: (context) => SimpleDialog(
        title: Text('选择操作'),
        children: [
          SimpleDialogOption(
            onPressed: () => Navigator.pop(context, '拍照'),
            child: ListTile(
              leading: Icon(Icons.camera),
              title: Text('拍照'),
            ),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.pop(context, '相册'),
            child: ListTile(
              leading: Icon(Icons.photo_library),
              title: Text('从相册选择'),
            ),
          ),
          SimpleDialogOption(
            onPressed: () => Navigator.pop(context, '取消'),
            child: Text('取消'),
          ),
        ],
      ),
    ).then((value) {
      if (value != null) {
        print('选择了: $value');
      }
    })
    ''');
  }
}
```

## 📖 BottomSheet

### 1. ModalBottomSheet

```dart
// ModalBottomSheet
class ModalBottomSheetExample {
  void explain() {
    print('''
    ModalBottomSheet：
    
    // 显示底部表单
    showModalBottomSheet(
      context: context,
      builder: (context) => Container(
        height: 300,
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Text('底部表单', style: TextStyle(fontSize: 20)),
            SizedBox(height: 16),
            Expanded(child: Text('内容区域')),
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: Text('关闭'),
            ),
          ],
        ),
      ),
      // 设置属性
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      isScrollControlled: true,  // 全屏
      backgroundColor: Colors.white,
    )
    
    // 带列表的底部表单
    showModalBottomSheet(
      context: context,
      builder: (context) => Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(title: Text('分享到'), dense: true),
          Divider(),
          ListTile(leading: Icon(Icons.wechat), title: Text('微信'), onTap: () {}),
          ListTile(leading: Icon(Icons.message), title: Text('短信'), onTap: () {}),
          ListTile(leading: Icon(Icons.copy), title: Text('复制链接'), onTap: () {}),
          SizedBox(height: 16),
        ],
      ),
    )
    ''');
  }
}
```

### 2. PersistentBottomSheet

```dart
// PersistentBottomSheet
class PersistentBottomSheetExample {
  void explain() {
    print('''
    PersistentBottomSheet（持久底部表单）：
    
    // 显示持久底部表单
    showBottomSheet(
      context: context,
      builder: (context) => Container(
        height: 200,
        color: Colors.blue[100],
        child: Center(child: Text('持久底部表单')),
      ),
    )
    
    // 使用 ScaffoldMessenger
    final scaffoldMessenger = ScaffoldMessenger.of(context);
    scaffoldMessenger.showBottomSheet(
      (context) => Container(
        height: 200,
        color: Colors.blue[100],
        child: Center(child: Text('持久底部表单')),
      ),
    )
    
    // 关闭持久底部表单
    Navigator.pop(context);
    ''');
  }
}
```

---

> Dialog 和 BottomSheet 是实现弹窗交互的常用 Widget，掌握它们能让你的应用交互更加丰富。