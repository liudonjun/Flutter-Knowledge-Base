# TextField 详解

> 深入理解 Flutter TextField Widget。

## 📖 TextField 概念

### 1. 什么是 TextField

```dart
// TextField 概念
class TextFieldConcept {
  void explain() {
    print('''
    TextField 概念：
    
    // 1. 什么是 TextField
    // - 输入框 Widget
    // - 接收用户输入
    // - 支持多种样式
    // - 支持验证
    
    // 2. TextField 的特点
    // - 支持文本输入
    // - 支持样式设置
    // - 支持验证
    // - 支持多种键盘类型
    
    // 3. TextField 的使用场景
    // - 表单输入
    // - 搜索框
    // - 登录注册
    // - 数据输入
    
    // 4. TextField 的属性
    // - controller：控制器
    // - decoration：装饰
    // - keyboardType：键盘类型
    // - obscureText：是否隐藏文本
    ''');
  }
}
```

### 2. TextField 示例

```dart
// TextField 示例
class TextFieldExample {
  void explain() {
    print('''
    TextField 示例：
    
    // 1. 基本 TextField
    TextField(
      decoration: InputDecoration(
        labelText: 'Name',
      ),
    )
    
    // 2. 带图标的 TextField
    TextField(
      decoration: InputDecoration(
        labelText: 'Email',
        prefixIcon: Icon(Icons.email),
      ),
    )
    
    // 3. 带验证的 TextField
    TextField(
      decoration: InputDecoration(
        labelText: 'Password',
        errorText: _errorText,
      ),
      obscureText: true,
    )
    
    // 4. 带控制器的 TextField
    TextEditingController _controller = TextEditingController();
    TextField(
      controller: _controller,
      decoration: InputDecoration(
        labelText: 'Name',
      ),
    )
    ''');
  }
}
```

## 🔧 TextField 实现

### 1. TextField 属性

```dart
// TextField 属性
class TextFieldProperties {
  void explain() {
    print('''
    TextField 属性：
    
    // 1. 主要属性
    // - controller：控制器
    // - decoration：装饰
    // - keyboardType：键盘类型
    // - obscureText：是否隐藏文本
    
    // 2. 样式属性
    // - style：文本样式
    // - textAlign：文本对齐
    // - maxLines：最大行数
    // - minLines：最小行数
    
    // 3. 行为属性
    // - onChanged：文本改变回调
    // - onSubmitted：提交回调
    // - enabled：是否启用
    // - readOnly：是否只读
    
    // 4. 示例
    TextField(
      controller: _controller,
      decoration: InputDecoration(
        labelText: 'Name',
        hintText: 'Enter your name',
        prefixIcon: Icon(Icons.person),
        suffixIcon: Icon(Icons.clear),
        border: OutlineInputBorder(),
        errorText: _errorText,
      ),
      keyboardType: TextInputType.text,
      obscureText: false,
      style: TextStyle(fontSize: 16),
      textAlign: TextAlign.left,
      maxLines: 1,
      minLines: 1,
      onChanged: (value) {
        // 文本改变
      },
      onSubmitted: (value) {
        // 提交
      },
      enabled: true,
      readOnly: false,
    )
    ''');
  }
}
```

### 2. TextField 最佳实践

```dart
// TextField 最佳实践
class TextFieldBestPractices {
  void explain() {
    print('''
    TextField 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多输入框
    // - 使用适当的装饰
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的键盘类型
    // - 提供反馈
    
    // 5. 示例
    TextField(
      controller: _controller,
      decoration: const InputDecoration(
        labelText: 'Name',
        hintText: 'Enter your name',
      ),
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：TextField 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **输入验证**：提供输入验证
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Form]]
- [[TextFormField]]
- [[InputDecoration]]
- [[TextEditingController]]

---

> TextField 是应用的重要组成部分，掌握 TextField 可以提升用户体验。