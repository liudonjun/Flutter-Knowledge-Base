# Mock 对象详解

> 深入理解 Flutter 中的 Mock 对象。

## 📖 Mock 对象基础

### 1. 什么是 Mock 对象

```dart
// Mock 对象概念
class MockObjectsConcept {
  void explain() {
    print('''
    Mock 对象概念：
    
    // 1. 什么是 Mock 对象
    // - 模拟真实对象
    // - 用于测试
    // - 隔离测试环境
    // - 控制测试行为
    
    // 2. Mock 对象的特点
    // - 模拟：模拟真实对象
    // - 隔离：隔离测试环境
    // - 控制：控制测试行为
    // - 验证：验证调用
    
    // 3. Mock 对象的类型
    // - Mock：完全模拟
    // - Stub：桩对象
    // - Spy：间谍对象
    // - Fake：假对象
    
    // 4. Mock 对象的使用场景
    // - 单元测试
    // - 依赖隔离
    // - 行为验证
    // - 边界测试
    ''');
  }
}
```

### 2. Mock 对象实现

```dart
// Mock 对象实现
class MockObjectsImplementation {
  void explain() {
    print('''
    Mock 对象实现：
    
    // 1. 使用 mockito
    // pubspec.yaml
    dev_dependencies:
      mockito: ^5.0.0
      build_runner: ^2.0.0
    
    // 2. 创建 Mock 类
    import 'package:mockito/mockito.dart';
    import 'package:mockito/annotations.dart';
    
    @GenerateMocks([ApiService])
    import 'mocks.mocks.dart';
    
    class MockApiService extends Mock implements ApiService {}
    
    // 3. 使用 Mock 对象
    test('fetches data', () async {
      final mockApi = MockApiService();
      
      // 设置 Mock 行为
      when(mockApi.fetchData()).thenAnswer((_) async => 'mock data');
      
      // 调用方法
      final result = await mockApi.fetchData();
      
      // 验证调用
      verify(mockApi.fetchData()).called(1);
      
      expect(result, 'mock data');
    });
    
    // 4. Mock 对象最佳实践
    // - 保持 Mock 简单
    // - 验证必要调用
    // - 避免过度 Mock
    // - 测试边界情况
    ''');
  }
}
```

## 🔗 相关链接

- [[单元测试]]
- [[测试框架]]
- [[测试数据]]
- [[测试匹配器]]

---

> Mock 对象是测试中隔离依赖的重要工具，掌握它对于编写可靠的单元测试非常重要。