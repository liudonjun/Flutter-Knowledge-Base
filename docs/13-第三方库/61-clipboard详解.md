# clipboard 详解

> 读写系统剪贴板：文本、图片（平台差异）（wiki：`[[clipboard]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [clipboard](https://pub.dev/packages/clipboard) 或 Flutter 3 内置 `Clipboard` / [super_clipboard](https://pub.dev/packages/super_clipboard) |
| **常用** | `import 'package:flutter/services.dart';` → `Clipboard.setData` |
| **适用** | 复制订单号、邀请码、错误信息 |

## 内置 API（推荐）

```dart
import 'package:flutter/services.dart';

Future<void> copyText(String text) async {
  await Clipboard.setData(ClipboardData(text: text));
}

Future<String?> readText() async {
  final data = await Clipboard.getData('text/plain');
  return data?.text;
}
```

无需额外依赖即可满足多数 **纯文本** 场景。

## clipboard 包（扩展）

```yaml
dependencies:
  clipboard: ^0.1.3
```

部分版本封装了 toast 提示等；选型以 pub 维护度为准。

## UI 模式

```dart
IconButton(
  icon: const Icon(Icons.copy),
  onPressed: () async {
    await copyText(orderId);
    if (context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('已复制')),
      );
    }
  },
);
```

## 最佳实践

1. **敏感信息**：密码、Token 慎提供「复制」；复制后提示用户勿分享。
2. **粘贴**：读取剪贴板涉及隐私，iOS 16+ 有粘贴权限提示。
3. **格式**：富文本/HTML 跨平台不一致，优先纯文本。
4. **与 [[27-share_plus详解]]**：分享用 share，单字段复制用 Clipboard。

## 相关链接

- [[27-share_plus详解]]
- [[20-工具应用实战]]
- [[00-第三方库索引]]
