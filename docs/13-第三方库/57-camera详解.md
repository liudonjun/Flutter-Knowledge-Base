# camera 详解

> 官方 `camera` 插件：预览、拍照、录像与镜头切换（wiki：`[[camera]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [camera](https://pub.dev/packages/camera)（Flutter Team） |
| **适用** | 自定义相机 UI、扫码前预览、短视频采集 |
| **对比** | 仅选图用 [[22-image_picker详解]]；扫码用 `mobile_scanner` |
| **配合** | [[13-permission_handler详解]] |
| **站内** | [[20-工具应用实战]] |

比 image_picker 可控性高，但需自行管理 **Controller 生命周期** 与权限。

## 安装

```yaml
dependencies:
  camera: ^0.11.0
```

iOS `Info.plist`：`NSCameraUsageDescription`、`NSMicrophoneUsageDescription`（录像）。  
Android：`AndroidManifest` 声明 `CAMERA`、可选 `RECORD_AUDIO`。

## 初始化与预览

```dart
import 'package:camera/camera.dart';
import 'package:flutter/material.dart';

late List<CameraDescription> cameras;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cameras = await availableCameras();
  runApp(const MyApp());
}

class CameraPage extends StatefulWidget {
  const CameraPage({super.key});

  @override
  State<CameraPage> createState() => _CameraPageState();
}

class _CameraPageState extends State<CameraPage> {
  CameraController? _controller;
  Future<void>? _initFuture;

  @override
  void initState() {
    super.initState();
    _setupCamera(cameras.first);
  }

  Future<void> _setupCamera(CameraDescription desc) async {
    final controller = CameraController(
      desc,
      ResolutionPreset.high,
      enableAudio: true,
      imageFormatGroup: ImageFormatGroup.jpeg,
    );
    _initFuture = controller.initialize();
    await _initFuture;
    if (!mounted) return;
    setState(() => _controller = controller);
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final c = _controller;
    if (c == null || !c.value.isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }
    return CameraPreview(c);
  }
}
```

用 `FutureBuilder` 包裹 `initialize()` 亦可。

## 拍照与录像

```dart
Future<XFile?> takePicture(CameraController controller) async {
  if (!controller.value.isInitialized) return null;
  if (controller.value.isTakingPicture) return null;
  return controller.takePicture();
}

Future<void> startVideo(CameraController controller) async {
  await controller.startVideoRecording();
}

Future<XFile> stopVideo(CameraController controller) async {
  return controller.stopVideoRecording();
}
```

成片路径在 `XFile.path`，可上传或存 [[12-path_provider详解]]。

## 切换前后摄

```dart
Future<void> switchCamera(CameraDescription next) async {
  await _controller?.dispose();
  setState(() => _controller = null);
  await _setupCamera(next);
}
```

## 最佳实践

1. **权限先行**：[[13-permission_handler详解]] 通过后再 `availableCameras()`。
2. **dispose 必须**：离开页 `controller.dispose()`，防内存与相机占用。
3. **ResolutionPreset**：列表预览用 `medium`，拍照用 `high`；降低发热。
4. **方向**：`controller.lockCaptureOrientation` 与 UI 旋转一致。
5. **性能**：预览层 `RepaintBoundary`；避免 stack 过多 overlay 重绘。
6. **模拟器**：无真实相机，用真机测。

## 与 image_picker 选型

| 场景 | 选择 |
| --- | --- |
| 系统相册/简单拍照 | [[22-image_picker详解]] |
| 自定义取景框、连续拍摄 | **camera** |
| 二维码扫描 | mobile_scanner / ai_barcode |

## 相关链接

- [[22-image_picker详解]]
- [[13-permission_handler详解]]
- [[20-工具应用实战]]
- [[00-第三方库索引]]
