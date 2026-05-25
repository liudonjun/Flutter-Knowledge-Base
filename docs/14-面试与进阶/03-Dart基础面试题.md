# Dart 基础面试题

> Dart 语言特性、空安全与异步编程常见面试题汇总。

## 空安全与类型系统

**问：Dart 空安全解决了什么？**

- 编译期区分可空 `T?` 与非空 `T`，减少 NPE。
- `?.`、`??`、`!` 的使用场景；late 延迟初始化。

**问：`dynamic` 和 `Object?` 区别？**

- `dynamic` 关闭静态检查；`Object?` 仍是 Object 层级，调用方法需 cast。

**泛型协变（了解）**：Dart 泛型默认不变；`List<Object>` 不能直接赋给 `List<String>`。

---

## Future / Stream / Isolate

| 概念 | 要点 |
| --- | --- |
| **Future** | 单次异步结果；`async/await` 语法糖 |
| **Stream** | 多次事件；单订阅 vs 广播；记得 `cancel` |
| **Isolate** | 独立内存，消息通信；重 CPU 用 `compute` / `Isolate.run` |

**追问**：为什么 Flutter 网络/IO 不阻塞 UI？——Dart 单线程事件循环 + 异步 I/O；CPU 密集需 Isolate。

```dart
Future<int> sum(List<int> data) => Isolate.run(() => data.reduce((a, b) => a + b));
```

---

## Mixin 与继承

- **Mixin**：横向复用，`with` 组合；解决多继承能力无多继承歧义。
- **extends vs implements**：implements 需实现全部接口方法。
- **sealed / enum class**（Dart 3）：代数数据类型，配合 switch 穷尽分支。

---

## 常见编码题

1. **反转链表 / 两数之和**——考察基本数据结构（见 [[13-数据结构题]]）。
2. **实现 debounce**——`Timer` + 闭包。
3. **Stream 转换**——`map`、`where`、`asyncExpand`。

---

## 回答技巧

- 语言题答完可延伸到 Flutter：`FutureBuilder` vs `StreamBuilder`。
- 不确定的 API 说明会查 [dart.dev](https://dart.dev) 官方文档。

## 相关链接

- [[02-Flutter基础面试题]]
- [[19-Dart深入]]
- [[11-Flutter算法题]]
- [[01-面试准备]]
- [[00-面试与进阶索引]]
