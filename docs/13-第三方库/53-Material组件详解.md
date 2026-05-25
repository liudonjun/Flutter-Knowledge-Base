# Material 组件详解

> Flutter Material Design 组件库：`package:flutter/material.dart`。

## 概述

Material 不是 pub 第三方包，而是 **Flutter SDK 内置** 的 UI 库，提供 Android/Material 风格组件与主题系统。

| 能力 | 代表组件 |
| --- | --- |
| 导航 | `AppBar`、`Drawer`、`BottomNavigationBar`、`TabBar` |
| 输入 | `TextField`、`DropdownButton`、`Checkbox`、`Switch` |
| 反馈 | `SnackBar`、`Dialog`、`BottomSheet` |
| 布局 | `Scaffold`、`Card`、`ListTile`、`DataTable` |

## 基本用法

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Material')),
      body: Center(
        child: FilledButton(
          onPressed: () {},
          child: const Text('FilledButton (M3)'),
        ),
      ),
    );
  }
}
```

## Material 2 vs Material 3

- **M3**：`useMaterial3: true`，`ColorScheme.fromSeed`，`FilledButton` / `NavigationBar` 等新组件。
- 主题扩展：`Theme.of(context).textTheme`、`colorScheme.primary`。

## 与 Cupertino 选型

| 场景 | 建议 |
| --- | --- |
| 全平台统一 Material | 默认 `MaterialApp` |
| iOS 原生感 | 见 [[54-Cupertino组件详解]] 或 [[56-Adaptive_Widgets详解]] |
| 设计系统 | 自定义 `ThemeData` + `ComponentTheme` |

## 相关链接

- [[54-Cupertino组件详解]]
- [[55-Flutter_Widgets详解]]
- [[02-主题系统详解]]
- [[05-UI组件库详解]]
- [[00-第三方库索引]]
