# secure_storage 详解

> 使用 `flutter_secure_storage` 安全存储 Token、密钥等敏感数据。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | `flutter_secure_storage` |
| **维基链接** | `[[secure_storage]]` |
| **底层** | iOS Keychain / Android Keystore / Web 等 |
| **对比** | [[09-shared_preferences详解]] 不加密，不适合存 Token |

## 安装

```yaml
dependencies:
  flutter_secure_storage: ^9.0.0
```

## 基本用法

```dart
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const _storage = FlutterSecureStorage(
  aOptions: AndroidOptions(encryptedSharedPreferences: true),
);

class SecureTokenStore {
  static const _accessKey = 'access_token';
  static const _refreshKey = 'refresh_token';

  Future<void saveTokens({
    required String access,
    required String refresh,
  }) async {
    await _storage.write(key: _accessKey, value: access);
    await _storage.write(key: _refreshKey, value: refresh);
  }

  Future<String?> readAccessToken() => _storage.read(key: _accessKey);

  Future<void clear() => _storage.deleteAll();
}
```

## 平台差异

| 平台 | 注意点 |
| --- | --- |
| **Android** | 建议 `encryptedSharedPreferences: true`；注意备份/重装后数据 |
| **iOS** | Keychain 访问组、Face ID 保护可选 |
| **Web** | 安全性弱于原生，敏感业务需额外评估 |

## 最佳实践

1. **只存必要字段**：Access / Refresh Token，不存整份 User JSON。
2. **与 Dio 拦截器配合**：401 时读 Refresh Token 刷新，失败则 `clear()` 并跳转登录。
3. **登出必清**：`deleteAll()` 或按 key 删除。
4. **单测**：抽象 `TokenStore` 接口，测试注入内存实现。

## 相关链接

- [[09-shared_preferences详解]]
- [[04-数据库库详解]]
- [[00-第三方库索引]]
- [pub.dev · flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage)
