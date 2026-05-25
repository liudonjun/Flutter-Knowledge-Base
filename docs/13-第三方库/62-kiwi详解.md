# kiwi 详解

> 编译期依赖注入代码生成（Kiwi），类似 injectable/get_it 生态（wiki：`[[kiwi]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [kiwi](https://pub.dev/packages/kiwi) + `kiwi_generator` |
| **模式** | 注解 + build_runner 生成 Container |
| **对比** | [[21-injectable详解]] + [[10-get_it详解]] 更主流 |
| **适用** | 已有 Kiwi 项目维护；新项目建议 injectable |

## 安装

```yaml
dependencies:
  kiwi: ^5.0.0

dev_dependencies:
  kiwi_generator: ^4.0.0
  build_runner: ^2.4.0
```

## 基本用法

```dart
import 'package:kiwi/kiwi.dart';

abstract class ApiService {
  Future<void> ping();
}

class ApiServiceImpl implements ApiService {
  @override
  Future<void> ping() async {}
}

abstract class AppContainer {
  void configure();
  ApiService get apiService;
}

AppContainer container = _$AppContainer();

@KiwiContainer()
@KiwiModule()
abstract class Container {
  @Register.singleton(ApiService, from: ApiServiceImpl)
  ApiService get apiService;
}
```

```bash
dart run build_runner build
```

```dart
void main() {
  container = _$AppContainer();
  container.configure();
  runApp(App(api: container.apiService));
}
```

## 与 injectable 对比

| 维度 | kiwi | injectable |
| --- | --- | --- |
| 容器 | Kiwi Container | get_it |
| 社区 | 较小 | 较大 |
| 环境切换 | 支持 module | `@Environment` |

## 最佳实践

1. **新项目**：优先 [[21-injectable详解]]，文档与示例更多。
2. **迁移**：接口层抽象不变，只换容器注册方式。
3. **测试**：生成类可替换为 test module 或手动 mock 注册。

## 相关链接

- [[21-injectable详解]]
- [[10-get_it详解]]
- [[46-provider_di详解]]
- [[00-第三方库索引]]
