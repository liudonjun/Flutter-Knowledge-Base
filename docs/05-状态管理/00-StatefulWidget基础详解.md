# StatefulWidget 基础详解

> 深入理解 Flutter 中的 StatefulWidget。

## 📖 StatefulWidget 基础

### 1. 什么是 StatefulWidget

```dart
// StatefulWidget 概念
class StatefulWidgetBasicsConcept {
  void explain() {
    print('''
    StatefulWidget 概念：
    
    // 1. 什么是 StatefulWidget
    // - 有状态的 Widget
    // - 可以在生命周期内改变状态
    // - 通过 State 对象管理状态
    // - 状态改变时会触发重建
    
    // 2. StatefulWidget 的特点
    // - 有状态：可以在运行时改变
    // - 生命周期：有完整的生命周期
    // - 状态管理：通过 State 对象管理
    // - 重建机制：状态改变时会重建
    
    // 3. StatefulWidget 的使用场景
    // - 用户交互：按钮点击、输入框
    // - 动画效果：状态驱动的动画
    // - 数据变化：网络数据、本地数据
    // - 界面切换：页面切换、Tab 切换
    ''');
  }
}
```

### 2. StatefulWidget 实现

```dart
// StatefulWidget 实现
class StatefulWidgetBasicsImplementation {
  void explain() {
    print('''
    StatefulWidget 实现：
    
    // 1. 创建 StatefulWidget
    class MyWidget extends StatefulWidget {
      const MyWidget({Key? key}) : super(key: key);
      
      @override
      _MyWidgetState createState() => _MyWidgetState();
    }
    
    // 2. 创建 State
    class _MyWidgetState extends State<MyWidget> {
      int _count = 0;
      
      @override
      void initState() {
        super.initState();
        // 初始化状态
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
    ''');
  }
}
```

## 🔗 相关链接

- [[setState详解]]
- [[生命周期]]
- [[StatelessWidget]]
- [[状态管理基础]]

---

> StatefulWidget 是 Flutter 状态管理的基础，掌握它对于理解状态管理非常重要。