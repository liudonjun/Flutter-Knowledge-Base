# 网络与数据处理

> 网络请求和数据处理是移动应用的核心功能，掌握 Flutter 网络与数据处理至关重要。

## 🌐 网络请求

### 1. HTTP 客户端
```dart
// 使用 http 包
import 'package:http/http.dart' as http;

Future<String> fetchData() async {
  final response = await http.get(
    Uri.parse('https://api.example.com/data'),
  );
  
  if (response.statusCode == 200) {
    return response.body;
  } else {
    throw Exception('Failed to load data');
  }
}

// 使用 Dio
import 'package:dio/dio.dart';

final dio = Dio();

Future<Response> fetchData() async {
  return await dio.get('https://api.example.com/data');
}
```

### 2. 请求配置
```dart
// 配置 Dio
final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: Duration(seconds: 5),
  receiveTimeout: Duration(seconds: 3),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
));

// 添加拦截器
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    // 添加 token
    options.headers['Authorization'] = 'Bearer $token';
    return handler.next(options);
  },
  onResponse: (response, handler) {
    // 处理响应
    return handler.next(response);
  },
  onError: (error, handler) {
    // 处理错误
    return handler.next(error);
  },
));
```

## 📊 数据处理

### 1. JSON 解析
```dart
// 手动解析
class User {
  final String name;
  final String email;
  final int age;
  
  User({required this.name, required this.email, required this.age});
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'],
      email: json['email'],
      age: json['age'],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'email': email,
      'age': age,
    };
  }
}

// 使用 json_serializable
@JsonSerializable()
class User {
  final String name;
  final String email;
  final int age;
  
  User({required this.name, required this.email, required this.age});
  
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

### 2. 数据模型设计
```dart
// 通用响应模型
class ApiResponse<T> {
  final int code;
  final String message;
  final T? data;
  
  ApiResponse({required this.code, required this.message, this.data});
  
  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic) fromJsonT,
  ) {
    return ApiResponse(
      code: json['code'],
      message: json['message'],
      data: json['data'] != null ? fromJsonT(json['data']) : null,
    );
  }
}

// 分页数据模型
class PaginatedData<T> {
  final List<T> items;
  final int currentPage;
  final int totalPages;
  final int totalItems;
  
  PaginatedData({
    required this.items,
    required this.currentPage,
    required this.totalPages,
    required this.totalItems,
  });
}
```

## 💾 本地存储

### 1. SharedPreferences
```dart
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

### 2. SQLite 数据库
```dart
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
            email TEXT,
            age INTEGER
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

## 🔄 数据同步

### 1. 离线缓存
```dart
class CacheService {
  static final Map<String, dynamic> _cache = {};
  
  static dynamic get(String key) {
    return _cache[key];
  }
  
  static void set(String key, dynamic value) {
    _cache[key] = value;
  }
  
  static void remove(String key) {
    _cache.remove(key);
  }
  
  static void clear() {
    _cache.clear();
  }
  
  // 带过期时间的缓存
  static void setWithExpiry(String key, dynamic value, Duration expiry) {
    _cache[key] = {
      'value': value,
      'expiry': DateTime.now().add(expiry).millisecondsSinceEpoch,
    };
  }
  
  static dynamic getWithExpiry(String key) {
    final item = _cache[key];
    if (item == null) return null;
    
    if (DateTime.now().millisecondsSinceEpoch > item['expiry']) {
      _cache.remove(key);
      return null;
    }
    
    return item['value'];
  }
}
```

### 2. 网络状态监听
```dart
import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkService {
  static final Connectivity _connectivity = Connectivity();
  
  static Stream<ConnectivityResult> get onConnectivityChanged =>
      _connectivity.onConnectivityChanged;
  
  static Future<bool> isConnected() async {
    final result = await _connectivity.checkConnectivity();
    return result != ConnectivityResult.none;
  }
  
  static Future<ConnectivityResult> get connectivityResult =>
      _connectivity.checkConnectivity();
}
```

## 🛡️ 网络安全

### 1. HTTPS 配置
```dart
// 配置 HTTPS
final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  // 强制使用 HTTPS
  validateStatus: (status) {
    return status != null && status >= 200 && status < 300;
  },
));

// 证书固定
final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
));
dio.httpClientAdapter = IOHttpClientAdapter(
  createHttpClient: () {
    final client = HttpClient();
    client.badCertificateCallback = (X509Certificate cert, String host, int port) {
      // 验证证书
      return cert.pem == 'YOUR_CERTIFICATE_PEM';
    };
    return client;
  },
);
```

### 2. Token 管理
```dart
class TokenService {
  static String? _accessToken;
  static String? _refreshToken;
  
  static Future<void> saveTokens(String accessToken, String refreshToken) async {
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    await StorageService.saveString('access_token', accessToken);
    await StorageService.saveString('refresh_token', refreshToken);
  }
  
  static Future<String?> getAccessToken() async {
    if (_accessToken != null) return _accessToken;
    return await StorageService.getString('access_token');
  }
  
  static Future<String?> getRefreshToken() async {
    if (_refreshToken != null) return _refreshToken;
    return await StorageService.getString('refresh_token');
  }
  
  static Future<void> clearTokens() async {
    _accessToken = null;
    _refreshToken = null;
    await StorageService.saveString('access_token', '');
    await StorageService.saveString('refresh_token', '');
  }
}
```

## 🚀 性能优化

### 1. 请求优化
```dart
// 请求合并
class RequestBatcher {
  static final Map<String, List<Completer>> _pendingRequests = {};
  
  static Future<T> batchRequest<T>(
    String key,
    Future<T> Function() request,
  ) async {
    if (_pendingRequests.containsKey(key)) {
      final completer = Completer<T>();
      _pendingRequests[key]!.add(completer);
      return completer.future;
    }
    
    _pendingRequests[key] = [];
    
    try {
      final result = await request();
      for (final completer in _pendingRequests[key]!) {
        completer.complete(result);
      }
      return result;
    } catch (error) {
      for (final completer in _pendingRequests[key]!) {
        completer.completeError(error);
      }
      rethrow;
    } finally {
      _pendingRequests.remove(key);
    }
  }
}
```

### 2. 数据压缩
```dart
// 启用 GZIP 压缩
final dio = Dio(BaseOptions(
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
  },
));

// 自动解压响应
dio.interceptors.add(InterceptorsWrapper(
  onResponse: (response, handler) {
    // Dio 自动处理 gzip 解压
    return handler.next(response);
  },
));
```

## 📚 学习资源

- [Flutter 网络官方文档](https://flutter.dev/docs/cookbook/networking)
- [Dio 官方文档](https://pub.dev/packages/dio)
- [SQLite 官方文档](https://pub.dev/packages/sqflite)
- [SharedPreferences 官方文档](https://pub.dev/packages/shared_preferences)

## 🔗 相关链接

- [Widget 系统](/guide/widgets) - Widget 系统
- [状态管理](/guide/state-management) - 状态管理
- [导航与路由](/guide/navigation) - 导航与路由
- [架构概览](/core/architecture) - Flutter 架构

---
*最后更新: 2026年5月23日*