# CupertinoPicker 详解

> 深入理解 Flutter CupertinoPicker Widget。

## 📖 CupertinoPicker 概念

### 1. 什么是 CupertinoPicker

```dart
// CupertinoPicker 概念
class CupertinoPickerConcept {
  void explain() {
    print('''
    CupertinoPicker 概念：
    
    // 1. 什么是 CupertinoPicker
    // - iOS 风格选择器 Widget
    // - 用于选择项目
    // - 支持多种样式
    // - 支持多种数据
    
    // 2. CupertinoPicker 的特点
    // - iOS 风格设计
    // - 支持滚动选择
    // - 支持多种数据
    // - 支持多种样式
    
    // 3. CupertinoPicker 的使用场景
    // - iOS 风格应用
    // - 数据选择
    // - 日期选择
    // - 选项选择
    
    // 4. CupertinoPicker 的属性
    // - itemExtent：项目高度
    // - onSelectedItemChanged：选中项改变回调
    // - children：子 Widget 列表
    // - scrollController：滚动控制器
    ''');
  }
}
```

### 2. CupertinoPicker 示例

```dart
// CupertinoPicker 示例
class CupertinoPickerExample {
  void explain() {
    print('''
    CupertinoPicker 示例：
    
    // 1. 基本 CupertinoPicker
    CupertinoPicker(
      itemExtent: 32,
      onSelectedItemChanged: (index) {
        setState(() {
          _selectedItem = index;
        });
      },
      children: [
        Text('Item 1'),
        Text('Item 2'),
        Text('Item 3'),
      ],
    )
    
    // 2. 带滚动控制器的 CupertinoPicker
    CupertinoPicker(
      itemExtent: 32,
      onSelectedItemChanged: (index) {
        setState(() {
          _selectedItem = index;
        });
      },
      children: [
        Text('Item 1'),
        Text('Item 2'),
        Text('Item 3'),
      ],
      scrollController: FixedExtentScrollController(
        initialItem: _selectedItem,
      ),
    )
    
    // 3. 带样式的 CupertinoPicker
    CupertinoPicker(
      itemExtent: 32,
      onSelectedItemChanged: (index) {
        setState(() {
          _selectedItem = index;
        });
      },
      children: [
        Text('Item 1'),
        Text('Item 2'),
        Text('Item 3'),
      ],
      backgroundColor: Colors.white,
      diameterRatio: 1.5,
      magnification: 1.2,
      useMagnifier: true,
    )
    ''');
  }
}
```

## 🔧 CupertinoPicker 实现

### 1. CupertinoPicker 属性

```dart
// CupertinoPicker 属性
class CupertinoPickerProperties {
  void explain() {
    print('''
    CupertinoPicker 属性：
    
    // 1. 主要属性
    // - itemExtent：项目高度
    // - onSelectedItemChanged：选中项改变回调
    // - children：子 Widget 列表
    // - scrollController：滚动控制器
    
    // 2. 样式属性
    // - backgroundColor：背景颜色
    // - diameterRatio：直径比例
    // - magnification：放大倍数
    // - useMagnifier：是否使用放大镜
    
    // 3. 示例
    CupertinoPicker(
      itemExtent: 32,
      onSelectedItemChanged: (index) {
        setState(() {
          _selectedItem = index;
        });
      },
      children: [
        Text('Item 1'),
        Text('Item 2'),
        Text('Item 3'),
      ],
      scrollController: FixedExtentScrollController(
        initialItem: _selectedItem,
      ),
      backgroundColor: Colors.white,
      diameterRatio: 1.5,
      magnification: 1.2,
      useMagnifier: true,
    )
    ''');
  }
}
```

### 2. CupertinoPicker 最佳实践

```dart
// CupertinoPicker 最佳实践
class CupertinoPickerBestPractices {
  void explain() {
    print('''
    CupertinoPicker 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多项目
    // - 使用适当的项目高度
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
    CupertinoPicker(
      itemExtent: 32,
      onSelectedItemChanged: (index) {
        setState(() {
          _selectedItem = index;
        });
      },
      children: const [
        Text('Item 1'),
        Text('Item 2'),
        Text('Item 3'),
      ],
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：CupertinoPicker 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **iOS 风格**：遵循 iOS 设计规范
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[CupertinoNavigationBar]]
- [[CupertinoTabBar]]
- [[CupertinoPageRoute]]
- [[CupertinoButton]]

---

> CupertinoPicker 是 iOS 风格应用的重要组成部分，掌握 CupertinoPicker 可以提升用户体验。