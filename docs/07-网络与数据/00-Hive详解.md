# Hive 详解

> 深入理解 Flutter 中的 Hive 数据库。

## 📖 Hive 基础

### 1. 什么是 Hive

```dart
// Hive 概念
class HiveConcept {
  void explain() {
    print('''
    Hive 概念：
    
    // 1. 什么是 Hive
    // - Flutter 的轻量级数据库
    // - 纯 Dart 实现
    // - 高性能键值存储
    // - 支持加密
    
    // 2. Hive 的特点
    // - 高性能：读写速度快
    // - 轻量级：占用资源少
    // - 跨平台：支持多平台
    // - 类型安全：编译时检查
    
    // 3. Hive 的功能
    // - 键值存储
    // - 支持复杂对象
    // - 支持加密
    // - 支持索引
    
    // 4. Hive 的使用场景
    // - 配置存储
    // - 缓存数据
    // - 用户数据
    // - 离线数据
    ''');
  }
}
```

### 2. Hive 实现

```dart
// Hive 实现
class HiveImplementation {
  void explain() {
    print('''
    Hive 实现：
    
    // 1. 安装 Hive
    // pubspec.yaml
    dependencies:
      hive: ^2.0.0
      hive_flutter: ^1.0.0
    
    dev_dependencies:
      hive_generator: ^2.0.0
      build_runner: ^2.0.0
    
    // 2. 初始化 Hive
    await Hive.initFlutter();
    
    // 3. 定义数据模型
    @HiveType(typeId: 0)
    class User extends HiveObject {
      @HiveField(0)
      final String name;
      
      @HiveField(1)
      final int age;
      
      User({required this.name, required this.age});
    }
    
    // 4. 注册适配器
    Hive.registerAdapter(UserAdapter());
    
    // 5. 使用 Hive
    final box = await Hive.openBox<User>('users');
    
    // 存储数据
    await box.add(User(name: 'John', age: 30));
    
    // 读取数据
    final user = box.get(0);
    
    // 查询数据
    final users = box.values.where((u) => u.age > 25).toList();
    
    // 6. Hive 最佳实践
    // - 适配器生成
    // - 数据加密
    // - 索引使用
    // - 存储管理
    ''');
  }
}
```

## 🔗 相关链接

- [[SQLite详解]]
- [[本地存储详解]]
- [[数据加密]]
- [[离线缓存]]

---

> Hive 是 Flutter 中高性能的本地数据库，掌握它对于构建离线应用非常有帮助。