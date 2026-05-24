# Dart 元编程

> 掌握 Dart 的元编程特性，包括反射、注解、代码生成等高级概念。

## 📖 反射 (Reflection)

### 1. dart:mirrors 库

```dart
// 注意：dart:mirrors 在 Flutter 中不可用，主要用于服务器端
import 'dart:mirrors';

// 基本反射
void basicReflection() {
  // 获取类镜像
  ClassMirror classMirror = reflectClass(Person);
  
  // 获取类名
  Symbol className = classMirror.simpleName;
  print('类名: ${MirrorSystem.getName(className)}'); // 类名: Person
  
  // 获取方法
  Map<Symbol, MethodMirror> methods = classMirror.instanceMembers;
  methods.forEach((symbol, method) {
    print('方法: ${MirrorSystem.getName(symbol)}');
  });
  
  // 获取属性
  Map<Symbol, VariableMirror> fields = classMirror.instanceMembers;
  fields.forEach((symbol, field) {
    if (field is VariableMirror) {
      print('属性: ${MirrorSystem.getName(symbol)}');
    }
  });
}

class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  void sayHello() {
    print('Hello, I am $name');
  }
}

// 动态调用
void dynamicInvocation() {
  Person person = Person('Alice', 25);
  InstanceMirror instanceMirror = reflect(person);
  
  // 动态调用方法
  instanceMirror.invoke(#sayHello, []); // Hello, I am Alice
  
  // 动态获取属性
  InstanceMirror nameMirror = instanceMirror.getField(#name);
  print('姓名: ${nameMirror.reflectee}'); // 姓名: Alice
  
  // 动态设置属性
  instanceMirror.setField(#name, 'Bob');
  print('新姓名: ${person.name}'); // 新姓名: Bob
}
```

### 2. 运行时类型信息

```dart
// 运行时类型信息
void runtimeTypeInfo() {
  // 获取类型
  var value = 42;
  Type type = value.runtimeType;
  print('类型: $type'); // 类型: int
  
  // 类型检查
  print('是 int: ${value is int}');     // 是 int: true
  print('是 String: ${value is String}'); // 是 String: false
  
  // 类型转换
  if (value is int) {
    int intValue = value as int;
    print('转换后: $intValue'); // 转换后: 42
  }
  
  // 泛型类型
  List<int> numbers = [1, 2, 3];
  print('列表类型: ${numbers.runtimeType}'); // 列表类型: List<int>
  
  // 获取泛型参数
  Type listType = numbers.runtimeType;
  print('泛型参数: $listType'); // 泛型参数: List<int>
}
```

## 📖 注解 (Annotations)

### 1. 内置注解

```dart
// 内置注解
void builtInAnnotations() {
  // @override
  class Animal {
    void makeSound() => print('Animal sound');
  }
  
  class Dog extends Animal {
    @override
    void makeSound() => print('汪汪'); // 正确重写
  }
  
  // @deprecated
  @deprecated
  void oldFunction() => print('这个函数已过时');
  
  // @required (在 Flutter 中常用)
  void process({required String name, required int age}) {
    print('处理: $name, $age');
  }
  
  // @immutable
  @immutable
  class Point {
    final int x;
    final int y;
    
    const Point(this.x, this.y);
  }
  
  // 使用
  Dog dog = Dog();
  dog.makeSound(); // 汪汪
  
  oldFunction(); // 这个函数已过时
  process(name: 'Alice', age: 25); // 处理: Alice, 25
  
  Point point = const Point(1, 2);
  print('点: (${point.x}, ${point.y})'); // 点: (1, 2)
}
```

### 2. 自定义注解

```dart
// 自定义注解
class Author {
  final String name;
  final String email;
  final DateTime date;
  
  const Author(this.name, this.email, this.date);
}

class Version {
  final int major;
  final int minor;
  final int patch;
  
  const Version(this.major, this.minor, this.patch);
  
  @override
  String toString() => '$major.$minor.$patch';
}

// 使用自定义注解
@Author('张三', 'zhangsan@example.com', DateTime(2024, 1, 1))
@Version(1, 0, 0)
class MyClass {
  @Author('李四', 'lisi@example.com', DateTime(2024, 2, 1))
  void myMethod() {
    print('我的方法');
  }
}

// 注解处理
void annotationProcessing() {
  // 注意：Dart 的注解处理需要使用 build_runner 或 reflectable
  // 这里只是展示注解的定义和使用
  
  MyClass myClass = MyClass();
  myClass.myMethod(); // 我的方法
  
  print('类已定义，注解需要在编译时处理');
}
```

### 3. JSON 序列化注解

```dart
// JSON 序列化注解
class JsonKey {
  final String name;
  final bool required;
  final dynamic defaultValue;
  
  const JsonKey({this.name = '', this.required = false, this.defaultValue});
}

class Serializable {
  const Serializable();
}

// 使用 JSON 注解
@Serializable()
class User {
  @JsonKey(name: 'user_name')
  final String name;
  
  @JsonKey(name: 'user_age', required: true)
  final int age;
  
  @JsonKey(name: 'user_email', defaultValue: '')
  final String email;
  
  const User(this.name, this.age, this.email);
  
  // 手动序列化（实际项目中会使用代码生成）
  Map<String, dynamic> toJson() {
    return {
      'user_name': name,
      'user_age': age,
      'user_email': email,
    };
  }
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      json['user_name'] as String,
      json['user_age'] as int,
      json['user_email'] as String? ?? '',
    );
  }
}

// 使用
void useJsonAnnotations() {
  User user = User('Alice', 25, 'alice@example.com');
  
  Map<String, dynamic> json = user.toJson();
  print('JSON: $json'); // JSON: {user_name: Alice, user_age: 25, user_email: alice@example.com}
  
  User fromJson = User.fromJson(json);
  print('从JSON: ${fromJson.name}, ${fromJson.age}');
}
```

## 📖 代码生成

### 1. build_runner 基础

```dart
// build_runner 是 Dart 的代码生成工具
// 需要在 pubspec.yaml 中添加依赖

/*
// pubspec.yaml
dev_dependencies:
  build_runner: ^2.4.0
  build_verify: ^3.1.0
*/

// 使用 build_runner
void buildRunnerUsage() {
  print('''
  # 运行代码生成
  dart run build_runner build
  
  # 监视文件变化
  dart run build_runner watch
  
  # 清理生成的文件
  dart run build_runner clean
  ''');
}
```

### 2. json_serializable

```dart
// json_serializable 是常用的 JSON 代码生成库
// 需要在 pubspec.yaml 中添加依赖

/*
// pubspec.yaml
dependencies:
  json_annotation: ^4.8.0

dev_dependencies:
  json_serializable: ^6.7.0
  build_runner: ^2.4.0
*/

// 使用 json_serializable
import 'package:json_annotation/json_annotation.dart';

// part 'user.g.dart'; // 生成的文件

@JsonSerializable()
class User {
  final String name;
  final int age;
  final String email;
  
  User(this.name, this.age, this.email);
  
  // 生成的工厂构造函数
  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  
  // 生成的 toJson 方法
  Map<String, dynamic> toJson() => _$UserToJson(this);
  
  @override
  String toString() => 'User(name: $name, age: $age, email: $email)';
}

// 使用
void useJsonSerializable() {
  print('''
  # 生成代码
  dart run build_runner build
  
  # 会生成 user.g.dart 文件
  # 包含 _$UserFromJson 和 _$UserToJson 函数
  ''');
}
```

### 3. 自定义代码生成器

```dart
// 自定义代码生成器示例
class CodeGenerator {
  final String className;
  final Map<String, String> fields;
  
  CodeGenerator(this.className, this.fields);
  
  String generate() {
    StringBuffer buffer = StringBuffer();
    
    // 生成类定义
    buffer.writeln('class $className {');
    
    // 生成字段
    fields.forEach((name, type) {
      buffer.writeln('  final $type $name;');
    });
    
    buffer.writeln();
    
    // 生成构造函数
    buffer.write('  $className(');
    buffer.write(fields.entries.map((e) => 'this.${e.key}').join(', '));
    buffer.writeln(');');
    
    buffer.writeln();
    
    // 生成 toString 方法
    buffer.writeln('  @override');
    buffer.writeln('  String toString() => \'$className(');
    buffer.write(fields.entries.map((e) => '${e.key}: \$${e.key}').join(', '));
    buffer.writeln(')\';');
    
    buffer.writeln('}');
    
    return buffer.toString();
  }
}

// 使用代码生成器
void useCodeGenerator() {
  CodeGenerator generator = CodeGenerator('Person', {
    'name': 'String',
    'age': 'int',
    'email': 'String',
  });
  
  String code = generator.generate();
  print(code);
  /*
  class Person {
    final String name;
    final int age;
    final String email;
  
    Person(this.name, this.age, this.email);
  
    @override
    String toString() => 'Person(name: $name, age: $age, email: $email)';
  }
  */
}
```

## 📖 反射与性能

### 1. 反射性能考虑

```dart
// 反射性能考虑
void reflectionPerformance() {
  // 反射比直接调用慢很多
  print('''
  反射的性能问题：
  1. 运行时类型检查
  2. 动态方法调用
  3. 无法进行编译时优化
  4. 增加内存使用
  
  在 Flutter 中，dart:mirrors 不可用
  建议使用以下替代方案：
  1. 代码生成
  2. 手动映射
  3. 使用反射库（如 reflectable）
  ''');
}

// 替代方案：手动映射
class ManualMapper {
  static Map<String, dynamic> toMap(Person person) {
    return {
      'name': person.name,
      'age': person.age,
    };
  }
  
  static Person fromMap(Map<String, dynamic> map) {
    return Person(
      map['name'] as String,
      map['age'] as int,
    );
  }
}

// 使用手动映射
void useManualMapping() {
  Person person = Person('Alice', 25);
  
  Map<String, dynamic> map = ManualMapper.toMap(person);
  print('映射: $map'); // 映射: {name: Alice, age: 25}
  
  Person fromMap = ManualMapper.fromMap(map);
  print('反向映射: ${fromMap.name}, ${fromMap.age}');
}
```

### 2. 代码生成 vs 反射

```dart
// 代码生成 vs 反射
void codeGenVsReflection() {
  print('''
  代码生成的优势：
  1. 编译时生成，无运行时开销
  2. 类型安全
  3. 更好的性能
  4. 更小的包体积
  
  反射的优势：
  1. 更灵活
  2. 无需额外构建步骤
  3. 动态性更强
  
  在 Flutter 中推荐使用代码生成：
  - json_serializable
  - freezed
  - built_value
  - auto_route
  ''');
}
```

## 📖 注解处理器

### 1. 自定义注解处理器

```dart
// 自定义注解处理器
class FieldInfo {
  final String name;
  final String type;
  final bool nullable;
  
  const FieldInfo(this.name, this.type, {this.nullable = false});
}

class ClassInfo {
  final String name;
  final List<FieldInfo> fields;
  
  const ClassInfo(this.name, this.fields);
}

// 注解处理器
class AnnotationProcessor {
  static ClassInfo processClass(Type classType) {
    // 注意：这需要 dart:mirrors 或 reflectable
    // 这里只是示例
    
    // 手动定义类信息
    if (classType == Person) {
      return ClassInfo('Person', [
        FieldInfo('name', 'String'),
        FieldInfo('age', 'int'),
      ]);
    }
    
    throw ArgumentError('不支持的类型: $classType');
  }
  
  static String generateCode(ClassInfo classInfo) {
    StringBuffer buffer = StringBuffer();
    
    buffer.writeln('class ${classInfo.name} {');
    
    for (var field in classInfo.fields) {
      buffer.writeln('  final ${field.type} ${field.name};');
    }
    
    buffer.writeln();
    buffer.write('  ${classInfo.name}(');
    buffer.write(classInfo.fields.map((f) => 'this.${f.name}').join(', '));
    buffer.writeln(');');
    
    buffer.writeln('}');
    
    return buffer.toString();
  }
}

// 使用注解处理器
void useAnnotationProcessor() {
  ClassInfo classInfo = AnnotationProcessor.processClass(Person);
  String code = AnnotationProcessor.generateCode(classInfo);
  
  print('生成的代码:');
  print(code);
}
```

### 2. 运行时注解处理

```dart
// 运行时注解处理
class RuntimeAnnotationProcessor {
  static final Map<Type, Map<String, dynamic>> _metadata = {};
  
  static void register<T>(Map<String, dynamic> metadata) {
    _metadata[T] = metadata;
  }
  
  static Map<String, dynamic>? getMetadata<T>() {
    return _metadata[T];
  }
  
  static void processAnnotations() {
    // 注册元数据
    _metadata[Person] = {
      'tableName': 'users',
      'primaryKey': 'id',
      'fields': ['name', 'age'],
    };
  }
}

// 使用运行时注解处理
void useRuntimeAnnotation() {
  RuntimeAnnotationProcessor.processAnnotations();
  
  Map<String, dynamic>? metadata = RuntimeAnnotationProcessor.getMetadata<Person>();
  if (metadata != null) {
    print('表名: ${metadata['tableName']}');     // 表名: users
    print('主键: ${metadata['primaryKey']}');    // 主键: id
    print('字段: ${metadata['fields']}');        // 字段: [name, age]
  }
}
```

## 📖 反射库 (reflectable)

### 1. reflectable 基础

```dart
// reflectable 是 Flutter 中可用的反射库
// 需要在 pubspec.yaml 中添加依赖

/*
// pubspec.yaml
dependencies:
  reflectable: ^4.0.0

dev_dependencies:
  build_runner: ^2.4.0
*/

// 使用 reflectable
import 'package:reflectable/reflectable.dart';

// 定义反射能力
class MyReflectable extends Reflectable {
  const MyReflectable() : super(
    invokingCapability,
    declarationsCapability,
    typeRelationsCapability,
  );
}

const myReflectable = MyReflectable();

// 使用反射
@myReflectable
class Person {
  String name;
  int age;
  
  Person(this.name, this.age);
  
  void sayHello() => print('Hello, I am $name');
}

// 反射操作
void reflectableOperations() {
  // 获取类镜像
  ClassMirror classMirror = myReflectable.reflectType(Person) as ClassMirror;
  
  // 获取类名
  print('类名: ${classMirror.simpleName}'); // 类名: Person
  
  // 获取方法
  classMirror.instanceMembers.forEach((name, method) {
    if (method is MethodMirror) {
      print('方法: $name');
    }
  });
  
  // 创建实例
  InstanceMirror instanceMirror = classMirror.newInstance('', ['Alice', 25]);
  Person person = instanceMirror.reflectee as Person;
  
  print('姓名: ${person.name}'); // 姓名: Alice
  print('年龄: ${person.age}');   // 年龄: 25
  
  // 调用方法
  instanceMirror.invoke('sayHello', []); // Hello, I am Alice
}
```

## 📖 元编程模式

### 1. 代理模式

```dart
// 代理模式
abstract class Service {
  void execute();
}

class RealService implements Service {
  @override
  void execute() => print('真实服务执行');
}

class ServiceProxy implements Service {
  final RealService _realService = RealService();
  final List<String> _logs = [];
  
  @override
  void execute() {
    _logs.add('开始执行');
    _realService.execute();
    _logs.add('执行完成');
  }
  
  List<String> get logs => _logs;
}

// 使用代理模式
void useProxyPattern() {
  ServiceProxy proxy = ServiceProxy();
  proxy.execute();
  
  print('日志: ${proxy.logs}');
  // 日志: [开始执行, 执行完成]
}
```

### 2. 装饰器模式

```dart
// 装饰器模式
abstract class Coffee {
  double get cost;
  String get description;
}

class SimpleCoffee implements Coffee {
  @override
  double get cost => 10;
  
  @override
  String get description => '简单咖啡';
}

class CoffeeDecorator implements Coffee {
  final Coffee _coffee;
  
  CoffeeDecorator(this._coffee);
  
  @override
  double get cost => _coffee.cost;
  
  @override
  String get description => _coffee.description;
}

class MilkDecorator extends CoffeeDecorator {
  MilkDecorator(super.coffee);
  
  @override
  double get cost => super.cost + 5;
  
  @override
  String get description => '${super.description} + 牛奶';
}

class SugarDecorator extends CoffeeDecorator {
  SugarDecorator(super.coffee);
  
  @override
  double get cost => super.cost + 2;
  
  @override
  String get description => '${super.description} + 糖';
}

// 使用装饰器模式
void useDecoratorPattern() {
  Coffee coffee = SimpleCoffee();
  print('${coffee.description}: \$${coffee.cost}'); // 简单咖啡: $10
  
  coffee = MilkDecorator(coffee);
  print('${coffee.description}: \$${coffee.cost}'); // 简单咖啡 + 牛奶: $15
  
  coffee = SugarDecorator(coffee);
  print('${coffee.description}: \$${coffee.cost}'); // 简单咖啡 + 牛奶 + 糖: $17
}
```

### 3. 观察者模式

```dart
// 观察者模式
class Observer {
  final String name;
  final Function(String) onUpdate;
  
  Observer(this.name, this.onUpdate);
  
  void update(String message) {
    onUpdate(message);
  }
}

class Subject {
  final List<Observer> _observers = [];
  
  void attach(Observer observer) {
    _observers.add(observer);
  }
  
  void detach(Observer observer) {
    _observers.remove(observer);
  }
  
  void notify(String message) {
    for (var observer in _observers) {
      observer.update(message);
    }
  }
}

// 使用观察者模式
void useObserverPattern() {
  Subject subject = Subject();
  
  Observer observer1 = Observer('观察者1', (msg) => print('观察者1收到: $msg'));
  Observer observer2 = Observer('观察者2', (msg) => print('观察者2收到: $msg'));
  
  subject.attach(observer1);
  subject.attach(observer2);
  
  subject.notify('消息1');
  // 观察者1收到: 消息1
  // 观察者2收到: 消息1
  
  subject.detach(observer1);
  subject.notify('消息2');
  // 观察者2收到: 消息2
}
```

## 📖 元编程工具

### 1. 类型工具

```dart
// 类型工具
class TypeTools {
  static bool isNullable(Type type) {
    // 注意：这需要 dart:mirrors 或 reflectable
    // 这里只是示例
    return type.toString().endsWith('?');
  }
  
  static String getTypeName(Type type) {
    return type.toString();
  }
  
  static bool isSubtype<S, T>() {
    // 检查 S 是否是 T 的子类型
    return S is T;
  }
}

// 使用类型工具
void useTypeTools() {
  print('int 是可空: ${TypeTools.isNullable(int)}');           // int 是可空: false
  print('int? 是可空: ${TypeTools.isNullable(int?)}');         // int? 是可空: true
  print('类型名: ${TypeTools.getTypeName(List<int>)}');        // 类型名: List<int>
  print('int 是 num: ${TypeTools.isSubtype<int, num>()}');    // int 是 num: true
}
```

### 2. 方法工具

```dart
// 方法工具
class MethodTools {
  static List<String> getMethodNames(Type type) {
    // 注意：这需要 dart:mirrors 或 reflectable
    // 这里只是示例
    if (type == Person) {
      return ['sayHello'];
    }
    return [];
  }
  
  static dynamic invokeMethod(Object instance, String methodName, List<dynamic> args) {
    // 注意：这需要 dart:mirrors 或 reflectable
    // 这里只是示例
    if (instance is Person && methodName == 'sayHello') {
      (instance).sayHello();
      return null;
    }
    throw ArgumentError('方法不存在: $methodName');
  }
}

// 使用方法工具
void useMethodTools() {
  Person person = Person('Alice', 25);
  
  List<String> methods = MethodTools.getMethodNames(Person);
  print('方法: $methods'); // 方法: [sayHello]
  
  MethodTools.invokeMethod(person, 'sayHello', []); // Hello, I am Alice
}
```

## 📖 总结

### 元编程核心概念

| 概念 | 描述 | 使用场景 |
|------|------|----------|
| **反射** | 运行时检查和操作代码 | 动态调用、序列化 |
| **注解** | 为代码添加元数据 | 配置、代码生成 |
| **代码生成** | 编译时生成代码 | 减少样板代码 |
| **代理模式** | 控制对象访问 | 权限控制、日志 |
| **装饰器模式** | 动态添加功能 | 功能扩展 |
| **观察者模式** | 事件驱动编程 | 状态变化通知 |

### 在 Flutter 中的限制

1. **dart:mirrors 不可用**：Flutter 不支持 dart:mirrors
2. **代码生成**：使用 build_runner 和相关库
3. **反射库**：使用 reflectable 等第三方库
4. **手动映射**：在某些情况下更简单

### 最佳实践

1. **优先使用代码生成**：性能更好，类型安全
2. **谨慎使用反射**：性能开销大，增加包体积
3. **合理使用注解**：提供元数据，支持代码生成
4. **设计模式应用**：根据需求选择合适的模式

### 推荐工具

1. **json_serializable**：JSON 序列化
2. **freezed**：不可变类生成
3. **auto_route**：路由生成
4. **built_value**：不可变值类型
5. **reflectable**：Flutter 中的反射

### 下一步学习

- **Flutter 中的元编程**：在 Flutter 中应用元编程概念
- **代码生成实践**：使用 build_runner 生成代码
- **设计模式深入**：更多设计模式的应用

---

> 掌握 Dart 的元编程特性，理解反射、注解、代码生成等高级概念。在 Flutter 中，虽然 dart:mirports 不可用，但通过代码生成和反射库，我们仍然可以实现强大的元编程功能。