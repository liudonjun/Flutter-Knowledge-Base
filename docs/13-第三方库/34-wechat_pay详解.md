# 微信支付详解

> Flutter 接入微信 App 支付：prepay 参数、调起与结果确认（wiki：`[[wechat_pay]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **典型插件** | [fluwx](https://pub.dev/packages/fluwx)（支付 + 登录）或专用 wechat_pay 类插件 |
| **前置** | 微信开放平台 AppID、商户号、服务端 API 密钥 |
| **配合** | [[38-wechat_login详解]]（同一 Open Platform 应用） |
| **站内** | [[11-支付系统设计]]、[[21-电商应用实战]] |

统一下单、签名在 **服务端** 完成；客户端只接收 `appId/partnerId/prepayId/package/sign` 等字段调起微信。

## 整体流程

```
App 创建订单 → 后端微信统一下单 → 返回 prepay 参数
     ↓
fluwx.pay(...) 调起微信
     ↓
微信返回 App（errCode）→ UI 提示
     ↓
后端 payment notify → 订单置为已支付（权威）
```

## 客户端示例（fluwx）

```yaml
dependencies:
  fluwx: ^5.0.0
```

```dart
import 'package:fluwx/fluwx.dart';

Future<void> initWechat(String appId) async {
  await fluwx.registerApi(appId: appId, universalLink: 'https://your.domain/link/');
}

Future<void> payWechat(String orderId) async {
  final params = await api.fetchWechatPrepay(orderId);

  await fluwx.pay(
    which: Payment(
      appId: params.appId,
      partnerId: params.partnerId,
      prepayId: params.prepayId,
      packageValue: params.packageValue,
      nonceStr: params.nonceStr,
      timestamp: params.timestamp,
      sign: params.sign,
    ),
  );
}

// 监听结果（需在应用生命周期注册）
fluwx.addSubscriber((response) {
  if (response is WeChatPaymentResponse) {
    // errCode == 0 仅作参考，仍查订单状态
  }
});
```

## 平台配置

| 平台 | 要点 |
| --- | --- |
| **Android** | `wxapi` 包名路径、`ApplicationId` 与开放平台一致 |
| **iOS** | Universal Link、URL Types、Associated Domains |
| **审核** | 微信支付需企业主体与合规类目 |

## 最佳实践

1. **errCode ≠ 最终状态**：用户取消、断网、后台延迟都要查服务端订单。
2. **与登录共用 AppID**：注意 fluwx 初始化只做一次。
3. **H5/小程序**：Flutter App 支付仅 App 场景；别混用错误 API。
4. **测试**：微信开放平台沙箱 / 小额真机测试。

## 相关链接

- [[33-alipay详解]]
- [[38-wechat_login详解]]
- [[00-第三方库索引]]
