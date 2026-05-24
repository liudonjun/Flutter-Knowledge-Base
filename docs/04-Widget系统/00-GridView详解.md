# GridView 详解

> 深入理解 Flutter GridView Widget。

## 📖 GridView 概念

### 1. 什么是 GridView

```dart
// GridView 概念
class GridViewConcept {
  void explain() {
    print('''
    GridView 概念：
    
    // 1. 什么是 GridView
    // - 网格布局 Widget
    // - 显示网格数据
    // - 支持滚动
    // - 支持多种样式
    
    // 2. GridView 的特点
    // - 支持网格布局
    // - 支持滚动
    // - 支持懒加载
    // - 支持多种样式
    
    // 3. GridView 的使用场景
    // - 图片展示
    // - 产品展示
    // - 数据网格
    // - 菜单网格
    
    // 4. GridView 的属性
    // - gridDelegate：网格委托
    // - itemCount：项目数量
    // - itemBuilder：项目构建器
    // - scrollDirection：滚动方向
    ''');
  }
}
```

### 2. GridView 示例

```dart
// GridView 示例
class GridViewExample {
  void explain() {
    print('''
    GridView 示例：
    
    // 1. 基本 GridView
    GridView.count(
      crossAxisCount: 2,
      children: [
        Card(child: Text('Item 1')),
        Card(child: Text('Item 2')),
        Card(child: Text('Item 3')),
        Card(child: Text('Item 4')),
      ],
    )
    
    // 2. GridView.builder
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Card(
          child: Text(items[index]),
        );
      },
    )
    
    // 3. GridView.extent
    GridView.extent(
      maxCrossAxisExtent: 200,
      children: [
        Card(child: Text('Item 1')),
        Card(child: Text('Item 2')),
      ],
    )
    
    // 4. 自定义样式的 GridView
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        childAspectRatio: 1.5,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Card(
          child: Text(items[index]),
        );
      },
    )
    ''');
  }
}
```

## 🔧 GridView 实现

### 1. GridView 属性

```dart
// GridView 属性
class GridViewProperties {
  void explain() {
    print('''
    GridView 属性：
    
    // 1. 主要属性
    // - gridDelegate：网格委托
    // - itemCount：项目数量
    // - itemBuilder：项目构建器
    // - scrollDirection：滚动方向
    
    // 2. 样式属性
    // - padding：内边距
    // - primary：是否为主滚动视图
    // - physics：滚动物理
    // - shrinkWrap：是否收缩包装
    
    // 3. 行为属性
    // - reverse：是否反转
    // - controller：滚动控制器
    // - cacheExtent：缓存范围
    // - semanticChildCount：语义子项数量
    
    // 4. 示例
    GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        childAspectRatio: 1.5,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Card(
          child: Text(items[index]),
        );
      },
      padding: EdgeInsets.all(16),
      primary: false,
      physics: AlwaysScrollableScrollPhysics(),
      shrinkWrap: false,
      reverse: false,
      controller: _scrollController,
      cacheExtent: 200,
    )
    ''');
  }
}
```

### 2. GridView 最佳实践

```dart
// GridView 最佳实践
class GridViewBestPractices {
  void explain() {
    print('''
    GridView 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多列
    // - 使用适当的边距
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
    GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
      ),
      itemCount: items.length,
      itemBuilder: (context, index) {
        return Card(
          child: Text(items[index]),
        );
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：GridView 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **滚动性能**：优化滚动性能
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[ListView]]
- [[Card]]
- [[Scaffold]]
- [[AppBar]]

---

> GridView 是应用的重要组成部分，掌握 GridView 可以提升用户体验。