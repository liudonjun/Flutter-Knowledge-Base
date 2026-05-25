# injectable 详解

> 基于注解 + 代码生成，为 [[10-get_it详解]] 自动注册依赖（wiki：`[[injectable]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [injectable](https://pub.dev/packages/injectable) |
| **依赖** | `get_it` + `injectable_generator` |
| **适用** | 模块多、Constructor 注入链长的中大型 App |
| **对比** | 小项目手写 `setupLocator()` 即可 |
| **站内** | [[10-get_it详解]]、[[12-用户系统设计]] |

减少手写 `registerLazySingleton`，按 **环境**（dev/prod/test）切换实现。

## 安装

```yaml
dependencies:
  get_it: ^7.6.0
  injectable: ^2.4.0

dev_dependencies:
  injectable_generator: ^2.6.0
  build_runner: ^2.4.0
```

## 标注与生成

```dart
// di.dart
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'di.config.dart';

final getIt = GetIt.instance;

@InjectableInit()
Future<void> configureDependencies({String? environment}) async {
  getIt.init(environment: environment);
}
```

```dart
// api_service.dart
abstract class ApiService {
  Future<List<Item>> fetchItems();
}

@LazySingleton(as: ApiService, env: [Environment.prod])
class ProdApiService implements ApiService {
  @override
  Future<List<Item>> fetchItems() async { /* real dio */ throw UnimplementedError(); }
}

@LazySingleton(as: ApiService, env: [Environment.test])
class FakeApiService implements ApiService {
  @override
  Future<List<Item>> fetchItems() async => [];
}
```

```dart
@injectable
class ItemRepository {
  ItemRepository(this._api);
  final ApiService _api;

  Future<List<Item>> load() => _api.fetchItems();
}
```

生成：

```bash
dart run build_runner build --delete-conflicting-outputs
```

`main.dart`：

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await configureDependencies(environment: Environment.prod);
  runApp(const App());
}
```

## 常用注解

| 注解 | 说明 |
| --- | --- |
| `@injectable` | 默认 factory，每次 new（可改 scope） |
| `@singleton` / `@lazySingleton` | 单例 |
| `@module` | 第三方类注册（如 `Dio`） |
| `@preResolve` | 异步初始化完成后注册 |
| `@Environment('test')` | 按环境启用实现 |

### Module 示例

```dart
@module
abstract class RegisterModule {
  @lazySingleton
  Dio dio() => Dio(BaseOptions(baseUrl: 'https://api.example.com'));
}
```

## 测试

```dart
void main() {
  setUp(() async {
    await configureDependencies(environment: Environment.test);
  });

  tearDown(() => getIt.reset());

  test('repository uses fake api', () async {
    final repo = getIt<ItemRepository>();
    expect(await repo.load(), isEmpty);
  });
}
```

或用 `@Injectable(as: ApiService, env: [Environment.test])` 注册 Mock 实现。

## 最佳实践

1. **入口单一**：只通过 `configureDependencies()` 初始化，不散落 register。
2. **面向接口 `@LazySingleton(as: ...)`**：便于 prod/test 双实现。
3. **Module 放基础设施**：Dio、SharedPreferences、Hive box 等。
4. **与 UI 状态分离**：injectable 管 Service/Repository；Bloc/Riverpod 管 UI 状态。
5. **代码生成 CI**：提交 `di.config.dart` 或在 CI 跑 build_runner，团队统一。

## 相关链接

- [[10-get_it详解]]
- [[46-provider_di详解]]
- [[12-用户系统设计]]
- [[00-第三方库索引]]
