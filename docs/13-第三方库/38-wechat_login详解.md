# 微信登录详解

> Flutter 接入微信 OAuth 登录：授权码换 Token、与支付共用 Open Platform 应用（wiki：`[[wechat_login]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **推荐插件** | [fluwx](https://pub.dev/packages/fluwx)（登录 + 支付一体，社区最常用） |
| **备选** | `wechat_kit`、`wechat_assets_picker` 生态中的登录封装 |
| **前置** | 微信开放平台创建移动应用、审核通过、配置签名 |
| **配合** | [[34-wechat_pay详解]]（同一 `appId`，`registerApi` 只初始化一次） |
| **站内** | [[12-用户系统设计]]、[[21-电商应用实战]] |

**安全原则**：`code` 必须在 **服务端** 换取 `access_token` 与 `openid`；AppSecret 不得写入客户端。

## 整体流程

```
用户点击「微信登录」
     ↓
fluwx.authBy(...) → 拉起微信授权
     ↓
用户同意 → 返回 code（一次性、短有效期）
     ↓
App POST /auth/wechat { code } → 后端用 AppSecret 换 token
     ↓
后端创建/绑定用户 → 返回业务 JWT
     ↓
客户端存 Token（[[20-secure_storage详解]]）→ 进入主页
```

## 客户端示例（fluwx）

与 [[34-wechat_pay详解]] 共用初始化：

```yaml
dependencies:
  fluwx: ^5.0.0
```

```dart
import 'package:fluwx/fluwx.dart';

Future<void> initWechat(String appId, {required String universalLink}) async {
  await fluwx.registerApi(appId: appId, universalLink: universalLink);
}

Future<void> loginWithWechat() async {
  final ok = await fluwx.isWeChatInstalled;
  if (!ok) {
    throw StateError('未安装微信');
  }

  await fluwx.authBy(
    which: NormalAuth(scope: 'snsapi_userinfo', state: 'login_${DateTime.now().millisecondsSinceEpoch}'),
  );
}

// 在应用启动时注册一次
void listenWechatAuth(void Function(String code) onCode) {
  fluwx.addSubscriber((response) {
    if (response is WeChatAuthResponse) {
      if (response.errCode == 0 && response.code != null) {
        onCode(response.code!);
      }
      // errCode != 0：用户取消、拒绝等，按 errCode 提示
    }
  });
}

Future<void> exchangeCodeOnServer(String code) async {
  final session = await api.postWechatLogin(code: code);
  await secureStorage.write(key: 'access_token', value: session.token);
}
```

### 服务端（示意）

```text
GET https://api.weixin.qq.com/sns/oauth2/access_token
  ?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code

→ openid, unionid(若绑定开放平台), access_token

可选：GET /sns/userinfo 拉昵称头像，或由 unionid 绑定已有账号
```

业务层用 `unionid`（同一开放平台下多应用统一）或 `openid`（单应用）作为第三方账号主键。

## 平台配置

| 平台 | 要点 |
| --- | --- |
| **Android** | 应用签名 MD5 填入开放平台；`wxapi/WXEntryActivity` 包路径与 `applicationId` 一致 |
| **iOS** | Universal Link、URL Schemes、`Associated Domains`；与支付配置相同 |
| **审核** | 移动应用需通过开放平台审核；测试包签名与正式包不同需分别配置 |

## 与业务账号体系集成

1. **首次登录**：`openid/unionid` 无记录 → 创建用户，可选补手机号。
2. **已绑定**：直接签发 JWT，更新最后登录时间。
3. **绑定已有账号**：登录态下调用「绑定微信」，避免重复注册。
4. **登出**：仅清本地 Token；微信侧无「登出 API」，下次仍可能静默授权。

```dart
// 登录态 + 微信绑定（示意）
Future<void> bindWechat(String code) async {
  await api.postBindWechat(code: code);
}
```

## 最佳实践

1. **一次 registerApi**：登录与支付共用，避免重复注册导致回调异常。
2. **state 防 CSRF**：`authBy` 的 `state` 随机生成，服务端校验后再换 code。
3. **不要信任客户端 userinfo**：头像昵称以服务端拉取或用户自填为准。
4. **未安装微信**：`isWeChatInstalled` 为 false 时隐藏入口或引导安装。
5. **测试**：真机 + 正式签名；模拟器通常无法完成完整 OAuth。

## 常见问题

| 现象 | 排查 |
| --- | --- |
| errCode -1 | 签名、包名、AppID 不一致 |
| code 无效 | 过期（约 5 分钟）、重复使用、或 AppSecret 错误 |
| iOS 无回调 | Universal Link 未配或未在开放平台填写 |
| 与支付冲突 | 确认只注册一次 fluwx，回调里区分 `WeChatAuthResponse` / `WeChatPaymentResponse` |

## 相关链接

- [[34-wechat_pay详解]]
- [[20-secure_storage详解]]
- [[12-用户系统设计]]
- [[00-第三方库索引]]
