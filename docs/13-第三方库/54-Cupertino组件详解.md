# Cupertino 组件详解

> iOS 风格 UI：`package:flutter/cupertino.dart`，与 Material 并列的 SDK 组件库。

## 概述

Cupertino 提供接近 iOS Human Interface Guidelines 的组件，常用于 iOS 平台或需要原生感的页面。

| 组件 | 用途 |
| --- | --- |
| `CupertinoApp` | 应用根，Cupertino 主题 |
| `CupertinoNavigationBar` | 顶部导航 |
| `CupertinoTabScaffold` | 底部 Tab |
| `CupertinoButton` | 按钮 |
| `CupertinoTextField` | 输入框 |
| `CupertinoPicker` | 滚轮选择 |
| `CupertinoAlertDialog` | 对话框 |

## 基本用法

```dart
import 'package:flutter/cupertino.dart';

class CupertinoDemo extends StatelessWidget {
  const CupertinoDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return CupertinoApp(
      theme: const CupertinoThemeData(
        primaryColor: CupertinoColors.activeBlue,
      ),
      home: CupertinoPageScaffold(
        navigationBar: const CupertinoNavigationBar(
          middle: Text('Cupertino'),
        ),
        child: Center(
          child: CupertinoButton.filled(
            onPressed: () {},
            child: const Text('Action'),
          ),
        ),
      ),
    );
  }
}
```

## 平台适配策略

1. **整 app Cupertino**：`CupertinoApp` + 全 Cupertino 路由（较少见）。
2. **局部 Cupertino**：Material app 内单页用 `CupertinoPageScaffold`。
3. **自适应**：`Platform.isIOS` 或 [[56-Adaptive_Widgets详解]] 按平台切换 Widget。

## 相关链接

- [[53-Material组件详解]]
- [[56-Adaptive_Widgets详解]]
- [[05-UI组件库详解]]
- [[00-第三方库索引]]
