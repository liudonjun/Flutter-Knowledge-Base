# Isar 详解

> 深入理解 Flutter 中的 Isar 数据库。

## 📖 Isar 基础

### 1. 什么是 Isar

```dart
// Isar 概念
class IsarConcept {
  void explain() {
    print('''
    Isar 概念：
    
    // 1. 什么是 Isar
    // - Flutter 的高性能数据库
    // - 支持复杂查询
    // - 支持全文搜索
    // - 支持加密
    
    // 2. Isar 的特点
    // - 高性能：读写速度快
    // - 功能丰富：支持复杂查询
    // - 跨平台：支持多平台
    // - 易于使用：API 简洁
    
    // 3. Isar 的功能
    // - 对象存储
    // - 复杂查询
    // - 全文搜索
    // - 数据加密
    
    // 4. Isar 的使用场景
    // - 复杂数据存储
    // - 全文搜索
    // - 高性能需求
    // - 数据加密
    ''');
  }
}
```

### 2. Isar 实现

```dart
// Isar 实现
class IsarImplementation {
  void explain() {
    print('''
    Isar 实现：
    
    // 1. 安装 Isar
    // pubspec.yaml
    dependencies:
      isar: ^3.0.0
      isar_flutter_libs: ^3.0.0
    
    dev_dependencies:
      isar_generator: ^3.0.0
      build_runner: ^2.0.0
    
    // 2. 定义模型
    @collection
    class User {
      Id id = Isar.autoIncrement;
      
      late String name;
      
      late int age;
      
      @Index()
      late String email;
    }
    
    // 3. 生成代码
    // flutter pub run build_runner build
    
    // 4. 使用 Isar
    final isar = await Isar.open([UserSchema]);
    
    // 写入数据
    await isar.writeTxn(() async {
      final user = User()
        ..name = 'John'
        ..age = 30
        ..email = 'john@example.com';
      await isar.users.put(user);
    });
    
    // 查询数据
    final users = await isar.users.where().findAll();
    
    // 条件查询
    final adults = await isar.users.filter().ageGreaterThan(18).findAll();
    
    // 5. Isar 最佳实践
    // - 索引使用
    // - 查询优化
    // - 事务处理
    // - 数据加密
    ''');
  }
}
```

## 🔗 相关链接

- [[SQLite详解]]
- [[Hive详解]]
- [[本地存储详解]]
- [[全文搜索]]

---

> Isar 是高性能的 Flutter 数据库，掌握它对于构建高性能应用非常有帮助。