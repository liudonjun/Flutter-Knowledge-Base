# Google 登录详解

> Flutter 接入 Google OAuth（`google_sign_in`），获取 idToken 交由服务端验签并签发业务 Token（wiki：`[[google_sign_in]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [google_sign_in](https://pub.dev/packages/google_sign_in) |
| **平台** | Android、iOS、Web（配置略有差异） |
| **前置** | Google Cloud Console 创建 OAuth Client；Android SHA-1、iOS URL Scheme |
| **站内** | [[12-用户系统设计]]、[[38-wechat_login详解]]、[[32-stripe详解]]（可共用 Google Pay 生态） |

**安全原则**：业务登录以服务端验证 **idToken** 为准，不要仅信任客户端返回的 email。

## 整体流程

```
用户点击 Google 登录
     ↓
GoogleSignIn.signIn() → 选择账号
     ↓
取得 idToken / accessToken
     ↓
POST /auth/google { idToken } → 后端验签
     ↓
返回业务 JWT → [[20-secure_storage详解]] 持久化
```

## 安装与配置

```yaml
dependencies:
  google_sign_in: ^6.2.0
```

| 平台 | 要点 |
| --- | --- |
| **Android** | Firebase 或 Cloud Console 填 **SHA-1**；`google-services.json` |
| **iOS** | `GoogleService-Info.plist`；URL Scheme 为 `REVERSED_CLIENT_ID` |
| **Web** | 配置 `clientId`，使用 `GoogleSignIn(clientId: ...)` |

## 客户端示例

```dart
import 'package:google_sign_in/google_sign_in.dart';

final _google = GoogleSignIn(
  scopes: ['email', 'profile'],
  // serverClientId: 'xxx.apps.googleusercontent.com', // 若需 offline access
);

Future<void> loginWithGoogle() async {
  final account = await _google.signIn();
  if (account == null) return; // 用户取消

  final auth = await account.authentication;
  final idToken = auth.idToken;
  if (idToken == null) {
    throw StateError('未获取 idToken，检查 serverClientId 配置');
  }

  final session = await api.postGoogleLogin(idToken: idToken);
  await tokenStore.save(session.accessToken);
}

Future<void> logoutGoogle() async {
  await _google.signOut();
  await tokenStore.clear();
}
```

### 服务端验签（示意）

后端使用 Google 公钥或官方库校验 `idToken` 的 `aud`、`iss`、`exp`，提取 `sub` 作为 Google 用户唯一 ID，映射到业务账号。

## 与 Firebase Auth 的关系

- **仅 Google 登录**：`google_sign_in` + 自建后端即可。
- **Firebase 全家桶**：可用 `firebase_auth` 的 `GoogleAuthProvider`，由 Firebase 托管 Token；仍建议业务层统一 Session 模型，见 [[12-用户系统设计]]。

## 最佳实践

1. **silentSignIn**：启动时可 `signInSilently()` 恢复 Google 会话，但仍需换业务 Token。
2. **多账号**：登出时 `signOut()`，避免下次误用旧账号。
3. **测试**：Android 调试签名 SHA-1 与 release 不同，Console 需分别添加。
4. **合规**：隐私政策说明 Google 账号数据用途。

## 常见问题

| 现象 | 排查 |
| --- | --- |
| `sign_in_failed` / ApiException 10 | SHA-1、包名与 Console 不一致 |
| idToken 为 null | 配置 Web Client ID 作为 `serverClientId` |
| iOS 闪退 | 检查 `Info.plist` URL Types |

## 相关链接

- [[37-apple_sign_in详解]]
- [[39-facebook_login详解]]
- [[38-wechat_login详解]]
- [[00-第三方库索引]]
