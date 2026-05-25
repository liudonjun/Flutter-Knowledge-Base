# Flutter Widgets 详解

> `package:flutter/widgets.dart`：Material/Cupertino 之下的**基础 Widget 层**。

## 概述

Widgets 库包含与具体设计系统无关的核心构建块，Material 和 Cupertino 都建立在其之上。

| 类别 | 示例 |
| --- | --- |
| 布局 | `Row`、`Column`、`Stack`、`Flex`、`Padding`、`Center` |
| 滚动 | `ListView`、`GridView`、`CustomScrollView` |
| 异步 UI | `FutureBuilder`、`StreamBuilder` |
| 状态继承 | `InheritedWidget`、`InheritedNotifier` |
| 渲染基础 | `RepaintBoundary`、`Opacity`、`Transform` |

## 与 Material 的关系

```dart
import 'package:flutter/widgets.dart';

// 无 Material 主题，适合测试或极简 UI
class BareApp extends StatelessWidget {
  const BareApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.ltr,
      child: Center(child: Text('Hello', textDirection: TextDirection.ltr)),
    );
  }
}
```

日常开发仍推荐 `MaterialApp` / `CupertinoApp`，它们提供 `Directionality`、`Localizations`、`Navigator` 等脚手架。

## 面试常考点

- **Stateless vs Stateful**：配置 vs 状态对象。
- **InheritedWidget**：`Theme`/`MediaQuery` 的底层机制。
- **Builder 类**：`ListView.builder` 懒加载原理。

## 相关链接

- [[53-Material组件详解]]
- [[01-Widget基础详解]]
- [[00-一切皆Widget详解]]
- [[05-UI组件库详解]]
