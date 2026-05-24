# SQLite 数据库详解

> 掌握 Flutter 中的 SQLite 本地数据库使用。

## 📖 SQLite 基础

### 1. 基本用法

```dart
// SQLite 基本用法
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class SQLiteBasics {
  void explain() {
    print('''
    SQLite 基本用法：
    
    // 依赖
    // sqflite: ^2.0.0
    // path: ^1.8.0
    
    // 1. 打开数据库
    Future<Database> openDb() async {
      final dbPath = await getDatabasesPath();
      return openDatabase(
        join(dbPath, 'my_app.db'),
        onCreate: (db, version) {
          return db.execute(
            'CREATE TABLE users(id INTEGER PRIMARY KEY, name TEXT, age INTEGER)',
          );
        },
        version: 1,
      );
    }
    
    // 2. 插入数据
    Future<void> insertUser(Map<String, dynamic> user) async {
      final db = await openDb();
      await db.insert('users', user, conflictAlgorithm: ConflictAlgorithm.replace);
    }
    
    // 3. 查询数据
    Future<List<Map<String, dynamic>>> getUsers() async {
      final db = await openDb();
      return await db.query('users');
    }
    
    // 4. 更新数据
    Future<void> updateUser(int id, Map<String, dynamic> user) async {
      final db = await openDb();
      await db.update('users', user, where: 'id = ?', whereArgs: [id]);
    }
    
    // 5. 删除数据
    Future<void> deleteUser(int id) async {
      final db = await openDb();
      await db.delete('users', where: 'id = ?', whereArgs: [id]);
    }
    ''');
  }
}
```

### 2. 数据库帮助类

```dart
// 数据库帮助类
class DatabaseHelper {
  static Database? _database;
  
  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  static Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    return openDatabase(
      join(dbPath, 'app.db'),
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE,
            age INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        ''');
        
        await db.execute('''
          CREATE TABLE posts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            title TEXT NOT NULL,
            content TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id)
          )
        ''');
      },
      version: 1,
    );
  }
  
  // 插入
  static Future<int> insert(String table, Map<String, dynamic> data) async {
    final db = await database;
    return await db.insert(table, data);
  }
  
  // 查询
  static Future<List<Map<String, dynamic>>> query(
    String table, {
    String? where,
    List<dynamic>? whereArgs,
    String? orderBy,
    int? limit,
  }) async {
    final db = await database;
    return await db.query(
      table,
      where: where,
      whereArgs: whereArgs,
      orderBy: orderBy,
      limit: limit,
    );
  }
  
  // 原始查询
  static Future<List<Map<String, dynamic>>> rawQuery(String sql) async {
    final db = await database;
    return await db.rawQuery(sql);
  }
}
''');
  }
}
```

### 3. Model 类

```dart
// 数据库 Model
class UserModel {
  final int? id;
  final String name;
  final String email;
  final int age;
  
  UserModel({this.id, required this.name, required this.email, required this.age});
  
  Map<String, dynamic> toMap() {
    return {
      if (id != null) 'id': id,
      'name': name,
      'email': email,
      'age': age,
    };
  }
  
  factory UserModel.fromMap(Map<String, dynamic> map) {
    return UserModel(
      id: map['id'] as int?,
      name: map['name'] as String,
      email: map['email'] as String,
      age: map['age'] as int,
    );
  }
  
  // CRUD 操作
  static Future<int> insert(UserModel user) async {
    return await DatabaseHelper.insert('users', user.toMap());
  }
  
  static Future<List<UserModel>> getAll() async {
    final maps = await DatabaseHelper.query('users', orderBy: 'name');
    return maps.map((map) => UserModel.fromMap(map)).toList();
  }
  
  static Future<UserModel?> getById(int id) async {
    final maps = await DatabaseHelper.query('users', where: 'id = ?', whereArgs: [id]);
    if (maps.isEmpty) return null;
    return UserModel.fromMap(maps.first);
  }
  
  static Future<int> update(UserModel user) async {
    final db = await DatabaseHelper.database;
    return await db.update('users', user.toMap(), where: 'id = ?', whereArgs: [user.id]);
  }
  
  static Future<int> delete(int id) async {
    final db = await DatabaseHelper.database;
    return await db.delete('users', where: 'id = ?', whereArgs: [id]);
  }
}
''');
  }
}
```

---

> SQLite 是 Flutter 中最常用的本地关系型数据库，掌握它能让你的应用具备强大的本地数据管理能力。