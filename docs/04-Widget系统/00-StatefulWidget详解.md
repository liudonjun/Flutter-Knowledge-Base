# StatefulWidget 详解

> 深入理解 Flutter StatefulWidget Widget。

## 📖 StatefulWidget 概念

### 1. 什么是 StatefulWidget

```dart
// StatefulWidget 概念
class StatefulWidgetConcept {
  void explain() {
    print('''
    StatefulWidget 概念：
    
    // 1. 什么是 StatefulWidget
    // - 有状态 Widget
    // - 可变的状态
    // - 状态管理
    // - 生命周期管理
    
    // 2. StatefulWidget 的特点
    // - 有状态
    // - 可变
    // - 生命周期管理
    // - 状态管理
    
    // 3. StatefulWidget 的使用场景
    // - 表单输入
    // - 动画
    // - 用户交互
    // - 数据变化
    
    // 4. StatefulWidget 的属性
    // - createState：创建状态
    ''');
  }
}
```

### 2. StatefulWidget 示例

```dart
// StatefulWidget 示例
class StatefulWidgetExample {
  void explain() {
    print('''
    StatefulWidget 示例：
    
    // 1. 基本 StatefulWidget
    class MyWidget extends StatefulWidget {
      const MyWidget({Key? key}) : super(key: key);
      
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    
    class _MyWidgetState extends State<MyWidget> {
      int _count = 0;
      
      @override
      void initState() {
        super.initState();
        // 初始化
      }
      
      @override
      void didChangeDependencies() {
        super.didChangeDependencies();
        // 依赖改变
      }
      
      @override
      Widget build(BuildContext context) {
        return Column(
          children: [
            Text('Count: $_count'),
            ElevatedButton(
              onPressed: () => setState(() => _count++),
              child: const Text('Increment'),
            ),
          ],
        );
      }
      
      @override
      void dispose() {
        // 清理资源
        super.dispose();
      }
    }
    
    // 2. StatefulWidget 最佳实践
    // - 使用 setState() 更新状态
    // - 在 dispose() 中清理资源
    // - 避免在 build() 中执行耗时操作
    // - 使用 const 构造函数
    ''');
  }
}
```

## 🔧 StatefulWidget 实现

### 1. StatefulWidget 属性

```dart
// StatefulWidget 属性
class StatefulWidgetProperties {
  void explain() {
    print('''
    StatefulWidget 属性：
    
    // 1. 主要属性
    // - createState：创建状态
    
    // 2. 示例
    class MyWidget extends StatefulWidget {
      const MyWidget({Key? key}) : super(key: key);
      
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    ''');
  }
}
```

### 2. StatefulWidget 最佳实践

```dart
// StatefulWidget 最佳实践
class StatefulWidgetBestPractices {
  void explain() {
    print('''
    StatefulWidget 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多状态
    // - 使用适当的状态管理
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的状态管理
    // - 提供反馈
    
    // 5. 示例
    class MyWidget extends StatefulWidget {
      const MyWidget({Key? key}) : super(key: key);
      
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    
    class _MyWidgetState extends State<MyWidget> {
      @override
      Widget build(BuildContext context) {
        return Container();
      }
    }
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：StatefulWidget 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **状态管理**：合理管理状态
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[StatelessWidget]]
- [[InheritedWidget]]
- [[Provider]]
- [[BLoC]]

---

> StatefulWidget 是 Flutter 状态管理的基础，掌握 StatefulWidget 可以提升用户体验。