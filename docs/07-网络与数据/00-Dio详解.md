# Dio 详解

> 深入理解 Flutter 中的 Dio 网络库。

## 📖 Dio 基础

### 1. 什么是 Dio

```dart
// Dio 概念
class DioConcept {
  void explain() {
    print('''
    Dio 概念：
    
    // 1. 什么是 Dio
    // - Dart 的 HTTP 客户端
    // - 支持拦截器
    // - 支持请求取消
    // - 支持文件上传下载
    
    // 2. Dio 的特点
    // - 简单易用：API 简洁
    // - 功能丰富：支持多种功能
    // - 可扩展：支持拦截器
    // - 性能好：性能优化
    
    // 3. Dio 的功能
    // - GET 请求
    // - POST 请求
    // - 文件上传
    // - 文件下载
    // - 请求拦截
    // - 错误处理
    
    // 4. Dio 的使用场景
    // - API 调用
    // - 文件上传下载
    // - 数据请求
    // - 网络通信
    ''');
  }
}
```

### 2. Dio 实现

```dart
// Dio 实现
class DioImplementation {
  void explain() {
    print('''
    Dio 实现：
    
    // 1. 安装 Dio
    // pubspec.yaml
    dependencies:
      dio: ^5.0.0
    
    // 2. 基本使用
    final dio = Dio();
    
    // GET 请求
    final response = await dio.get('https://api.example.com/data');
    print(response.data);
    
    // POST 请求
    final response = await dio.post(
      'https://api.example.com/data',
      data: {'name': 'John'},
    );
    
    // 3. 拦截器
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // 请求前处理
        options.headers['Authorization'] = 'Bearer token';
        handler.next(options);
      },
      onResponse: (response, handler) {
        // 响应处理
        handler.next(response);
      },
      onError: (error, handler) {
        // 错误处理
        handler.next(error);
      },
    ));
    
    // 4. 文件上传
    final formData = FormData.fromMap({
      'file': await MultipartFile.fromFile('path/to/file'),
    });
    final response = await dio.post('/upload', data: formData);
    ''');
  }
}
```

## 🔗 相关链接

- [[GET请求]]
- [[POST请求]]
- [[HttpClient]]
- [[http]]

---

> Dio 是 Flutter 中最流行的 HTTP 客户端，掌握它对于构建网络应用非常重要。