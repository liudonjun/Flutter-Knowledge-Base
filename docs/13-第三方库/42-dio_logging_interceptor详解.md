# dio_logging_interceptor 详解

> Dio 网络日志拦截器：可配置级别、写入文件，适合长期调试（wiki：`[[dio_logging_interceptor]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [dio_logging_interceptor](https://pub.dev/packages/dio_logging_interceptor) |
| **类型** | Dio `Interceptor` 封装 |
| **对比** | 控制台美化用 [[43-pretty_dio_logger详解]] |
| **站内** | [[03-网络请求库详解]] |

适合需要 **LogLevel**、自定义 `logPrint`、或落盘分析的场景；同样仅用于 dev/staging。

## 安装

```yaml
dependencies:
  dio: ^5.4.0
  dio_logging_interceptor: ^1.0.0
```

## 基本用法

```dart
import 'package:dio/dio.dart';
import 'package:dio_logging_interceptor/dio_logging_interceptor.dart';
import 'package:flutter/foundation.dart';

Dio createDio() {
  final dio = Dio(BaseOptions(baseUrl: 'https://api.example.com'));

  if (kDebugMode) {
    dio.interceptors.add(
      DioLoggingInterceptor(
        level: Level.body,
        compact: false,
      ),
    );
  }

  return dio;
}
```

## LogLevel

| Level | 输出 |
| --- | --- |
| `none` | 关闭 |
| `basic` | 方法 + URL + 状态码 |
| `headers` | 含 header |
| `body` | 含 request/response body |

```dart
DioLoggingInterceptor(
  level: Level.body,
  logPrint: (obj) => debugPrint(obj.toString()),
);
```

## 写入文件（示意）

```dart
import 'dart:io';
import 'package:path/path.dart' as p;
import 'package:path_provider/path_provider.dart';

Future<void> attachFileLogging(Dio dio) async {
  if (!kDebugMode) return;

  final dir = await getApplicationSupportDirectory();
  final file = File(p.join(dir.path, 'network.log'));

  dio.interceptors.add(
    DioLoggingInterceptor(
      level: Level.body,
      logPrint: (o) => file.writeAsString('$o\n', mode: FileMode.append),
    ),
  );
}
```

测试人员复现问题时导出 `network.log`；注意 **PII 与 Token** 勿长期保留。

## 与 pretty_dio_logger 选型

| 需求 | 推荐 |
| --- | --- |
| 日常开发、彩色控制台 | [[43-pretty_dio_logger详解]] |
| 级别控制、自定义 logPrint | **dio_logging_interceptor** |
| 零依赖 | Dio 自带 `LogInterceptor` |

## 最佳实践

1. **Release 不注册** 或 `level: Level.none`。
2. **敏感接口降级** 为 `Level.basic`（通过多个 Dio 实例或 wrapper）。
3. **异步落盘** 量大时用 queue，避免阻塞 UI isolate。
4. **与 401 刷新共存**：日志可能打印两次 request（重试），属正常现象。
5. **结合 [[31-device_info_plus详解]]**：上报 bug 时附带设备型号 + 日志片段。

## 相关链接

- [[43-pretty_dio_logger详解]]
- [[03-网络请求库详解]]
- [[12-path_provider详解]]
- [[00-第三方库索引]]
