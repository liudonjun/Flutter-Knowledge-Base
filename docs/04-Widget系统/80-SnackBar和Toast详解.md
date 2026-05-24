# SnackBar 和 Toast 详解

> 深入理解 Flutter 中的消息提示 Widget - SnackBar 和 Toast。

## 📖 SnackBar

### 1. 基本用法

```dart
// SnackBar 基本用法
class SnackBarBasics {
  void explain() {
    print('''
    SnackBar 基本用法：
    
    // 显示 SnackBar
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('这是一条消息'),
      ),
    )
    
    // 带操作的 SnackBar
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('消息已发送'),
        action: SnackBarAction(
          label: '撤销',
          onPressed: () {
            // 撤销操作
          },
        ),
      ),
    )
    
    // 设置持续时间
    SnackBar(
      content: Text('消息'),
      duration: Duration(seconds: 3),
    )
    
    // 设置位置
    SnackBar(
      content: Text('消息'),
      behavior: SnackBarBehavior.floating,  // 浮动
      // SnackBarBehavior.fixed  // 固定在底部
    )
    ''');
  }
}
```

### 2. SnackBar 样式

```dart
// SnackBar 样式
class SnackBarStyles {
  void explain() {
    print('''
    SnackBar 样式：
    
    // 自定义样式
    SnackBar(
      content: Text('成功！'),
      backgroundColor: Colors.green,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      behavior: SnackBarBehavior.floating,
      margin: EdgeInsets.all(16),
      elevation: 6,
      action: SnackBarAction(
        label: '关闭',
        textColor: Colors.white,
        onPressed: () {},
      ),
    )
    
    // 带图标的 SnackBar
    SnackBar(
      content: Row(
        children: [
          Icon(Icons.check, color: Colors.white),
          SizedBox(width: 8),
          Text('操作成功'),
        ],
      ),
      backgroundColor: Colors.green,
    )
    
    // 错误样式
    SnackBar(
      content: Row(
        children: [
          Icon(Icons.error, color: Colors.white),
          SizedBox(width: 8),
          Expanded(child: Text('操作失败，请重试')),
        ],
      ),
      backgroundColor: Colors.red,
    )
    ''');
  }
}
```

### 3. 全局 SnackBar

```dart
// 全局 SnackBar
class GlobalSnackBar {
  void explain() {
    print('''
    全局 SnackBar：
    
    // 创建全局 key
    final GlobalKey<ScaffoldMessengerState> scaffoldMessengerKey = 
        GlobalKey<ScaffoldMessengerState>();
    
    // 在 MaterialApp 中使用
    MaterialApp(
      scaffoldMessengerKey: scaffoldMessengerKey,
      home: MyHomePage(),
    )
    
    // 在任何地方显示 SnackBar
    void showGlobalSnackBar(String message) {
      scaffoldMessengerKey.currentState?.showSnackBar(
        SnackBar(content: Text(message)),
      );
    }
    
    // 工具类封装
    class SnackBarHelper {
      static final GlobalKey<ScaffoldMessengerState> key = 
          GlobalKey<ScaffoldMessengerState>();
      
      static void showSuccess(String message) {
        key.currentState?.showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.green,
          ),
        );
      }
      
      static void showError(String message) {
        key.currentState?.showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
    ''');
  }
}
```

## 📖 Flutter Toast

### 1. 使用 fluttertoast 包

```dart
// Flutter Toast
class FlutterToastExample {
  void explain() {
    print('''
    Flutter Toast（使用 fluttertoast 包）：
    
    // 依赖
    // fluttertoast: ^8.0.0
    
    import 'package:fluttertoast/fluttertoast.dart';
    
    // 基本用法
    Fluttertoast.showToast(
      msg: "这是一条 Toast 消息",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: Colors.black,
      textColor: Colors.white,
      fontSize: 16.0,
    )
    
    // Toast 位置
    Fluttertoast.showToast(
      msg: "消息",
      gravity: ToastGravity.TOP,     // 顶部
      // ToastGravity.CENTER  // 居中
      // ToastGravity.BOTTOM  // 底部
    )
    
    // 取消 Toast
    Fluttertoast.cancel();
    
    // 自定义 Toast
    Fluttertoast.showToast(
      msg: "成功！",
      backgroundColor: Colors.green,
      gravity: ToastGravity.CENTER,
    )
    ''');
  }
}
```

### 2. 自定义 Toast

```dart
// 自定义 Toast
class CustomToast {
  void explain() {
    print('''
    自定义 Toast：
    
    // 使用 Overlay 实现自定义 Toast
    void showCustomToast(BuildContext context, String message) {
      final overlay = Overlay.of(context);
      final overlayEntry = OverlayEntry(
        builder: (context) => Positioned(
          bottom: 100,
          left: 0,
          right: 0,
          child: Center(
            child: Material(
              color: Colors.transparent,
              child: Container(
                padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  message,
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
        ),
      );
      
      overlay.insert(overlayEntry);
      
      Future.delayed(Duration(seconds: 2), () {
        overlayEntry.remove();
      });
    }
    
    // 使用
    showCustomToast(context, '自定义 Toast');
    ''');
  }
}
```

---

> SnackBar 和 Toast 是用户反馈的重要方式，掌握它们能让你的应用交互更加友好。