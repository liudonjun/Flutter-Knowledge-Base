# share_plus 详解

> 调起系统分享面板：文字、链接、文件（wiki：`[[share_plus]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [share_plus](https://pub.dev/packages/share_plus) |
| **适用** | 分享文章、邀请链接、导出图片/PDF |
| **平台** | iOS、Android、Web、Desktop |

## 安装

```yaml
dependencies:
  share_plus: ^10.0.0
```

## 基本用法

```dart
import 'package:share_plus/share_plus.dart';

Future<void> shareText(String text) async {
  await Share.share(text, subject: '来自 MyApp');
}

Future<void> shareLink(Uri url) async {
  await Share.shareUri(url);
}

Future<void> shareFiles(List<String> paths) async {
  await Share.shareXFiles(
    paths.map((p) => XFile(p)).toList(),
    text: '附件',
  );
}
```

## iPad / 大屏

需传 `sharePositionOrigin` 避免 crash：

```dart
final box = context.findRenderObject() as RenderBox?;
await Share.share(
  'content',
  sharePositionOrigin: box!.localToGlobal(Offset.zero) & box.size,
);
```

## 最佳实践

1. **深链**：分享 URL 带 UTM 或 invite code，服务端解析。
2. **大文件**：先写 [[12-path_provider详解]] 临时目录再 share。
3. **结果**：`ShareResult` 可区分 success/dismissed（平台差异）。
4. **与 [[14-url_launcher详解]]**：打开外链用 launcher，分享用 share_plus。

## 相关链接

- [[14-url_launcher详解]]
- [[22-社交应用实战]]
- [[00-第三方库索引]]
