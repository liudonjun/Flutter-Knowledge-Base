# 测试与调试技巧

> 测试与调试是保证应用质量的关键，掌握 Flutter 测试与调试技术能提高开发效率。

## 🧪 测试策略

### 1. 测试金字塔
```dart
// 单元测试：测试单个函数或类
test('should add two numbers', () {
  expect(add(2, 3), 5);
});

// Widget 测试：测试单个 Widget
testWidgets('should display text', (WidgetTester tester) async {
  await tester.pumpWidget(MyWidget());
  expect(find.text('Hello'), findsOneWidget);
});

// 集成测试：测试完整应用流程
testWidgets('should navigate to detail page', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  await tester.tap(find.text('详情'));
  await tester.pumpAndSettle();
  expect(find.text('详情页面'), findsOneWidget);
});
```

### 2. 测试类型
```dart
// 功能测试
test('should calculate total price', () {
  final cart = ShoppingCart();
  cart.addItem(Item(name: 'Apple', price: 1.0));
  cart.addItem(Item(name: 'Banana', price: 0.5));
  expect(cart.totalPrice, 1.5);
});

// 性能测试
test('should process 1000 items in under 100ms', () {
  final stopwatch = Stopwatch()..start();
  processItems(List.generate(1000, (i) => i));
  stopwatch.stop();
  expect(stopwatch.elapsedMilliseconds, lessThan(100));
});

// 安全测试
test('should sanitize user input', () {
  final input = '<script>alert("xss")</script>';
  final sanitized = sanitizeInput(input);
  expect(sanitized, '&lt;script&gt;alert("xss")&lt;/script&gt;');
});
```

## 🔍 调试工具

### 1. IDE 调试
```dart
// 设置断点
void myFunction() {
  int x = 10; // 在这里设置断点
  int y = 20;
  int z = x + y;
  print(z);
}

// 条件断点
void myFunction() {
  for (int i = 0; i < 100; i++) {
    if (i == 50) { // 在这里设置条件断点
      print('i = $i');
    }
  }
}

// 监视变量
void myFunction() {
  int x = 10;
  int y = 20;
  // 在 IDE 中监视 x 和 y
  int z = x + y;
  print(z);
}
```

### 2. Flutter 工具
```dart
// 使用 Flutter Inspector
void debugWidget() {
  // 打开 Flutter Inspector
  // 查看 Widget 树
  // 检查布局约束
  // 分析性能问题
}

// 使用 DevTools
void debugPerformance() {
  // 打开 DevTools
  // 查看性能面板
  // 分析内存使用
  // 检查网络请求
}
```

### 3. 日志调试
```dart
// 使用 debugPrint
debugPrint('调试信息: $variable');

// 使用 log
import 'dart:developer';
log('日志信息', name: 'my_app');

// 使用 Logger
import 'package:logger/logger.dart';
final logger = Logger();
logger.d('调试信息');
logger.i('信息');
logger.w('警告');
logger.e('错误');
```

## 📝 测试编写

### 1. 单元测试
```dart
// 测试类
class Calculator {
  int add(int a, int b) => a + b;
  int subtract(int a, int b) => a - b;
  int multiply(int a, int b) => a * b;
  double divide(int a, int b) => a / b;
}

// 单元测试
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/calculator.dart';

void main() {
  group('Calculator', () {
    late Calculator calculator;
    
    setUp(() {
      calculator = Calculator();
    });
    
    test('should add two numbers', () {
      expect(calculator.add(2, 3), 5);
    });
    
    test('should subtract two numbers', () {
      expect(calculator.subtract(5, 3), 2);
    });
    
    test('should multiply two numbers', () {
      expect(calculator.multiply(2, 3), 6);
    });
    
    test('should divide two numbers', () {
      expect(calculator.divide(6, 3), 2.0);
    });
    
    test('should throw error when dividing by zero', () {
      expect(() => calculator.divide(6, 0), throwsArgumentError);
    });
  });
}
```

### 2. Widget 测试
```dart
// 测试 Widget
class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _count = 0;
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: $_count'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _count++;
            });
          },
          child: Text('Increment'),
        ),
      ],
    );
  }
}

// Widget 测试
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/counter_widget.dart';

void main() {
  testWidgets('should display initial count', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: CounterWidget()));
    expect(find.text('Count: 0'), findsOneWidget);
  });
  
  testWidgets('should increment count when button pressed', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: CounterWidget()));
    
    // 点击按钮
    await tester.tap(find.text('Increment'));
    await tester.pump();
    
    // 验证计数增加
    expect(find.text('Count: 1'), findsOneWidget);
  });
  
  testWidgets('should increment multiple times', (WidgetTester tester) async {
    await tester.pumpWidget(MaterialApp(home: CounterWidget()));
    
    // 多次点击
    for (int i = 0; i < 5; i++) {
      await tester.tap(find.text('Increment'));
      await tester.pump();
    }
    
    // 验证计数
    expect(find.text('Count: 5'), findsOneWidget);
  });
}
```

### 3. 集成测试
```dart
// 集成测试
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:my_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('end-to-end test', () {
    testWidgets('should complete full user flow', (WidgetTester tester) async {
      app.main();
      await tester.pumpAndSettle();
      
      // 登录
      await tester.enterText(find.byKey(Key('email')), 'test@example.com');
      await tester.enterText(find.byKey(Key('password')), 'password123');
      await tester.tap(find.text('登录'));
      await tester.pumpAndSettle();
      
      // 验证登录成功
      expect(find.text('欢迎'), findsOneWidget);
      
      // 导航到个人中心
      await tester.tap(find.text('个人中心'));
      await tester.pumpAndSettle();
      
      // 验证个人中心页面
      expect(find.text('个人资料'), findsOneWidget);
      
      // 退出登录
      await tester.tap(find.text('退出登录'));
      await tester.pumpAndSettle();
      
      // 验证返回登录页面
      expect(find.text('登录'), findsOneWidget);
    });
  });
}
```

## 🛠️ 调试技巧

### 1. 常见问题调试
```dart
// 布局溢出调试
class OverflowDebugExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100,
      child: Text(
        '这是一段很长的文本，可能会导致布局溢出',
        overflow: TextOverflow.ellipsis,
        maxLines: 1,
      ),
    );
  }
}

// 状态调试
class StateDebugExample extends StatefulWidget {
  @override
  _StateDebugExampleState createState() => _StateDebugExampleState();
}

class _StateDebugExampleState extends State<StateDebugExample> {
  int _count = 0;
  
  @override
  Widget build(BuildContext context) {
    debugPrint('当前计数: $_count');
    return Column(
      children: [
        Text('计数: $_count'),
        ElevatedButton(
          onPressed: () {
            setState(() {
              _count++;
              debugPrint('计数增加到: $_count');
            });
          },
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

### 2. 性能调试
```dart
// 性能调试
class PerformanceDebugExample extends StatefulWidget {
  @override
  _PerformanceDebugExampleState createState() => _PerformanceDebugExampleState();
}

class _PerformanceDebugExampleState extends State<PerformanceDebugExample> {
  final Stopwatch _stopwatch = Stopwatch();
  
  void _measurePerformance() {
    _stopwatch.start();
    
    // 执行耗时操作
    for (int i = 0; i < 1000000; i++) {
      // 模拟计算
    }
    
    _stopwatch.stop();
    debugPrint('操作耗时: ${_stopwatch.elapsedMilliseconds} ms');
    _stopwatch.reset();
  }
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _measurePerformance,
      child: Text('测量性能'),
    );
  }
}
```

## 🔄 持续集成

### 1. GitHub Actions 配置
```yaml
# .github/workflows/flutter.yml
name: Flutter CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Flutter
      uses: subosito/flutter-action@v2
      with:
        flutter-version: '3.0.0'
    
    - name: Install dependencies
      run: flutter pub get
    
    - name: Analyze code
      run: flutter analyze
    
    - name: Run tests
      run: flutter test
    
    - name: Build APK
      run: flutter build apk --debug
```

### 2. 代码质量检查
```dart
// 分析代码
// 运行 flutter analyze

// 格式化代码
// 运行 dart format .

// 检查依赖
// 运行 flutter pub outdated

// 运行测试
// 运行 flutter test
```

## 📊 测试覆盖率

### 1. 生成测试报告
```bash
# 生成测试覆盖率报告
flutter test --coverage

# 生成 HTML 报告
genhtml coverage/lcov.info -o coverage/html

# 打开报告
open coverage/html/index.html
```

### 2. 测试覆盖率分析
```dart
// 查看测试覆盖率
// 1. 运行测试生成覆盖率数据
// 2. 使用 lcov 生成 HTML 报告
// 3. 分析未覆盖的代码
// 4. 添加测试覆盖关键路径
```

## 🚀 最佳实践

### 1. 测试策略
```dart
class TestingStrategy {
  static List<String> get recommendations => [
    '✅ 编写单元测试覆盖业务逻辑',
    '✅ 编写 Widget 测试覆盖 UI',
    '✅ 编写集成测试覆盖关键流程',
    '✅ 使用测试驱动开发 (TDD)',
    '✅ 保持测试覆盖率 > 80%',
    '✅ 定期运行测试套件',
    '✅ 使用 Mock 对象隔离测试',
    '✅ 测试边界条件和错误情况',
  ];
}
```

### 2. 调试策略
```dart
class DebuggingStrategy {
  static List<String> get recommendations => [
    '✅ 使用 Flutter Inspector 分析布局',
    '✅ 使用 DevTools 分析性能',
    '✅ 设置断点调试复杂逻辑',
    '✅ 使用日志记录关键信息',
    '✅ 分析内存使用情况',
    '✅ 检查网络请求和响应',
    '✅ 监控应用崩溃和错误',
    '✅ 使用错误边界捕获异常',
  ];
}
```

## 📚 学习资源

- [Flutter 测试官方文档](https://flutter.dev/docs/testing)
- [DevTools 官方文档](https://flutter.dev/docs/development/tools/devtools)
- [测试最佳实践](https://flutter.dev/docs/testing/best-practices)
- [调试技巧](https://flutter.dev/docs/testing/debugging)

## 🔗 相关链接

- [Widget 系统](/guide/widgets) - Widget 系统
- [状态管理](/guide/state-management) - 状态管理
- [导航与路由](/guide/navigation) - 导航与路由
- [架构概览](/core/architecture) - Flutter 架构

---
*最后更新: 2026年5月23日*