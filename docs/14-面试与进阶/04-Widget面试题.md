# Widget 面试题

> 布局约束、生命周期、Key、InheritedWidget 与列表性能的高频面试题与答法。

## 约束与布局原理

**题：Flutter 布局约束如何传递？**

**答**：父传 `Constraints` 给子，子选 `Size` 回报；「Constraints go down, sizes go up」。子必须满足 min/max 宽高；`BoxConstraints.tightFor` 等于强制尺寸。

**题：`Expanded` 和 `Flexible` 区别？**

| 组件 | 行为 |
| --- | --- |
| `Flexible` | 可 shrink，fit 默认 loose |
| `Expanded` | `Flexible(fit: FlexFit.tight)`，占满剩余空间 |

必须在 `Row`/`Column`/`Flex` 下使用。

**题：为什么 `ListView` 嵌 `Column` 会报错？**

无界高度：`Column` 给子无限 max height，ListView 需要 bounded。解：`Expanded` 包 ListView，或 `shrinkWrap: true`（性能差，慎嵌大列表）。

详见 [[02-布局系统详解]]、[[01-性能优化基础]]。

---

## Key 的使用场景

**题：Key 有哪些类型？何时需要？**

| Key | 用途 |
| --- | --- |
| `ValueKey` | 值变则重建 State（列表 item 身份） |
| `ObjectKey` | 对象身份 |
| `UniqueKey` | 强制新 State |
| `GlobalKey` | 跨树访问 State、Form、测量尺寸 |

**答**：Element 复用导致 State 错配时加 Key（如可编辑列表 reorder、Tab 切换保留错误状态）。**不要**滥用 GlobalKey。

---

## InheritedWidget

**题：InheritedWidget 做什么？和 Provider 关系？**

**答**：向下共享数据，依赖子树在数据变时 `markNeedsBuild`。Provider/Riverpod 基于类似机制封装，避免手写 `dependOnInheritedWidgetOfExactType`。

**题：`context.watch` vs `read`？**（Riverpod/Provider）

- **watch**：重建当前 Widget
- **read**：一次性读，监听应用 `listen`/`ref.listen`

---

## 生命周期

**题：StatefulWidget 生命周期顺序？**

`createState` → `initState` → `didChangeDependencies` → `build` → `setState` → `build` → `deactivate` → `dispose`

**题：`initState` 里能否调用 `InheritedWidget`？**

可以，但首次 `dependOnInheritedWidget` 更常在 `didChangeDependencies`；异步回调前检查 `mounted`。

---

## 列表与重建优化

**题：如何优化长列表？**

1. `ListView.builder` / `SliverList` 懒加载
2. `itemExtent` 或 `prototypeItem` 固定高度
3. 子项 `const`、避免在 item build 里创建大对象
4. 图片 `cacheWidth`/`memCacheWidth`
5. Tab 用 `AutomaticKeepAliveClientMixin`

**题：`const` 构造函数作用？**

编译期常量 Widget，canUpdate 时跳过 rebuild（同 runtimeType 与 key）。

与 [[06-性能优化面试题]] 交叉。

---

## 手写题示例

**题：实现一个居中带圆角阴影的 Card**

```dart
Center(
  child: Material(
    elevation: 4,
    borderRadius: BorderRadius.circular(12),
    child: Padding(
      padding: const EdgeInsets.all(16),
      child: Text('Hello'),
    ),
  ),
);
```

**题：实现横排两列等分**

```dart
Row(
  children: [
    Expanded(child: BoxA()),
    Expanded(child: BoxB()),
  ],
);
```

---

## 回答技巧

1. **先原理后 API**：约束传递、三棵树（Widget/Element/RenderObject）
2. **结合项目**：「商品列表用 builder + 固定 itemExtent，帧率从 xx 提升」
3. **承认边界**：复杂布局提 [[09-布局调试与绘制性能]]

## 相关链接

- [[02-Flutter基础面试题]]
- [[06-性能优化面试题]]
- [[01-Flutter渲染原理]]
- [[02-Widget生命周期]]
- [[01-面试准备]]
- [[00-面试与进阶索引]]
