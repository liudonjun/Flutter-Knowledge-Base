# Syncfusion Flutter Charts 详解

> Syncfusion 商业图表组件：企业级类型与文档（wiki：`[[syncfusion_flutter_charts]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [syncfusion_flutter_charts](https://pub.dev/packages/syncfusion_flutter_charts) |
| **许可** | 社区许可 / 商业许可（收入与团队规模限制见官网） |
| **适用** | 复杂金融图、实时曲线、大量系列 |
| **对比** | 开源 [[18-fl_chart详解]] |

## 安装

```yaml
dependencies:
  syncfusion_flutter_charts: ^27.1.0
```

首次使用需注册 Syncfusion License Key（社区免费档）：

```dart
import 'package:syncfusion_flutter_core/core.dart';

void main() {
  SyncfusionLicense.registerLicense('YOUR_LICENSE_KEY');
  runApp(const App());
}
```

## 折线图示例

```dart
import 'package:syncfusion_flutter_charts/charts.dart';

class RevenueChart extends StatelessWidget {
  const RevenueChart({super.key, required this.data});
  final List<ChartPoint> data;

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      primaryXAxis: const CategoryAxis(),
      series: <CartesianSeries>[
        LineSeries<ChartPoint, String>(
          dataSource: data,
          xValueMapper: (p, _) => p.label,
          yValueMapper: (p, _) => p.value,
        ),
      ],
    );
  }
}

class ChartPoint {
  ChartPoint(this.label, this.value);
  final String label;
  final double value;
}
```

## 能力概览

- 实时更新 `ChartSeriesController.updateDataSource`
- 十字线、缩放、 trackball
- 蜡烛图、瀑布图等专业类型

## 最佳实践

1. **许可合规**：发布前确认 Community License 条款。
2. **包体积**：按需 import 子库，避免引整个 Syncfusion 套件。
3. **主题**：`SfChartTheme` 与 App Theme 统一。
4. **性能**：大数据启用 `enableLazyLoading` 等 API（视图表类型）。

## 相关链接

- [[18-fl_chart详解]]
- [[50-charts_flutter详解]]
- [[05-UI组件库详解]]
- [[00-第三方库索引]]
