# Facebook 登录详解

> Flutter 接入 Facebook Login（推荐 `flutter_facebook_auth`），获取 accessToken 后由服务端调试并绑定用户（wiki：`[[facebook_login]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **推荐包** | [flutter_facebook_auth](https://pub.dev/packages/flutter_facebook_auth) |
| **备选** | `facebook_auth_desktop`（桌面）；旧包 `facebook_login` 维护较少 |
| **前置** | [Meta for Developers](https://developers.facebook.com/) 创建应用、配置 Facebook Login |
| **站内** | [[12-用户系统设计]]、[[37-apple_sign_in详解]]（iOS 需同时提供 Apple 登录） |

Graph API **App Secret 仅服务端**；客户端 Token 需后端 `debug_token` 或 `/me` 校验。

## 整体流程

```
用户点击 Facebook 登录
     ↓
FacebookAuth.login() → 授权页
     ↓
取得 accessToken
     ↓
POST /auth/facebook { accessToken } → 后端验证并查 /me
     ↓
业务 JWT
```

## 安装

```yaml
dependencies:
  flutter_facebook_auth: ^7.0.0
```

### 平台配置摘要

| 平台 | 要点 |
| --- | --- |
| **Android** | `strings.xml` 填 `facebook_app_id`、`facebook_client_token`；`AndroidManifest` meta-data |
| **iOS** | `Info.plist`：`FacebookAppID`、`FacebookClientToken`、`LSApplicationQueriesSchemes` |

详见插件 README 与 Meta 控制台「快速入门」。

## 客户端示例

```dart
import 'package:flutter_facebook_auth/flutter_facebook_auth.dart';

Future<void> loginWithFacebook() async {
  final result = await FacebookAuth.instance.login(
    permissions: ['email', 'public_profile'],
  );

  switch (result.status) {
    case LoginStatus.success:
      final token = result.accessToken!.tokenString;
      await api.postFacebookLogin(accessToken: token);
    case LoginStatus.cancelled:
      return;
    case LoginStatus.failed:
      throw StateError(result.message ?? 'Facebook 登录失败');
    case LoginStatus.operationInProgress:
      return;
  }
}

Future<void> logoutFacebook() async {
  await FacebookAuth.instance.logOut();
}
```

### 获取资料（可选，仍建议以服务端为准）

```dart
final userData = await FacebookAuth.instance.getUserData(
  fields: 'email,name,picture.width(200)',
);
```

## 服务端

1. 用 App Access Token 调用 `debug_token` 验证客户端 `accessToken` 属于本 App。
2. 用 User Access Token 请求 Graph API `/me?fields=id,name,email,picture`。
3. 以 `id` 作为 Facebook 用户主键写入账号体系。

## 最佳实践

1. **权限最小化**：仅申请 `email`、`public_profile`；额外权限需 Meta 审核。
2. **iOS 合规**：与 [[37-apple_sign_in详解]] 同屏提供 Apple 登录。
3. **Limited Login（iOS）**：Meta 推行的 ATT 友好模式，按插件文档启用。
4. **生产模式**：开发应用需切换「上线」并完成数据使用声明。

## 常见问题

| 现象 | 排查 |
| --- | --- |
| Invalid key hash | Android 填 Debug/Release Key Hash 到 Meta 控制台 |
| Login cancelled | 用户拒绝或应用未开启 Facebook Login 产品 |
| email 为空 | 用户未授权或无邮箱；勿作为唯一账号键 |

## 相关链接

- [[36-google_sign_in详解]]
- [[37-apple_sign_in详解]]
- [[38-wechat_login详解]]
- [[00-第三方库索引]]
