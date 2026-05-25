# Dart 深入

> 类型系统、VM、并发与元编程等进阶主题，适合中高级面试与源码阅读前置。

## 类型系统与协变

- **Sound null safety**：可空流分析，`late` 与 definite assignment。
- **泛型**：`List<String>` vs `List<Object>` 不变性；函数类型逆变/协变（了解即可）。
- **sealed class / enum**（Dart 3）：穷尽 `switch`，替代部分继承层次。

```dart
sealed class Result<T> {}
class Ok<T> extends Result<T> { Ok(this.value); final T value; }
class Err<T> extends Result<T> { Err(this.error); final Object error; }

String describe(Result<int> r) => switch (r) {
  Ok(value: final v) => 'ok: $v',
  Err(error: final e) => 'err: $e',
};
```

---

## Isolate 与并发

| API | 场景 |
| --- | --- |
| `async/await` | I/O 并发，单 isolate |
| `Isolate.run` / `compute` | CPU 密集（JSON 大解析、图像处理） |
| `ReceivePort` / `SendPort` | 长驻 isolate 通信 |

**注意**：Isolate 间不共享可变内存；传递消息需可序列化。

---

## VM / AOT / JIT

- **开发模式**：JIT + hot reload。
- **Release**：AOT 编译为原生机器码（mobile/desktop）。
- **Web**：dart2js 或 dart2wasm。

面试可答：为什么 release 更快——AOT、tree shaking、无 JIT 开销。

---

## 元编程入门

- **反射**：核心库受限；代码生成更常用（`json_serializable`、`freezed`）。
- **Extension methods**：为非自己类添加 API。
- **Macros**（演进中）：关注 Dart 官方 changelog。

---

## 相关链接

- [[03-Dart基础面试题]]
- [[类型系统]]
- [[Dart源码]]
- [[编译原理]]
- [[01-面试准备]]
