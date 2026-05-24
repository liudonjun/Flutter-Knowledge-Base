# Switch 详解

> 深入理解 Flutter Switch Widget。

## 📖 Switch 概念

### 1. 什么是 Switch

```dart
// Switch 概念
class SwitchConcept {
  void explain() {
    print('''
    Switch 概念：
    
    // 1. 什么是 Switch
    // - 开关 Widget
    // - 用于开/关操作
    // - 支持多种样式
    // - 支持验证
    
    // 2. Switch 的特点
    // - 支持开/关操作
    // - 支持样式设置
    // - 支持验证
    // - 支持禁用状态
    
    // 3. Switch 的使用场景
    // - 设置开关
    // - 功能开关
    // - 状态切换
    // - 布尔值操作
    
    // 4. Switch 的属性
    // - value：当前值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    // - activeTrackColor：选中轨道颜色
    ''');
  }
}
```

### 2. Switch 示例

```dart
// Switch 示例
class SwitchExample {
  void explain() {
    print('''
    Switch 示例：
    
    // 1. 基本 Switch
    Switch(
      value: _isOn,
      onChanged: (value) {
        setState(() {
          _isOn = value;
        });
      },
    )
    
    // 2. 带标签的 Switch
    Row(
      children: [
        Switch(
          value: _isOn,
          onChanged: (value) {
            setState(() {
              _isOn = value;
            });
          },
        ),
        Text('Enable feature'),
      ],
    )
    
    // 3. 带颜色的 Switch
    Switch(
      value: _isOn,
      onChanged: (value) {
        setState(() {
          _isOn = value;
        });
      },
      activeColor: Colors.blue,
      activeTrackColor: Colors.blue[200],
      inactiveThumbColor: Colors.grey,
      inactiveTrackColor: Colors.grey[300],
    )
    
    // 4. 禁用的 Switch
    Switch(
      value: _isOn,
      onChanged: null, // 设置为 null 禁用
    )
    ''');
  }
}
```

## 🔧 Switch 实现

### 1. Switch 属性

```dart
// Switch 属性
class SwitchProperties {
  void explain() {
    print('''
    Switch 属性：
    
    // 1. 主要属性
    // - value：当前值
    // - onChanged：改变回调
    // - activeColor：选中颜色
    // - activeTrackColor：选中轨道颜色
    
    // 2. 样式属性
    // - inactiveThumbColor：未选中拇指颜色
    // - inactiveTrackColor：未选中轨道颜色
    // - thumbColor：拇指颜色
    // - trackColor：轨道颜色
    
    // 3. 行为属性
    // - materialTapTargetSize：材质点击目标大小
    // - dragStartBehavior：拖拽开始行为
    // - focusColor：焦点颜色
    // - hoverColor：悬停颜色
    
    // 4. 示例
    Switch(
      value: _isOn,
      onChanged: (value) {
        setState(() {
          _isOn = value;
        });
      },
      activeColor: Colors.blue,
      activeTrackColor: Colors.blue[200],
      inactiveThumbColor: Colors.grey,
      inactiveTrackColor: Colors.grey[300],
      materialTapTargetSize: MaterialTapTargetSize.padded,
      dragStartBehavior: DragStartBehavior.start,
      focusColor: Colors.blue[100],
      hoverColor: Colors.blue[50],
    )
    ''');
  }
}
```

### 2. Switch 最佳实践

```dart
// Switch 最佳实践
class SwitchBestPractices {
  void explain() {
    print('''
    Switch 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多开关
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
    Switch(
      value: _isOn,
      onChanged: (value) {
        setState(() {
          _isOn = value;
        });
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Switch 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **输入验证**：提供输入验证
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[Checkbox]]
- [[Radio]]
- [[TextField]]
- [[Form]]

---

> Switch 是应用的重要组成部分，掌握 Switch 可以提升用户体验。