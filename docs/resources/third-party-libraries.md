# 第三方库推荐

> 精选的 Flutter 第三方库，提高开发效率。

## 📦 状态管理

### Provider
**用途**: 简单易用的状态管理方案
**版本**: ^6.0.0
**特点**:
- 简单易学
- 官方推荐
- 性能良好
- 社区活跃

```dart
// 安装
dependencies:
  provider: ^6.0.0

// 使用示例
class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// 在 main.dart 中配置
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<Counter>(
      builder: (context, counter, child) {
        return Text('计数: ${counter.count}');
      },
    );
  }
}
```

### Riverpod
**用途**: 更强大的状态管理方案
**版本**: ^2.0.0
**特点**:
- 类型安全
- 编译时检查
- 更好的性能
- 更灵活

```dart
// 安装
dependencies:
  flutter_riverpod: ^2.0.0

// 使用示例
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
}

// 在 main.dart 中配置
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

// 在 Widget 中使用
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Text('计数: $count');
  }
}
```

### BLoC
**用途**: 企业级状态管理方案
**版本**: ^8.0.0
**特点**:
- 适合大型项目
- 清晰的架构
- 易于测试
- 可预测的状态

```dart
// 安装
dependencies:
  flutter_bloc: ^8.0.0

// 使用示例
// Event
abstract class CounterEvent {}
class IncrementEvent extends CounterEvent {}

// State
class CounterState {
  final int count;
  CounterState(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });
  }
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  final CounterBloc _bloc = CounterBloc();
  
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      bloc: _bloc,
      builder: (context, state) {
        return Text('计数: ${state.count}');
      },
    );
  }
}
```

## 🌐 网络请求

### Dio
**用途**: 强大的 HTTP 客户端
**版本**: ^5.0.0
**特点**:
- 功能丰富
- 易于使用
- 支持拦截器
- 支持 FormData

```dart
// 安装
dependencies:
  dio: ^5.0.0

// 使用示例
final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: Duration(seconds: 5),
  receiveTimeout: Duration(seconds: 3),
));

// GET 请求
Response response = await dio.get('/users');
List<User> users = (response.data as List)
    .map((json) => User.fromJson(json))
    .toList();

// POST 请求
Response response = await dio.post('/users', data: {
  'name': 'John',
  'email': 'john@example.com',
});

// 上传文件
FormData formData = FormData.fromMap({
  'file': await MultipartFile.fromFile('path/to/file.jpg'),
});
Response response = await dio.post('/upload', data: formData);
```

### http
**用途**: 官方 HTTP 客户端
**版本**: ^1.0.0
**特点**:
- 官方维护
- 轻量级
- 简单易用

```dart
// 安装
dependencies:
  http: ^1.0.0

// 使用示例
import 'package:http/http.dart' as http;

// GET 请求
final response = await http.get(
  Uri.parse('https://api.example.com/users'),
);
if (response.statusCode == 200) {
  List<User> users = jsonDecode(response.body)
      .map((json) => User.fromJson(json))
      .toList();
}

// POST 请求
final response = await http.post(
  Uri.parse('https://api.example.com/users'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({
    'name': 'John',
    'email': 'john@example.com',
  }),
);
```

## 💾 数据库

### SQLite (sqflite)
**用途**: 本地关系型数据库
**版本**: ^2.0.0
**特点**:
- 轻量级
- 高性能
- 支持事务
- 跨平台

```dart
// 安装
dependencies:
  sqflite: ^2.0.0
  path: ^1.8.0

// 使用示例
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseService {
  static Database? _database;
  
  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  static Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'app.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        db.execute('''
          CREATE TABLE users(
            id INTEGER PRIMARY KEY,
            name TEXT,
            email TEXT
          )
        ''');
      },
    );
  }
  
  static Future<void> insertUser(User user) async {
    final db = await database;
    await db.insert('users', user.toJson());
  }
  
  static Future<List<User>> getUsers() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('users');
    return List.generate(maps.length, (i) {
      return User.fromJson(maps[i]);
    });
  }
}
```

### Hive
**用途**: 高性能 NoSQL 数据库
**版本**: ^2.0.0
**特点**:
- 高性能
- 类型安全
- 支持加密
- 跨平台

```dart
// 安装
dependencies:
  hive: ^2.0.0
  hive_flutter: ^1.0.0

// 使用示例
import 'package:hive/hive.dart';

// 定义数据模型
@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0)
  String name;
  
  @HiveField(1)
  String email;
  
  User({required this.name, required this.email});
}

// 初始化
void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());
  await Hive.openBox<User>('users');
  runApp(MyApp());
}

// 使用
final usersBox = Hive.box<User>('users');

// 添加数据
usersBox.add(User(name: 'John', email: 'john@example.com'));

// 读取数据
List<User> users = usersBox.values.toList();
```

## 🎨 UI 组件

### flutter_screenutil
**用途**: 屏幕适配工具
**版本**: ^5.0.0
**特点**:
- 一行代码适配
- 支持多种单位
- 性能优化
- 易于使用

```dart
// 安装
dependencies:
  flutter_screenutil: ^5.0.0

// 使用示例
import 'package:flutter_screenutil/flutter_screenutil.dart';

// 初始化
void main() {
  runApp(
    ScreenUtilInit(
      designSize: Size(375, 812), // 设计稿尺寸
      builder: (context, child) => MyApp(),
    ),
  );
}

// 使用
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 100.w, // 宽度适配
      height: 50.h, // 高度适配
      padding: EdgeInsets.all(16.r), // 内边距适配
      child: Text(
        'Hello',
        style: TextStyle(fontSize: 16.sp), // 字体大小适配
      ),
    );
  }
}
```

### cached_network_image
**用途**: 网络图片缓存
**版本**: ^3.0.0
**特点**:
- 自动缓存
- 占位图支持
- 错误处理
- 性能优化

```dart
// 安装
dependencies:
  cached_network_image: ^3.0.0

// 使用示例
import 'package:cached_network_image/cached_network_image.dart';

class MyImage extends StatelessWidget {
  final String imageUrl;
  
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: imageUrl,
      placeholder: (context, url) => CircularProgressIndicator(),
      errorWidget: (context, url, error) => Icon(Icons.error),
      fit: BoxFit.cover,
    );
  }
}
```

## 🔧 工具库

### shared_preferences
**用途**: 键值对存储
**版本**: ^2.0.0
**特点**:
- 简单易用
- 跨平台
- 适合小数据

```dart
// 安装
dependencies:
  shared_preferences: ^2.0.0

// 使用示例
import 'package:shared_preferences/shared_preferences.dart';

class StorageService {
  static Future<void> saveString(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, value);
  }
  
  static Future<String?> getString(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(key);
  }
  
  static Future<void> saveBool(String key, bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(key, value);
  }
  
  static Future<bool?> getBool(String key) async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(key);
  }
}
```

### path_provider
**用途**: 获取应用目录路径
**版本**: ^2.0.0
**特点**:
- 跨平台
- 简单易用
- 支持多种目录

```dart
// 安装
dependencies:
  path_provider: ^2.0.0

// 使用示例
import 'package:path_provider/path_provider.dart';

class PathService {
  static Future<String> getDocumentsPath() async {
    final directory = await getApplicationDocumentsDirectory();
    return directory.path;
  }
  
  static Future<String> getTemporaryPath() async {
    final directory = await getTemporaryDirectory();
    return directory.path;
  }
  
  static Future<String> getExternalPath() async {
    final directory = await getExternalStorageDirectory();
    return directory?.path ?? '';
  }
}
```

## 📊 选择建议

### 按项目规模选择
- **小型项目**: Provider, http, shared_preferences
- **中型项目**: Riverpod, Dio, SQLite
- **大型项目**: BLoC, Dio, Hive

### 按功能需求选择
- **状态管理**: Riverpod (推荐), Provider, BLoC
- **网络请求**: Dio (推荐), http
- **数据库**: SQLite (关系型), Hive (NoSQL)
- **UI 组件**: flutter_screenutil, cached_network_image

### 按性能要求选择
- **高性能**: Riverpod, Dio, Hive
- **易用性**: Provider, http, shared_preferences
- **企业级**: BLoC, Dio, SQLite

## 🔗 相关链接

### 核心概念
- [架构概览](/core/architecture) - Flutter 架构概览
- [一切皆 Widget](/core/widgets) - 一切皆 Widget
- [Dart 语言](/core/dart) - Dart 语言

### 指南
- [Widget 系统](/guide/widgets) - Widget 系统详解
- [状态管理](/guide/state-management) - 状态管理方案
- [网络与数据](/guide/networking) - 网络与数据处理

### 实战项目
- [电商应用](/projects/ecommerce) - 电商应用实战
- [社交应用](/projects/social) - 社交应用开发

### 学习资源
- [官方资源](/resources/official) - 官方资源
- [社区资源](/resources/community) - 社区资源
- [书籍推荐](/resources/books) - 书籍推荐

---
*最后更新: 2026年5月23日*