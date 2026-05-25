# charts_flutter 详解

> Google 官方 `charts_flutter` 图表库（维护较少，新项目慎选）（wiki：`[[charts_flutter]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [charts_flutter](https://pub.dev/packages/charts_flutter) |
| **状态** | 官方示例性质，更新慢 |
| **推荐替代** | [[18-fl_chart详解]]、[[51-syncfusion_flutter_charts详解]] |
| **适用** | 维护遗留项目、简单柱状/折线 |

## 安装

```yaml
dependencies:
  charts_flutter: ^0.12.0
```

注意：可能与新版 Flutter/Dart 存在兼容滞后，集成前查 pub 分数与 issue。

## 折线图示例

```dart
import 'package:charts_flutter/flutter.dart' as charts;

class SalesChart extends StatelessWidget {
  const SalesChart({super.key, required this.series});
  final List<charts.Series<LinearSales, int>> series;

  @override
  Widget build(BuildContext context) {
    return charts.LineChart(
      series,
      animate: true,
      defaultRenderer: charts.LineRendererConfig(includePoints: true),
    );
  }
}

class LinearSales {
  LinearSales(this.year, this.sales);
  final int year;
  final int sales;
}
```

## 选型建议

| 需求 | 选择 |
| --- | --- |
| 新项目、社区活跃 | **fl_chart** |
| 企业全组件 | Syncfusion |
| 已有 charts_flutter 代码库 | 渐进迁移 fl_chart |

## 相关链接

- [[18-fl_chart详解]]
- [[51-syncfusion_flutter_charts详解]]
- [[52-bezier_chart详解]]
- [[00-第三方库索引]]
