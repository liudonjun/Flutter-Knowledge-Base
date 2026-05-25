# 支付宝支付详解

> 国内 Flutter App 接入支付宝 App 支付的架构与客户端集成要点（wiki：`[[alipay]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **典型插件** | [tobias](https://pub.dev/packages/tobias) 等（pub 上亦有 `alipay` 命名包，选型看维护度） |
| **模式** | **服务端签名** → App 调起支付宝客户端 → 异步通知确认 |
| **对比** | 国际卡用 [[32-stripe详解]]；微信用 [[34-wechat_pay详解]] |
| **站内** | [[11-支付系统设计]]、[[21-电商应用实战]] |

支付宝 **私钥、签名逻辑必须在服务端**，客户端只接收 `orderInfo` 字符串并调 SDK。

## 整体流程

```
1. App 提交订单 id → 后端
2. 后端调用支付宝统一下单，生成 signed orderInfo
3. App 调起支付宝 App
4. 用户支付 → 返回 App（sync 结果仅供参考）
5. 后端 receive notify_url → 更新订单（权威）
```

## 客户端示例（tobias）

```yaml
dependencies:
  tobias: ^5.0.0
```

```dart
import 'package:tobias/tobias.dart';

class AlipayGateway implements PaymentGateway {
  @override
  Future<PayResult> pay(String orderId) async {
    // orderInfo 由后端返回，勿在客户端拼接签名
    final orderInfo = await _api.fetchAlipayOrderInfo(orderId);

    final map = await Tobias.pay(orderInfo);
    // map['resultStatus'] 等 — 仅作 UI 提示
    return PayResult.fromAlipay(map);
  }
}
```

## 平台配置

| 平台 | 要点 |
| --- | --- |
| **Android** | 应用包名与开放平台一致；Activity 回调配置见插件文档 |
| **iOS** | URL Scheme、`LSApplicationQueriesSchemes` 增加 `alipay` |
| **真机** | 必须安装支付宝 App；模拟器无法完整验证 |

## 最佳实践

1. **以服务端 notify 为准**：客户端 `9000` 成功仍可能掉单，需轮询订单状态或等 webhook。
2. **幂等与重复支付**：同一订单重复调起要防重复扣款。
3. **统一 PaymentGateway**：与微信、Stripe 同一接口，见 [[11-支付系统设计]]。
4. **沙箱**：支付宝开放平台沙箱账号联调后再切生产。

## 相关链接

- [[34-wechat_pay详解]]
- [[32-stripe详解]]
- [[00-第三方库索引]]
