# Provider 类型详解

> 深入理解 Flutter 中的 Provider 类型。

## 📖 Provider 类型基础

### 1. Provider 类型

```dart
// Provider 类型
class ProviderTypes {
  void explain() {
    print('''
    Provider 类型：
    
    // 1. Provider
    // - 基本提供者
    // - 提供不变的值
    // - 适用于配置
    
    // 2. ChangeNotifierProvider
    // - 监听变化
    // - 适用于状态管理
    // - 自动重建
    
    // 3. FutureProvider
    // - 异步数据
    // - 适用于网络请求
    // - 自动处理状态
    
    // 4. StreamProvider
    // - 流数据
    // - 适用于实时数据
    // - 自动监听
    
    // 5. MultiProvider
    // - 多个提供者
    // - 适用于复杂应用
    // - 组织提供者
    ''');
  }
}
```

### 2. Provider 类型实现

```dart
// Provider 类型实现
class ProviderTypesImplementation {
  void explain() {
    print('''
    Provider 类型实现：
    
    // 1. Provider
    Provider<String>(
      create: (context) => 'Hello',
      child: MyApp(),
    )
    
    // 2. ChangeNotifierProvider
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    )
    
    // 3. FutureProvider
    FutureProvider<int>(
      create: (context) => fetchData(),
      initialData: 0,
      child: MyApp(),
    )
    
    // 4. StreamProvider
    StreamProvider<int>(
      create: (context) => counterStream(),
      initialData: 0,
      child: MyApp(),
    )
    
    // 5. MultiProvider
    MultiProvider(
      providers: [
        Provider<String>(create: (context) => 'Hello'),
        ChangeNotifierProvider(create: (context) => Counter()),
      ],
      child: MyApp(),
    )
    ''');
  }
}
```

## 🔗 相关链接

- [[Provider基础]]
- [[ChangeNotifier]]
- [[FutureProvider]]
- [[StreamProvider]]

---

> Provider 类型是 Provider 状态管理的重要组成部分，掌握它对于选择合适的 Provider 非常重要。