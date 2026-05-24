# 常用 Widget 详解

> 深入理解 Flutter 常用 Widget。

## 📖 常用 Widget

### 1. 文本 Widget

```dart
// 文本 Widget
class TextWidget {
  void explain() {
    print('''
    文本 Widget：
    
    // 1. Text Widget
    // - 显示文本
    // - 支持样式设置
    // - 支持对齐方式
    // - 支持溢出处理
    
    // 2. Text 示例
    Text(
      'Hello World',
      style: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.bold,
        color: Colors.black,
      ),
      textAlign: TextAlign.center,
      maxLines: 2,
      overflow: TextOverflow.ellipsis,
    )
    
    // 3. RichText Widget
    // - 支持多种样式
    // - 支持混合文本
    // - 支持链接
    // - 支持图片
    
    // 4. RichText 示例
    RichText(
      text: TextSpan(
        text: 'Hello ',
        style: TextStyle(color: Colors.black),
        children: [
          TextSpan(
            text: 'World',
            style: TextStyle(
              color: Colors.blue,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    )
    ''');
  }
}
```

### 2. 按钮 Widget

```dart
// 按钮 Widget
class ButtonWidget {
  void explain() {
    print('''
    按钮 Widget：
    
    // 1. ElevatedButton
    // - 凸起按钮
    // - 支持样式设置
    // - 支持图标
    // - 支持禁用状态
    
    // 2. ElevatedButton 示例
    ElevatedButton(
      onPressed: () {
        // 点击事件
      },
      child: Text('Click Me'),
      style: ElevatedButton.styleFrom(
        primary: Colors.blue,
        onPrimary: Colors.white,
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      ),
    )
    
    // 3. TextButton
    // - 文本按钮
    // - 支持样式设置
    // - 支持图标
    // - 支持禁用状态
    
    // 4. OutlinedButton
    // - 边框按钮
    // - 支持样式设置
    // - 支持图标
    // - 支持禁用状态
    
    // 5. IconButton
    // - 图标按钮
    // - 支持样式设置
    // - 支持禁用状态
    // - 支持工具提示
    ''');
  }
}
```

## 🔧 Widget 实现

### 1. 容器 Widget

```dart
// 容器 Widget
class ContainerWidget {
  void explain() {
    print('''
    容器 Widget：
    
    // 1. Container
    // - 通用容器
    // - 支持装饰
    // - 支持约束
    // - 支持边距和内边距
    
    // 2. Container 示例
    Container(
      width: 200,
      height: 100,
      padding: EdgeInsets.all(8),
      margin: EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(8),
        boxShadow: [
          BoxShadow(
            color: Colors.black26,
            blurRadius: 4,
            offset: Offset(2, 2),
          ),
        ],
      ),
      child: Text('Hello'),
    )
    
    // 3. SizedBox
    // - 固定尺寸容器
    // - 支持宽度和高度
    // - 支持子 Widget
    
    // 4. Padding
    // - 内边距容器
    // - 支持边距设置
    // - 支持子 Widget
    
    // 5. Align
    // - 对齐容器
    // - 支持对齐方式
    // - 支持子 Widget
    ''');
  }
}
```

### 2. 布局 Widget

```dart
// 布局 Widget
class LayoutWidget {
  void explain() {
    print('''
    布局 Widget：
    
    // 1. Row
    // - 水平布局
    // - 支持对齐方式
    // - 支持间距
    // - 支持子 Widget
    
    // 2. Row 示例
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        Text('Left'),
        Text('Center'),
        Text('Right'),
      ],
    )
    
    // 3. Column
    // - 垂直布局
    // - 支持对齐方式
    // - 支持间距
    // - 支持子 Widget
    
    // 4. Column 示例
    Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Top'),
        SizedBox(height: 20),
        Text('Bottom'),
      ],
    )
    
    // 5. Stack
    // - 层叠布局
    // - 支持定位
    // - 支持对齐
    // - 支持子 Widget
    
    // 6. Stack 示例
    Stack(
      children: [
        Container(color: Colors.red),
        Positioned(
          top: 20,
          left: 20,
          child: Text('Hello'),
        ),
      ],
    )
    ''');
  }
}
```

## 📊 Widget 分析

### 1. 使用 DevTools 分析 Widget

```dart
// DevTools Widget 分析
class DevToolsWidget {
  void explain() {
    print('''
    DevTools Widget 分析：
    
    // 1. 查看 Widget 使用情况
    // - 打开 DevTools
    // - 切换到 Flutter Inspector
    // - 查看 Widget 树
    // - 分析 Widget 使用
    
    // 2. 分析 Widget 性能
    // - 查看 Widget 重建
    // - 分析 Widget 性能
    // - 优化 Widget 使用
    // - 提高性能
    
    // 3. Widget 优化建议
    // - 使用 const 构造函数
    // - 提取 Widget
    // - 使用 RepaintBoundary
    // - 使用 child 参数
    
    // 4. Widget 监控
    // - 监控 Widget 使用
    // - 分析性能影响
    // - 优化 Widget 使用
    // - 提高性能
    
    // 5. Widget 最佳实践
    // - 保持 Widget 简单
    // - 使用标准 Widget
    // - 避免复杂 Widget
    // - 考虑性能影响
    ''');
  }
}
```

## ⚠️ 注意事项

1. **Widget 选择**：选择合适的 Widget
2. **性能考虑**：考虑 Widget 性能
3. **样式设置**：设置合适的样式
4. **用户体验**：考虑用户体验
5. **测试设备**：在不同设备上测试

## 🔗 相关链接

- [[Widget基础详解]]
- [[布局系统详解]]
- [[高级Widget详解]]
- [[Widget性能优化]]

---

> 常用 Widget 是 Flutter 开发的基础，掌握常用 Widget 是构建应用的关键。