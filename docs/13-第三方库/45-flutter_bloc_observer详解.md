# flutter_bloc Observer 详解

> 全局监听 Bloc/Cubit 事件与状态变化，用于调试与日志（wiki：`[[flutter_bloc_observer]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **来源** | [flutter_bloc](https://pub.dev/packages/flutter_bloc) 包内 `BlocObserver` |
| **适用** | 开发期追踪状态流、上报异常、性能分析 |
| **配合** | [[29-bloc_test详解]]、[[03-Bloc模式详解]] |

## 基本用法

```dart
import 'package:flutter_bloc/flutter_bloc.dart';

class AppBlocObserver extends BlocObserver {
  @override
  void onCreate(BlocBase bloc) {
    super.onCreate(bloc);
    debugPrint('onCreate ${bloc.runtimeType}');
  }

  @override
  void onChange(BlocBase bloc, Change change) {
    super.onChange(bloc, change);
    debugPrint('${bloc.runtimeType} ${change.currentState} -> ${change.nextState}');
  }

  @override
  void onError(BlocBase bloc, Object error, StackTrace stackTrace) {
    super.onError(bloc, error, stackTrace);
    debugPrint('${bloc.runtimeType} error: $error');
    // 上报 Crashlytics / Sentry
  }

  @override
  void onTransition(Bloc bloc, Transition transition) {
    super.onTransition(bloc, transition);
    debugPrint('${bloc.runtimeType} event:${transition.event} states:${transition.currentState}->${transition.nextState}');
  }
}

void main() {
  Bloc.observer = AppBlocObserver();
  runApp(const App());
}
```

## 生产环境

```dart
void main() {
  if (kDebugMode) {
    Bloc.observer = AppBlocObserver();
  }
  runApp(const App());
}
```

仅 `onError` 在生产注册，避免日志泄露业务状态。

## 最佳实践

1. **勿在 onChange 改状态**：只读日志，防循环。
2. **过滤噪音**：`if (bloc is AuthBloc)` 再详细打印。
3. **与 Cubit**：Cubit 无 Event，主要看 `onChange`。
4. **测试**：测试环境可设 `Bloc.observer = null` 或 silent observer。

## 相关链接

- [[03-Bloc模式详解]]
- [[29-bloc_test详解]]
- [[02-调试技巧详解]]
- [[00-第三方库索引]]
