# Dart 语言基础

> Dart 是 Flutter 的开发语言，掌握 Dart 是学好 Flutter 的基础。

## 📖 基本语法

### 1. 变量与数据类型
```dart
// 变量声明
var name = 'Flutter';           // 类型推断
String language = 'Dart';       // 显式类型声明
int version = 3;                // 整数类型
double pi = 3.14;               // 浮点数类型
bool isAwesome = true;          // 布尔类型
dynamic anything = '可以改变类型'; // 动态类型

// 常量声明
const String appName = 'MyApp';           // 编译时常量
final DateTime now = DateTime.now();      // 运行时常量

// 空安全
String? nullableName = null;    // 可空类型
String nonNullableName = 'Flutter'; // 非空类型

// 类型转换
int number = 42;
String numberString = number.toString();
double numberDouble = number.toDouble();
int parsedInt = int.parse('42');
```

### 2. 运算符
```dart
// 算术运算符
int a = 10, b = 3;
int sum = a + b;        // 13
int difference = a - b; // 7
int product = a * b;    // 30
double quotient = a / b; // 3.333...
int remainder = a % b;  // 1

// 比较运算符
bool isEqual = a == b;      // false
bool isNotEqual = a != b;   // true
bool isGreater = a > b;     // true
bool isLess = a < b;        // false

// 逻辑运算符
bool and = true && false;   // false
bool or = true || false;    // true
bool not = !true;           // false

// 条件运算符
String result = a > b ? 'a更大' : 'b更大';

// 空安全运算符
String? name;
String displayName = name ?? '默认名称';
name?.length; // 如果 name 不为 null，调用 length
```

### 3. 控制流
```dart
// if-else 语句
int score = 85;
if (score >= 90) {
  print('优秀');
} else if (score >= 80) {
  print('良好');
} else if (score >= 60) {
  print('及格');
} else {
  print('不及格');
}

// switch-case 语句
String grade = 'A';
switch (grade) {
  case 'A':
    print('优秀');
    break;
  case 'B':
    print('良好');
    break;
  case 'C':
    print('及格');
    break;
  default:
    print('不及格');
}

// for 循环
for (int i = 0; i < 5; i++) {
  print('第 $i 次循环');
}

// while 循环
int count = 0;
while (count < 5) {
  print('当前计数: $count');
  count++;
}

// do-while 循环
int number = 0;
do {
  print('数字: $number');
  number++;
} while (number < 5);

// for-in 循环
List<String> fruits = ['苹果', '香蕉', '橙子'];
for (String fruit in fruits) {
  print('水果: $fruit');
}
```

### 4. 函数
```dart
// 基本函数
int add(int a, int b) {
  return a + b;
}

// 箭头函数
int multiply(int a, int b) => a * b;

// 可选参数
void greet(String name, [String? greeting]) {
  print('${greeting ?? '你好'}, $name!');
}

// 命名参数
void printUser({required String name, int age = 18, String? email}) {
  print('姓名: $name, 年龄: $age, 邮箱: $email');
}

// 默认参数
void createUser({String name = '匿名', int age = 18}) {
  print('创建用户: $name, $age岁');
}

// 函数作为参数
void processNumbers(List<int> numbers, int Function(int) processor) {
  for (int number in numbers) {
    print(processor(number));
  }
}

// 使用示例
processNumbers([1, 2, 3, 4, 5], (n) => n * 2);

// 闭包
Function createCounter() {
  int count = 0;
  return () {
    count++;
    return count;
  };
}

var counter = createCounter();
print(counter()); // 1
print(counter()); // 2
```

## 🎯 面向对象编程

### 1. 类与对象
```dart
// 基本类
class Person {
  String name;
  int age;
  
  // 构造函数
  Person(this.name, this.age);
  
  // 命名构造函数
  Person.guest() : name = '访客', age = 0;
  
  // 方法
  void sayHello() {
    print('你好，我是 $name，今年 $age 岁');
  }
  
  // getter 和 setter
  String get info => '$name ($age岁)';
  
  set setAge(int newAge) {
    if (newAge > 0) {
      age = newAge;
    }
  }
}

// 使用对象
var person = Person('张三', 25);
person.sayHello();
print(person.info);
person.setAge = 26;

var guest = Person.guest();
guest.sayHello();
```

### 2. 继承与多态
```dart
// 父类
class Animal {
  String name;
  
  Animal(this.name);
  
  void speak() {
    print('$name 发出声音');
  }
  
  void eat() {
    print('$name 在吃东西');
  }
}

// 子类
class Dog extends Animal {
  String breed;
  
  Dog(String name, this.breed) : super(name);
  
  @override
  void speak() {
    print('$name 汪汪叫');
  }
  
  void fetch() {
    print('$name 在捡球');
  }
}

class Cat extends Animal {
  Cat(String name) : super(name);
  
  @override
  void speak() {
    print('$name 喵喵叫');
  }
  
  void scratch() {
    print('$name 在抓东西');
  }
}

// 多态
void animalSpeak(Animal animal) {
  animal.speak();
}

var dog = Dog('旺财', '金毛');
var cat = Cat('咪咪');

animalSpeak(dog); // 旺财 汪汪叫
animalSpeak(cat); // 咪咪 喵喵叫
```

### 3. 抽象类与接口
```dart
// 抽象类
abstract class Shape {
  double get area;
  double get perimeter;
  
  void describe() {
    print('这是一个形状');
  }
}

// 接口
abstract class Drawable {
  void draw();
}

// 实现抽象类和接口
class Circle extends Shape implements Drawable {
  double radius;
  
  Circle(this.radius);
  
  @override
  double get area => 3.14159 * radius * radius;
  
  @override
  double get perimeter => 2 * 3.14159 * radius;
  
  @override
  void draw() {
    print('绘制圆形，半径: $radius');
  }
}

class Rectangle extends Shape implements Drawable {
  double width;
  double height;
  
  Rectangle(this.width, this.height);
  
  @override
  double get area => width * height;
  
  @override
  double get perimeter => 2 * (width + height);
  
  @override
  void draw() {
    print('绘制矩形，宽: $width，高: $height');
  }
}

// 使用
void printShapeInfo(Shape shape) {
  print('面积: ${shape.area}');
  print('周长: ${shape.perimeter}');
  shape.describe();
}

void drawShape(Drawable drawable) {
  drawable.draw();
}

var circle = Circle(5);
printShapeInfo(circle);
drawShape(circle);
```

### 4. Mixin
```dart
// Mixin 定义
mixin Swimmer {
  void swim() {
    print('游泳中...');
  }
}

mixin Flyer {
  void fly() {
    print('飞行中...');
  }
}

// 使用 Mixin
class Duck extends Animal with Swimmer, Flyer {
  Duck(String name) : super(name);
  
  @override
  void speak() {
    print('$name 嘎嘎叫');
  }
}

class Fish extends Animal with Swimmer {
  Fish(String name) : super(name);
  
  @override
  void speak() {
    print('$name 吐泡泡');
  }
}

// 使用
var duck = Duck('唐老鸭');
duck.speak();
duck.swim();
duck.fly();

var fish = Fish('尼莫');
fish.speak();
fish.swim();
```

## 🔄 异步编程

### 1. Future
```dart
// 创建 Future
Future<String> fetchData() async {
  // 模拟网络请求
  await Future.delayed(Duration(seconds: 2));
  return '数据加载完成';
}

// 使用 Future
void main() async {
  print('开始加载数据...');
  
  try {
    String data = await fetchData();
    print(data);
  } catch (e) {
    print('加载失败: $e');
  }
  
  print('程序结束');
}

// Future 链式调用
Future<void> processData() async {
  await fetchData()
      .then((data) => '处理: $data')
      .then((processed) => print(processed))
      .catchError((error) => print('错误: $error'));
}

// Future.wait - 并行执行多个 Future
Future<void> loadMultipleData() async {
  var results = await Future.wait([
    fetchData(),
    Future.delayed(Duration(seconds: 1), () => '快速数据'),
    Future.delayed(Duration(seconds: 3), () => '慢速数据'),
  ]);
  
  print('所有数据加载完成: $results');
}
```

### 2. Stream
```dart
// 创建 Stream
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i; // 产生值
  }
}

// 使用 Stream
void main() async {
  print('开始监听 Stream...');
  
  await for (int value in countStream()) {
    print('收到值: $value');
  }
  
  print('Stream 结束');
}

// Stream 转换
Stream<String> transformStream() {
  return countStream()
      .where((n) => n % 2 == 0) // 过滤偶数
      .map((n) => '数字: $n')   // 转换为字符串
      .take(2);                 // 只取前2个
}

// Stream 监听
void listenToStream() {
  var subscription = countStream().listen(
    (value) => print('收到: $value'),
    onError: (error) => print('错误: $error'),
    onDone: () => print('完成'),
  );
  
  // 取消订阅
  // subscription.cancel();
}
```

### 3. async/await 详解
```dart
// 基本用法
Future<int> calculate() async {
  await Future.delayed(Duration(seconds: 1));
  return 42;
}

// 错误处理
Future<void> riskyOperation() async {
  try {
    var result = await calculate();
    print('结果: $result');
  } catch (e) {
    print('发生错误: $e');
  } finally {
    print('清理工作');
  }
}

// 多个异步操作
Future<void> multipleOperations() async {
  // 顺序执行
  var result1 = await calculate();
  var result2 = await calculate();
  print('顺序结果: $result1, $result2');
  
  // 并行执行
  var results = await Future.wait([calculate(), calculate()]);
  print('并行结果: $results');
}

// 超时处理
Future<void> withTimeout() async {
  try {
    var result = await calculate().timeout(Duration(seconds: 2));
    print('结果: $result');
  } catch (e) {
    print('超时: $e');
  }
}
```

## 📦 集合类型

### 1. List (列表)
```dart
// 创建 List
List<int> numbers = [1, 2, 3, 4, 5];
List<String> names = ['张三', '李四', '王五'];
var mixed = [1, '二', 3.0, true]; // 动态类型

// 常用操作
numbers.add(6);           // 添加元素
numbers.remove(3);        // 移除元素
numbers.insert(0, 0);     // 在指定位置插入
numbers.contains(4);      // 是否包含
numbers.indexOf(2);       // 查找索引
numbers.length;           // 长度
numbers.isEmpty;          // 是否为空

// 遍历
for (var number in numbers) {
  print(number);
}

numbers.forEach((number) {
  print(number);
});

// 转换
var doubled = numbers.map((n) => n * 2).toList();
var evens = numbers.where((n) => n % 2 == 0).toList();
var sum = numbers.reduce((a, b) => a + b);

// 排序
numbers.sort();
numbers.sort((a, b) => b.compareTo(a)); // 降序

// 不可变 List
const immutableList = [1, 2, 3];
// immutableList.add(4); // 错误：不能修改
```

### 2. Set (集合)
```dart
// 创建 Set
Set<int> numbers = {1, 2, 3, 4, 5};
Set<String> names = {'张三', '李四', '王五'};

// 常用操作
numbers.add(6);           // 添加元素
numbers.remove(3);        // 移除元素
numbers.contains(4);      // 是否包含
numbers.length;           // 长度

// 集合运算
Set<int> setA = {1, 2, 3, 4};
Set<int> setB = {3, 4, 5, 6};

var union = setA.union(setB);           // 并集 {1, 2, 3, 4, 5, 6}
var intersection = setA.intersection(setB); // 交集 {3, 4}
var difference = setA.difference(setB);   // 差集 {1, 2}

// 遍历
for (var number in numbers) {
  print(number);
}

// 转换
var listFromSet = numbers.toList();
var setFromList = listFromSet.toSet();
```

### 3. Map (映射)
```dart
// 创建 Map
Map<String, int> scores = {
  '张三': 90,
  '李四': 85,
  '王五': 95,
};

// 常用操作
scores['赵六'] = 88;           // 添加键值对
scores.remove('李四');         // 移除键值对
scores.containsKey('张三');    // 是否包含键
scores.containsValue(90);     // 是否包含值
scores.length;                // 长度
scores.keys;                  // 所有键
scores.values;                // 所有值

// 遍历
scores.forEach((name, score) {
  print('$name: $score');
});

for (var entry in scores.entries) {
  print('${entry.key}: ${entry.value}');
}

// 转换
var doubled = scores.map((key, value) => MapEntry(key, value * 2));
var entries = scores.entries.toList();

// 合并 Map
Map<String, int> otherScores = {'钱七': 92, '孙八': 87};
scores.addAll(otherScores);
```

## 🎯 泛型

### 1. 泛型类
```dart
// 泛型类
class Box<T> {
  T value;
  
  Box(this.value);
  
  T getValue() => value;
  
  void setValue(T newValue) {
    value = newValue;
  }
}

// 使用
var intBox = Box<int>(42);
var stringBox = Box<String>('Hello');

print(intBox.getValue());    // 42
print(stringBox.getValue()); // Hello

// 泛型约束
class NumberBox<T extends num> {
  T value;
  
  NumberBox(this.value);
  
  T add(T other) {
    return (value + other) as T;
  }
}

var numBox = NumberBox<int>(10);
print(numBox.add(5)); // 15
// var stringBox = NumberBox<String>('Hello'); // 错误：String 不是 num
```

### 2. 泛型函数
```dart
// 泛型函数
T first<T>(List<T> list) {
  if (list.isEmpty) throw Exception('列表为空');
  return list.first;
}

// 使用
var firstInt = first([1, 2, 3]);        // int
var firstString = first(['a', 'b', 'c']); // String

// 泛型约束
T findMax<T extends Comparable<T>>(List<T> list) {
  if (list.isEmpty) throw Exception('列表为空');
  
  T max = list.first;
  for (var item in list) {
    if (item.compareTo(max) > 0) {
      max = item;
    }
  }
  return max;
}

var maxInt = findMax([3, 1, 4, 1, 5]); // 5
var maxString = findMax(['apple', 'banana', 'cherry']); // cherry
```

### 3. 泛型接口
```dart
// 泛型接口
abstract class Repository<T> {
  Future<T?> getById(String id);
  Future<List<T>> getAll();
  Future<void> save(T item);
  Future<void> delete(String id);
}

// 实现泛型接口
class UserRepository implements Repository<User> {
  @override
  Future<User?> getById(String id) async {
    // 实现
    return null;
  }
  
  @override
  Future<List<User>> getAll() async {
    // 实现
    return [];
  }
  
  @override
  Future<void> save(User item) async {
    // 实现
  }
  
  @override
  Future<void> delete(String id) async {
    // 实现
  }
}
```

## 🔧 错误处理

### 1. 异常类型
```dart
// 内置异常类型
void throwExceptions() {
  // 抛出异常
  throw Exception('这是一个异常');
  throw FormatException('格式错误');
  throw ArgumentError('参数错误');
  throw StateError('状态错误');
}

// 自定义异常
class AppException implements Exception {
  final String message;
  final int code;
  
  AppException(this.message, this.code);
  
  @override
  String toString() => 'AppException: $message (code: $code)';
}

class NetworkException extends AppException {
  NetworkException(String message) : super(message, 500);
}

class ValidationException extends AppException {
  ValidationException(String message) : super(message, 400);
}
```

### 2. 异常处理
```dart
// try-catch
void handleException() {
  try {
    throw Exception('测试异常');
  } catch (e) {
    print('捕获异常: $e');
  } finally {
    print('清理工作');
  }
}

// 捕获特定异常
void handleSpecificException() {
  try {
    throw FormatException('格式错误');
  } on FormatException catch (e) {
    print('格式异常: $e');
  } on Exception catch (e) {
    print('其他异常: $e');
  } catch (e) {
    print('未知错误: $e');
  }
}

// 异常链
void rethrowException() {
  try {
    throw Exception('原始异常');
  } catch (e) {
    print('处理异常: $e');
    rethrow; // 重新抛出
  }
}

// 异步异常处理
Future<void> asyncExceptionHandling() async {
  try {
    await Future.delayed(Duration(seconds: 1));
    throw Exception('异步异常');
  } catch (e) {
    print('异步异常: $e');
  }
}
```

## 📚 最佳实践

### 1. 代码规范
```dart
// 命名规范
class UserProfile { // 类名：大驼峰
  String userName;  // 变量名：小驼峰
  int userAge;
  
  void getUserInfo() { // 方法名：小驼峰
    // 方法体
  }
}

const int maxRetryCount = 3; // 常量：大写下划线

// 注释规范
/// 这是一个文档注释
/// 用于生成 API 文档
class Calculator {
  /// 计算两个数的和
  /// 
  /// [a] 第一个数
  /// [b] 第二个数
  /// 返回两个数的和
  int add(int a, int b) {
    return a + b;
  }
}

// 代码组织
class UserService {
  // 私有方法
  void _validateUser(User user) {
    // 验证逻辑
  }
  
  // 公开方法
  Future<void> createUser(User user) async {
    _validateUser(user);
    // 创建逻辑
  }
}
```

### 2. 性能优化
```dart
// 使用 const
const myWidget = const Text('Hello');
const myIcon = const Icon(Icons.star);

// 避免不必要的对象创建
class MyClass {
  // 使用 final 而不是 getter
  final String name;
  
  MyClass(this.name);
  
  // 避免每次调用都创建新对象
  String get greeting => 'Hello $name';
}

// 使用 lazy 初始化
class LazyExample {
  late final ExpensiveObject _object;
  
  ExpensiveObject get object {
    _object ??= ExpensiveObject();
    return _object!;
  }
}

// 异步优化
Future<void> optimizedAsync() async {
  // 并行执行
  var results = await Future.wait([
    fetchData1(),
    fetchData2(),
    fetchData3(),
  ]);
  
  // 而不是顺序执行
  // var result1 = await fetchData1();
  // var result2 = await fetchData2();
  // var result3 = await fetchData3();
}
```

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[架构模式]] - 架构模式详解

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[状态管理]] - 状态管理方案
- [[导航与路由]] - 导航与路由系统

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*