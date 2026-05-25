# http 包详解

> 深入理解 Flutter 中的 http 包。

## 📖 http 包基础

### 1. 什么是 http 包

```dart
// http 包概念
class HttpPackageConcept {
  void explain() {
    print('''
    http 包概念：
    
    // 1. 什么是 http 包
    // - Dart 官方 HTTP 客户端
    // - 简单易用
    // - 跨平台支持
    // - 无需额外配置
    
    // 2. http 包的特点
    // - 简单易用：API 简洁
    // - 官方支持：Dart 官方维护
    // - 跨平台：支持多平台
    // - 无需配置：开箱即用
    
    // 3. http 包的功能
    // - GET 请求
    // - POST 请求
    // - 文件上传
    // - Headers 设置
    // - 超时设置
    
    // 4. http 包的使用场景
    // - 简单 HTTP 请求
    // - 快速原型开发
    // - 小型项目
    // - 学习 HTTP
    ''');
  }
}
```

### 2. http 包实现

```dart
// http 包实现
class HttpPackageImplementation {
  void explain() {
    print('''
    http 包实现：
    
    // 1. 安装 http
    // pubspec.yaml
    dependencies:
      http: ^1.0.0
    
    // 2. 基本使用
    import 'package:http/http.dart' as http;
    
    // GET 请求
    final response = await http.get(
      Uri.parse('https://api.example.com/data'),
    );
    print(response.body);
    
    // POST 请求
    final response = await http.post(
      Uri.parse('https://api.example.com/data'),
      body: {'name': 'John'},
    );
    
    // 3. JSON 数据
    final response = await http.post(
      Uri.parse('https://api.example.com/data'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'name': 'John'}),
    );
    
    // 4. 超时设置
    final response = await http.get(
      Uri.parse('https://api.example.com/data'),
    ).timeout(Duration(seconds: 30));
    
    // 5. http 包最佳实践
    // - 错误处理
    // - 超时设置
    // - 数据解析
    // - 资源释放
    ''');
  }
}
```

## 🔗 相关链接

- [[Dio详解]]
- [[HttpClient详解]]
- [[GET请求]]
- [[POST请求]]

---

> http 包是 Dart 官方的 HTTP 客户端，掌握它对于简单 HTTP 请求非常有帮助。