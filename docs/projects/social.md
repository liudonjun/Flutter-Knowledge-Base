# 社交应用开发

> 开发一个完整的社交应用，掌握 Flutter 实战技能。

## 🎯 项目目标

### 核心功能
- **用户系统**: 注册登录、个人资料、好友关系
- **消息系统**: 即时通讯、群聊、消息推送
- **动态分享**: 发布动态、点赞评论、分享转发
- **社交功能**: 关注粉丝、推荐好友、搜索发现

### 技术栈
- **前端**: Flutter
- **状态管理**: Riverpod 或 BLoC
- **网络请求**: Dio + WebSocket
- **实时通讯**: WebSocket 或 Firebase
- **推送通知**: Firebase Cloud Messaging
- **图片存储**: 云存储服务

## 🏗️ 项目架构

```
lib/
├── main.dart                 # 应用入口
├── app/                      # 应用配置
│   ├── app.dart              # 应用根组件
│   ├── routes.dart           # 路由配置
│   ├── theme.dart            # 主题配置
│   └── providers.dart        # 状态管理配置
├── features/                 # 功能模块
│   ├── auth/                 # 认证模块
│   │   ├── models/           # 数据模型
│   │   ├── providers/        # 状态管理
│   │   ├── screens/          # 页面
│   │   └── widgets/          # 组件
│   ├── chat/                 # 聊天模块
│   ├── posts/                # 动态模块
│   ├── profile/              # 个人资料模块
│   ├── friends/              # 好友模块
│   └── search/               # 搜索模块
├── core/                     # 核心功能
│   ├── network/              # 网络层
│   │   ├── api_client.dart   # API 客户端
│   │   ├── websocket.dart    # WebSocket 管理
│   │   └── interceptors.dart # 拦截器
│   ├── services/             # 服务层
│   │   ├── auth_service.dart # 认证服务
│   │   ├── chat_service.dart # 聊天服务
│   │   └── push_service.dart # 推送服务
│   ├── models/               # 数据模型
│   └── utils/                # 工具类
├── shared/                   # 共享组件
│   ├── widgets/              # 通用 Widget
│   ├── constants/            # 常量定义
│   └── styles/               # 样式定义
└── config/                   # 配置文件
    ├── api_config.dart       # API 配置
    └── app_config.dart       # 应用配置
```

## 📱 功能模块详解

### 1. 用户系统模块
```dart
// 用户模型
class User {
  final String id;
  final String username;
  final String email;
  final String avatar;
  final String bio;
  final int followers;
  final int following;
  final DateTime createdAt;
  
  User({
    required this.id,
    required this.username,
    required this.email,
    required this.avatar,
    required this.bio,
    required this.followers,
    required this.following,
    required this.createdAt,
  });
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      username: json['username'],
      email: json['email'],
      avatar: json['avatar'],
      bio: json['bio'],
      followers: json['followers'],
      following: json['following'],
      createdAt: DateTime.parse(json['created_at']),
    );
  }
}

// 用户状态管理
class UserProvider extends StateNotifier<User?> {
  UserProvider() : super(null);
  
  Future<void> login(String email, String password) async {
    // 登录逻辑
  }
  
  Future<void> register(String username, String email, String password) async {
    // 注册逻辑
  }
  
  Future<void> logout() async {
    // 登出逻辑
  }
  
  Future<void> updateProfile({
    String? username,
    String? bio,
    String? avatar,
  }) async {
    // 更新资料
  }
}
```

### 2. 消息系统模块
```dart
// 消息模型
class Message {
  final String id;
  final String senderId;
  final String receiverId;
  final String content;
  final MessageType type;
  final DateTime timestamp;
  final bool isRead;
  
  Message({
    required this.id,
    required this.senderId,
    required this.receiverId,
    required this.content,
    required this.type,
    required this.timestamp,
    required this.isRead,
  });
  
  factory Message.fromJson(Map<String, dynamic> json) {
    return Message(
      id: json['id'],
      senderId: json['sender_id'],
      receiverId: json['receiver_id'],
      content: json['content'],
      type: MessageType.values.firstWhere(
        (e) => e.toString() == 'MessageType.${json['type']}',
      ),
      timestamp: DateTime.parse(json['timestamp']),
      isRead: json['is_read'],
    );
  }
}

// WebSocket 服务
class WebSocketService {
  late WebSocketChannel _channel;
  final StreamController<Message> _messageController = StreamController.broadcast();
  
  Stream<Message> get messages => _messageController.stream;
  
  void connect(String url) {
    _channel = WebSocketChannel.connect(Uri.parse(url));
    
    _channel.stream.listen((data) {
      final message = Message.fromJson(jsonDecode(data));
      _messageController.add(message);
    });
  }
  
  void sendMessage(Message message) {
    _channel.sink.add(jsonEncode(message.toJson()));
  }
  
  void disconnect() {
    _channel.sink.close();
    _messageController.close();
  }
}
```

### 3. 动态分享模块
```dart
// 动态模型
class Post {
  final String id;
  final String userId;
  final String content;
  final List<String> images;
  final int likes;
  final int comments;
  final int shares;
  final DateTime createdAt;
  final User author;
  
  Post({
    required this.id,
    required this.userId,
    required this.content,
    required this.images,
    required this.likes,
    required this.comments,
    required this.shares,
    required this.createdAt,
    required this.author,
  });
  
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      userId: json['user_id'],
      content: json['content'],
      images: List<String>.from(json['images']),
      likes: json['likes'],
      comments: json['comments'],
      shares: json['shares'],
      createdAt: DateTime.parse(json['created_at']),
      author: User.fromJson(json['author']),
    );
  }
}

// 动态列表 Widget
class PostList extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final posts = ref.watch(postsProvider);
    
    return ListView.builder(
      itemCount: posts.length,
      itemBuilder: (context, index) {
        return PostCard(post: posts[index]);
      },
    );
  }
}
```

## 🔧 技术实现

### 1. 网络层实现
```dart
// API 客户端
class ApiClient {
  final Dio _dio;
  final String baseUrl;
  
  ApiClient({required this.baseUrl}) : _dio = Dio(BaseOptions(
    baseUrl: baseUrl,
    connectTimeout: Duration(seconds: 5),
    receiveTimeout: Duration(seconds: 3),
  )) {
    _dio.interceptors.add(AuthInterceptor());
    _dio.interceptors.add(LogInterceptor());
  }
  
  Future<Response> get(String path, {Map<String, dynamic>? queryParameters}) async {
    return await _dio.get(path, queryParameters: queryParameters);
  }
  
  Future<Response> post(String path, {dynamic data}) async {
    return await _dio.post(path, data: data);
  }
  
  Future<Response> put(String path, {dynamic data}) async {
    return await _dio.put(path, data: data);
  }
  
  Future<Response> delete(String path) async {
    return await _dio.delete(path);
  }
}

// 认证拦截器
class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    final token = TokenService.getAccessToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }
  
  @override
  void onError(DioError error, ErrorInterceptorHandler handler) {
    if (error.response?.statusCode == 401) {
      // Token 过期，刷新 Token
      _refreshToken();
    }
    handler.next(error);
  }
}
```

### 2. 推送通知实现
```dart
// 推送服务
class PushService {
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  
  Future<void> initialize() async {
    // 请求权限
    NotificationSettings settings = await _messaging.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );
    
    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('用户授权推送通知');
    }
    
    // 获取 Token
    String? token = await _messaging.getToken();
    print('FCM Token: $token');
    
    // 监听消息
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
    FirebaseMessaging.onMessageOpenedApp.listen(_handleBackgroundMessage);
  }
  
  void _handleForegroundMessage(RemoteMessage message) {
    // 处理前台消息
    print('收到前台消息: ${message.notification?.title}');
  }
  
  void _handleBackgroundMessage(RemoteMessage message) {
    // 处理后台消息
    print('收到后台消息: ${message.notification?.title}');
  }
}
```

### 3. 图片上传实现
```dart
// 图片上传服务
class ImageUploadService {
  final ApiClient _apiClient;
  
  ImageUploadService(this._apiClient);
  
  Future<String> uploadImage(File imageFile) async {
    final formData = FormData.fromMap({
      'file': await MultipartFile.fromFile(
        imageFile.path,
        filename: 'image.jpg',
      ),
    });
    
    final response = await _apiClient.post('/upload/image', data: formData);
    return response.data['url'];
  }
  
  Future<List<String>> uploadImages(List<File> imageFiles) async {
    final List<String> urls = [];
    
    for (final imageFile in imageFiles) {
      final url = await uploadImage(imageFile);
      urls.add(url);
    }
    
    return urls;
  }
}
```

## 🚀 开发步骤

### 第一阶段: 基础功能
1. 项目搭建和架构设计
2. 用户注册登录
3. 个人资料管理
4. 基础 UI 设计

### 第二阶段: 核心功能
1. 好友关系管理
2. 动态发布浏览
3. 即时通讯功能
4. 消息推送通知

### 第三阶段: 高级功能
1. 搜索功能
2. 推荐算法
3. 社交分享
4. 性能优化

## 📚 学习资源

- [Flutter 社交应用教程](https://flutterchina.club)
- [WebSocket 实时通讯](https://flutter.dev/docs/cookbook/networking/web-sockets)
- [Firebase 集成](https://firebase.flutter.dev/)
- [Riverpod 状态管理](https://riverpod.dev/)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[Dart 语言]] - Dart 语言

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[状态管理]] - 状态管理方案
- [[导航与路由]] - 导航与路由系统
- [[网络与数据]] - 网络与数据处理

### 实战项目
- [[电商应用]] - 电商应用实战
- [[项目实战]] - 项目实战指南

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*