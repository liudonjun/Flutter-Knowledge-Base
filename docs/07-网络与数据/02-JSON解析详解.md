# JSON 解析详解

> 掌握 Flutter 中的 JSON 数据解析和序列化。

## 📖 JSON 基础

### 1. 基本解析

```dart
// JSON 基本解析
import 'dart:convert';

class JsonBasics {
  void explain() {
    print('''
    JSON 基本解析：
    
    // 1. JSON 字符串转 Map
    String jsonString = '{"name": "Alice", "age": 25}';
    Map<String, dynamic> user = jsonDecode(jsonString);
    print(user['name']);  // Alice
    
    // 2. JSON 字符串转 List
    String jsonList = '[{"id": 1}, {"id": 2}]';
    List<dynamic> items = jsonDecode(jsonList);
    print(items[0]['id']);  // 1
    
    // 3. Map 转 JSON 字符串
    Map<String, dynamic> data = {'name': 'Bob', 'age': 30};
    String json = jsonEncode(data);
    print(json);  // {"name":"Bob","age":30}
    
    // 4. 复杂嵌套
    String complexJson = '''
    {
      "users": [
        {"name": "Alice", "scores": [90, 85, 95]},
        {"name": "Bob", "scores": [88, 92, 78]}
      ]
    }
    ''';
    Map<String, dynamic> data = jsonDecode(complexJson);
    print(data['users'][0]['name']);  // Alice
    print(data['users'][0]['scores'][0]);  // 90
    ''');
  }
}
```

### 2. Model 类

```dart
// JSON Model 类
class JsonModel {
  void explain() {
    print('''
    JSON Model 类：
    
    class User {
      final String name;
      final int age;
      final String email;
      
      User({required this.name, required this.age, required this.email});
      
      // 从 JSON 创建
      factory User.fromJson(Map<String, dynamic> json) {
        return User(
          name: json['name'] as String,
          age: json['age'] as int,
          email: json['email'] as String? ?? '',
        );
      }
      
      // 转换为 JSON
      Map<String, dynamic> toJson() {
        return {
          'name': name,
          'age': age,
          'email': email,
        };
      }
      
      @override
      String toString() => 'User(name: $name, age: $age)';
    }
    
    // 使用
    final json = {'name': 'Alice', 'age': 25, 'email': 'alice@example.com'};
    final user = User.fromJson(json);
    print(user);  // User(name: Alice, age: 25)
    
    final jsonString = jsonEncode(user.toJson());
    print(jsonString);  // {"name":"Alice","age":25,"email":"alice@example.com"}
    ''');
  }
}
```

### 3. 嵌套对象

```dart
// 嵌套对象解析
class NestedJson {
  void explain() {
    print('''
    嵌套对象解析：
    
    class Address {
      final String city;
      final String street;
      
      Address({required this.city, required this.street});
      
      factory Address.fromJson(Map<String, dynamic> json) {
        return Address(
          city: json['city'] as String,
          street: json['street'] as String,
        );
      }
      
      Map<String, dynamic> toJson() => {'city': city, 'street': street};
    }
    
    class User {
      final String name;
      final Address address;
      final List<String> hobbies;
      
      User({required this.name, required this.address, required this.hobbies});
      
      factory User.fromJson(Map<String, dynamic> json) {
        return User(
          name: json['name'] as String,
          address: Address.fromJson(json['address'] as Map<String, dynamic>),
          hobbies: List<String>.from(json['hobbies'] as List),
        );
      }
      
      Map<String, dynamic> toJson() {
        return {
          'name': name,
          'address': address.toJson(),
          'hobbies': hobbies,
        };
      }
    }
    
    // 使用
    final json = {
      'name': 'Alice',
      'address': {'city': 'Beijing', 'street': 'Main St'},
      'hobbies': ['reading', 'swimming'],
    };
    
    final user = User.fromJson(json);
    print(user.address.city);  // Beijing
    print(user.hobbies);  // [reading, swimming]
    ''');
  }
}
```

## 📖 代码生成

### 1. json_serializable

```dart
// json_serializable
class JsonSerializable {
  void explain() {
    print('''
    json_serializable 代码生成：
    
    // 依赖
    // dependencies:
    //   json_annotation: ^4.8.0
    // dev_dependencies:
    //   json_serializable: ^6.7.0
    //   build_runner: ^2.4.0
    
    import 'package:json_annotation/json_annotation.dart';
    part 'user.g.dart';
    
    @JsonSerializable()
    class User {
      final String name;
      final int age;
      
      @JsonKey(name: 'email_address')
      final String email;
      
      User({required this.name, required this.age, required this.email});
      
      factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
      Map<String, dynamic> toJson() => _$UserToJson(this);
    }
    
    // 生成代码
    // dart run build_runner build
    
    // 使用
    final user = User.fromJson(json);
    final jsonString = jsonEncode(user.toJson());
    ''');
  }
}
```

---

> JSON 解析是处理网络数据的核心技能，掌握这些方法能让你高效地处理 API 数据。