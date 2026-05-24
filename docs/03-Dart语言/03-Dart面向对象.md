# Dart 面向对象编程

> 掌握 Dart 的面向对象特性，理解类、继承、接口、抽象类等核心概念。

## 📖 类与对象

### 1. 类的定义

```dart
// 基本类定义
class Person {
  // 实例变量
  String name;
  int age;
  String gender;
  
  // 构造函数
  Person(this.name, this.age, this.gender);
  
  // 命名构造函数
  Person.guest() : name = '游客', age = 0, gender = '未知';
  
  Person.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'],
        gender = json['gender'];
  
  // 方法
  void introduce() {
    print('我叫$name，今年$age岁，性别$gender。');
  }
  
  // 重写 toString
  @override
  String toString() => 'Person(name: $name, age: $age, gender: $gender)';
}

// 使用类
void useClass() {
  Person person = Person('张三', 25, '男');
  person.introduce(); // 我叫张三，今年25岁，性别男。
  
  Person guest = Person.guest();
  print(guest); // Person(name: 游客, age: 0, gender: 未知)
  
  Person fromJson = Person.fromJson({'name': '李四', 'age': 30, 'gender': '女'});
  fromJson.introduce(); // 我叫李四，今年30岁，性别女。
}
```

### 2. 构造函数详解

```dart
class Rectangle {
  num width;
  num height;
  
  // 默认构造函数
  Rectangle(this.width, this.height);
  
  // 命名构造函数
  Rectangle.square(num size) : width = size, height = size;
  
  // 重定向构造函数
  Rectangle.small() : this.square(10);
  
  // 工厂构造函数
  factory Rectangle.fromJson(Map<String, dynamic> json) {
    return Rectangle(json['width'], json['height']);
  }
  
  // 常量构造函数
  const Rectangle.fixed(this.width, this.height);
  
  num get area => width * height;
  num get perimeter => 2 * (width + height);
  
  @override
  String toString() => 'Rectangle($width x $height)';
}

// 使用构造函数
void useConstructors() {
  Rectangle rect = Rectangle(10, 20);
  print(rect); // Rectangle(10 x 20)
  print('面积: ${rect.area}'); // 面积: 200
  
  Rectangle square = Rectangle.square(15);
  print(square); // Rectangle(15 x 15)
  
  Rectangle small = Rectangle.small();
  print(small); // Rectangle(10 x 10)
  
  Rectangle fromJson = Rectangle.fromJson({'width': 5, 'height': 8});
  print(fromJson); // Rectangle(5 x 8)
  
  const Rectangle fixed = Rectangle.fixed(3, 4);
  print(fixed); // Rectangle(3 x 4)
}
```

### 3. Getter 和 Setter

```dart
class BankAccount {
  String _accountNumber;
  String _owner;
  num _balance;
  
  BankAccount(this._accountNumber, this._owner, this._balance);
  
  // Getter
  String get accountNumber => _accountNumber;
  String get owner => _owner;
  num get balance => _balance;
  bool get isOverdrawn => _balance < 0;
  
  // Setter
  set balance(num newBalance) {
    if (newBalance < -1000) {
      throw ArgumentError('余额不能低于 -1000');
    }
    _balance = newBalance;
  }
  
  // 方法
  void deposit(num amount) {
    if (amount <= 0) {
      throw ArgumentError('存款金额必须大于 0');
    }
    _balance += amount;
  }
  
  void withdraw(num amount) {
    if (amount <= 0) {
      throw ArgumentError('取款金额必须大于 0');
    }
    if (_balance - amount < -1000) {
      throw StateError('余额不足');
    }
    _balance -= amount;
  }
  
  @override
  String toString() => '账户: $_accountNumber, 持有人: $_owner, 余额: $_balance';
}

// 使用 Getter 和 Setter
void useGettersSetters() {
  BankAccount account = BankAccount('1234567890', '张三', 1000);
  print(account); // 账户: 1234567890, 持有人: 张三, 余额: 1000
  
  account.deposit(500);
  print('存款后余额: ${account.balance}'); // 存款后余额: 1500
  
  account.withdraw(200);
  print('取款后余额: ${account.balance}'); // 取款后余额: 1300
  
  account.balance = 5000;
  print('设置后余额: ${account.balance}'); // 设置后余额: 5000
  
  print('是否透支: ${account.isOverdrawn}'); // 是否透支: false
}
```

## 📖 继承

### 1. 基本继承

```dart
// 父类
class Animal {
  String name;
  int age;
  
  Animal(this.name, this.age);
  
  void eat() => print('$name 正在吃东西');
  void sleep() => print('$name 正在睡觉');
  
  @override
  String toString() => 'Animal(name: $name, age: $age)';
}

// 子类
class Dog extends Animal {
  String breed;
  
  Dog(String name, int age, this.breed) : super(name, age);
  
  void bark() => print('$name 正在汪汪叫');
  
  // 重写父类方法
  @override
  void eat() => print('$name 正在吃狗粮');
  
  @override
  String toString() => 'Dog(name: $name, age: $age, breed: $breed)';
}

class Cat extends Animal {
  String color;
  
  Cat(String name, int age, this.color) : super(name, age);
  
  void meow() => print('$name 正在喵喵叫');
  
  @override
  void eat() => print('$name 正在吃猫粮');
  
  @override
  String toString() => 'Cat(name: $name, age: $age, color: $color)';
}

// 使用继承
void useInheritance() {
  Dog dog = Dog('旺财', 3, '哈士奇');
  dog.eat();   // 旺财 正在吃狗粮
  dog.sleep(); // 旺财 正在睡觉
  dog.bark();  // 旺财 正在汪汪叫
  print(dog);  // Dog(name: 旺财, age: 3, breed: 哈士奇)
  
  Cat cat = Cat('咪咪', 2, '橘色');
  cat.eat();   // 咪咪 正在吃猫粮
  cat.sleep(); // 咪咪 正在睡觉
  cat.meow();  // 咪咪 正在喵喵叫
  print(cat);  // Cat(name: 咪咪, age: 2, color: 橘色)
}
```

### 2. 多层继承

```dart
// 多层继承
class Vehicle {
  String brand;
  int year;
  
  Vehicle(this.brand, this.year);
  
  void start() => print('$brand $year 启动');
  void stop() => print('$brand $year 停止');
  
  @override
  String toString() => 'Vehicle(brand: $brand, year: $year)';
}

class Car extends Vehicle {
  int doors;
  
  Car(String brand, int year, this.doors) : super(brand, year);
  
  void drive() => print('$brand 正在行驶');
  
  @override
  String toString() => 'Car(brand: $brand, year: $year, doors: $doors)';
}

class ElectricCar extends Car {
  int batteryCapacity;
  
  ElectricCar(String brand, int year, int doors, this.batteryCapacity) 
      : super(brand, year, doors);
  
  void charge() => print('$brand 正在充电');
  
  @override
  void start() => print('$brand 无声启动');
  
  @override
  String toString() => 
      'ElectricCar(brand: $brand, year: $year, doors: $doors, battery: $batteryCapacity)';
}

// 使用多层继承
void useMultiLevelInheritance() {
  ElectricCar tesla = ElectricCar('Tesla', 2023, 4, 100);
  tesla.start();   // Tesla 无声启动
  tesla.drive();   // Tesla 正在行驶
  tesla.charge();  // Tesla 正在充电
  print(tesla);    // ElectricCar(brand: Tesla, year: 2023, doors: 4, battery: 100)
}
```

### 3. 抽象类

```dart
// 抽象类
abstract class Shape {
  String color;
  
  Shape(this.color);
  
  // 抽象方法
  double get area;
  double get perimeter;
  
  // 具体方法
  void describe() {
    print('这是一个$color的图形');
    print('面积: $area');
    print('周长: $perimeter');
  }
  
  @override
  String toString() => 'Shape(color: $color)';
}

// 实现抽象类
class Circle extends Shape {
  num radius;
  
  Circle(String color, this.radius) : super(color);
  
  @override
  double get area => 3.14159 * radius * radius;
  
  @override
  double get perimeter => 2 * 3.14159 * radius;
  
  @override
  String toString() => 'Circle(color: $color, radius: $radius)';
}

class Square extends Shape {
  num side;
  
  Square(String color, this.side) : super(color);
  
  @override
  double get area => side * side;
  
  @override
  double get perimeter => 4 * side;
  
  @override
  String toString() => 'Square(color: $color, side: $side)';
}

// 使用抽象类
void useAbstractClasses() {
  Circle circle = Circle('红色', 5);
  circle.describe();
  // 这是一个红色的图形
  // 面积: 78.53975
  // 周长: 31.4159
  
  Square square = Square('蓝色', 4);
  square.describe();
  // 这是一个蓝色的图形
  // 面积: 16.0
  // 周长: 16.0
  
  // 多态
  List<Shape> shapes = [circle, square];
  for (var shape in shapes) {
    print('${shape.runtimeType}: 面积 ${shape.area}');
  }
  // Circle: 面积 78.53975
  // Square: 面积 16.0
}
```

## 📖 接口

### 1. 接口定义

```dart
// 接口定义
abstract class Drawable {
  void draw();
  void setColor(String color);
}

abstract class Resizable {
  void resize(double factor);
  double get size;
}

// 实现多个接口
class Button implements Drawable, Resizable {
  String _color = '灰色';
  double _size = 1.0;
  
  @override
  void draw() {
    print('绘制按钮: 颜色=$_color, 大小=$_size');
  }
  
  @override
  void setColor(String color) {
    _color = color;
  }
  
  @override
  void resize(double factor) {
    _size *= factor;
  }
  
  @override
  double get size => _size;
  
  @override
  String toString() => 'Button(color: $_color, size: $_size)';
}

// 使用接口
void useInterfaces() {
  Button button = Button();
  button.draw(); // 绘制按钮: 颜色=灰色, 大小=1.0
  
  button.setColor('蓝色');
  button.resize(1.5);
  button.draw(); // 绘制按钮: 颜色=蓝色, 大小=1.5
  
  // 接口类型
  Drawable drawable = button;
  drawable.draw(); // 绘制按钮: 颜色=蓝色, 大小=1.5
  
  Resizable resizable = button;
  resizable.resize(2.0);
  print('新大小: ${resizable.size}'); // 新大小: 3.0
}
```

### 2. 接口继承

```dart
// 接口继承
abstract class Animal {
  String get name;
  void eat();
}

abstract class Pet extends Animal {
  void play();
  void groom();
}

class Dog implements Pet {
  @override
  String get name => '旺财';
  
  @override
  void eat() => print('$name 正在吃狗粮');
  
  @override
  void play() => print('$name 正在玩球');
  
  @override
  void groom() => print('$name 正在梳毛');
  
  @override
  String toString() => 'Dog(name: $name)';
}

// 使用接口继承
void useInterfaceInheritance() {
  Dog dog = Dog();
  dog.eat();   // 旺财 正在吃狗粮
  dog.play();  // 旺财 正在玩球
  dog.groom(); // 旺财 正在梳毛
  
  // 接口类型
  Pet pet = dog;
  pet.eat();   // 旺财 正在吃狗粮
  pet.play();  // 旺财 正在玩球
  
  Animal animal = dog;
  animal.eat(); // 旺财 正在吃狗粮
}
```

## 📖 Mixin 与类

### 1. Mixin 类

```dart
// Mixin 类
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

// 使用 Mixin 类
class Artist with Performer, Musician, Dancer {
  @override
  void perform() {
    print('艺术家表演:');
    super.perform();
  }
}

// 使用 Mixin 类
void useMixinClasses() {
  Artist artist = Artist();
  artist.perform();
  // 输出:
  // 艺术家表演:
  // 跳舞
  // 演奏音乐
  // 表演中...
}
```

### 2. Mixin 类型检查

```dart
// Mixin 类型检查
void mixinTypeChecking() {
  Artist artist = Artist();
  
  // 类型检查
  print(artist is Performer); // true
  print(artist is Musician);  // true
  print(artist is Dancer);    // true
  
  // 类型转换
  if (artist is Musician) {
    Musician musician = artist as Musician;
    musician.playMusic(); // 演奏音乐
  }
  
  // 获取类型
  print(artist.runtimeType); // Artist
}
```

## 📖 运算符重载

### 1. 算术运算符

```dart
// 算术运算符重载
class Vector {
  final double x;
  final double y;
  
  const Vector(this.x, this.y);
  
  // 加法
  Vector operator +(Vector other) => Vector(x + other.x, y + other.y);
  
  // 减法
  Vector operator -(Vector other) => Vector(x - other.x, y - other.y);
  
  // 标量乘法
  Vector operator *(double scalar) => Vector(x * scalar, y * scalar);
  
  // 点积
  double dot(Vector other) => x * other.x + y * other.y;
  
  // 长度
  double get length => sqrt(x * x + y * y);
  
  @override
  bool operator ==(Object other) {
    if (other is Vector) {
      return x == other.x && y == other.y;
    }
    return false;
  }
  
  @override
  int get hashCode => x.hashCode ^ y.hashCode;
  
  @override
  String toString() => 'Vector($x, $y)';
}

// 使用运算符重载
void useOperatorOverloading() {
  Vector v1 = Vector(1, 2);
  Vector v2 = Vector(3, 4);
  
  Vector sum = v1 + v2;
  print('和: $sum'); // 和: Vector(4.0, 6.0)
  
  Vector difference = v1 - v2;
  print('差: $difference'); // 差: Vector(-2.0, -2.0)
  
  Vector scaled = v1 * 2;
  print('缩放: $scaled'); // 缩放: Vector(2.0, 4.0)
  
  double dotProduct = v1.dot(v2);
  print('点积: $dotProduct'); // 点积: 11.0
  
  double length = v1.length;
  print('长度: $length'); // 长度: 2.23606797749979
  
  bool isEqual = v1 == Vector(1, 2);
  print('相等: $isEqual'); // 相等: true
}
```

### 2. 比较运算符

```dart
// 比较运算符重载
class Temperature {
  final double celsius;
  
  const Temperature(this.celsius);
  
  double get fahrenheit => celsius * 9 / 5 + 32;
  double get kelvin => celsius + 273.15;
  
  // 比较运算符
  bool operator <(Temperature other) => celsius < other.celsius;
  bool operator <=(Temperature other) => celsius <= other.celsius;
  bool operator >(Temperature other) => celsius > other.celsius;
  bool operator >=(Temperature other) => celsius >= other.celsius;
  
  @override
  bool operator ==(Object other) {
    if (other is Temperature) {
      return celsius == other.celsius;
    }
    return false;
  }
  
  @override
  int get hashCode => celsius.hashCode;
  
  @override
  String toString() => 'Temperature($celsius°C)';
}

// 使用比较运算符
void useComparisonOperators() {
  Temperature t1 = Temperature(20);
  Temperature t2 = Temperature(30);
  
  print('t1 < t2: ${t1 < t2}');   // t1 < t2: true
  print('t1 <= t2: ${t1 <= t2}'); // t1 <= t2: true
  print('t1 > t2: ${t1 > t2}');   // t1 > t2: false
  print('t1 >= t2: ${t1 >= t2}'); // t1 >= t2: false
  
  // 排序
  List<Temperature> temps = [t2, t1, Temperature(25)];
  temps.sort((a, b) => a.celsius.compareTo(b.celsius));
  print('排序后: $temps'); // 排序后: [Temperature(20.0°C), Temperature(25.0°C), Temperature(30.0°C)]
}
```

## 📖 枚举与类

### 1. 增强枚举

```dart
// 增强枚举
enum HttpStatus {
  ok(200, 'OK'),
  created(201, 'Created'),
  accepted(202, 'Accepted'),
  badRequest(400, 'Bad Request'),
  unauthorized(401, 'Unauthorized'),
  forbidden(403, 'Forbidden'),
  notFound(404, 'Not Found'),
  internalServerError(500, 'Internal Server Error');
  
  final int code;
  final String message;
  
  const HttpStatus(this.code, this.message);
  
  bool get isSuccess => code >= 200 && code < 300;
  bool get isError => code >= 400;
  bool get isClientError => code >= 400 && code < 500;
  bool get isServerError => code >= 500;
  
  static HttpStatus fromCode(int code) {
    return HttpStatus.values.firstWhere(
      (status) => status.code == code,
      orElse: () => HttpStatus.internalServerError,
    );
  }
  
  @override
  String toString() => 'HttpStatus($code: $message)';
}

// 使用增强枚举
void useEnhancedEnum() {
  HttpStatus status = HttpStatus.ok;
  print(status); // HttpStatus(200: OK)
  print('成功: ${status.isSuccess}'); // 成功: true
  
  HttpStatus fromCode = HttpStatus.fromCode(404);
  print(fromCode); // HttpStatus(404: Not Found)
  print('客户端错误: ${fromCode.isClientError}'); // 客户端错误: true
}
```

## 📖 工厂模式

### 1. 工厂构造函数

```dart
// 工厂模式
abstract class Logger {
  void log(String message);
  
  factory Logger(Type type) {
    switch (type) {
      case ConsoleLogger:
        return ConsoleLogger();
      case FileLogger:
        return FileLogger();
      default:
        return ConsoleLogger();
    }
  }
}

class ConsoleLogger implements Logger {
  @override
  void log(String message) => print('控制台: $message');
}

class FileLogger implements Logger {
  @override
  void log(String message) => print('文件: $message');
}

// 使用工厂模式
void useFactoryPattern() {
  Logger consoleLogger = Logger(ConsoleLogger);
  consoleLogger.log('控制台日志'); // 控制台: 控制台日志
  
  Logger fileLogger = Logger(FileLogger);
  fileLogger.log('文件日志'); // 文件: 文件日志
}
```

### 2. 单例模式

```dart
// 单例模式
class Database {
  static Database? _instance;
  
  Database._internal();
  
  factory Database() {
    _instance ??= Database._internal();
    return _instance!;
  }
  
  void connect() => print('数据库连接');
  void query(String sql) => print('执行查询: $sql');
}

// 使用单例模式
void useSingleton() {
  Database db1 = Database();
  Database db2 = Database();
  
  print('相同实例: ${identical(db1, db2)}'); // 相同实例: true
  
  db1.connect(); // 数据库连接
  db2.query('SELECT * FROM users'); // 执行查询: SELECT * FROM users
}
```

## 📖 组合与继承

### 1. 组合优于继承

```dart
// 组合优于继承
class Engine {
  String type;
  int horsepower;
  
  Engine(this.type, this.horsepower);
  
  void start() => print('$type 引擎启动，马力: $horsepower');
  void stop() => print('$type 引擎停止');
}

class Transmission {
  String type;
  int gears;
  
  Transmission(this.type, this.gears);
  
  void shift(int gear) => print('$type 变速器切换到 $gear 档');
}

class Car {
  String brand;
  Engine engine;
  Transmission transmission;
  
  Car(this.brand, this.engine, this.transmission);
  
  void start() {
    print('$brand 启动:');
    engine.start();
    transmission.shift(1);
  }
  
  void stop() {
    print('$brand 停止:');
    engine.stop();
  }
  
  @override
  String toString() => 'Car(brand: $brand, engine: $engine, transmission: $transmission)';
}

// 使用组合
void useComposition() {
  Engine engine = Engine('V8', 450);
  Transmission transmission = Transmission('自动', 8);
  Car car = Car('Mustang', engine, transmission);
  
  car.start();
  // Mustang 启动:
  // V8 引擎启动，马力: 450
  // 自动 变速器切换到 1 档
  
  car.stop();
  // Mustang 停止:
  // V8 引擎停止
}
```

## 📖 抽象工厂

### 1. 抽象工厂模式

```dart
// 抽象工厂模式
abstract class Button {
  void render();
}

abstract class Checkbox {
  void render();
}

class WindowsButton implements Button {
  @override
  void render() => print('渲染 Windows 按钮');
}

class WindowsCheckbox implements Checkbox {
  @override
  void render() => print('渲染 Windows 复选框');
}

class MacButton implements Button {
  @override
  void render() => print('渲染 Mac 按钮');
}

class MacCheckbox implements Checkbox {
  @override
  void render() => print('渲染 Mac 复选框');
}

abstract class GUIFactory {
  Button createButton();
  Checkbox createCheckbox();
  
  factory GUIFactory(String platform) {
    switch (platform) {
      case 'windows':
        return WindowsGUIFactory();
      case 'mac':
        return MacGUIFactory();
      default:
        return WindowsGUIFactory();
    }
  }
}

class WindowsGUIFactory implements GUIFactory {
  @override
  Button createButton() => WindowsButton();
  
  @override
  Checkbox createCheckbox() => WindowsCheckbox();
}

class MacGUIFactory implements GUIFactory {
  @override
  Button createButton() => MacButton();
  
  @override
  Checkbox createCheckbox() => MacCheckbox();
}

// 使用抽象工厂
void useAbstractFactory() {
  GUIFactory windowsFactory = GUIFactory('windows');
  Button windowsButton = windowsFactory.createButton();
  Checkbox windowsCheckbox = windowsFactory.createCheckbox();
  
  windowsButton.render();   // 渲染 Windows 按钮
  windowsCheckbox.render(); // 渲染 Windows 复选框
  
  GUIFactory macFactory = GUIFactory('mac');
  Button macButton = macFactory.createButton();
  Checkbox macCheckbox = macFactory.createCheckbox();
  
  macButton.render();   // 渲染 Mac 按钮
  macCheckbox.render(); // 渲染 Mac 复选框
}
```

## 📖 总结

### 面向对象核心概念

| 概念 | 描述 | 使用场景 |
|------|------|----------|
| **类** | 对象的蓝图 | 创建对象、封装数据 |
| **继承** | 代码复用、层次关系 | 建立类层次结构 |
| **接口** | 契约、规范 | 定义行为规范 |
| **抽象类** | 部分实现 | 共享代码、定义模板 |
| **Mixin** | 代码复用、多重继承 | 功能组合 |
| **运算符重载** | 自定义运算符行为 | 自然语法 |
| **工厂模式** | 对象创建控制 | 复杂对象创建 |
| **组合** | 功能组合 | 灵活的功能组合 |

### 最佳实践

1. **封装**：隐藏内部实现，提供公共接口
2. **继承**：用于 "is-a" 关系，避免深层继承
3. **组合**：用于 "has-a" 关系，优先于继承
4. **接口**：定义行为契约，实现多态
5. **抽象类**：共享代码，定义模板
6. **Mixin**：用于代码复用，避免多重继承问题

### 设计模式应用

1. **工厂模式**：对象创建逻辑复杂时使用
2. **单例模式**：需要全局唯一实例时使用
3. **抽象工厂**：创建相关对象族时使用
4. **组合模式**：需要灵活组合功能时使用

### 下一步学习

- **Dart 函数式编程**：Lambda、高阶函数、闭包
- **Dart 元编程**：反射、注解、代码生成
- **Flutter Widget 系统**：理解 Flutter 的面向对象设计

---

> 掌握 Dart 的面向对象编程，理解类、继承、接口、抽象类等核心概念，为 Flutter 开发打下坚实基础。