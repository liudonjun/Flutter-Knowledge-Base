# DataTable 详解

> 深入理解 Flutter DataTable Widget。

## 📖 DataTable 概念

### 1. 什么是 DataTable

```dart
// DataTable 概念
class DataTableConcept {
  void explain() {
    print('''
    DataTable 概念：
    
    // 1. 什么是 DataTable
    // - 数据表格 Widget
    // - 显示结构化数据
    // - 支持排序和选择
    // - 支持多种样式
    
    // 2. DataTable 的特点
    // - 支持排序
    // - 支持选择
    // - 支持分页
    // - 支持多种样式
    
    // 3. DataTable 的使用场景
    // - 数据展示
    // - 数据管理
    // - 数据分析
    // - 数据编辑
    
    // 4. DataTable 的属性
    // - columns：列定义
    // - rows：行数据
    // - sortColumnIndex：排序列索引
    // - sortAscending：是否升序
    ''');
  }
}
```

### 2. DataTable 示例

```dart
// DataTable 示例
class DataTableExample {
  void explain() {
    print('''
    DataTable 示例：
    
    // 1. 基本 DataTable
    DataTable(
      columns: [
        DataColumn(label: Text('Name')),
        DataColumn(label: Text('Age')),
      ],
      rows: [
        DataRow(cells: [
          DataCell(Text('John')),
          DataCell(Text('25')),
        ]),
        DataRow(cells: [
          DataCell(Text('Jane')),
          DataCell(Text('30')),
        ]),
      ],
    )
    
    // 2. 带排序的 DataTable
    DataTable(
      columns: [
        DataColumn(
          label: Text('Name'),
          onSort: (columnIndex, ascending) {
            // 排序逻辑
          },
        ),
        DataColumn(label: Text('Age')),
      ],
      rows: [
        DataRow(cells: [
          DataCell(Text('John')),
          DataCell(Text('25')),
        ]),
      ],
      sortColumnIndex: 0,
      sortAscending: true,
    )
    
    // 3. 带选择的 DataTable
    DataTable(
      columns: [
        DataColumn(label: Text('Name')),
        DataColumn(label: Text('Age')),
      ],
      rows: [
        DataRow(
          cells: [
            DataCell(Text('John')),
            DataCell(Text('25')),
          ],
          selected: true,
          onSelectChanged: (selected) {
            // 选择逻辑
          },
        ),
      ],
    )
    ''');
  }
}
```

## 🔧 DataTable 实现

### 1. DataTable 属性

```dart
// DataTable 属性
class DataTableProperties {
  void explain() {
    print('''
    DataTable 属性：
    
    // 1. 主要属性
    // - columns：列定义
    // - rows：行数据
    // - sortColumnIndex：排序列索引
    // - sortAscending：是否升序
    
    // 2. 样式属性
    // - columnSpacing：列间距
    // - horizontalMargin：水平边距
    // - checkboxHorizontalMargin：复选框水平边距
    // - dataRowHeight：数据行高度
    
    // 3. 行为属性
    // - onSelectAll：全选回调
    // - dataTextStyle：数据文本样式
    // - headingTextStyle：标题文本样式
    // - headingRowColor：标题行颜色
    
    // 4. 示例
    DataTable(
      columns: [
        DataColumn(label: Text('Name')),
        DataColumn(label: Text('Age')),
      ],
      rows: [
        DataRow(cells: [
          DataCell(Text('John')),
          DataCell(Text('25')),
        ]),
      ],
      columnSpacing: 20,
      horizontalMargin: 10,
      checkboxHorizontalMargin: 10,
      dataRowHeight: 50,
      dataTextStyle: TextStyle(fontSize: 14),
      headingTextStyle: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
      headingRowColor: MaterialStateProperty.all(Colors.grey[200]),
    )
    ''');
  }
}
```

### 2. DataTable 最佳实践

```dart
// DataTable 最佳实践
class DataTableBestPractices {
  void explain() {
    print('''
    DataTable 最佳实践：
    
    // 1. 使用 const 构造函数
    // - 减少重建
    // - 提高性能
    // - 减少内存使用
    
    // 2. 保持简洁
    // - 避免过多列
    // - 使用适当的边距
    // - 保持层次清晰
    
    // 3. 一致性
    // - 保持应用内一致
    // - 使用主题
    // - 遵循设计规范
    
    // 4. 用户体验
    // - 提供清晰的视觉层次
    // - 使用适当的排序
    // - 提供反馈
    
    // 5. 示例
    DataTable(
      columns: const [
        DataColumn(label: Text('Name')),
        DataColumn(label: Text('Age')),
      ],
      rows: const [
        DataRow(cells: [
          DataCell(Text('John')),
          DataCell(Text('25')),
        ]),
      ],
    )
    ''');
  }
}
```

## ⚠️ 注意事项

1. **性能考虑**：DataTable 重建会影响性能
2. **一致性**：保持应用内一致
3. **用户体验**：考虑用户体验
4. **数据管理**：设计清晰的数据管理
5. **可访问性**：考虑可访问性

## 🔗 相关链接

- [[ListView]]
- [[GridView]]
- [[Card]]
- [[ListTile]]

---

> DataTable 是应用的重要组成部分，掌握 DataTable 可以提升用户体验。