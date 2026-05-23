# 状态管理详解

> 状态管理是 Flutter 开发中的核心问题，选择合适的状态管理方案至关重要。

## 🎯 状态管理概述

### 1. 什么是状态
```dart
// 状态是可能随时间变化的任何数据
class CounterState {
  final int count;
  final List<String> items;
  final bool isLoading;
  
  CounterState({
    required this.count,
    required this.items,
    required this.isLoading,
  });
}
```

### 2. 状态管理分类
- **局部状态**: Widget 内部状态
- **全局状态**: 应用级别状态
- **服务状态**: 外部服务状态

## 📦 内置状态管理

### 1. StatefulWidget
```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;
  
  void _increment() {
    setState(() {
      _count++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('计数: $_count'),
        ElevatedButton(
          onPressed: _increment,
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

### 2. InheritedWidget
```dart
class CounterInheritedWidget extends InheritedWidget {
  final int count;
  final VoidCallback increment;
  
  const CounterInheritedWidget({
    Key? key,
    required this.count,
    required this.increment,
    required Widget child,
  }) : super(key: key, child: child);
  
  static CounterInheritedWidget? of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<CounterInheritedWidget>();
  }
  
  @override
  bool updateShouldNotify(CounterInheritedWidget oldWidget) {
    return count != oldWidget.count;
  }
}

// 使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final inherited = CounterInheritedWidget.of(context);
    return Column(
      children: [
        Text('计数: ${inherited?.count}'),
        ElevatedButton(
          onPressed: inherited?.increment,
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

## 🔧 第三方状态管理

### 1. Provider
```dart
// 定义 ChangeNotifier
class CounterProvider with ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();
  }
}

// 在 main.dart 中注册
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => CounterProvider(),
      child: MyApp(),
    ),
  );
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<CounterProvider>(
      builder: (context, counter, child) {
        return Column(
          children: [
            Text('计数: ${counter.count}'),
            ElevatedButton(
              onPressed: counter.increment,
              child: Text('增加'),
            ),
          ],
        );
      },
    );
  }
}
```

### 2. Riverpod
```dart
// 定义 Provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>((ref) {
  return CounterNotifier();
});

class CounterNotifier extends StateNotifier<int> {
  CounterNotifier() : super(0);
  
  void increment() => state++;
}

// 在 Widget 中使用
class CounterWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return Column(
      children: [
        Text('计数: $count'),
        ElevatedButton(
          onPressed: () => ref.read(counterProvider.notifier).increment(),
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

### 3. BLoC
```dart
// 定义 Event
abstract class CounterEvent {}
class IncrementEvent extends CounterEvent {}

// 定义 State
class CounterState {
  final int count;
  CounterState(this.count);
}

// 定义 BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState(0)) {
    on<IncrementEvent>((event, emit) {
      emit(CounterState(state.count + 1));
    });
  }
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  final CounterBloc _bloc = CounterBloc();
  
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<CounterBloc, CounterState>(
      bloc: _bloc,
      builder: (context, state) {
        return Column(
          children: [
            Text('计数: ${state.count}'),
            ElevatedButton(
              onPressed: () => _bloc.add(IncrementEvent()),
              child: Text('增加'),
            ),
          ],
        );
      },
    );
  }
}
```

### 4. GetX
```dart
// 定义 Controller
class CounterController extends GetxController {
  var count = 0.obs;
  
  void increment() => count++;
}

// 在 main.dart 中注册
void main() {
  runApp(GetMaterialApp(home: Home()));
}

// 在 Widget 中使用
class CounterWidget extends StatelessWidget {
  final CounterController controller = Get.put(CounterController());
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() => Text('计数: ${controller.count}')),
        ElevatedButton(
          onPressed: controller.increment,
          child: Text('增加'),
        ),
      ],
    );
  }
}
```

## 🔄 状态管理对比

### 性能对比
| 方案 | 重建性能 | 内存使用 | 学习曲线 |
|------|----------|----------|----------|
| StatefulWidget | 低 | 低 | 简单 |
| Provider | 中 | 中 | 中等 |
| Riverpod | 高 | 中 | 中等 |
| BLoC | 高 | 高 | 复杂 |
| GetX | 高 | 低 | 简单 |

### 适用场景
- **小型项目**: StatefulWidget, GetX
- **中型项目**: Provider, Riverpod
- **大型项目**: BLoC, Riverpod
- **企业级**: BLoC, Riverpod

## 🎯 状态管理模式

### 1. 单向数据流
```dart
// 数据流：View → Action → State → View
class CounterModel {
  final int count;
  CounterModel(this.count);
}

class CounterViewModel {
  final CounterModel _model = CounterModel(0);
  
  int get count => _model.count;
  
  void increment() {
    // 更新状态
    // 通知视图
  }
}
```

### 2. 响应式编程
```dart
// 使用 Stream
class CounterStream {
  final _controller = StreamController<int>();
  
  Stream<int> get stream => _controller.stream;
  
  void increment() {
    _controller.sink.add(_currentValue + 1);
  }
  
  void dispose() {
    _controller.close();
  }
}
```

## 🛠️ 状态管理最佳实践

### 1. 状态分离
```dart
// ❌ 不好的实践：状态混合
class BadState {
  int count;
  List<String> items;
  bool isLoading;
  String error;
  // 太多状态混合
}

// ✅ 好的实践：状态分离
class CounterState {
  final int count;
  CounterState(this.count);
}

class ItemsState {
  final List<String> items;
  final bool isLoading;
  ItemsState(this.items, this.isLoading);
}
```

### 2. 状态不可变性
```dart
// ❌ 不好的实践：可变状态
class MutableState {
  int count = 0;
  void increment() => count++; // 直接修改
}

// ✅ 好的实践：不可变状态
class ImmutableState {
  final int count;
  ImmutableState(this.count);
  
  ImmutableState increment() => ImmutableState(count + 1); // 返回新状态
}
```

### 3. 状态粒度控制
```dart
// ❌ 不好的实践：状态粒度太大
class AppState {
  final int count;
  final List<String> items;
  final User user;
  final Settings settings;
  // 任何变化都会重建所有 Widget
}

// ✅ 好的实践：合理的状态粒度
class CounterState {
  final int count;
  CounterState(this.count);
}

class UserState {
  final User user;
  UserState(this.user);
}
```

## 🔧 状态管理调试

### 1. 调试工具
```dart
// 使用 debugPrint
debugPrint('状态更新: $state');

// 使用 Flutter Inspector
// 查看 Widget 树和状态变化

// 使用 DevTools
// 监控状态变化和性能
```

### 2. 常见问题
- **状态丢失**: 检查状态初始化
- **重建过多**: 优化状态粒度
- **内存泄漏**: 正确清理资源

## 🚀 学习路径

### 1. 入门阶段
1. StatefulWidget
2. 状态提升
3. 简单 Provider

### 2. 进阶阶段
1. Riverpod
2. BLoC 模式
3. 状态管理模式

### 3. 高级阶段
1. 自定义状态管理
2. 性能优化
3. 状态管理架构

## 📚 学习资源

- [Flutter 状态管理官方文档](https://flutter.dev/docs/development/data-and-backend/state-mgmt)
- [Provider 官方文档](https://pub.dev/packages/provider)
- [Riverpod 官方文档](https://riverpod.dev/)
- [BLoC 官方文档](https://bloclibrary.dev/)

## 🔗 相关链接

- [[Widget 系统]] - Widget 系统
- [[导航与路由]] - 导航与路由
- [[架构概览]] - Flutter 架构
- [[电商应用]] - 实战项目

---
*最后更新: 2026年5月23日*