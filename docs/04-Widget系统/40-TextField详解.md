# TextField 详解

> 深入理解 Flutter 中的输入框 Widget - TextField。

## 📖 TextField 基础

### 1. 基本用法

```dart
// TextField 基本用法
class TextFieldBasics {
  void explain() {
    print('''
    TextField 基本用法：
    
    // 最简单的输入框
    TextField()
    
    // 带装饰的输入框
    TextField(
      decoration: InputDecoration(
        labelText: '用户名',
        hintText: '请输入用户名',
        border: OutlineInputBorder(),
      ),
    )
    
    // 使用控制器
    final controller = TextEditingController();
    
    TextField(
      controller: controller,
      decoration: InputDecoration(labelText: '输入'),
    )
    
    // 获取输入值
    String value = controller.text;
    
    // 监听输入
    controller.addListener(() {
      print('输入: ${controller.text}');
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

### 2. InputDecoration

```dart
// InputDecoration 详解
class InputDecorationExample {
  void explain() {
    print('''
    InputDecoration 属性：
    
    InputDecoration(
      // 标签
      labelText: '用户名',
      labelStyle: TextStyle(color: Colors.blue),
      
      // 提示
      hintText: '请输入',
      hintStyle: TextStyle(color: Colors.grey),
      
      // 前缀
      prefixIcon: Icon(Icons.person),
      prefixText: '￥',
      prefix: Text('前缀'),
      
      // 后缀
      suffixIcon: Icon(Icons.clear),
      suffixText: '元',
      suffix: Text('后缀'),
      
      // 边框
      border: OutlineInputBorder(),
      enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.grey)),
      focusedBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.blue)),
      errorBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.red)),
      
      // 填充
      filled: true,
      fillColor: Colors.grey[100],
      
      // 错误
      errorText: '输入错误',
      
      // 内边距
      contentPadding: EdgeInsets.all(16),
    )
    ''');
  }
}
```

### 3. 输入控制

```dart
// 输入控制
class TextFieldControl {
  void explain() {
    print('''
    输入控制：
    
    // 最大行数
    TextField(
      maxLines: 3,
      decoration: InputDecoration(labelText: '多行输入'),
    )
    
    // 单行输入
    TextField(
      maxLines: 1,
      decoration: InputDecoration(labelText: '单行'),
    )
    
    // 密码输入
    TextField(
      obscureText: true,
      decoration: InputDecoration(
        labelText: '密码',
        suffixIcon: Icon(Icons.visibility),
      ),
    )
    
    // 输入格式
    TextField(
      inputFormatters: [
        FilteringTextInputFormatter.digitsOnly,  // 只允许数字
        LengthLimitingTextInputFormatter(11),     // 最大长度
        // FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z]')),  // 只允许字母
      ],
      decoration: InputDecoration(labelText: '手机号'),
    )
    
    // 键盘类型
    TextField(
      keyboardType: TextInputType.number,
      // TextInputType.phone
      // TextInputType.emailAddress
      // TextInputType.multiline
      // TextInputType.datetime
      decoration: InputDecoration(labelText: '数字'),
    )
    ''');
  }
}
```

### 4. 表单验证

```dart
// 表单验证
class FormValidation {
  void explain() {
    print('''
    表单验证：
    
    final _formKey = GlobalKey<FormState>();
    final _nameController = TextEditingController();
    final _emailController = TextEditingController();
    
    Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(labelText: '姓名'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '请输入姓名';
              }
              return null;
            },
          ),
          TextFormField(
            controller: _emailController,
            decoration: InputDecoration(labelText: '邮箱'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '请输入邮箱';
              }
              if (!value.contains('@')) {
                return '邮箱格式不正确';
              }
              return null;
            },
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // 验证通过
                print('姓名: ${_nameController.text}');
                print('邮箱: ${_emailController.text}');
              }
            },
            child: Text('提交'),
          ),
        ],
      ),
    )
    ''');
  }
}
```

---

> TextField 是用户输入的核心 Widget，掌握它的各种用法和验证机制能让你的应用交互更加完善。