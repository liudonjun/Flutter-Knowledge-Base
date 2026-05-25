# image_picker 详解

> 从相册或相机选取图片/视频（`image_picker`），配合压缩与权限处理（wiki：`[[image_picker]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [image_picker](https://pub.dev/packages/image_picker) |
| **能力** | 相册单选/多选（视平台）、相机拍照、短视频（有限制） |
| **配合** | [[13-permission_handler详解]]、[[23-file_picker详解]]（纯文件场景） |
| **站内** | [[22-社交应用实战]]、[[21-电商应用实战]] |

大图上传前应在客户端 **压缩**，并指定展示端 `cacheWidth`，见性能规范。

## 安装

```yaml
dependencies:
  image_picker: ^1.1.0
```

Android `AndroidManifest` 声明相机/存储权限（Android 13+ 用 READ_MEDIA_IMAGES）；iOS `Info.plist` 填 `NSCameraUsageDescription`、`NSPhotoLibraryUsageDescription`。

## 基本用法

```dart
import 'package:image_picker/image_picker.dart';

final _picker = ImagePicker();

Future<XFile?> pickFromGallery() {
  return _picker.pickImage(
    source: ImageSource.gallery,
    maxWidth: 1920,
    maxHeight: 1920,
    imageQuality: 85,
  );
}

Future<XFile?> takePhoto() {
  return _picker.pickImage(
    source: ImageSource.camera,
    preferredCameraDevice: CameraDevice.rear,
    imageQuality: 85,
  );
}

Future<List<XFile>> pickMultiple() async {
  final files = await _picker.pickMultiImage(imageQuality: 85);
  return files;
}
```

`XFile` 可 `readAsBytes()` 或 `path` 转 `File` 上传。

## 与 UI 集成

```dart
Future<void> onAvatarTap() async {
  final file = await pickFromGallery();
  if (file == null || !context.mounted) return;

  setState(() => _uploading = true);
  try {
    final url = await imageUploadService.upload(File(file.path));
    await profileRepo.updateAvatar(url);
  } finally {
    if (mounted) setState(() => _uploading = false);
  }
}
```

## 最佳实践

1. **maxWidth / imageQuality**：上传前限制边长与质量，减轻 OSS 与流量压力。
2. **权限**：调用前用 [[13-permission_handler详解]] 检查；拒绝时引导去设置。
3. **Web**：行为与移动端不同，需单独测 `pickImage` 兼容性。
4. **内存**：多图不要一次性 decode 全尺寸；列表用缩略图 URL。
5. **iPad / 大屏**：相机可用 `preferredCameraDevice`；注意 popover 锚点（平台实现差异）。

## 与 file_picker 选型

| 场景 | 选择 |
| --- | --- |
| 相册/相机、用户熟悉系统 UI | `image_picker` |
| 任意类型文件、文档 PDF | [[23-file_picker详解]] |
| 可定制 UI、多选性能 | `photo_manager` + 自建网格 |

## 相关链接

- [[13-permission_handler详解]]
- [[22-社交应用实战]]
- [[00-第三方库索引]]
