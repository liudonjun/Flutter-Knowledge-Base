# fl_chart 详解

> 纯 Flutter 实现的折线、柱状、饼图等图表库（wiki：`[[fl_chart]]`）。

## 概述

| 项 | 说明 |
| --- | --- |
| **包名** | [fl_chart](https://pub.dev/packages/fl_chart) |
| **特点** | 无 WebView、可深度自定义触摸与动画 |
| **对比** | 商业图表 [[51-syncfusion_flutter_charts详解]]；Google [[50-charts_flutter详解]] |
| **站内** | [[03-动画系统详解]]、[[05-UI组件库详解]] |

适合仪表盘、运动数据、电商统计等 **中等复杂度** 图表；超大数据量需采样或换原生方案。

## 安装

```yaml
dependencies:
  fl_chart: ^0.69.0
```

## 折线图示例

```dart
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class WeeklyLineChart extends StatelessWidget {
  const WeeklyLineChart({super.key, required this.points});
  final List<double> points;

  @override
  Widget build(BuildContext context) {
    return LineChart(
      LineChartData(
        gridData: const FlGridData(show: true),
        titlesData: FlTitlesData(
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) => Text('${value.toInt()}'),
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(showTitles: true, reservedSize: 40),
          ),
          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
        ),
        lineBarsData: [
          LineChartBarData(
            spots: [
              for (var i = 0; i < points.length; i++) FlSpot(i.toDouble(), points[i]),
            ],
            isCurved: true,
            dotData: const FlDotData(show: false),
            color: Theme.of(context).colorScheme.primary,
            barWidth: 3,
          ),
        ],
      ),
    );
  }
}
```

外层包 `SizedBox(height: 220)` 或 `AspectRatio`，避免 unbounded height。

## 柱状图 / 饼图

```dart
BarChart(
  BarChartData(
    barGroups: [
      for (var i = 0; i < values.length; i++)
        BarChartGroupData(x: i, barRods: [
          BarChartRodData(toY: values[i], width: 16),
        ]),
    ],
  ),
);

PieChart(
  PieChartData(
    sections: [
      PieChartSectionData(value: 40, title: '40%', color: Colors.blue),
      PieChartSectionData(value: 60, title: '60%', color: Colors.orange),
    ],
  ),
);
```

## 交互与性能

- `LineTouchData` / `BarTouchData` 显示 tooltip
- 数据点 > 几百：降采样、分页切换时间范围
- 图表放 `RepaintBoundary`，避免整页重绘 — [[01-性能优化基础]]
- 主题色用 `Theme.of(context).colorScheme`，支持暗色

## 选型对比

| 库 | 适用 |
| --- | --- |
| **fl_chart** | 开源、自定义强、社区活跃 |
| syncfusion | 企业组件全、许可需注意 |
| charts_flutter | Google 官方，更新较慢 |

## 相关链接

- [[50-charts_flutter详解]]
- [[51-syncfusion_flutter_charts详解]]
- [[05-UI组件库详解]]
- [[00-第三方库索引]]
