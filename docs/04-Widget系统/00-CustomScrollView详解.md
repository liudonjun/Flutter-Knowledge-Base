# CustomScrollView 详解

> 深入理解 Flutter CustomScrollView Widget。

## 📖 CustomScrollView 概念

### 1. 什么是 CustomScrollView

```dart
// CustomScrollView 概念
class CustomScrollViewConcept {
  void explain() {
    print('''
    CustomScrollView 概念：
    
    // 1. 什么是 CustomScrollView
    // - 自定义滚动视图
    // - 支持多种 Sliver
    // - 支持复杂滚动
    // - 支持性能优化
    
    // 2. CustomScrollView 的特点
    // - 支持多种 Sliver
    // - 支持复杂滚动
    // - 支持性能优化
    // - 支持多种样式
    
    // 3. CustomScrollView 的使用场景
    // - 复杂滚动
    // - 多种 Sliver 组合
    // - 性能优化
    // - 自定义滚动
    
    // 4. CustomScrollView 的属性
    // - slivers：Sliver 列表
    // - scrollDirection：滚动方向
    // - reverse：是否反转
    // - controller：滚动控制器
    ''');
  }
}
```

### 2. CustomScrollView 示例

```dart
// CustomScrollView 示例
class CustomScrollViewExample {
  void explain() {
    print('''
    CustomScrollView 示例：
    
    // 1. 基本 CustomScrollView
    CustomScrollView(
      slivers: [
        SliverAppBar(
          title: Text('My App'),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return ListTile(
                title: Text('Item $index'),
              );
            },
            childCount: 100,
          ),
        ),
      ],
    )
    
    // 2. 带 SliverGrid 的 CustomScrollView
    CustomScrollView(
      slivers: [
        SliverAppBar(
          title: Text('My App'),
        ),
        SliverGrid(
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2,
          ),
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return Card(
                child: Text('Item $index'),
              );
            },
            childCount: 100,
          ),
        ),
      ],
    )
    
    // 3. 带 SliverToBoxAdapter 的 CustomScrollView
    CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Container(
            height: 200,
            color: Colors.blue,
            child: Text('Header'),
          ),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return ListTile(
                title: Text('Item $index'),
              );
            },
            childCount: 100,
          ),
        ),
      ],
    )
    ''');
  }
}
```

## 🔧 CustomScrollView 实现

### 1. CustomScrollView 属性

```dart
// CustomScrollView 属性
class CustomScrollViewProperties {
  void explain() {
    print('''
    CustomScrollView 属性：
    
    // 1. 主要属性
    // - slivers：Sliver 列表
    // - scrollDirection：滚动方向
    // - reverse：是否反转
    // - controller：滚动控制器
    
    // 2. 样式属性
    // - primary：是否为主滚动视图
    // - physics：滚动物理
    // - shrinkWrap：是否收缩包装
    // - center：中心 Sliver
    
    // 3. 示例
    CustomScrollView(
      slivers: [
        SliverAppBar(
          title: Text('My App'),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return ListTile(
                title: Text('Item $index'),
              );
            },
            childCount: 100,
          ),
        ),
      ],
      scrollDirection: Axis.vertical,
      reverse: false,
      controller: _scrollController,
      primary: false,
      physics: AlwaysScrollableScrollPhysics(),
      shrinkWrap: false,
      center: null,
    )
    ''');
  }
}
```

### 2. CustomScrollView 最佳实践

```dart
// CustomScrollView 最佳实践
class CustomScrollViewBestPractices {
  void explain() {
    print('''
    CustomScrollView 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多 Sliver
    // - 使用适当的 Sliver
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的滚动
    // - 提供反馈
    
    // 5. 示例
    CustomScrollView(
      slivers: const [
        SliverAppBar(
          title: Text('My App'),
        ),
        SliverList(
          delegate: SliverChildBuilderDelegate(
            (context, index) {
              return ListTile(
                title: Text('Item $index'),
              );
            },
            childCount: 100,
          ),
        ),
      ],
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CustomScrollView 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **滚动性能**：优化滚动性能
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[ListView]]
- [[GridView]]
- [[SingleChildScrollView]]
- [[NestedScrollView]]

---

> CustomScrollView 是复杂滚动的重要工具，掌握 CustomScrollView 可以提升用户体验。