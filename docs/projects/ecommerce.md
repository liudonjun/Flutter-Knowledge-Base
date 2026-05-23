# 电商应用开发

> 开发一个完整的电商应用，掌握 Flutter 实战技能。

## 🎯 项目目标

### 核心功能
- **商品展示**: 商品列表、详情、分类
- **购物车**: 添加商品、数量调整、结算
- **用户系统**: 登录注册、个人中心、订单管理
- **支付流程**: 支付方式、订单确认、支付安全

### 技术栈
- **前端**: Flutter
- **状态管理**: Provider 或 Riverpod
- **网络请求**: Dio
- **数据库**: SQLite 或 Hive
- **支付集成**: 第三方支付 SDK

## 🏗️ 项目架构

```
lib/
├── main.dart                 # 应用入口
├── app/                      # 应用配置
│   ├── app.dart              # 应用根组件
│   ├── routes.dart           # 路由配置
│   └── theme.dart            # 主题配置
├── features/                 # 功能模块
│   ├── auth/                 # 认证模块
│   ├── products/             # 商品模块
│   ├── cart/                 # 购物车模块
│   ├── orders/               # 订单模块
│   └── profile/              # 个人中心模块
├── core/                     # 核心功能
│   ├── network/              # 网络层
│   ├── database/             # 数据库层
│   ├── services/             # 服务层
│   └── utils/                # 工具类
└── shared/                   # 共享组件
    ├── widgets/              # 通用 Widget
    ├── constants/            # 常量定义
    └── styles/               # 样式定义
```

## 📱 功能模块

### 1. 商品模块
```dart
// 商品模型
class Product {
  final String id;
  final String name;
  final double price;
  final String imageUrl;
  final String description;
  
  Product({
    required this.id,
    required this.name,
    required this.price,
    required this.imageUrl,
    required this.description,
  });
}

// 商品列表 Widget
class ProductList extends StatelessWidget {
  final List<Product> products;
  
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: products.length,
      itemBuilder: (context, index) {
        return ProductCard(product: products[index]);
      },
    );
  }
}
```

### 2. 购物车模块
```dart
// 购物车状态管理
class CartProvider with ChangeNotifier {
  final List<CartItem> _items = [];
  
  List<CartItem> get items => _items;
  
  void addItem(Product product) {
    // 添加商品到购物车
    notifyListeners();
  }
  
  void removeItem(String productId) {
    // 移除商品
    notifyListeners();
  }
  
  double get totalPrice {
    // 计算总价
    return _items.fold(0, (sum, item) => sum + item.totalPrice);
  }
}
```

### 3. 用户模块
```dart
// 用户认证服务
class AuthService {
  Future<User> login(String email, String password) async {
    // 登录逻辑
  }
  
  Future<User> register(String email, String password, String name) async {
    // 注册逻辑
  }
  
  Future<void> logout() async {
    // 登出逻辑
  }
}
```

## 🔧 技术实现

### 网络请求
```dart
// API 服务
class ApiService {
  final Dio _dio = Dio();
  
  Future<List<Product>> getProducts() async {
    final response = await _dio.get('/products');
    return (response.data as List)
        .map((json) => Product.fromJson(json))
        .toList();
  }
  
  Future<Order> createOrder(Order order) async {
    final response = await _dio.post('/orders', data: order.toJson());
    return Order.fromJson(response.data);
  }
}
```

### 数据持久化
```dart
// 本地数据库
class DatabaseService {
  late Database _database;
  
  Future<void> init() async {
    _database = await openDatabase(
      join(await getDatabasesPath(), 'ecommerce.db'),
      onCreate: (db, version) {
        // 创建表
      },
      version: 1,
    );
  }
  
  Future<void> saveCart(List<CartItem> items) async {
    // 保存购物车数据
  }
}
```

## 🚀 开发步骤

### 第一阶段: 基础功能
1. 项目搭建和架构设计
2. 商品展示功能
3. 商品详情页面
4. 基础 UI 设计

### 第二阶段: 核心功能
1. 购物车功能
2. 用户认证
3. 订单管理
4. 支付集成

### 第三阶段: 高级功能
1. 搜索功能
2. 收藏功能
3. 评价系统
4. 推荐算法

## 📚 学习资源

- [Flutter 电商应用教程](https://flutterchina.club)
- [Flutter 状态管理](https://flutter.dev/docs/development/data-and-backend/state-mgmt)
- [Dio 网络库](https://pub.dev/packages/dio)

## 🔗 相关链接

### 核心概念
- [[core/architecture]] - Flutter 架构概览
- [[core/widgets]] - 一切皆 Widget
- [[core/dart]] - Dart 语言

### 指南
- [[guide/widgets]] - Widget 系统详解
- [[guide/state-management]] - 状态管理方案
- [[guide/navigation]] - 导航与路由系统
- [[guide/networking]] - 网络与数据处理

### 实战项目
- [[projects/index]] - 项目实战指南
- [[projects/social]] - 社交应用开发

### 学习资源
- [[resources/official]] - 官方资源
- [[resources/community]] - 社区资源
- [[resources/books]] - 书籍推荐

---
*最后更新: 2026年5月23日*