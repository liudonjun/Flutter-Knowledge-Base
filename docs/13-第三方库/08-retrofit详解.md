# Retrofit 详解

> 基于 Dio 的类型安全 REST 客户端，用注解声明 API，配合代码生成减少样板代码。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `retrofit` |
| **定位** | 注解 + 代码生成的 HTTP 客户端 |
| **依赖** | 通常与 `dio`、`json_serializable` 搭配 |
| **适用** | 中大型项目、接口多且需强类型 |

**优点**：接口即文档、类型安全、与 Dio 拦截器生态兼容。  
**缺点**：需 `build_runner`，改接口要重新生成。

## 安装

```yaml
dependencies:
  dio: ^5.4.0
  retrofit: ^4.1.0
  json_annotation: ^4.8.0

dev_dependencies:
  retrofit_generator: ^8.0.0
  json_serializable: ^6.7.0
  build_runner: ^2.4.0
```

## 基本用法

```dart
import 'package:dio/dio.dart';
import 'package:json_annotation/json_annotation.dart';
import 'package:retrofit/retrofit.dart';

part 'api_service.g.dart';
part 'user.g.dart';

@RestApi(baseUrl: 'https://api.example.com')
abstract class ApiService {
  factory ApiService(Dio dio, {String baseUrl}) = _ApiService;

  @GET('/users')
  Future<List<User>> getUsers();

  @GET('/users/{id}')
  Future<User> getUser(@Path() String id);

  @POST('/users')
  Future<User> createUser(@Body() User user);
}

@JsonSerializable()
class User {
  final String id;
  final String name;

  User({required this.id, required this.name});

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);
}
```

生成代码：

```bash
dart run build_runner build --delete-conflicting-outputs
```

注册与调用：

```dart
final dio = Dio();
final api = ApiService(dio);

Future<void> load() async {
  final users = await api.getUsers();
}
```

## 常用注解

| 注解 | 用途 |
| --- | --- |
| `@GET` / `@POST` / `@PUT` / `@DELETE` | HTTP 方法 |
| `@Path()` | 路径参数 |
| `@Query()` | 查询参数 |
| `@Body()` | 请求体 |
| `@Header()` | 请求头 |
| `@Part` / `@Multipart` | 文件上传 |

## 最佳实践

1. **统一 Dio 配置**：BaseOptions、超时、拦截器（Token、日志）在 `ApiService` 工厂外集中配置。
2. **错误映射**：在 Dio 拦截器里把 HTTP 错误转为业务 `AppException`，Repository 层只处理领域错误。
3. **Mock 测试**：对接口抽象 + 注入 fake `ApiService`，避免单测走真实网络。
4. **版本锁定**：升级 `retrofit_generator` 后全量跑 `build_runner`，避免 `.g.dart` 不兼容。

## 与同类库对比

| 方案 | 特点 |
| --- | --- |
| **http** | 官方、轻量，无代码生成 |
| **Dio 手写** | 灵活，接口多时样板多 |
| **Retrofit** | 类型安全 + 生成，适合 REST CRUD |
| **Chopper** | 另一套注解生成方案 |

## 相关链接

- [[03-网络请求库详解]]
- [[00-第三方库索引]]
- [pub.dev · retrofit](https://pub.dev/packages/retrofit)
