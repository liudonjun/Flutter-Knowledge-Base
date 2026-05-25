# shared_preferences 详解

> Flutter 官方推荐的轻量级键值存储，适合用户设置、引导页标记等小数据。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `shared_preferences` |
| **存储模型** | Key-Value（String / int / double / bool / List\<String\>） |
| **适用** | 主题开关、Token（短文本）、首次启动标记 |
| **不适用** | 大对象、敏感凭证、复杂查询 |

平台底层：Android `SharedPreferences`、iOS `NSUserDefaults`、Web `localStorage` 等。

## 安装

```yaml
dependencies:
  shared_preferences: ^2.2.2
```

## 基本用法

```dart
import 'package:shared_preferences/shared_preferences.dart';

class PrefsKeys {
  static const themeMode = 'theme_mode';
  static const onboardingDone = 'onboarding_done';
}

class PrefsService {
  PrefsService(this._prefs);

  final SharedPreferences _prefs;

  static Future<PrefsService> create() async {
    final prefs = await SharedPreferences.getInstance();
    return PrefsService(prefs);
  }

  String? get themeMode => _prefs.getString(PrefsKeys.themeMode);

  Future<void> setThemeMode(String value) =>
      _prefs.setString(PrefsKeys.themeMode, value);

  bool get onboardingDone => _prefs.getBool(PrefsKeys.onboardingDone) ?? false;

  Future<void> setOnboardingDone(bool value) =>
      _prefs.setBool(PrefsKeys.onboardingDone, value);

  Future<void> clearAll() => _prefs.clear();
}
```

在 `main` 中初始化后注入（可与 [[10-get_it详解]] 或 Provider 配合）：

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final prefs = await PrefsService.create();
  runApp(App(prefs: prefs));
}
```

## 最佳实践

1. **集中 Key 管理**：避免魔法字符串散落各处。
2. **不要存大 JSON**：复杂结构用 [[04-数据库库详解]] 中的 Hive / SQLite。
3. **敏感数据**：Token、密码用 [[20-secure_storage详解]]（`flutter_secure_storage`）。
4. **异步边界**：`getInstance()` 是异步的，在 `main` 或 DI 初始化阶段完成，Widget 内只读已注入实例。
5. **迁移**：Key 改名时做版本号 + 一次性迁移，避免用户丢设置。

## 与同类库对比

| 库 | 场景 |
| --- | --- |
| **shared_preferences** | 小 KV、配置项 |
| **get_storage** | 同步 API、需更高性能的简单 KV |
| **Hive / Isar** | 结构化对象、列表 |
| **flutter_secure_storage** | 加密敏感信息 |

## 相关链接

- [[04-数据库库详解]]
- [[10-get_it详解]]
- [[00-第三方库索引]]
- [pub.dev · shared_preferences](https://pub.dev/packages/shared_preferences)
