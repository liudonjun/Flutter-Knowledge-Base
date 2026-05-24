# Radio 详解

> 深入理解 Flutter Radio Widget。

## 📖 Radio 概念

### 1. 什么是 Radio

```dart
// Radio 概念
class RadioConcept {
  void explain() {
    print('''
    Radio 概念：
    
    // 1. 什么是 Radio
    // - 单选按钮 Widget
    // - 用于单选操作
    // - 支持多种样式
    // - 支持验证
    
    // 2. Radio 的特点
    // - 支持单选操作
    // - 支持样式设置
    // - 支持验证
    // - 支持禁用状态
    
    // 3. Radio 的使用场景
    // - 表单选择
    // - 设置选项
    // - 列表选择
    // - 单选操作
    
    // 4. Radio 的属性
    // - value：当前值
    // - groupValue：组值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    ''');
  }
}
```

### 2. Radio 示例

```dart
// Radio 示例
class RadioExample {
  void explain() {
    print('''
    Radio 示例：
    
    // 1. 基本 Radio
    Radio<int>(
      value: 1,
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value!;
        });
      },
    )
    
    // 2. 带标签的 Radio
    Row(
      children: [
        Radio<int>(
          value: 1,
          groupValue: _selectedValue,
          onChanged: (value) {
            setState(() {
              _selectedValue = value!;
            });
          },
        ),
        Text('Option 1'),
      ],
    )
    
    // 3. 带颜色的 Radio
    Radio<int>(
      value: 1,
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value!;
        });
      },
      activeColor: Colors.blue,
    )
    
    // 4. 禁用的 Radio
    Radio<int>(
      value: 1,
      groupValue: _selectedValue,
      onChanged: null, // 设置为 null 禁用
    )
    ''');
  }
}
```

## 🔧 Radio 实现

### 1. Radio 属性

```dart
// Radio 属性
class RadioProperties {
  void explain() {
    print('''
    Radio 属性：
    
    // 1. 主要属性
    // - value：当前值
    // - groupValue：组值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    
    // 2. 样式属性
    // - focusColor：焦点颜色
    // - hoverColor：悬停颜色
    // - overlayColor：覆盖颜色
    // - splashRadius：飞溅半径
    
    // 3. 行为属性
    // - materialTapTargetSize：材质点击目标大小
    // - visualDensity：视觉密度
    // - focusNode：焦点节点
    // - autofocus：自动焦点
    
    // 4. 示例
    Radio<int>(
      value: 1,
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value!;
        });
      },
      activeColor: Colors.blue,
      focusColor: Colors.blue[100],
      hoverColor: Colors.blue[50],
      overlayColor: MaterialStateProperty.all(Colors.blue[50]),
      splashRadius: 20,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      visualDensity: VisualDensity.standard,
      focusNode: _focusNode,
      autofocus: false,
    )
    ''');
  }
}
```

### 2. Radio 最佳实践

```dart
// Radio 最佳实践
class RadioBestPractices {
  void explain() {
    print('''
    Radio 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多单选按钮
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
    Radio<int>(
      value: 1,
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value!;
        });
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Radio 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **输入验证**：提供输入验证
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Checkbox]]
- [[Switch]]
- [[TextField]]
- [[Form]]

---

> Radio 是应用的重要组成部分，掌握 Radio 可以提升用户体验。