# Dart 语言进阶特性

> 掌握 Dart 的高级特性，为 Flutter 开发打下坚实基础。

## 📖 异步编程

### 1. Future 和 async/await

```dart
// Future 基础
Future<String> fetchData() async {
  // 模拟网络请求
  await Future.delayed(Duration(seconds: 2));
  return '数据加载完成';
}

// async/await 使用
void main() async {
  print('开始加载数据...');
  String data = await fetchData();
  print(data); // 数据加载完成
}

// Future 链式调用
Future<void> processData() async {
  await fetchData()
    .then((data) => '处理: $data')
    .then((processed) => print(processed))
    .catchError((error) => print('错误: $error'));
}
```

### 2. Stream 和异步迭代

```dart
// Stream 基础
Stream<int> countStream() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i; // 产生一个值
  }
}

// 监听 Stream
void listenToStream() async {
  await for (int count in countStream()) {
    print('计数: $count');
  }
}

// Stream 转换
Stream<String> transformStream() {
  return countStream()
    .where((n) => n % 2 == 0) // 过滤偶数
    .map((n) => '数字: $n')   // 转换为字符串
    .take(3);                 // 取前3个
}
```

### 3. Completer 和高级异步控制

```dart
// Completer 使用
Future<String> createCompleter() {
  Completer<String> completer = Completer();
  
  // 模拟异步操作
  Future.delayed(Duration(seconds: 2), () {
    completer.complete('操作完成');
  });
  
  return completer.future;
}

// 并行执行
Future<void> parallelExecution() async {
  List<Future<String>> futures = [
    fetchData(),
    fetchData(),
    fetchData(),
  ];
  
  // 等待所有完成
  List<String> results = await Future.wait(futures);
  print('所有结果: $results');
}
```

## 📖 集合类型

### 1. List 高级操作

```dart
// List 初始化
List<int> numbers = [1, 2, 3, 4, 5];
List<int> fixedList = List.filled(5, 0); // [0, 0, 0, 0, 0]
List<int> generatedList = List.generate(5, (i) => i * 2); // [0, 2, 4, 6, 8]

// List 方法
void listOperations() {
  // 添加
  numbers.add(6);
  numbers.addAll([7, 8, 9]);
  numbers.insert(0, 0); // 在索引0插入
  
  // 删除
  numbers.remove(5); // 删除值为5的元素
  numbers.removeAt(0); // 删除索引0的元素
  numbers.removeWhere((n) => n > 7); // 删除大于7的元素
  
  // 查找
  int? firstEven = numbers.firstWhere((n) => n % 2 == 0);
  int? lastOdd = numbers.lastWhere((n) => n % 2 != 0);
  bool hasNegative = numbers.any((n) => n < 0);
  bool allPositive = numbers.every((n) => n > 0);
  
  // 转换
  List<String> strings = numbers.map((n) => '数字$n').toList();
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  int sum = numbers.fold(0, (prev, n) => prev + n);
  
  // 排序
  numbers.sort((a, b) => b.compareTo(a)); // 降序
  numbers.shuffle(); // 随机打乱
  
  // 分组
  Map<int, List<int>> grouped = numbers.groupFoldBy(
    (n) => n % 3, // 按模3分组
    (List<int>? previous, n) => (previous ?? [])..add(n)
  );
}
```

### 2. Map 高级操作

```dart
// Map 初始化
Map<String, int> scores = {'Alice': 90, 'Bob': 85, 'Charlie': 95};
Map<String, int> fromIterable = Map.fromIterable(
  ['Alice', 'Bob', 'Charlie'],
  key: (name) => name,
  value: (_) => 0,
);

// Map 方法
void mapOperations() {
  // 添加和更新
  scores['David'] = 88;
  scores.putIfAbsent('Eve', () => 92);
  scores.update('Alice', (score) => score + 5);
  scores.updateAll((name, score) => score + 2);
  
  // 删除
  scores.remove('Bob');
  scores.removeWhere((name, score) => score < 90);
  
  // 查找
  int? aliceScore = scores['Alice'];
  bool hasDavid = scores.containsKey('David');
  bool hasScore90 = scores.containsValue(90);
  
  // 转换
  Map<String, String> strings = scores.map(
    (name, score) => MapEntry(name, '分数: $score')
  );
  
  // 过滤
  Map<String, int> highScores = Map.fromEntries(
    scores.entries.where((e) => e.value >= 90)
  );
  
  // 合并
  Map<String, int> newScores = {'Frank': 87};
  scores.addAll(newScores);
}
```

### 3. Set 高级操作

```dart
// Set 初始化
Set<int> setA = {1, 2, 3, 4, 5};
Set<int> setB = {4, 5, 6, 7, 8};
Set<int> fromList = Set.from([1, 2, 3, 4, 5]);

// Set 操作
void setOperations() {
  // 集合运算
  Set<int> union = setA.union(setB);        // {1, 2, 3, 4, 5, 6, 7, 8}
  Set<int> intersection = setA.intersection(setB); // {4, 5}
  Set<int> difference = setA.difference(setB);     // {1, 2, 3}
  
  // 集合判断
  bool isSubset = setA.every((n) => setB.contains(n));
  bool isSuperset = setA.containsAll(setB);
  bool isDisjoint = setA.intersection(setB).isEmpty;
  
  // 集合操作
  setA.add(6);
  setA.addAll([7, 8, 9]);
  setA.remove(9);
  setA.removeWhere((n) => n > 7);
  
  // 转换
  List<int> list = setA.toList();
  String string = setA.join(', ');
}
```

## 📖 泛型

### 1. 泛型类

```dart
// 泛型类定义
class Box<T> {
  T value;
  
  Box(this.value);
  
  T getValue() => value;
  void setValue(T newValue) => value = newValue;
}

// 泛型使用
void useGenerics() {
  Box<int> intBox = Box(42);
  Box<String> stringBox = Box('Hello');
  Box<List<int>> listBox = Box([1, 2, 3]);
  
  print(intBox.getValue());    // 42
  print(stringBox.getValue()); // Hello
  print(listBox.getValue());   // [1, 2, 3]
}
```

### 2. 泛型函数

```dart
// 泛型函数
T firstElement<T>(List<T> list) {
  if (list.isEmpty) {
    throw StateError('列表为空');
  }
  return list.first;
}

// 泛型函数使用
void useGenericFunctions() {
  int first = firstElement([1, 2, 3]);           // 1
  String firstStr = firstElement(['a', 'b', 'c']); // 'a'
  
  // 泛型约束
  T max<T extends Comparable<T>>(T a, T b) {
    return a.compareTo(b) > 0 ? a : b;
  }
  
  int maximum = max(10, 20); // 20
  String maxStr = max('apple', 'banana'); // 'banana'
}
```

### 3. 泛型约束

```dart
// 泛型约束
abstract class Animal {
  void makeSound();
}

class Dog implements Animal {
  @override
  void makeSound() => print('汪汪');
}

class Cat implements Animal {
  @override
  void makeSound() => print('喵喵');
}

// 泛型约束使用
class AnimalShelter<T extends Animal> {
  List<T> animals = [];
  
  void addAnimal(T animal) {
    animals.add(animal);
  }
  
  void makeAllSounds() {
    for (var animal in animals) {
      animal.makeSound();
    }
  }
}

void useConstrainedGenerics() {
  AnimalShelter<Dog> dogShelter = AnimalShelter();
  dogShelter.addAnimal(Dog());
  dogShelter.makeAllSounds(); // 汪汪
}
```

## 📖 Mixin

### 1. Mixin 基础

```dart
// Mixin 定义
mixin Swimmer {
  void swim() => print('游泳中...');
  
  @override
  String toString() => '游泳者';
}

mixin Flyer {
  void fly() => print('飞行中...');
  
  @override
  String toString() => '飞行者';
}

// 使用 Mixin
class Duck with Swimmer, Flyer {
  void quack() => print('嘎嘎嘎');
}

void useMixin() {
  Duck duck = Duck();
  duck.swim();  // 游泳中...
  duck.fly();   // 飞行中...
  duck.quack(); // 嘎嘎嘎
}
```

### 2. Mixin 约束

```dart
// Mixin 约束
mixin Performer {
  void perform() => print('表演中...');
}

mixin Musician on Performer {
  void playMusic() => print('演奏音乐');
  
  @override
  void perform() {
    playMusic();
    super.perform();
  }
}

mixin Dancer on Performer {
  void dance() => print('跳舞');
  
  @override
  void perform() {
    dance();
    super.perform();
  }
}

// 使用约束 Mixin
class Artist with Performer, Musician, Dancer {
  @override
  void perform() {
    print('艺术家表演:');
    super.perform();
  }
}

void useConstrainedMixin() {
  Artist artist = Artist();
  artist.perform();
  // 输出:
  // 艺术家表演:
  // 跳舞
  // 演奏音乐
  // 表演中...
}
```

### 3. Mixin 类型检查

```dart
// Mixin 类型检查
void mixinTypeCheck() {
  Duck duck = Duck();
  
  // 类型检查
  print(duck is Swimmer); // true
  print(duck is Flyer);   // true
  print(duck is Animal);  // false
  
  // 类型转换
  if (duck is Swimmer) {
    Swimmer swimmer = duck as Swimmer;
    swimmer.swim();
  }
  
  // 获取 Mixin 类型
  print(duck.runtimeType); // Duck
}
```

## 📖 扩展方法

### 1. 扩展方法基础

```dart
// 扩展 String
extension StringExtensions on String {
  bool get isEmail => contains('@') && contains('.');
  
  String get capitalized => '${this[0].toUpperCase()}${substring(1)}';
  
  String get reversed => split('').reversed.join();
  
  int get wordCount => split(' ').length;
  
  String truncate(int length) => this.length > length 
      ? '${substring(0, length)}...' 
      : this;
}

// 使用扩展方法
void useExtensions() {
  String email = 'test@example.com';
  print(email.isEmail); // true
  
  String name = 'flutter';
  print(name.capitalized); // Flutter
  print(name.reversed);    // rettulf
  print(name.wordCount);   // 1
  
  String longText = '这是一个很长的文本';
  print(longText.truncate(5)); // 这是一个...
}
```

### 2. 扩展泛型

```dart
// 扩展泛型类型
extension ListExtensions<T> on List<T> {
  T? get firstOrNull => isEmpty ? null : first;
  
  T? get lastOrNull => isEmpty ? null : last;
  
  List<T> get unique => toSet().toList();
  
  List<T> shuffled() {
    List<T> list = List.from(this);
    list.shuffle();
    return list;
  }
  
  Map<K, List<T>> groupBy<K>(K Function(T) keyFunction) {
    Map<K, List<T>> map = {};
    for (var item in this) {
      K key = keyFunction(item);
      map.putIfAbsent(key, () => []).add(item);
    }
    return map;
  }
}

// 使用泛型扩展
void useGenericExtensions() {
  List<int> numbers = [1, 2, 3, 4, 5, 1, 2, 3];
  
  print(numbers.firstOrNull); // 1
  print(numbers.lastOrNull);  // 3
  print(numbers.unique);      // [1, 2, 3, 4, 5]
  print(numbers.shuffled());  // 随机顺序
  
  Map<int, List<int>> grouped = numbers.groupBy((n) => n % 3);
  print(grouped); // {1: [1, 4, 1], 2: [2, 5, 2], 0: [3, 3]}
}
```

### 3. 扩展枚举

```dart
// 扩展枚举
enum Season { spring, summer, autumn, winter }

extension SeasonExtensions on Season {
  String get name {
    switch (this) {
      case Season.spring: return '春天';
      case Season.summer: return '夏天';
      case Season.autumn: return '秋天';
      case Season.winter: return '冬天';
    }
  }
  
  String get emoji {
    switch (this) {
      case Season.spring: return '🌸';
      case Season.summer: return '☀️';
      case Season.autumn: return '🍂';
      case Season.winter: return '❄️';
    }
  }
  
  bool get isCold => this == Season.winter || this == Season.autumn;
  
  Season get next => Season.values[(index + 1) % Season.values.length];
}

// 使用枚举扩展
void useEnumExtensions() {
  Season current = Season.summer;
  print(current.name);  // 夏天
  print(current.emoji); // ☀️
  print(current.isCold); // false
  print(current.next);   // 秋天
}
```

## 📖 高级类型

### 1. 联合类型模拟

```dart
// 模拟联合类型
class Success<T> {
  final T data;
  Success(this.data);
}

class Failure {
  final String error;
  Failure(this.error);
}

// 使用联合类型
Result<T> performOperation<T>(T Function() operation) {
  try {
    return Result.success(operation());
  } catch (e) {
    return Result.failure(e.toString());
  }
}

class Result<T> {
  final T? data;
  final String? error;
  final bool isSuccess;
  
  Result.success(T data) : data = data, error = null, isSuccess = true;
  Result.failure(String error) : data = null, error = error, isSuccess = false;
  
  void when({
    required void Function(T data) success,
    required void Function(String error) failure,
  }) {
    if (isSuccess) {
      success(data as T);
    } else {
      failure(error!);
    }
  }
}

// 使用联合类型
void useUnionTypes() {
  Result<int> result = performOperation(() => 42 ~/ 0);
  
  result.when(
    success: (data) => print('结果: $data'),
    failure: (error) => print('错误: $error'),
  );
}
```

### 2. 类型别名

```dart
// 类型别名
typedef JsonMap = Map<String, dynamic>;
typedef IntToString = String Function(int);
typedef AsyncFunction<T> = Future<T> Function();

// 使用类型别名
JsonMap createUser(String name, int age) {
  return {'name': name, 'age': age};
}

IntToString intToString = (n) => '数字: $n';

AsyncFunction<String> fetchData = () async {
  await Future.delayed(Duration(seconds: 1));
  return '数据加载完成';
};

void useTypeAliases() {
  JsonMap user = createUser('Alice', 25);
  print(user); // {name: Alice, age: 25}
  
  print(intToString(42)); // 数字: 42
  
  fetchData().then(print); // 数据加载完成
}
```

### 3. 可空类型

```dart
// 可空类型
void nullableTypes() {
  // 可空声明
  String? nullableString = null;
  int? nullableInt = null;
  
  // 空安全操作
  String? name;
  int? length = name?.length; // null
  String displayName = name ?? '匿名';
  
  // 空安全转换
  String? maybeNull = '不是空';
  String definitelyNotNull = maybeNull!; // 如果为空会抛出异常
  
  // 空安全条件
  String? possiblyNull;
  if (possiblyNull != null) {
    print(possiblyNull.length); // 安全访问
  }
  
  // 空安全集合
  List<String?> nullableList = ['a', null, 'b'];
  List<String> nonNullList = nullableList.whereType<String>().toList();
}
```

## 📖 枚举和模式匹配

### 1. 增强枚举

```dart
// 增强枚举
enum HttpStatus {
  ok(200, 'OK'),
  notFound(404, 'Not Found'),
  serverError(500, 'Internal Server Error');
  
  final int code;
  final String message;
  
  const HttpStatus(this.code, this.message);
  
  bool get isSuccess => code >= 200 && code < 300;
  bool get isError => code >= 400;
  
  static HttpStatus fromCode(int code) {
    return HttpStatus.values.firstWhere(
      (status) => status.code == code,
      orElse: () => HttpStatus.serverError,
    );
  }
}

// 使用增强枚举
void useEnhancedEnum() {
  HttpStatus status = HttpStatus.ok;
  print(status.code);    // 200
  print(status.message); // OK
  print(status.isSuccess); // true
  
  HttpStatus fromCode = HttpStatus.fromCode(404);
  print(fromCode); // HttpStatus.notFound
}
```

### 2. 模式匹配

```dart
// 模式匹配
void patternMatching() {
  // switch 表达式
  String describe(int number) => switch (number) {
    < 0 => '负数',
    0 => '零',
    > 0 && < 10 => '个位数正数',
    _ => '多位数',
  };
  
  // 解构赋值
  var (x, y) = (1, 2);
  print('x: $x, y: $y'); // x: 1, y: 2
  
  // Map 解构
  var {'name': String name, 'age': int age} = {'name': 'Alice', 'age': 25};
  print('姓名: $name, 年龄: $age');
  
  // List 解构
  var [first, ...rest] = [1, 2, 3, 4, 5];
  print('第一个: $first, 其余: $rest'); // 第一个: 1, 其余: [2, 3, 4, 5]
}
```

## 📖 异步迭代器

### 1. 异步生成器

```dart
// 异步生成器
Stream<int> asyncGenerator() async* {
  for (int i = 1; i <= 5; i++) {
    await Future.delayed(Duration(milliseconds: 500));
    yield i;
  }
}

// 异步迭代
void useAsyncGenerator() async {
  await for (int value in asyncGenerator()) {
    print('接收到: $value');
  }
}

// 异步映射
Stream<String> asyncMapping() {
  return asyncGenerator().map((n) => '处理: $n');
}

// 异步过滤
Stream<int> asyncFiltering() {
  return asyncGenerator().where((n) => n % 2 == 0);
}
```

### 2. 异步 reduce

```dart
// 异步 reduce
Future<int> asyncReduce() async {
  return await asyncGenerator().fold(0, (sum, n) => sum + n);
}

// 异步 forEach
Future<void> asyncForEach() async {
  await asyncGenerator().forEach((n) {
    print('处理: $n');
  });
}

// 异步转换
Future<List<String>> asyncTransform() async {
  return await asyncGenerator()
    .map((n) => '项目 $n')
    .toList();
}
```

## 📖 错误处理

### 1. 自定义异常

```dart
// 自定义异常
class AppException implements Exception {
  final String message;
  final int? code;
  final StackTrace? stackTrace;
  
  AppException(this.message, {this.code, this.stackTrace});
  
  @override
  String toString() => 'AppException: $message (code: $code)';
}

class NetworkException extends AppException {
  NetworkException(String message) : super(message, code: 1001);
}

class ValidationException extends AppException {
  ValidationException(String message) : super(message, code: 1002);
}

// 使用自定义异常
void useCustomExceptions() {
  try {
    throw NetworkException('网络连接失败');
  } on NetworkException catch (e) {
    print('网络错误: $e');
  } on ValidationException catch (e) {
    print('验证错误: $e');
  } catch (e) {
    print('未知错误: $e');
  } finally {
    print('清理资源');
  }
}
```

### 2. 错误恢复

```dart
// 错误恢复
Future<String> fetchDataWithRetry() async {
  int retryCount = 0;
  const maxRetries = 3;
  
  while (retryCount < maxRetries) {
    try {
      return await fetchData();
    } catch (e) {
      retryCount++;
      if (retryCount == maxRetries) {
        rethrow;
      }
      await Future.delayed(Duration(seconds: retryCount));
    }
  }
  
  throw StateError('不应该到达这里');
}

// 错误处理链
Future<String> handleErrorChain() async {
  return await fetchData()
    .then((data) => '处理: $data')
    .catchError((error) {
      print('处理错误: $error');
      return '默认值';
    })
    .whenComplete(() => print('操作完成'));
}
```

## 📖 性能优化

### 1. 延迟初始化

```dart
// 延迟初始化
class HeavyResource {
  HeavyResource() {
    print('HeavyResource 初始化');
  }
  
  void doWork() => print('工作执行中...');
}

class LazyLoader {
  late final HeavyResource _resource;
  
  LazyLoader() {
    print('LazyLoader 创建');
  }
  
  HeavyResource get resource {
    _resource ??= HeavyResource();
    return _resource;
  }
}

void useLazyInitialization() {
  LazyLoader loader = LazyLoader(); // 只打印 LazyLoader 创建
  // HeavyResource 还没有初始化
  
  loader.resource.doWork(); // 这时才初始化 HeavyResource
}
```

### 2. 内存优化

```dart
// 内存优化
class MemoryOptimized {
  final List<int> _data = [];
  
  void addData(int value) {
    _data.add(value);
  }
  
  // 使用迭代器而不是创建新列表
  Iterable<int> get evenNumbers => _data.where((n) => n % 2 == 0);
  
  // 使用生成器而不是创建完整列表
  Stream<int> generateNumbers() async* {
    for (int i = 0; i < 1000; i++) {
      yield i;
    }
  }
  
  // 清理资源
  void dispose() {
    _data.clear();
  }
}
```

## 📖 总结

### Dart 进阶特性一览

| 特性 | 描述 | 使用场景 |
|------|------|----------|
| **异步编程** | Future、Stream、async/await | 网络请求、文件操作 |
| **集合类型** | List、Map、Set 高级操作 | 数据处理、算法实现 |
| **泛型** | 类型安全、代码复用 | 通用数据结构、算法 |
| **Mixin** | 代码复用、多重继承 | 功能组合、行为扩展 |
| **扩展方法** | 为现有类添加功能 | 工具方法、语法糖 |
| **高级类型** | 联合类型、类型别名 | 复杂数据结构 |
| **枚举增强** | 带数据的枚举 | 状态管理、配置 |
| **错误处理** | 自定义异常、错误恢复 | 健壮性、用户体验 |
| **性能优化** | 延迟初始化、内存优化 | 性能敏感场景 |

### 最佳实践

1. **异步编程**：使用 async/await 简化异步代码
2. **集合操作**：优先使用内置方法，避免手动循环
3. **泛型**：在需要类型安全时使用泛型
4. **Mixin**：用于代码复用，避免深层继承
5. **扩展方法**：为现有类添加功能，保持代码整洁
6. **错误处理**：使用自定义异常，提供清晰的错误信息
7. **性能优化**：合理使用延迟初始化，避免内存泄漏

### 下一步学习

- **Dart 面向对象**：类、继承、接口、抽象类
- **Dart 函数式编程**：Lambda、高阶函数、闭包
- **Dart 元编程**：反射、注解、代码生成

---

> 掌握 Dart 的进阶特性，为 Flutter 高级开发打下坚实基础。这些特性将帮助你编写更高效、更安全、更易维护的代码。