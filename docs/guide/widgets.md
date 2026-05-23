# Widget 系统详解

> Widget 是 Flutter UI 的核心，掌握 Widget 系统是开发精美应用的关键。

## 🎯 Widget 基础

### 1. Widget 的本质
```dart
// Widget 是不可变的配置信息
class MyWidget extends StatelessWidget {
  final String title;
  
  const MyWidget({Key? key, required this.title}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(title);
  }
}
```

### 2. Widget 分类
- **StatelessWidget**: 无状态，不可变
- **StatefulWidget**: 有状态，可变
- **InheritedWidget**: 数据共享
- **RenderObjectWidget**: 直接参与渲染

## 📦 常用 Widget

### 基础 Widget
```dart
// 文本 Widget
Text(
  'Hello Flutter',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
  ),
)

// 按钮 Widget
ElevatedButton(
  onPressed: () {
    print('按钮被点击');
  },
  child: Text('点击我'),
)

// 图标 Widget
Icon(
  Icons.star,
  size: 48,
  color: Colors.amber,
)
```

### 布局 Widget
```dart
// Row - 水平布局
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: [
    Icon(Icons.star),
    Text('评分'),
    Icon(Icons.star),
  ],
)

// Column - 垂直布局
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    Text('标题'),
    Text('副标题'),
    Text('内容'),
  ],
)

// Stack - 层叠布局
Stack(
  children: [
    Container(color: Colors.red, width: 100, height: 100),
    Positioned(
      top: 20,
      left: 20,
      child: Container(color: Colors.blue, width: 50, height: 50),
    ),
  ],
)
```

### 容器 Widget
```dart
// Container - 万能容器
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(vertical: 8),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(8),
    boxShadow: [
      BoxShadow(
        color: Colors.grey.withOpacity(0.2),
        spreadRadius: 2,
        blurRadius: 5,
      ),
    ],
  ),
  child: Text('带样式的容器'),
)

// Card - 卡片 Widget
Card(
  elevation: 4,
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      children: [
        Text('卡片标题'),
        Text('卡片内容'),
      ],
    ),
  ),
)
```

## 🔄 Widget 生命周期

### StatelessWidget 生命周期
```dart
class MyStatelessWidget extends StatelessWidget {
  // 1. 构造函数
  const MyStatelessWidget({Key? key}) : super(key: key);
  
  // 2. build 方法 - 构建 UI
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

### StatefulWidget 生命周期
```dart
class MyStatefulWidget extends StatefulWidget {
  const MyStatefulWidget({Key? key}) : super(key: key);
  
  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  int _counter = 0;
  
  // 1. 初始化状态
  @override
  void initState() {
    super.initState();
    print('initState');
  }
  
  // 2. 依赖变化
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies');
  }
  
  // 3. 构建 UI
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('计数: $_counter'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _counter++;
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
  
  // 4. 状态更新
  @override
  void didUpdateWidget(MyStatefulWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget');
  }
  
  // 5. 清理资源
  @override
  void dispose() {
    print('dispose');
    super.dispose();
  }
}
```

## 🎨 Widget 最佳实践

### 1. 保持 Widget 简单
```dart
// ❌ 不好的实践：过于复杂的 Widget
class ComplexWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // 100 行代码...
      ],
    );
  }
}

// ✅ 好的实践：拆分 Widget
class SimpleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _buildHeader(),
        _buildContent(),
        _buildFooter(),
      ],
    );
  }
  
  Widget _buildHeader() => Text('标题');
  Widget _buildContent() => Text('内容');
  Widget _buildFooter() => Text('页脚');
}
```

### 2. 使用 const 构造函数
```dart
// ✅ 使用 const 提高性能
const MyWidget = const Text('Hello');

// ✅ 创建 const Widget
class ConstWidget extends StatelessWidget {
  const ConstWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return const Text('Const Widget');
  }
}
```

### 3. 避免不必要的重建
```dart
// ❌ 不好的实践：每次 build 都创建新对象
class BadWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello'), // 每次重建
    );
  }
}

// ✅ 好的实践：使用 const 和缓存
class GoodWidget extends StatelessWidget {
  const GoodWidget({Key? key}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Container(
      child: const Text('Hello'), // 使用 const
    );
  }
}
```

## 🔧 Widget 调试

### 1. Flutter Inspector
- 查看 Widget 树
- 分析布局约束
- 检查性能问题

### 2. 调试技巧
```dart
// 打印 Widget 信息
debugPrint('Widget build: ${widget.runtimeType}');

// 使用 debug 模式
if (kDebugMode) {
  print('调试信息');
}

// 检查布局约束
LayoutBuilder(
  builder: (context, constraints) {
    print('约束: $constraints');
    return Container();
  },
)
```

## 🚀 进阶概念

### 1. Widget 类型系统
- **RenderObjectWidget**: 直接参与渲染
- **ProxyWidget**: 代理其他 Widget
- **InheritedWidget**: 数据共享

### 2. 性能优化
```dart
// 使用 ListView.builder 而不是 ListView
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item $index'));
  },
)

// 使用 const Widget
const MyWidget = const Text('Hello');

// 避免在 build 中创建新对象
class MyWidget extends StatelessWidget {
  final List<String> items = const ['A', 'B', 'C']; // 使用 const
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Text(items[index]);
      },
    );
  }
}
```

## 📚 学习资源

- [Flutter Widget 目录](https://flutter.dev/docs/development/ui/widgets)
- [Widget 框架](https://flutter.dev/docs/development/ui/widgets-intro)
- [Widget 最佳实践](https://flutter.dev/docs/perf/best-practices)

## 🔗 相关链接

- [[core/architecture]] - Flutter 架构概览
- [[core/widgets]] - 一切皆 Widget
- [[guide/state-management]] - 状态管理
- [[guide/navigation]] - 导航与路由

---
*最后更新: 2026年5月23日*