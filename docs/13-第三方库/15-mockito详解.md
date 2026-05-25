# mockito 详解

> 使用 Mockito 生成 Mock 对象，配合 `when` / `verify` 做单元测试（wiki：`[[mockito]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [mockito](https://pub.dev/packages/mockito) |
| **类型** | dev_dependency + 代码生成 |
| **适用** | Repository、Service 层单元测试 |
| **对比** | 免代码生成用 [[16-mocktail详解]] |
| **站内** | [[07-测试库详解]]、[[08-自动化测试]]、[[03-Bloc模式详解]] |

Mockito 通过 `@GenerateMocks` 生成类型安全的 Mock 类；适合接口多、需严格 `verify` 的项目。

## 安装

```yaml
dev_dependencies:
  mockito: ^5.4.4
  build_runner: ^2.4.0
```

## 基本用法

```dart
// user_repository.dart
abstract class UserRepository {
  Future<String> getDisplayName(String id);
}

// user_service.dart
class UserService {
  UserService(this._repo);
  final UserRepository _repo;

  Future<String> greet(String id) async {
    final name = await _repo.getDisplayName(id);
    return 'Hello, $name';
  }
}
```

```dart
// user_service_test.dart
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';
import 'package:flutter_test/flutter_test.dart';

@GenerateMocks([UserRepository])
import 'user_service_test.mocks.dart';

void main() {
  late MockUserRepository mockRepo;
  late UserService service;

  setUp(() {
    mockRepo = MockUserRepository();
    service = UserService(mockRepo);
  });

  test('greet returns formatted string', () async {
    when(mockRepo.getDisplayName('1')).thenAnswer((_) async => 'Joon');

    final result = await service.greet('1');

    expect(result, 'Hello, Joon');
    verify(mockRepo.getDisplayName('1')).called(1);
  });
}
```

生成 Mock：

```bash
dart run build_runner build --delete-conflicting-outputs
```

## 常用 API

| API | 说明 |
| --- | --- |
| `when(...).thenReturn` | 同步返回值 |
| `when(...).thenAnswer((_) async => ...)` | 异步 |
| `when(...).thenThrow(Exception())` | 抛错 |
| `verify(...).called(n)` | 调用次数 |
| `verifyNever(...)` | 从未调用 |
| `argThat`、`any` | 参数匹配 |

```dart
when(mockRepo.getDisplayName(any)).thenAnswer((i) async => 'Guest');
verify(mockRepo.getDisplayName(argThat(startsWith('u_')))).called(1);
```

## 与 get_it 联测

```dart
setUp(() {
  getIt.reset();
  getIt.registerLazySingleton<UserRepository>(() => mockRepo);
});

tearDown(() => getIt.reset());
```

测试里替换 [[10-get_it详解]] 注册项，避免真网络请求。

## 最佳实践

1. **只 Mock 边界**：Mock Repository/ApiClient，不 Mock 被测类内部私有逻辑。
2. **Arrange-Act-Assert**：三段式保持可读。
3. **生成文件入库**：`.mocks.dart` 提交 Git，CI 不必每次 build_runner（团队约定二选一）。
4. **null safety**：Mockito 5+ 与空安全配套；旧项目注意迁移。
5. **与 Widget 测试**：Widget 层更常用 [[16-mocktail详解]] + `ProviderScope` overrides。

## mockito vs mocktail

| 维度 | mockito | mocktail |
| --- | --- | --- |
| 代码生成 | 需要 | 不需要 |
| 类型安全 | 强 | 需 `registerFallbackValue` |
| 学习成本 | 中 | 低 |
| 大型接口 | 更省心 | 手写 `extends Mock` |

## 相关链接

- [[16-mocktail详解]]
- [[29-bloc_test详解]]
- [[07-测试库详解]]
- [[08-Widget测试]]
- [[00-第三方库索引]]
