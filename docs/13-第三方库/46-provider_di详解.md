# Provider 与依赖注入详解

> Provider / Riverpod 与 get_it、injectable 的分工与组合模式（wiki：`[[provider_di]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **主题** | UI 状态（Provider/Riverpod）+ 服务定位（[[10-get_it详解]] / [[21-injectable详解]]） |
| **误区** | 把所有单例塞进 Provider 导致树过深 |
| **站内** | [[02-Provider详解]]、[[04-Riverpod详解]] |

推荐：**Repository/ApiClient** 用 get_it；**可监听 UI 状态** 用 Riverpod/Provider。

## 模式 A：get_it + Riverpod override

```dart
final cartRepositoryProvider = Provider<CartRepository>((ref) {
  return getIt<CartRepository>();
});
```

测试：

```dart
ProviderScope(
  overrides: [
    cartRepositoryProvider.overrideWithValue(mockRepo),
  ],
  child: const App(),
);
```

## 模式 B：Riverpod 纯 DI

```dart
@Riverpod(keepAlive: true)
Dio dio(DioRef ref) => Dio(BaseOptions(baseUrl: env.apiUrl));

@Riverpod(keepAlive: true)
CartRepository cartRepository(CartRepositoryRef ref) {
  return CartRepository(ref.watch(dioProvider));
}
```

代码生成 `riverpod_generator`，无需 get_it。

## 模式 C：Provider MultiProvider 手动

```dart
MultiProvider(
  providers: [
    Provider<ApiClient>(create: (_) => getIt<ApiClient>()),
    ChangeNotifierProvider(create: (c) => CartNotifier(c.read<ApiClient>())),
  ],
  child: const App(),
);
```

## 选型建议

| 层次 | 推荐 |
| --- | --- |
| HTTP / DB / Platform | get_it + injectable |
| 页面状态、异步数据 | Riverpod |
| 遗留 Provider 项目 | 渐进迁移 Repository 到 get_it |

## 最佳实践

1. **单向依赖**：presentation → domain ← data。
2. **不在 Widget build 里 get_it**：通过 Provider 暴露，便于测试。
3. **生命周期**：Bloc/Cubit 短生命周期用 `registerFactory`。
4. **文档**：团队约定哪些类型只走 get_it。

## 相关链接

- [[10-get_it详解]]
- [[21-injectable详解]]
- [[04-Riverpod详解]]
- [[12-用户系统设计]]
- [[00-第三方库索引]]
