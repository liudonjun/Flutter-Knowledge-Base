# 一切皆 Widget

> Widget 是 Flutter 的核心概念，整个 UI 都是由 Widget 构成的。

## 🎯 核心思想

### 1. Widget 的本质
- **定义**：Widget 是 Flutter UI 的基本构建块
- **特点**：
  - 不可变（immutable）
  - 声明式描述 UI
  - 通过组合构建复杂 UI
  - 轻量级，可以频繁创建

### 2. Widget 与 Element
- **Widget**：配置信息，描述 UI 应该长什么样
- **Element**：Widget 的实例化，管理生命周期
- **关系**：Widget 是蓝图，Element 是实际建筑

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
- **特点**：无状态，不可变
- **使用场景**：静态 UI、纯展示组件
- **性能**：轻量，可频繁重建

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
- **特点**：有状态，可变
- **使用场景**：需要交互、动态变化的 UI
- **性能**：状态变化时重建

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

### 树形结构
- **根 Widget**：通常是 MaterialApp 或 WidgetsApp
- **父 Widget**：包含其他 Widget
- **子 Widget**：被包含的 Widget

## 🔄 Widget 生命周期

### StatelessWidget 生命周期
1. **构造函数**：接收参数
2. **build**：构建 UI

### StatefulWidget 生命周期
1. **构造函数**：接收参数
2. **createState**：创建 State 对象
3. **initState**：初始化状态
4. **didChangeDependencies**：依赖变化
5. **build**：构建 UI
6. **setState**：状态更新
7. **dispose**：清理资源

## 🎨 常用 Widget

### 基础 Widget
- [[Container]] - 容器 Widget
- [[Text]] - 文本 Widget
- [[Image]] - 图片 Widget
- [[Icon]] - 图标 Widget

### 布局 Widget
- [[Row]] - 水平布局
- [[Column]] - 垂直布局
- [[Stack]] - 层叠布局
- [[Flex]] - 弹性布局

### 交互 Widget
- [[Button]] - 按钮 Widget
- [[TextField]] - 输入框
- [[GestureDetector]] - 手势检测

## 💡 最佳实践

### 1. 保持 Widget 简单
- 单一职责原则
- 避免过于复杂的 Widget
- 适当拆分 Widget

### 2. 使用 const 构造函数
```dart
const Text('Hello')  // 使用 const
```
- 提高性能
- 减少重建

### 3. 避免不必要的重建
- 使用 const Widget
- 合理使用 GlobalKey
- 优化 shouldRebuild

## 🔧 调试技巧

### Widget 检查器
- 使用 Flutter Inspector
- 查看 Widget 树
- 分析布局问题

### 常见问题
- **Widget 过大**：检查约束条件
- **重建过多**：检查依赖关系
- **布局错误**：检查父 Widget 约束

## 🚀 进阶概念

### Widget 类型系统
- **RenderObjectWidget**：直接参与渲染
- **ProxyWidget**：代理其他 Widget
- **InheritedWidget**：数据共享

### 性能优化
- **Widget 缓存**：使用 const
- **懒加载**：使用 ListView.builder
- **状态管理**：合理选择方案

## 🔗 相关笔记

- [[Flutter架构概览]] - Flutter 架构详解
- [[Widget生命周期]] - Widget 生命周期详解
- [[声明式UI]] - 声明式 UI 编程

---
*最后更新: 2026年5月23日*