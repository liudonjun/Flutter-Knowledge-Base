# get_storage 详解

> 轻量键值存储，API 类似 GetX Storage，无 context（wiki：`[[get_storage]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [get_storage](https://pub.dev/packages/get_storage) |
| **特点** | 同步读写、初始化快、适合小配置 |
| **对比** | [[09-shared_preferences详解]]（官方）；[[44-hive_storage详解]]（对象/Box） |
| **注意** | 与 GetX 路由无强绑定，可单独使用 |

## 安装

```yaml
dependencies:
  get_storage: ^2.1.1
```

## 用法

```dart
import 'package:get_storage/get_storage.dart';

Future<void> main() async {
  await GetStorage.init();
  runApp(const App());
}

final box = GetStorage();

void saveTheme(String mode) => box.write('theme', mode);
String? readTheme() => box.read('theme') as String?;

box.listenKey('theme', (value) {
  debugPrint('theme changed: $value');
});
```

## 最佳实践

1. **键名常量**：`class StorageKeys { static const theme = 'theme'; }`
2. **敏感数据**：Token 用 [[20-secure_storage详解]]，勿放 get_storage 明文。
3. **类型**：read 后 cast；复杂对象 JSON 字符串或换 Hive。
4. **测试**：`GetStorage.init('test');` 独立 box 名。
5. **迁移**：版本号 key + 一次性 migration 函数。

## 选型

| 库 | 场景 |
| --- | --- |
| shared_preferences | 官方、Primitive |
| **get_storage** | 同步 API、小项目快捷 |
| Hive | 结构化、大量 KV |

## 相关链接

- [[09-shared_preferences详解]]
- [[44-hive_storage详解]]
- [[00-第三方库索引]]
