# Text Widget 详解

> 深入理解 Flutter 中的文本显示 Widget - Text。

## 📖 Text 基础

### 1. 基本用法

```dart
// Text 基本用法
class TextBasics {
  void explain() {
    print('''
    Text 基本用法：
    
    // 最简单的 Text
    Text('Hello, Flutter!')
    
    // 设置样式
    Text(
      'Hello',
      style: TextStyle(
        fontSize: 24,
        color: Colors.blue,
        fontWeight: FontWeight.bold,
      ),
    )
    
    // 文本对齐
    Text(
      '居中对齐',
      textAlign: TextAlign.center,
    )
    
    // 最大行数
    Text(
      '这是很长的文本...',
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    )
    
    // 文本方向
    Text(
      'Hello',
      textDirection: TextDirection.ltr,
    )
    ''');
  }
}
```

### 2. TextStyle 详解

```dart
// TextStyle
class TextStyleDetails {
  void explain() {
    print('''
    TextStyle 属性：
    
    TextStyle(
      // 颜色
      color: Colors.blue,
      
      // 字体大小
      fontSize: 24,
      
      // 字重
      fontWeight: FontWeight.bold,
      
      // 字体样式
      fontStyle: FontStyle.italic,
      
      // 字母间距
      letterSpacing: 2.0,
      
      // 单词间距
      wordSpacing: 5.0,
      
      // 文本基线
      textBaseline: TextBaseline.alphabetic,
      
      // 高度
      height: 1.5,
      
      // 文本装饰
      decoration: TextDecoration.underline,
      decorationColor: Colors.red,
      decorationStyle: TextDecorationStyle.dashed,
      
      // 字体
      fontFamily: 'Roboto',
      
      // 背景
      background: Paint()..color = Colors.yellow,
      
      // 阴影
      shadows: [
        Shadow(
          color: Colors.grey,
          offset: Offset(2, 2),
          blurRadius: 5,
        ),
      ],
    )
    ''');
  }
}
```

### 3. 文本溢出

```dart
// 文本溢出处理
class TextOverflow {
  void explain() {
    print('''
    文本溢出处理：
    
    // 省略号
    Text(
      '很长的文本...',
      overflow: TextOverflow.ellipsis,
      maxLines: 1,
    )
    
    // 裁剪
    Text(
      '很长的文本...',
      overflow: TextOverflow.clip,
      maxLines: 1,
    )
    
    // 淡出
    Text(
      '很长的文本...',
      overflow: TextOverflow.fade,
      maxLines: 1,
    )
    
    // 换行
    Text(
      '很长的文本...',
      softWrap: true,
    )
    ''');
  }
}
```

## 📖 RichText

### 1. 富文本

```dart
// RichText
class RichTextExample {
  void explain() {
    print('''
    RichText 富文本：
    
    RichText(
      text: TextSpan(
        text: 'Hello ',
        style: TextStyle(color: Colors.black),
        children: [
          TextSpan(
            text: 'bold',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          TextSpan(
            text: ' and ',
          ),
          TextSpan(
            text: 'italic',
            style: TextStyle(fontStyle: FontStyle.italic),
          ),
        ],
      ),
    )
    
    // Text.rich 快捷方式
    Text.rich(
      TextSpan(
        children: [
          TextSpan(text: 'By clicking, you agree to our '),
          TextSpan(
            text: 'Terms of Service',
            style: TextStyle(
              color: Colors.blue,
              decoration: TextDecoration.underline,
            ),
            recognizer: TapGestureRecognizer()
              ..onTap = () {
                // 处理点击
              },
          ),
        ],
      ),
    )
    ''');
  }
}
```

### 2. SelectableText

```dart
// SelectableText
class SelectableTextExample {
  void explain() {
    print('''
    SelectableText 可选择文本：
    
    // 基本用法
    SelectableText('这段文本可以被选择和复制')
    
    // 设置样式
    SelectableText(
      '可选择的文本',
      style: TextStyle(fontSize: 18),
      textAlign: TextAlign.center,
      cursorColor: Colors.blue,
      showCursor: true,
      autofocus: true,
    )
    
    // 选择改变回调
    SelectableText(
      '文本',
      onSelectionChanged: (selection, cause) {
        print('选中: ${selection.textInside('文本')}');
      },
    )
    
    // 限制选择
    SelectableText(
      '文本',
      toolbarOptions: ToolbarOptions(
        copy: true,
        selectAll: true,
      ),
    )
    ''');
  }
}
```

---

> Text Widget 是显示文本的基础，掌握各种样式和布局能让你的 UI 更加美观。