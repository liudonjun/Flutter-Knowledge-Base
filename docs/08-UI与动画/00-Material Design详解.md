# Material Design 详解

> 深入理解 Flutter 中的 Material Design。

## 📖 Material Design 基础

### 1. 什么是 Material Design

```dart
// Material Design 概念
class MaterialDesignConcept {
  void explain() {
    print('''
    Material Design 概念：
    
    // 1. 什么是 Material Design
    // - Google 的设计语言
    // - 跨平台设计规范
    // - 提供统一视觉风格
    // - 支持响应式设计
    
    // 2. Material Design 的特点
    // - 统一规范：统一的视觉风格
    // - 响应式：支持响应式设计
    // - 可定制：支持自定义主题
    // - 跨平台：支持多平台
    
    // 3. Material Design 的组件
    // - 按钮：ElevatedButton, TextButton
    // - 卡片：Card
    // - 列表：ListTile
    // - 对话框：AlertDialog
    // - 导航：AppBar, BottomNavigationBar
    
    // 4. Material Design 的使用场景
    // - Android 应用
    // - 跨平台应用
    // - Web 应用
    // - 桌面应用
    ''');
  }
}
```

### 2. Material Design 实现

```dart
// Material Design 实现
class MaterialDesignImplementation {
  void explain() {
    print('''
    Material Design 实现：
    
    // 1. 使用 MaterialApp
    MaterialApp(
      title: 'My App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(),
    )
    
    // 2. 使用 Scaffold
    Scaffold(
      appBar: AppBar(
        title: Text('My App'),
      ),
      body: Center(
        child: Text('Hello World'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: Icon(Icons.add),
      ),
    )
    
    // 3. 使用 Material 组件
    Column(
      children: [
        ElevatedButton(
          onPressed: () {},
          child: Text('Elevated Button'),
        ),
        TextButton(
          onPressed: () {},
          child: Text('Text Button'),
        ),
        Card(
          child: ListTile(
            title: Text('Card Title'),
            subtitle: Text('Card Subtitle'),
          ),
        ),
      ],
    )
    ''');
  }
}
```

## 🔗 相关链接

- [[ThemeData]]
- [[Cupertino设计]]
- [[组件样式]]
- [[颜色系统]]

---

> Material Design 是 Flutter 默认的设计语言，掌握它对于构建美观应用非常重要。