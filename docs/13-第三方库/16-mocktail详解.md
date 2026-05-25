# mocktail 详解

> 零代码生成的 Mock 库：手写 `extends Mock`，适合 Dart 3 与快速单测（wiki：`[[mocktail]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [mocktail](https://pub.dev/packages/mocktail) |
| **类型** | dev_dependency，**无** build_runner |
| **适用** | Repository 单测、Riverpod override、轻量 Mock |
| **对比** | 大型接口代码生成用 [[15-mockito详解]] |
| **站内** | [[07-测试库详解]]、[[08-自动化测试]] |

API 与 Mockito 类似（`when` / `verify`），但 Mock 类需自己声明。

## 安装

```yaml
dev_dependencies:
  mocktail: ^1.0.4
  flutter_test:
    sdk: flutter
```

## 基本用法

```dart
import 'package:mocktail/mocktail.dart';
import 'package:flutter_test/flutter_test.dart';

class MockAuthRepository extends Mock implements AuthRepository {}

void main() {
  late MockAuthRepository mockRepo;
  late LoginUseCase useCase;

  setUp(() {
    mockRepo = MockAuthRepository();
    useCase = LoginUseCase(mockRepo);
  });

  test('login success', () async {
    when(() => mockRepo.signIn(email: any(named: 'email'), password: any(named: 'password')))
        .thenAnswer((_) async => AuthSession(token: 't'));

    final session = await useCase.execute('a@b.com', 'pass');

    expect(session.token, 't');
    verify(() => mockRepo.signIn(email: 'a@b.com', password: 'pass')).called(1);
  });
}
```

## registerFallbackValue

命名参数或泛型需要 fallback，否则 `any()` 报错：

```dart
setUpAll(() {
  registerFallbackValue(Uri.parse('https://example.com'));
  registerFallbackValue(const AuthSession(token: ''));
});
```

## Mock 函数类型

```dart
class MockCallback extends Mock {
  void call(int value);
}

final mock = MockCallback();
when(() => mock.call(any())).thenReturn(null);
```

## 与 Riverpod 测试

```dart
testWidgets('shows user name', (tester) async {
  final mockRepo = MockUserRepository();
  when(() => mockRepo.currentUser).thenReturn(User(name: 'Joon'));

  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        userRepositoryProvider.overrideWithValue(mockRepo),
      ],
      child: const MaterialApp(home: ProfilePage()),
    ),
  );

  expect(find.text('Joon'), findsOneWidget);
});
```

## 最佳实践

1. **一个文件一个 Mock 类**：`class MockX extends Mock implements X {}`。
2. **setUpAll 注册 fallback**：含 `DateTime`、`Uri`、自定义 model。
3. **verify 用 lambda**：`verify(() => repo.save(any())).called(1)`。
4. **避免过度 Mock**：纯函数逻辑直接测，不必 Mock。
5. **与 bloc_test**：Bloc 依赖 Mock 仓库时，mocktail 启动更快，见 [[29-bloc_test详解]]。

## 相关链接

- [[15-mockito详解]]
- [[29-bloc_test详解]]
- [[07-测试库详解]]
- [[04-Riverpod详解]]
- [[00-第三方库索引]]
