# Dart 函数式编程

> 掌握 Dart 的函数式编程特性，包括 Lambda、高阶函数、闭包等核心概念。

## 📖 Lambda 表达式

### 1. 基本 Lambda

```dart
// 基本 Lambda 表达式
void basicLambda() {
  // 传统函数
  int add(int a, int b) {
    return a + b;
  }
  
  // Lambda 表达式
  int addLambda = (int a, int b) => a + b;
  
  // 使用
  print('传统函数: ${add(2, 3)}');      // 传统函数: 5
  print('Lambda 表达式: ${addLambda(2, 3)}'); // Lambda 表达式: 5
  
  // 无参数 Lambda
  void sayHello = () => print('Hello, Dart!');
  sayHello(); // Hello, Dart!
  
  // 单参数 Lambda
  int square = (int x) => x * x;
  print('平方: ${square(5)}'); // 平方: 25
}
```

### 2. Lambda 类型

```dart
// Lambda 类型
void lambdaTypes() {
  // 函数类型
  typedef IntOperation = int Function(int, int);
  
  IntOperation multiply = (a, b) => a * b;
  IntOperation divide = (a, b) => a ~/ b;
  
  print('乘法: ${multiply(4, 5)}'); // 乘法: 20
  print('除法: ${divide(10, 3)}');  // 除法: 3
  
  // 可选参数 Lambda
  int Function(int, [int]) addWithDefault = (a, [b = 10]) => a + b;
  print('带默认值: ${addWithDefault(5)}');     // 带默认值: 15
  print('指定值: ${addWithDefault(5, 3)}');    // 指定值: 8
  
  // 命名参数 Lambda
  int Function({int a, int b}) subtract = ({a = 0, b = 0}) => a - b;
  print('命名参数: ${subtract(a: 10, b: 3)}'); // 命名参数: 7
}
```

### 3. 立即执行 Lambda

```dart
// 立即执行 Lambda
void immediateLambda() {
  // 立即执行
  int result = ((int x) => x * x)(5);
  print('立即执行: $result'); // 立即执行: 25
  
  // 复杂计算
  int complexResult = ((int a, int b) {
    int sum = a + b;
    int product = a * b;
    return sum + product;
  })(3, 4);
  print('复杂计算: $complexResult'); // 复杂计算: 19
  
  // 用于初始化
  final List<int> numbers = ((List<int> list) {
    list.sort();
    return list;
  })([3, 1, 4, 1, 5, 9, 2, 6]);
  print('排序后: $numbers'); // 排序后: [1, 1, 2, 3, 4, 5, 6, 9]
}
```

## 📖 高阶函数

### 1. 函数作为参数

```dart
// 函数作为参数
void functionAsParameter() {
  // 高阶函数
  int operate(int a, int b, IntOperation operation) {
    return operation(a, b);
  }
  
  // 使用
  print('加法: ${operate(5, 3, (a, b) => a + b)}');       // 加法: 8
  print('减法: ${operate(5, 3, (a, b) => a - b)}');       // 减法: 2
  print('乘法: ${operate(5, 3, (a, b) => a * b)}');       // 乘法: 15
  
  // 复杂操作
  String formatResult(int value, String Function(int) formatter) {
    return formatter(value);
  }
  
  print(formatResult(42, (n) => '数字: $n'));           // 数字: 42
  print(formatResult(42, (n) => '十六进制: ${n.toRadixString(16)}')); // 十六进制: 2a
}
```

### 2. 函数作为返回值

```dart
// 函数作为返回值
void functionAsReturnValue() {
  // 创建操作函数
  IntOperation createAdder(int addend) {
    return (a, b) => a + b + addend;
  }
  
  IntOperation add5 = createAdder(5);
  print('加5: ${add5(10, 20)}'); // 加5: 35
  
  // 创建验证函数
  bool Function(String) createValidator(int minLength) {
    return (String text) => text.length >= minLength;
  }
  
  var minLengthValidator = createValidator(5);
  print('验证 "Hello": ${minLengthValidator("Hello")}'); // 验证 "Hello": true
  print('验证 "Hi": ${minLengthValidator("Hi")}');       // 验证 "Hi": false
  
  // 创建转换函数
  String Function(int) createConverter(String prefix) {
    return (int value) => '$prefix$value';
  }
  
  var dollarConverter = createConverter('\$');
  print(dollarConverter(100)); // $100
}
```

### 3. 函数组合

```dart
// 函数组合
void functionComposition() {
  // 基本组合
  T Function(A) compose<A, B, T>(T Function(B) f, B Function(A) g) {
    return (A a) => f(g(a));
  }
  
  // 使用
  int addOne(int x) => x + 1;
  int doubleIt(int x) => x * 2;
  
  var doubleAndAddOne = compose(addOne, doubleIt);
  print('组合: ${doubleAndAddOne(5)}'); // 组合: 11
  
  // 复杂组合
  String formatNumber(int n) => '数字: $n';
  int parseNumber(String s) => int.parse(s);
  
  var parseAndFormat = compose(formatNumber, parseNumber);
  print(parseAndFormat('42')); // 数字: 42
  
  // 管道操作
  T pipe<A, T>(A value, List<T Function(dynamic)> functions) {
    dynamic result = value;
    for (var func in functions) {
      result = func(result);
    }
    return result as T;
  }
  
  var result = pipe<int, String>(42, [
    (n) => n * 2,
    (n) => n + 10,
    (n) => '结果: $n',
  ]);
  print(result); // 结果: 94
}
```

## 📖 闭包

### 1. 基本闭包

```dart
// 基本闭包
void basicClosure() {
  // 闭包捕获变量
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
  print(counter()); // 3
  
  // 多个闭包共享变量
  Function createAdder() {
    int sum = 0;
    return (int value) {
      sum += value;
      return sum;
    };
  }
  
  var adder = createAdder();
  print(adder(5));  // 5
  print(adder(10)); // 15
  print(adder(3));  // 18
}
```

### 2. 闭包与作用域

```dart
// 闭包与作用域
void closureAndScope() {
  // 嵌套闭包
  Function createMultiplier(int factor) {
    return (int value) {
      return value * factor;
    };
  }
  
  var double = createMultiplier(2);
  var triple = createMultiplier(3);
  
  print('双倍: ${double(5)}');  // 双倍: 10
  print('三倍: ${triple(5)}');  // 三倍: 15
  
  // 闭包修改外部变量
  void modifyWithClosure() {
    int value = 100;
    
    Function modifier = (int change) {
      value += change;
      return value;
    };
    
    print(modifier(50));  // 150
    print(modifier(-30)); // 120
    print('最终值: $value'); // 最终值: 120
  }
  
  modifyWithClosure();
}
```

### 3. 闭包与回调

```dart
// 闭包与回调
void closureAndCallback() {
  // 异步回调
  Future<void> fetchData(Function(String) onSuccess, Function(String) onError) async {
    await Future.delayed(Duration(seconds: 1));
    
    bool success = true; // 模拟成功
    
    if (success) {
      onSuccess('数据加载成功');
    } else {
      onError('数据加载失败');
    }
  }
  
  // 使用闭包作为回调
  fetchData(
    (data) => print('成功: $data'),
    (error) => print('错误: $error'),
  );
  
  // 事件处理器
  class EventEmitter {
    final Map<String, List<Function>> _listeners = {};
    
    void on(String event, Function callback) {
      _listeners.putIfAbsent(event, () => []).add(callback);
    }
    
    void emit(String event, [dynamic data]) {
      for (var callback in _listeners[event] ?? []) {
        callback(data);
      }
    }
  }
  
  var emitter = EventEmitter();
  emitter.on('click', (data) => print('点击事件: $data'));
  emitter.on('click', (data) => print('另一个点击处理器: $data'));
  
  emitter.emit('click', '按钮A');
  // 点击事件: 按钮A
  // 另一个点击处理器: 按钮A
}
```

## 📖 集合操作

### 1. Map 操作

```dart
// Map 操作
void mapOperations() {
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Map 转换
  List<int> squares = numbers.map((n) => n * n).toList();
  print('平方: $squares'); // 平方: [1, 4, 9, 16, 25]
  
  // Map 转换为字符串
  List<String> strings = numbers.map((n) => '数字$n').toList();
  print('字符串: $strings'); // 字符串: [数字1, 数字2, 数字3, 数字4, 数字5]
  
  // 复杂 Map
  List<Map<String, dynamic>> users = [
    {'name': 'Alice', 'age': 25},
    {'name': 'Bob', 'age': 30},
    {'name': 'Charlie', 'age': 35},
  ];
  
  List<String> names = users.map((user) => user['name'] as String).toList();
  print('姓名: $names'); // 姓名: [Alice, Bob, Charlie]
  
  List<int> ages = users.map((user) => user['age'] as int).toList();
  print('年龄: $ages'); // 年龄: [25, 30, 35]
}
```

### 2. Where 过滤

```dart
// Where 过滤
void whereOperations() {
  List<int> numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // 过滤偶数
  List<int> evens = numbers.where((n) => n % 2 == 0).toList();
  print('偶数: $evens'); // 偶数: [2, 4, 6, 8, 10]
  
  // 过滤大于5的数
  List<int> greaterThan5 = numbers.where((n) => n > 5).toList();
  print('大于5: $greaterThan5'); // 大于5: [6, 7, 8, 9, 10]
  
  // 复杂过滤
  List<Map<String, dynamic>> users = [
    {'name': 'Alice', 'age': 25, 'active': true},
    {'name': 'Bob', 'age': 30, 'active': false},
    {'name': 'Charlie', 'age': 35, 'active': true},
  ];
  
  List<Map<String, dynamic>> activeUsers = users
      .where((user) => user['active'] == true)
      .toList();
  print('活跃用户: $activeUsers');
  // 活跃用户: [{name: Alice, age: 25, active: true}, {name: Charlie, age: 35, active: true}]
}
```

### 3. Reduce 和 Fold

```dart
// Reduce 和 Fold
void reduceAndFold() {
  List<int> numbers = [1, 2, 3, 4, 5];
  
  // Reduce
  int sum = numbers.reduce((a, b) => a + b);
  print('总和: $sum'); // 总和: 15
  
  int product = numbers.reduce((a, b) => a * b);
  print('乘积: $product'); // 乘积: 120
  
  // Fold
  int sumWithFold = numbers.fold(0, (sum, n) => sum + n);
  print('Fold 总和: $sumWithFold'); // Fold 总和: 15
  
  String concatenated = numbers.fold('', (str, n) => '$str$n');
  print('连接: $concatenated'); // 连接: 12345
  
  // 复杂 Fold
  Map<int, List<int>> grouped = numbers.fold(
    {},
    (map, n) {
      int key = n % 3;
      map.putIfAbsent(key, () => []).add(n);
      return map;
    },
  );
  print('分组: $grouped'); // 分组: {1: [1, 4], 2: [2, 5], 0: [3]}
}
```

### 4. Expand 和 Flat

```dart
// Expand 和 Flat
void expandAndFlat() {
  List<List<int>> nested = [[1, 2], [3, 4], [5, 6]];
  
  // Expand
  List<int> flattened = nested.expand((list) => list).toList();
  print('展开: $flattened'); // 展开: [1, 2, 3, 4, 5, 6]
  
  // 复杂 Expand
  List<Map<String, dynamic>> users = [
    {'name': 'Alice', 'hobbies': ['reading', 'swimming']},
    {'name': 'Bob', 'hobbies': ['gaming', 'cooking']},
  ];
  
  List<String> allHobbies = users
      .expand((user) => user['hobbies'] as List<String>)
      .toList();
  print('所有爱好: $allHobbies'); // 所有爱好: [reading, swimming, gaming, cooking]
  
  // 使用 generate
  List<int> generated = List.generate(5, (i) => i * i);
  print('生成: $generated'); // 生成: [0, 1, 4, 9, 16]
}
```

## 📖 不可变性

### 1. 不可变集合

```dart
// 不可变集合
void immutableCollections() {
  // 不可变 List
  List<int> mutable = [1, 2, 3];
  List<int> immutable = List.unmodifiable(mutable);
  
  // 尝试修改不可变列表会抛出异常
  try {
    immutable.add(4);
  } catch (e) {
    print('错误: $e'); // 错误: Unsupported operation: Cannot add to an unmodifiable list
  }
  
  // 创建新的不可变列表
  List<int> newImmutable = [...immutable, 4];
  print('新列表: $newImmutable'); // 新列表: [1, 2, 3, 4]
  
  // 不可变 Map
  Map<String, int> mutableMap = {'a': 1, 'b': 2};
  Map<String, int> immutableMap = Map.unmodifiable(mutableMap);
  
  try {
    immutableMap['c'] = 3;
  } catch (e) {
    print('错误: $e'); // 错误: Unsupported operation: Cannot set value in unmodifiable map
  }
}
```

### 2. 函数式更新

```dart
// 函数式更新
void functionalUpdates() {
  // 更新对象
  class Person {
    final String name;
    final int age;
    
    const Person(this.name, this.age);
    
    Person copyWith({String? name, int? age}) {
      return Person(name ?? this.name, age ?? this.age);
    }
    
    @override
    String toString() => 'Person(name: $name, age: $age)';
  }
  
  Person person = Person('Alice', 25);
  Person updated = person.copyWith(age: 26);
  
  print('原始: $person');   // 原始: Person(name: Alice, age: 25)
  print('更新: $updated');  // 更新: Person(name: Alice, age: 26)
  
  // 更新集合
  List<int> numbers = [1, 2, 3, 4, 5];
  List<int> updatedNumbers = [
    ...numbers.where((n) => n != 3),
    6,
  ];
  print('更新集合: $updatedNumbers'); // 更新集合: [1, 2, 4, 5, 6]
}
```

## 📖 惰性求值

### 1. Iterable 和惰性求值

```dart
// Iterable 和惰性求值
void iterableAndLazyEvaluation() {
  // 惰性求值
  Iterable<int> numbers = Iterable.generate(10, (i) => i);
  
  // 不会立即计算
  Iterable<int> squares = numbers.map((n) {
    print('计算 $n 的平方');
    return n * n;
  });
  
  print('创建完成');
  
  // 只有在访问时才计算
  for (var square in squares.take(3)) {
    print('结果: $square');
  }
  // 输出:
  // 创建完成
  // 计算 0 的平方
  // 结果: 0
  // 计算 1 的平方
  // 结果: 1
  // 计算 2 的平方
  // 结果: 2
}
```

### 2. 无限序列

```dart
// 无限序列
void infiniteSequences() {
  // 无限自然数序列
  Iterable<int> naturals() sync* {
    int n = 0;
    while (true) {
      yield n++;
    }
  }
  
  // 无限斐波那契序列
  Iterable<int> fibonacci() sync* {
    int a = 0, b = 1;
    while (true) {
      yield a;
      int temp = a;
      a = b;
      b = temp + b;
    }
  }
  
  // 使用无限序列
  print('前10个自然数: ${naturals().take(10).toList()}');
  // 前10个自然数: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  
  print('前10个斐波那契数: ${fibonacci().take(10).toList()}');
  // 前10个斐波那契数: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
}
```

## 📖 模式匹配

### 1. 解构赋值

```dart
// 解构赋值
void destructuring() {
  // List 解构
  var [first, second, ...rest] = [1, 2, 3, 4, 5];
  print('第一个: $first');   // 第一个: 1
  print('第二个: $second');  // 第二个: 2
  print('其余: $rest');      // 其余: [3, 4, 5]
  
  // Map 解构
  var {'name': String name, 'age': int age} = {'name': 'Alice', 'age': 25};
  print('姓名: $name'); // 姓名: Alice
  print('年龄: $age');   // 年龄: 25
  
  // 函数参数解构
  void printUser(Map<String, dynamic> user) {
    var {'name': String name, 'age': int age} = user;
    print('用户: $name, $age岁');
  }
  
  printUser({'name': 'Bob', 'age': 30}); // 用户: Bob, 30岁
}
```

### 2. Switch 表达式

```dart
// Switch 表达式
void switchExpressions() {
  // 基本 Switch 表达式
  String describe(int number) => switch (number) {
    < 0 => '负数',
    0 => '零',
    > 0 && < 10 => '个位数正数',
    _ => '多位数',
  };
  
  print(describe(-5));  // 负数
  print(describe(0));   // 零
  print(describe(5));   // 个位数正数
  print(describe(15));  // 多位数
  
  // 复杂 Switch 表达式
  String weatherAdvice(String weather) => switch (weather) {
    'sunny' => '适合户外活动',
    'rainy' => '记得带伞',
    'cloudy' => '可能下雨',
    _ => '查看天气预报',
  };
  
  print(weatherAdvice('sunny')); // 适合户外活动
  print(weatherAdvice('rainy')); // 记得带伞
}
```

## 📖 函数式错误处理

### 1. Result 类型

```dart
// Result 类型
class Result<T> {
  final T? _value;
  final String? _error;
  final bool _isSuccess;
  
  Result.success(T value) : _value = value, _error = null, _isSuccess = true;
  Result.failure(String error) : _value = null, _error = error, _isSuccess = false;
  
  bool get isSuccess => _isSuccess;
  bool get isFailure => !_isSuccess;
  
  T get value => _isSuccess ? _value as T : throw StateError('没有值');
  String get error => !_isSuccess ? _error as String : throw StateError('没有错误');
  
  Result<T> map<T>(T Function(T) transform) {
    if (_isSuccess) {
      return Result.success(transform(_value as T));
    }
    return this as Result<T>;
  }
  
  Result<T> flatMap<T>(Result<T> Function(T) transform) {
    if (_isSuccess) {
      return transform(_value as T);
    }
    return this as Result<T>;
  }
  
  T getOrElse(T defaultValue) => _isSuccess ? _value as T : defaultValue;
  
  @override
  String toString() => _isSuccess ? 'Success($_value)' : 'Failure($_error)';
}

// 使用 Result
void useResult() {
  Result<int> parseNumber(String text) {
    try {
      return Result.success(int.parse(text));
    } catch (e) {
      return Result.failure('解析失败: $e');
    }
  }
  
  Result<int> result = parseNumber('42');
  print(result); // Success(42)
  
  if (result.isSuccess) {
    print('值: ${result.value}'); // 值: 42
  }
  
  Result<int> errorResult = parseNumber('abc');
  print(errorResult); // Failure(解析失败: FormatException: Invalid radix-10 number (at character 1))
  
  int value = errorResult.getOrElse(0);
  print('默认值: $value'); // 默认值: 0
}
```

### 2. Maybe 类型

```dart
// Maybe 类型
class Maybe<T> {
  final T? _value;
  
  Maybe(this._value);
  Maybe.just(T value) : _value = value;
  Maybe.nothing() : _value = null;
  
  bool get hasValue => _value != null;
  
  T get value => _value as T;
  
  Maybe<T> map<T>(T Function(T) transform) {
    if (_value != null) {
      return Maybe.just(transform(_value as T));
    }
    return this as Maybe<T>;
  }
  
  Maybe<T> flatMap<T>(Maybe<T> Function(T) transform) {
    if (_value != null) {
      return transform(_value as T);
    }
    return this as Maybe<T>;
  }
  
  T getOrElse(T defaultValue) => _value != null ? _value as T : defaultValue;
  
  @override
  String toString() => _value != null ? 'Just($_value)' : 'Nothing()';
}

// 使用 Maybe
void useMaybe() {
  Maybe<String> findUser(int id) {
    if (id == 1) {
      return Maybe.just('Alice');
    }
    return Maybe.nothing();
  }
  
  Maybe<String> user = findUser(1);
  print(user); // Just(Alice)
  
  if (user.hasValue) {
    print('找到用户: ${user.value}'); // 找到用户: Alice
  }
  
  Maybe<String> noUser = findUser(999);
  print(noUser); // Nothing()
  
  String name = noUser.getOrElse('未知');
  print('默认名称: $name'); // 默认名称: 未知
}
```

## 📖 函数式工具

### 1. Memoization

```dart
// Memoization
void memoization() {
  // 简单 Memoization
  Function memoize(Function function) {
    final cache = {};
    return (arg) {
      if (!cache.containsKey(arg)) {
        cache[arg] = function(arg);
      }
      return cache[arg];
    };
  }
  
  // 使用
  var expensiveFunction = memoize((int n) {
    print('计算 $n...');
    return n * n;
  });
  
  print(expensiveFunction(5)); // 计算 5... 25
  print(expensiveFunction(5)); // 25 (没有重新计算)
  print(expensiveFunction(3)); // 计算 3... 9
}
```

### 2. Curry 和 Partial

```dart
// Curry 和 Partial
void curryAndPartial() {
  // Curry
  Function curry(Function function) {
    return (a) => (b) => function(a, b);
  }
  
  int add(int a, int b) => a + b;
  var curriedAdd = curry(add);
  var add5 = curriedAdd(5);
  
  print(add5(3)); // 8
  print(add5(10)); // 15
  
  // Partial Application
  Function partial(Function function, List<dynamic> partialArgs) {
    return (List<dynamic> args) {
      List<dynamic> allArgs = [...partialArgs, ...args];
      return Function.apply(function, allArgs);
    };
  }
  
  int multiply(int a, int b, int c) => a * b * c;
  var multiplyBy2And3 = partial(multiply, [2, 3]);
  
  print(multiplyBy2And3([5])); // 30
  print(multiplyBy2And3([10])); // 60
}
```

## 📖 总结

### 函数式编程核心概念

| 概念 | 描述 | 使用场景 |
|------|------|----------|
| **Lambda** | 匿名函数 | 简短操作、回调 |
| **高阶函数** | 函数作为参数/返回值 | 抽象、复用 |
| **闭包** | 捕获变量的函数 | 状态管理、回调 |
| **不可变性** | 不可修改的数据 | 并发安全、可预测性 |
| **惰性求值** | 延迟计算 | 性能优化、无限序列 |
| **模式匹配** | 数据解构 | 数据处理、条件逻辑 |

### 最佳实践

1. **Lambda**：用于简短操作，避免复杂逻辑
2. **高阶函数**：抽象通用模式，提高复用性
3. **闭包**：谨慎使用，避免内存泄漏
4. **不可变性**：优先使用不可变数据
5. **惰性求值**：处理大数据集时使用
6. **模式匹配**：简化条件逻辑和数据处理

### 性能考虑

1. **Lambda**：性能接近普通函数
2. **高阶函数**：有轻微开销，可接受
3. **闭包**：有内存开销，注意生命周期
4. **惰性求值**：节省内存，但可能增加计算时间
5. **不可变性**：可能增加内存使用，但提高安全性

### 下一步学习

- **Dart 元编程**：反射、注解、代码生成
- **Flutter 函数式编程**：在 Flutter 中应用函数式概念
- **响应式编程**：结合 Stream 和函数式编程

---

> 掌握 Dart 的函数式编程特性，编写更简洁、更安全、更易维护的代码。函数式编程是现代编程的重要范式，将帮助你成为更好的开发者。