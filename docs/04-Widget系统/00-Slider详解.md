# Slider 详解

> 深入理解 Flutter Slider Widget。

## 📖 Slider 概念

### 1. 什么是 Slider

```dart
// Slider 概念
class SliderConcept {
  void explain() {
    print('''
    Slider 概念：
    
    // 1. 什么是 Slider
    // - 滑块 Widget
    // - 用于选择数值范围
    // - 支持多种样式
    // - 支持验证
    
    // 2. Slider 的特点
    // - 支持数值选择
    // - 支持样式设置
    // - 支持验证
    // - 支持禁用状态
    
    // 3. Slider 的使用场景
    // - 音量控制
    // - 亮度调节
    // - 数值范围选择
    // - 设置调节
    
    // 4. Slider 的属性
    // - value：当前值
    // - min：最小值
    // - max：最大值
    // - onChanged：改变回调
    ''');
  }
}
```

### 2. Slider 示例

```dart
// Slider 示例
class SliderExample {
  void explain() {
    print('''
    Slider 示例：
    
    // 1. 基本 Slider
    Slider(
      value: _value,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
    )
    
    // 2. 带范围的 Slider
    Slider(
      value: _value,
      min: 0,
      max: 100,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
    )
    
    // 3. 带颜色的 Slider
    Slider(
      value: _value,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
      activeColor: Colors.blue,
      inactiveColor: Colors.grey,
    )
    
    // 4. 带标签的 Slider
    Slider(
      value: _value,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
      label: _value.round().toString(),
      divisions: 10,
    )
    ''');
  }
}
```

## 🔧 Slider 实现

### 1. Slider 属性

```dart
// Slider 属性
class SliderProperties {
  void explain() {
    print('''
    Slider 属性：
    
    // 1. 主要属性
    // - value：当前值
    // - min：最小值
    // - max：最大值
    // - onChanged：改变回调
    
    // 2. 样式属性
    // - activeColor：选中颜色
    // - inactiveColor：未选中颜色
    // - thumbColor：拇指颜色
    // - overlayColor：覆盖颜色
    
    // 3. 行为属性
    // - divisions：分段数
    // - label：标签
    // - semanticFormatterCallback：语义格式化回调
    // - onChangeStart：开始改变回调
    
    // 4. 示例
    Slider(
      value: _value,
      min: 0,
      max: 100,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
      activeColor: Colors.blue,
      inactiveColor: Colors.grey,
      thumbColor: Colors.blue,
      overlayColor: MaterialStateProperty.all(Colors.blue[50]),
      divisions: 10,
      label: _value.round().toString(),
      semanticFormatterCallback: (value) {
        return '${value.round()}%';
      },
      onChangeStart: (value) {
        // 开始改变
      },
    )
    ''');
  }
}
```

### 2. Slider 最佳实践

```dart
// Slider 最佳实践
class SliderBestPractices {
  void explain() {
    print('''
    Slider 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多滑块
    // - 使用适当的范围
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
    Slider(
      value: _value,
      min: 0,
      max: 100,
      onChanged: (value) {
        setState(() {
          _value = value;
        });
      },
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：Slider 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **输入验证**：提供输入验证
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[RangeSlider]]
- [[TextField]]
- [[Checkbox]]
- [[Switch]]

---

> Slider 是应用的重要组成部分，掌握 Slider 可以提升用户体验。