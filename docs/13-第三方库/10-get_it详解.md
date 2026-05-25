# get_it 详解

> 轻量级服务定位器（Service Locator），在 Flutter 中实现依赖注入，无需 InheritedWidget 上下文。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `get_it` |
| **模式** | Service Locator / DI 容器 |
| **适用** | Repository、ApiClient、数据库等单例/工厂 |
| **搭配** | 常与 `injectable` 代码生成配合 |

与 Provider/Riverpod 区别：get_it 管**对象创建与生命周期**，UI 状态仍可用 Provider/Riverpod；二者可共存。

## 安装

```yaml
dependencies:
  get_it: ^7.6.0
```

## 基本用法

```dart
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

abstract class ApiService {
  Future<List<String>> fetchItems();
}

class ApiServiceImpl implements ApiService {
  @override
  Future<List<String>> fetchItems() async => ['a', 'b'];
}

class ItemRepository {
  ItemRepository(this._api);
  final ApiService _api;

  Future<List<String>> load() => _api.fetchItems();
}

void setupLocator() {
  getIt.registerLazySingleton<ApiService>(() => ApiServiceImpl());
  getIt.registerFactory<ItemRepository>(
    () => ItemRepository(getIt<ApiService>()),
  );
}

void main() {
  setupLocator();
  runApp(const MyApp());
}
```

在 Widget 或 Controller 中：

```dart
final repo = getIt<ItemRepository>();
```

## 注册方式

| API | 说明 |
| --- | --- |
| `registerSingleton` | 立即创建单例 |
| `registerLazySingleton` | 首次使用时创建 |
| `registerFactory` | 每次 `get` 新建实例 |
| `registerSingletonAsync` | 异步初始化（如打开数据库） |

```dart
getIt.registerSingletonAsync<PrefsService>(
  () async => PrefsService(await SharedPreferences.getInstance()),
);
await getIt.allReady(); // 启动时等待异步单例
```

## 最佳实践

1. **单一 `setupLocator()`**：在 `main` 调用，测试里可 `getIt.reset()` 后重新注册 Mock。
2. **面向接口注册**：`registerLazySingleton<ApiService>(() => ApiServiceImpl())`，便于替换实现。
3. **避免在 Widget 里到处 `getIt`**：页面层通过构造函数/Provider 注入 Repository，降低耦合。
4. **与 injectable 结合**：大项目用 [[21-injectable详解]] 自动生成注册代码。

## 相关链接

- [[00-依赖管理详解]]
- [[21-injectable详解]]
- [[00-第三方库索引]]
- [pub.dev · get_it](https://pub.dev/packages/get_it)
