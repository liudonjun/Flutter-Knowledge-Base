# graphql_flutter 详解

> Flutter 接入 GraphQL：Query/Mutation/Subscription 与缓存（wiki：`[[graphql_flutter]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [graphql_flutter](https://pub.dev/packages/graphql_flutter) + [graphql](https://pub.dev/packages/graphql) |
| **适用** | 后端 GraphQL API、灵活字段查询 |
| **对比** | REST 用 [[03-网络请求库详解]] / [[08-retrofit详解]] |
| **实时** | Subscription 可配合 WebSocket |

## 安装

```yaml
dependencies:
  graphql_flutter: ^5.2.0
```

## 初始化 Client

```dart
import 'package:graphql_flutter.dart';

final HttpLink httpLink = HttpLink('https://api.example.com/graphql');

GraphQLClient client() => GraphQLClient(
      link: AuthLink(getToken: () async => tokenStore.accessToken).concat(httpLink),
      cache: GraphQLCache(store: InMemoryStore()),
    );
```

App 根包裹：

```dart
GraphQLProvider(
  client: ValueNotifier(client()),
  child: MaterialApp(home: HomePage()),
);
```

## Query

```dart
const productsQuery = gql(r'''
  query Products($page: Int!) {
    products(page: $page) { id name price }
  }
''');

class ProductList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: productsQuery,
        variables: {'page': 1},
      ),
      builder: (result, {fetchMore, refetch}) {
        if (result.isLoading) return const CircularProgressIndicator();
        if (result.hasException) return Text(result.exception.toString());
        final list = result.data?['products'] as List? ?? [];
        return ListView.builder(
          itemCount: list.length,
          itemBuilder: (_, i) => ListTile(title: Text(list[i]['name'])),
        );
      },
    );
  }
}
```

## Mutation

```dart
Future<void> addToCart(GraphQLClient client, String productId) async {
  const m = gql(r'''
    mutation AddCart($id: ID!) { addToCart(productId: $id) { ok } }
  ''');
  await client.mutate(MutationOptions(document: m, variables: {'id': productId}));
}
```

## 最佳实践

1. **代码生成**：`graphql_codegen` 生成类型安全 document。
2. **错误**：区分 network / GraphQL errors 数组。
3. **缓存策略**：`FetchPolicy.cacheFirst` vs `networkOnly` 按场景选。
4. **分页**：`fetchMore` + merge 函数。
5. **文件上传**：`multipart` link 或 REST 混用。

## 相关链接

- [[03-网络请求库详解]]
- [[08-retrofit详解]]
- [[26-web_socket_channel详解]]
- [[00-第三方库索引]]
