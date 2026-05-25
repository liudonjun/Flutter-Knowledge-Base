# SQLite 详解

> 深入理解 Flutter 中的 SQLite 数据库。

## 📖 SQLite 基础

### 1. 什么是 SQLite

```dart
// SQLite 概念
class SQLiteConcept {
  void explain() {
    print('''
    SQLite 概念：
    
    // 1. 什么是 SQLite
    // - 轻量级关系数据库
    // - 支持 SQL 语法
    // - 跨平台支持
    // - 无需服务器
    
    // 2. SQLite 的特点
    // - 轻量级：占用资源少
    // - 关系型：支持 SQL
    // - 跨平台：支持多平台
    // - 无需服务器：本地数据库
    
    // 3. SQLite 的功能
    // - SQL 查询
    // - 事务支持
    // - 索引支持
    // - 数据完整性
    
    // 4. SQLite 的使用场景
    // - 复杂数据存储
    // - 关系数据
    // - 查询需求
    // - 数据完整性
    ''');
  }
}
```

### 2. SQLite 实现

```dart
// SQLite 实现
class SQLiteImplementation {
  void explain() {
    print('''
    SQLite 实现：
    
    // 1. 安装 sqflite
    // pubspec.yaml
    dependencies:
      sqflite: ^2.0.0
      path: ^1.8.0
    
    // 2. 初始化数据库
    import 'package:sqflite/sqflite.dart';
    import 'package:path/path.dart';
    
    final database = await openDatabase(
      join(await getDatabasesPath(), 'my_database.db'),
      onCreate: (db, version) {
        return db.execute(
          'CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)',
        );
      },
      version: 1,
    );
    
    // 3. CRUD 操作
    // 插入数据
    await database.insert('users', {'name': 'John', 'age': 30});
    
    // 查询数据
    final users = await database.query('users');
    
    // 更新数据
    await database.update('users', {'age': 31}, where: 'name = ?', whereArgs: ['John']);
    
    // 删除数据
    await database.delete('users', where: 'name = ?', whereArgs: ['John']);
    
    // 4. SQLite 最佳实践
    // - 数据库版本管理
    // - 事务处理
    // - 索引优化
    // - 错误处理
    ''');
  }
}
```

## 🔗 相关链接

- [[Hive详解]]
- [[本地存储详解]]
- [[数据模型]]
- [[数据库设计]]

---

> SQLite 是 Flutter 中功能强大的本地数据库，掌握它对于复杂数据存储非常有帮助。