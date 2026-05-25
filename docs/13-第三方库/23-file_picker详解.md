# file_picker 详解

> 跨平台选取任意类型文件：文档、PDF、音频、多选等（wiki：`[[file_picker]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [file_picker](https://pub.dev/packages/file_picker) |
| **能力** | 系统文件选择器，不限于图片 |
| **对比** | 相册/相机用 [[22-image_picker详解]] |
| **配合** | [[12-path_provider详解]] 保存、[[13-permission_handler详解]] |
| **站内** | [[20-工具应用实战]] |

适合工具类 App：导入配置、上传附件、选择 CSV/PDF。

## 安装

```yaml
dependencies:
  file_picker: ^8.0.0
```

Android 11+ 可能需 `MANAGE_EXTERNAL_STORAGE` 或 SAF；按 targetSdk 与 README 配置。

## 基本用法

```dart
import 'package:file_picker/file_picker.dart';

Future<void> pickSinglePdf() async {
  final result = await FilePicker.platform.pickFiles(
    type: FileType.custom,
    allowedExtensions: ['pdf'],
  );

  if (result == null || result.files.isEmpty) return;

  final file = result.files.single;
  final path = file.path;           // 移动端路径
  final bytes = file.bytes;         // Web 或无 path 时用 bytes
  final name = file.name;
  final size = file.size;

  if (path != null) {
    await uploadFile(File(path));
  } else if (bytes != null) {
    await uploadBytes(bytes, name);
  }
}
```

## 多选与类型

```dart
Future<List<PlatformFile>> pickImages() async {
  final result = await FilePicker.platform.pickFiles(
    type: FileType.image,
    allowMultiple: true,
  );
  return result?.files ?? [];
}

Future<void> pickAny() async {
  await FilePicker.platform.pickFiles(type: FileType.any);
}
```

| FileType | 说明 |
| --- | --- |
| `any` | 任意 |
| `image` / `video` / `audio` | 媒体 |
| `custom` | 配合 `allowedExtensions` |

## 保存文件（导出）

```dart
Future<void> exportText(String content, String fileName) async {
  final path = await FilePicker.platform.saveFile(
    dialogTitle: '导出',
    fileName: fileName,
    bytes: utf8.encode(content),
  );
  if (path != null) {
    // 用户选择了保存位置
  }
}
```

## 与 image_picker 选型

| 场景 | 选择 |
| --- | --- |
| 用户习惯系统相册、拍照 | [[22-image_picker详解]] |
| PDF、Zip、Excel、任意扩展名 | **file_picker** |
| 自定义多选网格 | `photo_manager` |

## 最佳实践

1. **大文件**：检查 `size`，超大提示 Wi-Fi 上传；分片上传在业务层做。
2. **Web**：常只有 `bytes` 无 `path`，分支处理。
3. **权限**：Android 存储权限随版本变化；失败时引导设置。
4. **扩展名白名单**：`allowedExtensions` 防误选可执行文件。
5. **临时拷贝**：部分平台 path 为缓存，尽快上传或复制到 [[12-path_provider详解]] Documents。

## 相关链接

- [[22-image_picker详解]]
- [[12-path_provider详解]]
- [[13-permission_handler详解]]
- [[20-工具应用实战]]
- [[00-第三方库索引]]
