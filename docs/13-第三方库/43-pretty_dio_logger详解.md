# pretty_dio_logger 详解

> Dio 请求/响应 **美化控制台日志**，便于开发调试（wiki：`[[pretty_dio_logger]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [pretty_dio_logger](https://pub.dev/packages/pretty_dio_logger) |
| **类型** | 开发期 Interceptor，**勿打进 release** |
| **对比** | 内置 `LogInterceptor`、[[42-dio_logging_interceptor详解]] |
| **站内** | [[03-网络请求库详解]]、[[08-retrofit详解]] |

输出带颜色与分隔线，适合调试 REST  body、header、耗时。

## 安装

```yaml
dependencies:
  dio: ^5.4.0
  pretty_dio_logger: ^1.4.0
```

建议仅在 debug profile 依赖，或通过条件 import / `kDebugMode` 注册。

## 基本用法

```dart
import 'package:dio/dio.dart';
import 'package:pretty_dio_logger/pretty_dio_logger.dart';
import 'package:flutter/foundation.dart';

Dio createDio() {
  final dio = Dio(BaseOptions(
    baseUrl: 'https://api.example.com',
    connectTimeout: const Duration(seconds: 10),
  ));

  if (kDebugMode) {
    dio.interceptors.add(
      PrettyDioLogger(
        requestHeader: true,
        requestBody: true,
        responseBody: true,
        responseHeader: false,
        error: true,
        compact: true,
        maxWidth: 120,
      ),
    );
  }

  return dio;
}
```

## 常用配置

| 参数 | 说明 |
| --- | --- |
| `requestBody` / `responseBody` | 打印 JSON body |
| `compact` | 单行紧凑模式 |
| `maxWidth` | 换行宽度 |
| `filter` | 按 path 过滤敏感接口 |
| `logPrint` | 自定义输出（接 file logger） |

```dart
PrettyDioLogger(
  filter: (options, args) {
    // 不打印 refresh token 接口 body
    return !options.path.contains('/auth/refresh');
  },
);
```

## 与 LogInterceptor 对比

| 方案 | 特点 |
| --- | --- |
| **PrettyDioLogger** | 可读性强、开箱即用 |
| Dio `LogInterceptor` | 无额外依赖、输出较 raw |
| dio_logging_interceptor | 可写文件、结构化 |

## 最佳实践

1. **Release 禁用**：`kDebugMode` 或 flavor `dev` 才 add。
2. **脱敏**：filter 掉 Authorization、密码、支付参数；生产日志走服务端。
3. **顺序**：Logger 放在 **Auth 拦截器之后** 可看到最终 header；或之前看原始请求，团队统一即可。
4. **大 body**：上传文件时 `requestBody: false`，防刷屏与卡顿。
5. **与 Retrofit 共用**：同一 `Dio` 实例注册即可 — [[08-retrofit详解]]。

## 相关链接

- [[42-dio_logging_interceptor详解]]
- [[03-网络请求库详解]]
- [[08-retrofit详解]]
- [[00-第三方库索引]]
