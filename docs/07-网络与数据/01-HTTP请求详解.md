# HTTP 请求详解

> 掌握 Flutter 中的 HTTP 网络请求方法。

## 📖 http 包

### 1. 基本用法

```dart
// http 包基本用法
import 'package:http/http.dart' as http;
import 'dart:convert';

class HttpBasics {
  void explain() {
    print('''
    http 包基本用法：
    
    // 依赖
    // http: ^1.0.0
    
    // GET 请求
    Future<void> fetchData() async {
      final response = await http.get(
        Uri.parse('https://api.example.com/data'),
      );
      
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        print(data);
      } else {
        print('请求失败: ${response.statusCode}');
      }
    }
    
    // POST 请求
    Future<void> postData() async {
      final response = await http.post(
        Uri.parse('https://api.example.com/users'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'name': 'Alice', 'age': 25}),
      );
      
      if (response.statusCode == 201) {
        print('创建成功');
      }
    }
    
    // PUT 请求
    Future<void> updateData() async {
      final response = await http.put(
        Uri.parse('https://api.example.com/users/1'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'name': 'Bob'}),
      );
    }
    
    // DELETE 请求
    Future<void> deleteData() async {
      final response = await http.delete(
        Uri.parse('https://api.example.com/users/1'),
      );
    }
    ''');
  }
}
```

### 2. 请求头和参数

```dart
// 请求头和参数
class HttpHeadersParams {
  void explain() {
    print('''
    请求头和参数：
    
    // 设置请求头
    final response = await http.get(
      Uri.parse('https://api.example.com/data'),
      headers: {
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    );
    
    // URL 参数
    final uri = Uri.https('api.example.com', '/search', {
      'q': 'flutter',
      'page': '1',
      'limit': '10',
    });
    final response = await http.get(uri);
    
    // 表单数据
    final response = await http.post(
      Uri.parse('https://api.example.com/login'),
      body: {
        'username': 'user',
        'password': 'pass',
      },
    );
    
    // JSON 数据
    final response = await http.post(
      Uri.parse('https://api.example.com/data'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'key': 'value'}),
    );
    ''');
  }
}
```

## 📖 Dio 包

### 1. 基本用法

```dart
// Dio 基本用法
import 'package:dio/dio.dart';

class DioBasics {
  void explain() {
    print('''
    Dio 基本用法：
    
    // 依赖
    // dio: ^5.0.0
    
    // 创建 Dio 实例
    final dio = Dio();
    
    // GET 请求
    Future<void> fetchData() async {
      try {
        final response = await dio.get('https://api.example.com/data');
        print(response.data);
      } on DioException catch (e) {
        print('错误: ${e.message}');
      }
    }
    
    // POST 请求
    Future<void> postData() async {
      final response = await dio.post(
        'https://api.example.com/users',
        data: {'name': 'Alice', 'age': 25},
      );
      print(response.data);
    }
    
    // 配置 BaseOptions
    final dio = Dio(BaseOptions(
      baseUrl: 'https://api.example.com',
      connectTimeout: Duration(seconds: 5),
      receiveTimeout: Duration(seconds: 3),
      headers: {'Authorization': 'Bearer token'},
    ));
    ''');
  }
}
```

### 2. 拦截器

```dart
// Dio 拦截器
class DioInterceptors {
  void explain() {
    print('''
    Dio 拦截器：
    
    final dio = Dio();
    
    // 添加拦截器
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // 请求前处理
        print('请求: ${options.uri}');
        options.headers['Authorization'] = 'Bearer token';
        handler.next(options);
      },
      onResponse: (response, handler) {
        // 响应处理
        print('响应: ${response.statusCode}');
        handler.next(response);
      },
      onError: (error, handler) {
        // 错误处理
        print('错误: ${error.message}');
        handler.next(error);
      },
    ));
    
    // 日志拦截器
    dio.interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
    ));
    
    // 缓存拦截器
    dio.interceptors.add(DioCacheManager(
      CacheConfig(baseUrl: 'https://api.example.com'),
    ).interceptor);
    ''');
  }
}
```

---

> 掌握 HTTP 请求是开发网络应用的基础，http 和 dio 是最常用的两个库。