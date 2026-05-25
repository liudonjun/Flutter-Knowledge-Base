# Floor 详解

> 深入理解 Flutter 中的 Floor 数据库。

## 📖 Floor 基础

### 1. 什么是 Floor

```dart
// Floor 概念
class FloorConcept {
  void explain() {
    print('''
    Floor 概念：
    
    // 1. 什么是 Floor
    // - Flutter 的 SQLite 抽象层
    // - 基于注解的数据库定义
    // - 支持代码生成
    // - 类型安全
    
    // 2. Floor 的特点
    // - 注解驱动：使用注解定义
    // - 代码生成：自动生成代码
    // - 类型安全：编译时检查
    // - 易于使用：API 简洁
    
    // 3. Floor 的功能
    // - CRUD 操作
    // - 流式查询
    // - 事务支持
    // - 数据库迁移
    
    // 4. Floor 的使用场景
    // - 复杂数据存储
    // - 类型安全数据库
    // - 响应式数据
    // - 数据库迁移
    ''');
  }
}
```

### 2. Floor 实现

```dart
// Floor 实现
class FloorImplementation {
  void explain() {
    print('''
    Floor 实现：
    
    // 1. 安装 Floor
    // pubspec.yaml
    dependencies:
      floor: ^1.0.0
    
    dev_dependencies:
      floor_generator: ^1.0.0
      build_runner: ^2.0.0
    
    // 2. 定义实体
    @entity
    class User {
      @primaryKey
      final int id;
      final String name;
      final int age;
      
      User(this.id, this.name, this.age);
    }
    
    // 3. 定义 DAO
    @dao
    abstract class UserDao {
      @Query('SELECT * FROM User')
      Future<List<User>> findAllUsers();
      
      @insert
      Future<void> insertUser(User user);
    }
    
    // 4. 定义数据库
    @Database(version: 1, entities: [User])
    abstract class AppDatabase extends FloorDatabase {
      UserDao get userDao;
    }
    
    // 5. 使用 Floor
    final database = await $FloorAppDatabase.databaseBuilder('app.db').build();
    final userDao = database.userDao;
    
    // 插入数据
    await userDao.insertUser(User(1, 'John', 30));
    
    // 查询数据
    final users = await userDao.findAllUsers();
    
    // 6. Floor 最佳实践
    // - 数据库版本管理
    // - 迁移策略
    // - 流式查询
    // - 错误处理
    ''');
  }
}
```

## 🔗 相关链接

- [[SQLite详解]]
- [[Hive详解]]
- [[本地存储详解]]
- [[数据模型]]

---

> Floor 是类型安全的 SQLite 抽象层，掌握它对于构建类型安全的数据库非常有帮助。