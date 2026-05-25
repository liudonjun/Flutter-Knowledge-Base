# Apple 登录详解

> Flutter 接入 Sign in with Apple（`sign_in_with_apple`），满足 App Store 对第三方登录的合规要求（wiki：`[[apple_sign_in]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **推荐包** | [sign_in_with_apple](https://pub.dev/packages/sign_in_with_apple)（非已废弃的 `apple_sign_in`） |
| **平台** | **iOS / macOS 必选能力**；Android/Web 可选（服务 ID + Web 流程） |
| **前置** | Apple Developer：App ID 开启 Sign in with Apple；Services ID（若做 Android/Web） |
| **站内** | [[12-用户系统设计]]、[[36-google_sign_in详解]] |

Apple 可能只首次返回用户姓名；需服务端在首次登录时持久化。

## 整体流程

```
用户点击「通过 Apple 登录」
     ↓
SignInWithApple.getAppleIDCredential(...)
     ↓
取得 identityToken + authorizationCode
     ↓
POST /auth/apple → 后端验证 JWT（identityToken）
     ↓
业务 JWT + 绑定 apple_sub
```

## 安装

```yaml
dependencies:
  sign_in_with_apple: ^6.1.0
```

### iOS 配置

- Xcode → Signing & Capabilities → **Sign in with Apple**
- `Runner.entitlements` 含 `com.apple.developer.applesignin`

## 客户端示例

```dart
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

Future<void> loginWithApple() async {
  final credential = await SignInWithApple.getAppleIDCredential(
    scopes: [
      AppleIDAuthorizationScopes.email,
      AppleIDAuthorizationScopes.fullName,
    ],
  );

  final identityToken = credential.identityToken;
  final code = credential.authorizationCode;
  if (identityToken == null) {
    throw StateError('Apple 未返回 identityToken');
  }

  await api.postAppleLogin(
    identityToken: identityToken,
    authorizationCode: code,
    givenName: credential.givenName,
    familyName: credential.familyName,
  );
}
```

### UI 按钮（App Store 规范）

```dart
SignInWithAppleButton(
  onPressed: loginWithApple,
  style: SignInWithAppleButtonStyle.black,
)
```

使用官方样式，避免审核风险。

## 服务端验证 identityToken

`identityToken` 为 JWT，校验：

- `iss` = `https://appleid.apple.com`
- `aud` = 你的 Bundle ID（或 Services ID）
- `exp` 未过期
- `sub` = Apple 用户唯一标识（账号绑定主键）

`authorizationCode` 可用于换取 refresh token（若需长期访问 Apple 服务，多数 App 仅需 `sub`）。

## App Store 政策要点

- App 若提供 **Google/Facebook/微信** 等第三方登录，通常 **必须同时提供 Apple 登录**（iOS）。
- 隐藏邮箱：Apple  relay 邮箱仍可作为联系渠道，勿假设能拿到真实邮箱。

## 最佳实践

1. **首次登录保存姓名**：Apple 仅第一次可能返回 `givenName`/`familyName`。
2. **账号删除**：支持用户在 App 内请求删除账号，与 Apple 审核指南一致。
3. **与 Google 并列**：登录页按钮层级、样式遵循各平台 HIG。
4. **测试**：真机 + TestFlight；模拟器可用但需登录 iCloud 测试账号。

## 相关链接

- [[36-google_sign_in详解]]
- [[39-facebook_login详解]]
- [[12-用户系统设计]]
- [[00-第三方库索引]]
