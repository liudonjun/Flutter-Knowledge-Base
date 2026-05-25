# Flutter 基础面试题

> Flutter 核心概念与渲染原理常见面试题汇总，附结构化答题要点。

## Widget / Element / RenderObject

**问：三者关系是什么？**

| 层 | 职责 |
| --- | --- |
| **Widget** | 不可变配置，描述 UI 长什么样 |
| **Element** | Widget 在树上的实例，负责挂载、更新、卸载 |
| **RenderObject** | 布局、绘制、命中测试 |

**答法**：Widget 是蓝图，Element 是树上的节点，RenderObject 负责真正 layout/paint。`setState` 触发的是 Element 比对 Widget，能复用则 `update`，否则 `inflate` 新子树。

---

## Stateless vs Stateful

**问：区别与使用场景？**

- **StatelessWidget**：配置不变，无 `State`；适合纯展示。
- **StatefulWidget**：有 `State` 对象持有可变数据；适合交互、动画、异步回调后更新 UI。

**追问**：为什么 Widget 设计成 immutable？——便于 diff、复用 Element、降低重建成本。

---

## BuildContext 作用

**问：BuildContext 是什么？**

- Element 对外的句柄，表示 Widget 在树中的位置。
- 用于：`Theme.of(context)`、`MediaQuery.of(context)`、`Navigator.of(context)`、查找 `InheritedWidget`。
- **注意**：异步回调里使用 context 前检查 `mounted`（StatefulWidget）。

---

## 渲染流水线三阶段

**问：Flutter 一帧里发生了什么？**

1. **Build**：构建/更新 Widget 树 → Element 树。
2. **Layout**：RenderObject 自顶向下传递约束、自底向上返回尺寸。
3. **Paint / Composite**：绘制 Layer，合成后交给 Engine 上屏。

**加分**：VSync → `SchedulerBinding` → `drawFrame` → pipeline 与 `RepaintBoundary` 减少重绘范围。

---

## 其他高频基础题

### Flutter 是什么？

Google 跨平台 UI 框架；Dart 语言；Skia/Impeller 自绘；单代码库多平台。

### Key 的作用？

区分 Element 身份，列表重排、GlobalKey 取 State/RenderObject、ValueKey 稳定列表项。

### 为什么 Flutter 性能好？

自绘引擎减少平台桥接；Layer 合成；开发模式与 release AOT 编译。

---

## 回答技巧

1. **先结论后展开**：例如「三棵树分工不同，再分别说 Widget/Element/RenderObject」。
2. **结合项目**：提到列表优化、DevTools 查 rebuild 等真实经验。
3. **承认边界**：不会的细节说明会如何查官方文档或源码。

## 相关链接

- [[04-Widget面试题]]
- [[16-状态管理面试题]]
- [[03-Dart基础面试题]]
- [[01-面试准备]]
- [[00-面试与进阶索引]]
