# Flutter 源码学习

> Framework 源码阅读路径、目录结构与常见切入点。

## 仓库结构

| 路径 | 内容 |
| --- | --- |
| `packages/flutter/lib/src/widgets/` | Widget / Element / RenderObject |
| `packages/flutter/lib/src/rendering/` | 布局、绘制、Layer |
| `packages/flutter/lib/src/scheduler/` | 帧调度、VSync |
| `packages/flutter/lib/src/gestures/` | 手势竞技场 |
| `engine/` | Skia/Impeller、Platform Embedder |

本地 clone 后可用 IDE 跳转定义；线上可看 [GitHub flutter/flutter](https://github.com/flutter/flutter)。

---

## Binding 与 Scheduler

**启动链路（简化）**：

```
WidgetsFlutterBinding.ensureInitialized()
  → SchedulerBinding、GestureBinding、ServicesBinding...
  → runApp() → attachRootWidget → buildScope → flushLayout → flushPaint
```

**阅读建议**：从 `binding.dart`、`scheduler/binding.dart` 的 `drawFrame` 入手，对照 DevTools Timeline。

---

## Element 更新机制

- `Element.updateChild`：比对 `Widget.canUpdate`（runtimeType + key）。
- `StatefulElement`：`setState` → `markNeedsBuild` → 下一帧 rebuild。
- **面试链接**：[[08-源码理解面试题]]、[[02-Flutter基础面试题]]。

---

## 渲染相关目录

1. **layout**：`RenderBox.performLayout`、约束传递。
2. **paint**：`PaintingContext`、`Layer` 合成。
3. **compositing**：`RepaintBoundary` 创建独立 Layer。

进阶：[[22-性能优化深入]]、[[Skia深入]]（引擎层）。

---

## 调试与断点

- 在 `framework.dart`、`binding.dart` 设断点观察 rebuild。
- `debugPrintRebuildDirtyWidgets = true` 看哪些 Widget 重建。
- 使用 `flutter run --verbose` 观察首帧与 Shader 编译。

---

## 学习路径建议

1. 先掌握应用层：Widget 树、状态管理。
2. 读官方 [Inside Flutter](https://docs.flutter.dev/resources/architectural-overview)。
3. 选一个点深挖：如 `ListView` 懒加载、`Hero` 动画、`Navigator 2.0`。
4. 尝试小 PR：文档、测试、tool 改进。

## 相关链接

- [[08-源码理解面试题]]
- [[框架源码]]
- [[22-性能优化深入]]
- [[01-面试准备]]
