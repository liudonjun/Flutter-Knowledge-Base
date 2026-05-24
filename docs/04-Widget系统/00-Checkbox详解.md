# Checkbox 详解

> 深入理解 Flutter Checkbox Widget。

## 📖 Checkbox 概念

### 1. 什么是 Checkbox

```dart
// Checkbox 概念
class CheckboxConcept {
  void explain() {
    print('''
    Checkbox 概念：
    
    // 1. 什么是 Checkbox
    // - 复选框 Widget
    // - 用于选择/取消选择
    // - 支持多种样式
    // - 支持验证
    
    // 2. Checkbox 的特点
    // - 支持选择/取消选择
    // - 支持样式设置
    // - 支持验证
    // - 支持禁用状态
    
    // 3. Checkbox 的使用场景
    // - 表单选择
    // - 设置选项
    // - 列表选择
    // - 多选操作
    
    // 4. Checkbox 的属性
    // - value：当前值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    // - checkColor：勾选颜色
    ''');
  }
}
```

### 2. Checkbox 示例

```dart
// Checkbox 示例
class CheckboxExample {
  void explain() {
    print('''
    Checkbox 示例：
    
    // 1. 基本 Checkbox
    Checkbox(
      value: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value!;
        });
      },
    )
    
    // 2. 带标签的 Checkbox
    Row(
      children: [
        Checkbox(
          value: _isChecked,
          onChanged: (value) {
            setState(() {
              _isChecked = value!;
            });
          },
        ),
        Text('I agree to the terms'),
      ],
    )
    
    // 3. 带颜色的 Checkbox
    Checkbox(
      value: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value!;
        });
      },
      activeColor: Colors.blue,
      checkColor: Colors.white,
    )
    
    // 4. 禁用的 Checkbox
    Checkbox(
      value: _isChecked,
      onChanged: null, // 设置为 null 禁用
    )
    ''');
  }
}
```

## 🔧 Checkbox 实现

### 1. Checkbox 属性

```dart
// Checkbox 属性
class CheckboxProperties {
  void explain() {
    print('''
    Checkbox 属性：
    
    // 1. 主要属性
    // - value：当前值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    // - checkColor：勾选颜色
    
    // 2. 样式属性
    // - focusColor：焦点颜色
    // - hoverColor：悬停颜色
    // - overlayColor：覆盖颜色
    // - splashRadius：飞溅半径
    
    // 3. 行为属性
    // - tristate：是否三态
    // - materialTapTargetSize：材质点击目标大小
    // - visualDensity：视觉密度
    // - focusNode：焦点节点
    
    // 4. 示例
    Checkbox(
      value: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value!;
        });
      },
      activeColor: Colors.blue,
      checkColor: Colors.white,
      focusColor: Colors.blue[100],
      hoverColor: Colors.blue[50],
      overlayColor: MaterialStateProperty.all(Colors.blue[50]),
      splashRadius: 20,
      tristate: false,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      focusNode: _focusNode,
    )
    ''');
  }
}
```

### 2. Checkbox 最佳实践

```dart
// Checkbox 最佳实践
class CheckboxBestPractices {
  void explain() {
    print('''
    Checkbox 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多复选框
    // - 使用适当的标签
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的反馈
    // - 提供验证
    
    // 5. 示例
    Checkbox(
      value: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value!;
        });
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Checkbox 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **输入验证**：提供输入验证
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Radio]]
- [[Switch]]
- [[TextField]]
- [[Form]]

---

> Checkbox 是应用的重要组成部分，掌握 Checkbox 可以提升用户体验。