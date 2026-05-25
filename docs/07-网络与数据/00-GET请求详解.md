# GET 请求详解

> 深入理解 Flutter 中的 GET 请求。

## 📖 GET 请求基础

### 1. 什么是 GET 请求

```dart
// GET 请求概念
class GetRequestConcept {
  void explain() {
    print('''
    GET 请求概念：
    
    // 1. 什么是 GET 请求
    // - HTTP 请求方法之一
    // - 用于获取数据
    // - 参数通过 URL 传递
    // - 幂等性：多次请求结果相同
    
    // 2. GET 请求的特点
    // - 安全性：不修改数据
    // - 幂等性：多次请求结果相同
    // - 可缓存：可以被缓存
    // - 参数可见：参数在 URL 中
    
    // 3. GET 请求的使用场景
    // - 获取数据
    // - 查询数据
    // - 列表数据
    // - 详情数据
    
    // 4. GET 请求的优势
    // - 简单易用
    // - 可缓存
    // - 可书签
    // - 可分享
    ''');
  }
}
```

### 2. GET 请求实现

```dart
// GET 请求实现
class GetRequestImplementation {
  void explain() {
    print('''
    GET 请求实现：
    
    // 1. 使用 Dio
    final dio = Dio();
    final response = await dio.get('https://api.example.com/users');
    final users = response.data;
    
    // 2. 带参数的 GET 请求
    final response = await dio.get(
      'https://api.example.com/users',
      queryParameters: {
        'page': 1,
        'limit': 10,
      },
    );
    
    // 3. 使用 http 包
    final response = await http.get(
      Uri.parse('https://api.example.com/users'),
    );
    final users = jsonDecode(response.body);
    
    // 4. GET 请求最佳实践
    // - 错误处理
    // - 超时设置
    // - 缓存策略
    // - 数据解析
    ''');
  }
}
```

## 🔗 相关链接

- [[Dio详解]]
- [[POST请求]]
- [[请求缓存]]
- [[数据分页]]

---

> GET 请求是最常用的 HTTP 请求方法，掌握它对于获取数据非常重要。