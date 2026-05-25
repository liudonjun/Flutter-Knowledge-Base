# JSON 解析详解

> 深入理解 Flutter 中的 JSON 解析。

## 📖 JSON 解析基础

### 1. 什么是 JSON 解析

```dart
// JSON 解析概念
class JsonParsingConcept {
  void explain() {
    print('''
    JSON 解析概念：
    
    // 1. 什么是 JSON 解析
    // - 将 JSON 字符串转换为 Dart 对象
    // - 将 Dart 对象转换为 JSON 字符串
    // - 数据交换格式
    // - API 数据处理
    
    // 2. JSON 解析的特点
    // - 格式标准：标准数据格式
    // - 易于阅读：人类可读
    // - 易于解析：机器可解析
    // - 广泛支持：广泛使用
    
    // 3. JSON 解析的方式
    // - 手动解析：手动编写解析代码
    // - 代码生成：使用 json_serializable
    // - 内置支持：dart:convert
    
    // 4. JSON 解析的使用场景
    // - API 数据处理
    // - 配置文件
    // - 数据存储
    // - 数据传输
    ''');
  }
}
```

### 2. JSON 解析实现

```dart
// JSON 解析实现
class JsonParsingImplementation {
  void explain() {
    print('''
    JSON 解析实现：
    
    // 1. 手动解析
    class User {
      final String name;
      final int age;
      
      User({required this.name, required this.age});
      
      factory User.fromJson(Map<String, dynamic> json) {
        return User(
          name: json['name'],
          age: json['age'],
        );
      }
      
      Map<String, dynamic> toJson() {
        return {
          'name': name,
          'age': age,
        };
      }
    }
    
    // 2. 使用 json_serializable
    @JsonSerializable()
    class User {
      final String name;
      final int age;
      
      User({required this.name, required this.age});
      
      factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
      Map<String, dynamic> toJson() => _$UserToJson(this);
    }
    
    // 3. 解析 JSON
    final jsonString = '{"name": "John", "age": 30}';
    final jsonMap = jsonDecode(jsonString);
    final user = User.fromJson(jsonMap);
    
    // 4. 生成 JSON
    final user = User(name: 'John', age: 30);
    final jsonString = jsonEncode(user.toJson());
    
    // 5. JSON 解析最佳实践
    // - 错误处理
    // - 数据验证
    // - 类型安全
    // - 性能优化
    ''');
  }
}
```

## 🔗 相关链接

- [[Dio详解]]
- [[GET请求]]
- [[POST请求]]
- [[数据验证]]

---

> JSON 解析是处理 API 数据的重要技能，掌握它对于构建数据驱动的应用非常重要。