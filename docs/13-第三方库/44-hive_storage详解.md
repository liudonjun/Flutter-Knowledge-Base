# Hive 本地存储详解

> 使用 Hive（`hive` + `hive_flutter`）做高性能键值/对象本地存储（wiki：`[[hive_storage]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **生态** | [hive](https://pub.dev/packages/hive) + [hive_flutter](https://pub.dev/packages/hive_flutter) |
| **说明** | 索引名 `hive_storage` 指 Hive 存储方案；pub 上亦有同名小封装包，生产以 **hive_flutter** 为主 |
| **适用** | 设置、草稿、轻量缓存、离线消息队列 |
| **对比** | 关系型/SQL 见 [[04-数据库库详解]]；键值简单项 [[09-shared_preferences详解]] |
| **站内** | [[21-电商应用实战]]（购物车草稿）、[[13-消息系统设计]] |

纯 Dart 实现、无原生 SQL；Box 即「表」，读写极快，适合移动端 KV。

## 安装

```yaml
dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0

dev_dependencies:
  hive_generator: ^2.0.1
  build_runner: ^2.4.0
```

初始化路径用 [[12-path_provider详解]]：

```dart
import 'package:hive_flutter/hive_flutter.dart';

Future<void> initHive() async {
  await Hive.initFlutter();
  Hive.registerAdapter(SettingsAdapter());
  await Hive.openBox<Settings>('settings');
  await Hive.openBox('cache'); // 动态 key
}
```

## 基本读写

```dart
final settings = Hive.box<Settings>('settings');
final cache = Hive.box('cache');

await settings.put('theme', Settings(theme: ThemeMode.dark));
final theme = settings.get('theme');

await cache.put('cart_draft', jsonEncode(cartJson));
final draft = cache.get('cart_draft');
```

## TypeAdapter（推荐）

```dart
@HiveType(typeId: 1)
class Settings {
  Settings({required this.theme});
  @HiveField(0)
  final ThemeMode theme;
}

// settings.g.dart 由 hive_generator 生成
// part 'settings.g.dart';
```

```bash
dart run build_runner build
```

**typeId 全局唯一**，改字段用新 field 编号，勿复用旧 id。

## 与 Repository 模式

```dart
class CartLocalStore {
  CartLocalStore(this._box);
  final Box _box;
  static const _key = 'cart_v1';

  Future<void save(List<CartItem> items) async {
    await _box.put(_key, items.map((e) => e.toJson()).toList());
  }

  List<CartItem>? load() {
    final raw = _box.get(_key) as List?;
    return raw?.map((e) => CartItem.fromJson(Map<String, dynamic>.from(e))).toList();
  }

  Future<void> clear() => _box.delete(_key);
}
```

登录 merge 服务端购物车后 `clear()` 本地草稿。

## 加密 Box

```dart
import 'package:hive/hive.dart';

final key = Hive.generateSecureKey(); // 实际应从 secure storage 读取持久化 key
await Hive.openBox('secrets', encryptionCipher: HiveAesCipher(key));
```

敏感 Token 仍优先 [[20-secure_storage详解]]；Hive 加密适合中等敏感缓存。

## 最佳实践

1. **轻量数据**：单 Box 不宜过大；消息历史用 SQLite/Drift 更合适。
2. **版本迁移**：结构变更写 `migration` 逻辑或 bump box 名 `cart_v2`。
3. **lazy open**：非启动必需 Box 延迟 `openBox`。
4. **Web 支持**：Hive 支持 Web，但路径与容量策略不同，需单独测。
5. **测试**：`Hive.init(tempDir.path)` + 内存目录，测完 `Hive.close()`。

## 选型对比

| 方案 | 场景 |
| --- | --- |
| shared_preferences | 少量 primitive / String |
| **Hive** | 结构化对象、中等 KV、离线队列 |
| Drift/SQLite | 复杂查询、关系、大量消息 |
| Isar | Hive 继任者，新项目可评估 |

## 相关链接

- [[12-path_provider详解]]
- [[09-shared_preferences详解]]
- [[04-数据库库详解]]
- [[21-电商应用实战]]
- [[00-第三方库索引]]
