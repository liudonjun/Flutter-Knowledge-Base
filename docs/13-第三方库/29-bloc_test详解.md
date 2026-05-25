# bloc_test 详解

> 测试 Bloc/Cubit：`blocTest` 断言状态序列、事件与异步时序（wiki：`[[bloc_test]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [bloc_test](https://pub.dev/packages/bloc_test) |
| **依赖** | `bloc` / `flutter_bloc` + `flutter_test` |
| **适用** | 状态机、分页、表单、登录流程 |
| **Mock** | 配合 [[16-mocktail详解]] 或 [[15-mockito详解]] |
| **站内** | [[03-Bloc模式详解]]、[[07-测试库详解]] |

比手写 `bloc.stream.listen` 更清晰：`expect` 直接对比 **emit 顺序**。

## 安装

```yaml
dev_dependencies:
  bloc_test: ^9.1.7
  flutter_test:
    sdk: flutter
  mocktail: ^1.0.4
```

## 基本 blocTest

```dart
import 'package:bloc_test/bloc_test.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('CounterCubit', () {
    blocTest<CounterCubit, int>(
      'increment emits [1]',
      build: () => CounterCubit(),
      act: (cubit) => cubit.increment(),
      expect: () => [1],
    );

    blocTest<CounterCubit, int>(
      'multiple increments',
      build: () => CounterCubit(),
      act: (cubit) {
        cubit.increment();
        cubit.increment();
      },
      expect: () => [1, 2],
    );
  });
}
```

## 测 Bloc + Mock 仓库

```dart
class MockTodoRepo extends Mock implements TodoRepository {}

void main() {
  late MockTodoRepo mockRepo;

  setUp(() {
    mockRepo = MockTodoRepo();
  });

  blocTest<TodoBloc, TodoState>(
    'LoadTodos success',
    build: () => TodoBloc(mockRepo),
    setUp: () {
      when(() => mockRepo.fetchAll()).thenAnswer(
        (_) async => [Todo(id: '1', title: 'A')],
      );
    },
    act: (bloc) => bloc.add(LoadTodos()),
    expect: () => [
      TodoState.loading(),
      TodoState.loaded(todos: [Todo(id: '1', title: 'A')]),
    ],
  );

  blocTest<TodoBloc, TodoState>(
    'LoadTodos failure',
    build: () => TodoBloc(mockRepo),
    setUp: () {
      when(() => mockRepo.fetchAll()).thenThrow(Exception('network'));
    },
    act: (bloc) => bloc.add(LoadTodos()),
    expect: () => [
      TodoState.loading(),
      TodoState.error(message: 'network'),
    ],
  );
}
```

## 参数说明

| 参数 | 说明 |
| --- | --- |
| `build` | 创建 bloc，每个 test 独立实例 |
| `seed` | 初始 state（可选） |
| `act` | 触发 event / 调 cubit 方法 |
| `wait` | 额外等待 Duration（debounce） |
| `expect` | 期望 state 列表 **按序** |
| `verify` | 验证 Mock 调用 |
| `errors` | 期望流上抛错 |

```dart
blocTest<SearchBloc, SearchState>(
  'debounced search',
  build: () => SearchBloc(mockRepo),
  act: (bloc) => bloc.add(QueryChanged('flutter')),
  wait: const Duration(milliseconds: 350),
  expect: () => [
    SearchState(query: 'flutter', status: SearchStatus.loading),
    SearchState(query: 'flutter', status: SearchStatus.success, items: isNotEmpty),
  ],
);
```

## 与 Widget 测试

Bloc 逻辑优先 **bloc_test** 单测；Widget 测试只验证 `BlocProvider` 绑定与关键 UI：

```dart
testWidgets('shows loading indicator', (tester) async {
  final bloc = MockTodoBloc();
  when(() => bloc.state).thenReturn(TodoState.loading());
  when(() => bloc.stream).thenAnswer((_) => const Stream.empty());

  await tester.pumpWidget(
    MaterialApp(
      home: BlocProvider<TodoBloc>.value(
        value: bloc,
        child: const TodoPage(),
      ),
    ),
  );

  expect(find.byType(CircularProgressIndicator), findsOneWidget);
});
```

## 最佳实践

1. **一测一事件链**：复杂流程拆多个 `blocTest`，便于定位。
2. **state 用 Equatable / freezed**：`expect` 比较可靠。
3. **异步 event**：加 `wait` 或 `await untilCalled`。
4. **close bloc**：bloc_test 自动 close；手动测时记得 `await bloc.close()`。
5. **Cubit 同样适用**：无 Event 类型时 `act: (c) => c.load()`。

## 相关链接

- [[03-Bloc模式详解]]
- [[16-mocktail详解]]
- [[15-mockito详解]]
- [[07-测试库详解]]
- [[08-自动化测试]]
- [[00-第三方库索引]]
