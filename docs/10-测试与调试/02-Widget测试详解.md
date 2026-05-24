# Widget 测试详解

> 掌握 Flutter Widget 测试的编写方法。

## 📖 Widget 测试基础

### 1. 基本测试

```dart
// Widget 测试基础
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

class WidgetTestBasics {
  void explain() {
    print('''
    Widget 测试基础：
    
    void main() {
      testWidgets('显示文本', (WidgetTester tester) async {
        // 构建 Widget
        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(
              body: Text('Hello, Flutter!'),
            ),
          ),
        );
        
        // 验证文本显示
        expect(find.text('Hello, Flutter!'), findsOneWidget);
      });
      
      testWidgets('点击按钮', (WidgetTester tester) async {
        int counter = 0;
        
        await tester.pumpWidget(
          MaterialApp(
            home: Scaffold(
              body: ElevatedButton(
                onPressed: () => counter++,
                child: Text('点击'),
              ),
            ),
          ),
        );
        
        // 点击按钮
        await tester.tap(find.byType(ElevatedButton));
        await tester.pump();
        
        // 验证计数
        expect(counter, equals(1));
      });
    }
    ''');
  }
}
```

### 2. 查找器

```dart
// 查找器
class Finders {
  void explain() {
    print('''
    查找器（Finder）：
    
    // 按文本查找
    find.text('Hello')
    find.textContaining('ell')
    
    // 按类型查找
    find.byType(ElevatedButton)
    find.byType(TextField)
    find.byType(ListView)
    
    // 按 Key 查找
    find.byKey(Key('my_key'))
    
    // 按图标查找
    find.byIcon(Icons.add)
    
    // 按 Widget 查找
    find.byWidget(myWidget)
    
    // 组合查找
    find.descendant(
      of: find.byType(Row),
      matching: find.byType(Text),
    )
    
    find.ancestor(
      of: find.text('Hello'),
      matching: find.byType(Scaffold),
    )
    
    // 验证数量
    expect(find.text('Hello'), findsOneWidget);
    expect(find.byType(Text), findsNWidgets(3));
    expect(find.text('Not Found'), findsNothing);
    expect(find.byType(ListTile), findsWidgets);
    ''');
  }
}
```

### 3. 交互测试

```dart
// 交互测试
class InteractionTest {
  void explain() {
    print('''
    交互测试：
    
    testWidgets('输入文本', (WidgetTester tester) async {
      final controller = TextEditingController();
      
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: TextField(controller: controller),
          ),
        ),
      );
      
      // 输入文本
      await tester.enterText(find.byType(TextField), 'Hello');
      await tester.pump();
      
      // 验证输入
      expect(controller.text, equals('Hello'));
      expect(find.text('Hello'), findsOneWidget);
    });
    
    testWidgets('滚动列表', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: ListView.builder(
              itemCount: 100,
              itemBuilder: (context, index) => Text('Item $index'),
            ),
          ),
        ),
      );
      
      // 验证初始状态
      expect(find.text('Item 0'), findsOneWidget);
      expect(find.text('Item 50'), findsNothing);
      
      // 滚动列表
      await tester.scroll(find.byType(ListView), Offset(0, -500));
      await tester.pump();
      
      // 验证滚动后状态
      expect(find.text('Item 50'), findsOneWidget);
    });
    
    testWidgets('长按', (WidgetTester tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: GestureDetector(
              onLongPress: () {},
              child: Text('长按我'),
            ),
          ),
        ),
      );
      
      await tester.longPress(find.text('长按我'));
      await tester.pump();
    });
    ''');
  }
}
```

## 📖 Mock 测试

### 1. Mock 依赖

```dart
// Mock 测试
import 'package:mockito/mockito.dart';
import 'package:mockito/annotations.dart';

class MockTest {
  void explain() {
    print('''
    Mock 测试：
    
    // 生成 Mock 类
    @GenerateMocks([UserRepository])
    void main() {}
    
    // 运行生成
    // flutter pub run build_runner build
    
    void main() {
      late MockUserRepository mockRepository;
      
      setUp(() {
        mockRepository = MockUserRepository();
      });
      
      testWidgets('显示用户信息', (WidgetTester tester) async {
        // 设置 Mock 行为
        when(mockRepository.getUser(1))
            .thenAnswer((_) async => User(name: 'Alice', age: 25));
        
        await tester.pumpWidget(
          MaterialApp(
            home: UserPage(repository: mockRepository),
          ),
        );
        
        await tester.pump();
        
        // 验证显示
        expect(find.text('Alice'), findsOneWidget);
        
        // 验证调用
        verify(mockRepository.getUser(1)).called(1);
      });
      
      testWidgets('处理错误', (WidgetTester tester) async {
        // 设置 Mock 抛出异常
        when(mockRepository.getUser(1))
            .thenThrow(Exception('Not found'));
        
        await tester.pumpWidget(
          MaterialApp(
            home: UserPage(repository: mockRepository),
          ),
        );
        
        await tester.pump();
        
        // 验证错误处理
        expect(find.text('加载失败'), findsOneWidget);
      });
    }
    ''');
  }
}
```

---

> Widget 测试是验证 UI 行为的重要手段，掌握它能让你的界面更加可靠。