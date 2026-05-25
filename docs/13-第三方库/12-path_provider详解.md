# path_provider 详解

> 获取 Flutter 应用在各平台的文档、缓存、临时目录路径（wiki：`[[path_provider]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [path_provider](https://pub.dev/packages/path_provider) |
| **能力** | 应用沙箱内标准目录路径 |
| **配合** | Hive/SQLite 文件、日志、下载缓存、[[23-file_picker详解]] 保存 |
| **站内** | [[20-工具应用实战]]、[[04-数据库库详解]] |

勿把路径写死为 `/data/...`；不同平台 API 差异大，统一用 path_provider。

## 安装

```yaml
dependencies:
  path_provider: ^2.1.0
```

## 常用目录

```dart
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;

Future<String> appDocumentsDir() async {
  final dir = await getApplicationDocumentsDirectory();
  return dir.path;
}

Future<String> appSupportDir() async {
  final dir = await getApplicationSupportDirectory();
  return dir.path;
}

Future<String> tempDir() async {
  final dir = await getTemporaryDirectory();
  return dir.path;
}

Future<String> dbFilePath(String name) async {
  final docs = await getApplicationDocumentsDirectory();
  return p.join(docs.path, name);
}
```

| API | 典型用途 |
| --- | --- |
| `getApplicationDocumentsDirectory` | SQLite/Hive、用户导出文件 |
| `getApplicationSupportDirectory` | 应用数据（iOS 不 iCloud 备份时可放这） |
| `getTemporaryDirectory` | 压缩中间文件、缓存图片，系统可清理 |
| `getExternalStorageDirectory` | Android 外部私有目录（可选） |
| `getDownloadsDirectory` | 下载目录（平台支持不一） |

## 示例：初始化 Hive

```dart
Future<void> initHive() async {
  final dir = await getApplicationDocumentsDirectory();
  Hive.init(dir.path);
  await Hive.openBox('settings');
}
```

## 示例：写日志文件

```dart
Future<File> logFile() async {
  final dir = await getApplicationSupportDirectory();
  return File(p.join(dir.path, 'app.log'));
}

Future<void> appendLog(String line) async {
  final f = await logFile();
  await f.writeAsString('$line\n', mode: FileMode.append);
}
```

## 最佳实践

1. **path 包拼接**：用 `package:path/path.dart` 的 `join`，防 `\`/`/` 问题。
2. **临时文件清理**：`getTemporaryDirectory` 下的缓存定期删除。
3. **大文件**：视频/包体考虑 `getExternalStorageDirectory` + 存储权限（Android）。
4. **备份**：iOS Documents 可能进 iCloud；敏感库可放 Support 并标记不备份。
5. **Web**：部分 API 不支持，需条件导入或替代方案。

## 相关链接

- [[23-file_picker详解]]
- [[44-hive_storage详解]]
- [[04-数据库库详解]]
- [[20-工具应用实战]]
- [[00-第三方库索引]]
