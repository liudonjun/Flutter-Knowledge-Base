# 一切皆 Widget

> Widget 是 Flutter 的核心概念，整个 UI 都是由 Widget 构成的。

## 🎯 核心思想

### 1. Widget 的本质
- **定义**: Widget 是 Flutter UI 的基本构建块
- **特点**:
  - 不可变 (immutable)
  - 声明式描述 UI
  - 通过组合构建复杂 UI
  - 轻量级，可以频繁创建

### 2. Widget 与 Element
- **Widget**: 配置信息，描述 UI 应该长什么样
- **Element**: Widget 的实例化，管理生命周期
- **关系**: Widget 是蓝图，Element 是实际建筑

## 📦 Widget 分类

### 1. StatelessWidget
```dart
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

### 2. StatefulWidget
```dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
```

## 🏗️ Widget 树结构

### 组合模式
```dart
Container(
  child: Column(
    children: [
      Text('标题'),
      Row(
        children: [
          Icon(Icons.star),
          Text('评分'),
        ],
      ),
    ],
  ),
)
```

## 🔄 Widget 生命周期

### StatelessWidget 生命周期
1. **构造函数**: 接收参数
2. **build**: 构建 UI

### StatefulWidget 生命周期
1. **构造函数**: 接收参数
2. **createState**: 创建 State 对象
3. **initState**: 初始化状态
4. **didChangeDependencies**: 依赖变化
5. **build**: 构建 UI
6. **setState**: 状态更新
7. **dispose**: 清理资源

## 🎨 常用 Widget

### 基础 Widget
- **Container**: 万能容器
- **Text**: 文本显示
- **Image**: 图片显示
- **Icon**: 图标显示

### 布局 Widget
- **Row**: 水平布局
- **Column**: 垂直布局
- **Stack**: 层叠布局
- **Flex**: 弹性布局

## 💡 最佳实践

### 1. 保持 Widget 简单
- 单一职责原则
- 避免过于复杂的 Widget
- 适当拆分 Widget

### 2. 使用 const 构造函数
```dart
const Text('Hello')  // 使用 const
```

### 3. 避免不必要的重建
- 使用 const Widget
- 合理使用 GlobalKey
- 优化 shouldRebuild

## 🔗 相关链接

### 核心概念
- [架构概览](/core/architecture) - Flutter 架构概览
- [一切皆 Widget](/core/widgets) - 一切皆 Widget
- [Dart 语言](/core/dart) - Dart 语言

### 指南
- [Widget 系统](/guide/widgets) - Widget 系统详解
- [状态管理](/guide/state-management) - 状态管理方案
- [导航与路由](/guide/navigation) - 导航与路由系统
- [UI 设计与动画](/guide/ui-design) - UI 设计与动画

### 实战项目
- [电商应用](/projects/ecommerce) - 电商应用实战
- [社交应用](/projects/social) - 社交应用开发

### 学习资源
- [官方资源](/resources/official) - 官方资源
- [社区资源](/resources/community) - 社区资源
- [书籍推荐](/resources/books) - 书籍推荐

---
*最后更新: 2026年5月23日*