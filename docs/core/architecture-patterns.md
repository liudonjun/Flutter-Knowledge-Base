# Flutter 架构模式

> 掌握 Flutter 架构模式，构建可维护、可扩展的应用。

## 🏗️ 常见架构模式

### 1. MVC (Model-View-Controller)
**特点**:
- 经典的三层架构
- 关注点分离
- 简单易懂
- 适合小型项目

```dart
// Model
class User {
  final String id;
  final String name;
  final String email;
  
  User({required this.id, required this.name, required this.email});
  
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
}

// Controller
class UserController {
  final UserRepository _repository;
  User? _currentUser;
  
  UserController(this._repository);
  
  Future<void> loadUser(String id) async {
    _currentUser = await _repository.getUser(id);
  }
  
  User? get currentUser => _currentUser;
  
  Future<void> updateUser({
    String? name,
    String? email,
  }) async {
    if (_currentUser != null) {
      // 更新逻辑
    }
  }
}

// View
class UserView extends StatefulWidget {
  final UserController controller;
  
  @override
  _UserViewState createState() => _UserViewState();
}

class _UserViewState extends State<UserView> {
  @override
  void initState() {
    super.initState();
    widget.controller.loadUser('123');
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (widget.controller.currentUser != null)
          Text('用户: ${widget.controller.currentUser!.name}'),
        ElevatedButton(
          onPressed: () => widget.controller.updateUser(name: '新名字'),
          child: Text('更新用户'),
        ),
      ],
    );
  }
}
```

### 2. MVVM (Model-View-ViewModel)
**特点**:
- 数据绑定
- 双向数据流
- 更好的测试性
- 适合中型项目

```dart
// Model
class User {
  final String id;
  final String name;
  final String email;
  
  User({required this.id, required this.name, required this.email});
}

// ViewModel
class UserViewModel extends ChangeNotifier {
  final UserRepository _repository;
  User? _user;
  bool _isLoading = false;
  String? _error;
  
  UserViewModel(this._repository);
  
  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  Future<void> loadUser(String id) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      _user = await _repository.getUser(id);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  Future<void> updateUser({String? name, String? email}) async {
    if (_user != null) {
      _isLoading = true;
      notifyListeners();
      
      try {
        // 更新逻辑
        _user = User(
          id: _user!.id,
          name: name ?? _user!.name,
          email: email ?? _user!.email,
        );
      } catch (e) {
        _error = e.toString();
      } finally {
        _isLoading = false;
        notifyListeners();
      }
    }
  }
}

// View
class UserView extends StatelessWidget {
  final UserViewModel viewModel;
  
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider.value(
      value: viewModel,
      child: Consumer<UserViewModel>(
        builder: (context, viewModel, child) {
          if (viewModel.isLoading) {
            return CircularProgressIndicator();
          }
          
          if (viewModel.error != null) {
            return Text('错误: ${viewModel.error}');
          }
          
          return Column(
            children: [
              if (viewModel.user != null)
                Text('用户: ${viewModel.user!.name}'),
              ElevatedButton(
                onPressed: () => viewModel.updateUser(name: '新名字'),
                child: Text('更新用户'),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

### 3. Clean Architecture
**特点**:
- 分层清晰
- 依赖倒置
- 易于测试
- 适合大型项目

```dart
// Domain Layer (核心业务)
// Entities
abstract class UserEntity {
  String get id;
  String get name;
  String get email;
}

// Use Cases
abstract class GetUserUseCase {
  Future<UserEntity> execute(String id);
}

abstract class UpdateUserUseCase {
  Future<void> execute(UserEntity user);
}

// Repository Interface
abstract class UserRepository {
  Future<UserEntity> getUser(String id);
  Future<void> updateUser(UserEntity user);
}

// Data Layer (数据访问)
// Models
class UserModel extends UserEntity {
  @override
  final String id;
  @override
  final String name;
  @override
  final String email;
  
  UserModel({required this.id, required this.name, required this.email});
  
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'],
      email: json['email'],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'email': email,
    };
  }
}

// Repository Implementation
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;
  
  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });
  
  @override
  Future<UserEntity> getUser(String id) async {
    try {
      final user = await remoteDataSource.getUser(id);
      await localDataSource.cacheUser(user);
      return user;
    } catch (e) {
      final cachedUser = await localDataSource.getCachedUser(id);
      if (cachedUser != null) {
        return cachedUser;
      }
      rethrow;
    }
  }
  
  @override
  Future<void> updateUser(UserEntity user) async {
    await remoteDataSource.updateUser(user as UserModel);
    await localDataSource.cacheUser(user);
  }
}

// Presentation Layer (表现层)
// State
class UserState {
  final UserEntity? user;
  final bool isLoading;
  final String? error;
  
  UserState({
    this.user,
    this.isLoading = false,
    this.error,
  });
  
  UserState copyWith({
    UserEntity? user,
    bool? isLoading,
    String? error,
  }) {
    return UserState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
}

// Cubit (BLoC 简化版)
class UserCubit extends Cubit<UserState> {
  final GetUserUseCase getUserUseCase;
  final UpdateUserUseCase updateUserUseCase;
  
  UserCubit({
    required this.getUserUseCase,
    required this.updateUserUseCase,
  }) : super(UserState());
  
  Future<void> loadUser(String id) async {
    emit(state.copyWith(isLoading: true, error: null));
    
    try {
      final user = await getUserUseCase.execute(id);
      emit(state.copyWith(user: user, isLoading: false));
    } catch (e) {
      emit(state.copyWith(error: e.toString(), isLoading: false));
    }
  }
  
  Future<void> updateUser(UserEntity user) async {
    emit(state.copyWith(isLoading: true, error: null));
    
    try {
      await updateUserUseCase.execute(user);
      emit(state.copyWith(user: user, isLoading: false));
    } catch (e) {
      emit(state.copyWith(error: e.toString(), isLoading: false));
    }
  }
}

// View
class UserView extends StatelessWidget {
  final UserCubit cubit;
  
  @override
  Widget build(BuildContext context) {
    return BlocProvider.value(
      value: cubit,
      child: BlocBuilder<UserCubit, UserState>(
        builder: (context, state) {
          if (state.isLoading) {
            return CircularProgressIndicator();
          }
          
          if (state.error != null) {
            return Text('错误: ${state.error}');
          }
          
          return Column(
            children: [
              if (state.user != null)
                Text('用户: ${state.user!.name}'),
              ElevatedButton(
                onPressed: () => cubit.updateUser(
                  UserEntity(name: '新名字', email: state.user!.email),
                ),
                child: Text('更新用户'),
              ),
            ],
          );
        },
      ),
    );
  }
}
```

### 4. Repository 模式
**特点**:
- 数据访问抽象
- 数据源切换
- 缓存策略
- 统一接口

```dart
// Repository 接口
abstract class UserRepository {
  Future<List<User>> getUsers();
  Future<User> getUser(String id);
  Future<void> addUser(User user);
  Future<void> updateUser(User user);
  Future<void> deleteUser(String id);
}

// Remote Data Source
abstract class UserRemoteDataSource {
  Future<List<User>> getUsers();
  Future<User> getUser(String id);
  Future<void> addUser(User user);
  Future<void> updateUser(User user);
  Future<void> deleteUser(String id);
}

// Local Data Source
abstract class UserLocalDataSource {
  Future<List<User>> getCachedUsers();
  Future<User?> getCachedUser(String id);
  Future<void> cacheUsers(List<User> users);
  Future<void> cacheUser(User user);
  Future<void> clearCache();
}

// Repository Implementation
class UserRepositoryImpl implements UserRepository {
  final UserRemoteDataSource remoteDataSource;
  final UserLocalDataSource localDataSource;
  final NetworkInfo networkInfo;
  
  UserRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });
  
  @override
  Future<List<User>> getUsers() async {
    if (await networkInfo.isConnected) {
      try {
        final users = await remoteDataSource.getUsers();
        await localDataSource.cacheUsers(users);
        return users;
      } catch (e) {
        // 远程失败，返回缓存数据
        return await localDataSource.getCachedUsers();
      }
    } else {
      // 无网络，返回缓存数据
      return await localDataSource.getCachedUsers();
    }
  }
  
  @override
  Future<User> getUser(String id) async {
    if (await networkInfo.isConnected) {
      try {
        final user = await remoteDataSource.getUser(id);
        await localDataSource.cacheUser(user);
        return user;
      } catch (e) {
        // 远程失败，返回缓存数据
        final cachedUser = await localDataSource.getCachedUser(id);
        if (cachedUser != null) {
          return cachedUser;
        }
        rethrow;
      }
    } else {
      // 无网络，返回缓存数据
      final cachedUser = await localDataSource.getCachedUser(id);
      if (cachedUser != null) {
        return cachedUser;
      }
      throw Exception('No network and no cached data');
    }
  }
  
  @override
  Future<void> addUser(User user) async {
    if (await networkInfo.isConnected) {
      await remoteDataSource.addUser(user);
      await localDataSource.cacheUser(user);
    } else {
      throw Exception('No network connection');
    }
  }
  
  @override
  Future<void> updateUser(User user) async {
    if (await networkInfo.isConnected) {
      await remoteDataSource.updateUser(user);
      await localDataSource.cacheUser(user);
    } else {
      throw Exception('No network connection');
    }
  }
  
  @override
  Future<void> deleteUser(String id) async {
    if (await networkInfo.isConnected) {
      await remoteDataSource.deleteUser(id);
      await localDataSource.clearCache();
    } else {
      throw Exception('No network connection');
    }
  }
}
```

### 5. Provider + Repository 模式
**特点**:
- 结合 Provider 和 Repository
- 简单易用
- 数据管理清晰
- 适合中小型项目

```dart
// Repository
class UserRepository {
  final ApiClient _apiClient;
  final DatabaseService _databaseService;
  
  UserRepository(this._apiClient, this._databaseService);
  
  Future<List<User>> getUsers() async {
    try {
      final response = await _apiClient.get('/users');
      final users = (response.data as List)
          .map((json) => User.fromJson(json))
          .toList();
      
      // 缓存到本地数据库
      await _databaseService.saveUsers(users);
      
      return users;
    } catch (e) {
      // 网络失败，从本地数据库获取
      return await _databaseService.getUsers();
    }
  }
  
  Future<User> getUser(String id) async {
    try {
      final response = await _apiClient.get('/users/$id');
      final user = User.fromJson(response.data);
      
      // 缓存到本地数据库
      await _databaseService.saveUser(user);
      
      return user;
    } catch (e) {
      // 网络失败，从本地数据库获取
      final user = await _databaseService.getUser(id);
      if (user != null) {
        return user;
      }
      rethrow;
    }
  }
}

// Provider
class UserProvider extends ChangeNotifier {
  final UserRepository _repository;
  
  List<User> _users = [];
  User? _currentUser;
  bool _isLoading = false;
  String? _error;
  
  UserProvider(this._repository);
  
  List<User> get users => _users;
  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  String? get error => _error;
  
  Future<void> loadUsers() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      _users = await _repository.getUsers();
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  Future<void> loadUser(String id) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    
    try {
      _currentUser = await _repository.getUser(id);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
  
  Future<void> addUser(User user) async {
    _isLoading = true;
    notifyListeners();
    
    try {
      await _repository.addUser(user);
      _users.add(user);
    } catch (e) {
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}

// View
class UserListView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => UserProvider(
        UserRepository(
          ApiClient(),
          DatabaseService(),
        ),
      ),
      child: Consumer<UserProvider>(
        builder: (context, provider, child) {
          if (provider.isLoading) {
            return CircularProgressIndicator();
          }
          
          if (provider.error != null) {
            return Text('错误: ${provider.error}');
          }
          
          return ListView.builder(
            itemCount: provider.users.length,
            itemBuilder: (context, index) {
              final user = provider.users[index];
              return ListTile(
                title: Text(user.name),
                subtitle: Text(user.email),
              );
            },
          );
        },
      ),
    );
  }
}
```

## 🎯 架构选择指南

### 按项目规模选择
- **小型项目**: MVC, Provider + Repository
- **中型项目**: MVVM, Repository 模式
- **大型项目**: Clean Architecture, BLoC

### 按团队经验选择
- **新手团队**: MVC, Provider
- **有经验团队**: MVVM, Repository
- **专家团队**: Clean Architecture, BLoC

### 按测试要求选择
- **简单测试**: MVC, MVVM
- **单元测试**: Repository 模式
- **完整测试**: Clean Architecture

## 📊 架构对比

| 架构模式 | 复杂度 | 测试性 | 可维护性 | 学习曲线 | 适用场景 |
|----------|--------|--------|----------|----------|----------|
| MVC | 低 | 中 | 中 | 低 | 小型项目 |
| MVVM | 中 | 高 | 高 | 中 | 中型项目 |
| Clean | 高 | 很高 | 很高 | 高 | 大型项目 |
| Repository | 中 | 高 | 高 | 中 | 数据驱动应用 |

## 🚀 最佳实践

### 1. 依赖注入
```dart
// 使用 get_it 进行依赖注入
import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

void setupDependencies() {
  // 注册数据源
  getIt.registerLazySingleton<UserRemoteDataSource>(
    () => UserRemoteDataSourceImpl(getIt<ApiClient>()),
  );
  
  getIt.registerLazySingleton<UserLocalDataSource>(
    () => UserLocalDataSourceImpl(getIt<DatabaseService>()),
  );
  
  // 注册 Repository
  getIt.registerLazySingleton<UserRepository>(
    () => UserRepositoryImpl(
      remoteDataSource: getIt<UserRemoteDataSource>(),
      localDataSource: getIt<UserLocalDataSource>(),
      networkInfo: getIt<NetworkInfo>(),
    ),
  );
  
  // 注册 Use Cases
  getIt.registerLazySingleton<GetUserUseCase>(
    () => GetUserUseCase(getIt<UserRepository>()),
  );
  
  // 注册 Cubit
  getIt.registerFactory<UserCubit>(
    () => UserCubit(
      getUserUseCase: getIt<GetUserUseCase>(),
      updateUserUseCase: getIt<UpdateUserUseCase>(),
    ),
  );
}
```

### 2. 错误处理
```dart
// 统一错误处理
class ErrorHandler {
  static void handleError(dynamic error) {
    if (error is DioError) {
      _handleDioError(error);
    } else if (error is PlatformException) {
      _handlePlatformError(error);
    } else {
      _handleGeneralError(error);
    }
  }
  
  static void _handleDioError(DioError error) {
    switch (error.type) {
      case DioErrorType.connectTimeout:
        print('连接超时');
        break;
      case DioErrorType.sendTimeout:
        print('发送超时');
        break;
      case DioErrorType.receiveTimeout:
        print('接收超时');
        break;
      case DioErrorType.response:
        print('服务器错误: ${error.response?.statusCode}');
        break;
      case DioErrorType.cancel:
        print('请求取消');
        break;
      default:
        print('网络错误: ${error.message}');
    }
  }
  
  static void _handlePlatformError(PlatformException error) {
    print('平台错误: ${error.message}');
  }
  
  static void _handleGeneralError(dynamic error) {
    print('未知错误: $error');
  }
}
```

### 3. 测试策略
```dart
// 单元测试示例
void main() {
  group('UserRepository', () {
    late UserRepository userRepository;
    late MockUserRemoteDataSource mockRemoteDataSource;
    late MockUserLocalDataSource mockLocalDataSource;
    late MockNetworkInfo mockNetworkInfo;
    
    setUp(() {
      mockRemoteDataSource = MockUserRemoteDataSource();
      mockLocalDataSource = MockUserLocalDataSource();
      mockNetworkInfo = MockNetworkInfo();
      
      userRepository = UserRepositoryImpl(
        remoteDataSource: mockRemoteDataSource,
        localDataSource: mockLocalDataSource,
        networkInfo: mockNetworkInfo,
      );
    });
    
    test('should return remote data when network is connected', () async {
      // Arrange
      when(mockNetworkInfo.isConnected).thenAnswer((_) async => true);
      when(mockRemoteDataSource.getUsers()).thenAnswer(
        (_) async => [UserModel(id: '1', name: 'Test', email: 'test@example.com')],
      );
      
      // Act
      final result = await userRepository.getUsers();
      
      // Assert
      expect(result, isA<List<User>>());
      verify(mockRemoteDataSource.getUsers()).called(1);
      verify(mockLocalDataSource.cacheUsers(any)).called(1);
    });
    
    test('should return cached data when network is not connected', () async {
      // Arrange
      when(mockNetworkInfo.isConnected).thenAnswer((_) async => false);
      when(mockLocalDataSource.getCachedUsers()).thenAnswer(
        (_) async => [UserModel(id: '1', name: 'Test', email: 'test@example.com')],
      );
      
      // Act
      final result = await userRepository.getUsers();
      
      // Assert
      expect(result, isA<List<User>>());
      verify(mockLocalDataSource.getCachedUsers()).called(1);
      verifyNever(mockRemoteDataSource.getUsers());
    });
  });
}
```

## 📚 学习资源

### 官方文档
- [Flutter 架构指南](https://flutter.dev/docs/app-architecture)
- [状态管理](https://flutter.dev/docs/development/data-and-backend/state-mgmt)
- [依赖注入](https://pub.dev/packages/provider)

### 社区资源
- [Clean Architecture Flutter](https://github.com/niclin/clean-architecture-flutter)
- [Flutter 架构模式](https://flutterchina.club/architecture/)
- [BLoC 官方文档](https://bloclibrary.dev/)

## 🔗 相关链接

### 核心概念
- [架构概览](/core/architecture) - Flutter 架构概览
- [一切皆 Widget](/core/widgets) - 一切皆 Widget
- [Dart 语言](/core/dart) - Dart 语言

### 指南
- [Widget 系统](/guide/widgets) - Widget 系统详解
- [状态管理](/guide/state-management) - 状态管理方案
- [性能优化](/guide/performance) - 性能优化策略

### 实战项目
- [电商应用](/projects/ecommerce) - 电商应用实战
- [社交应用](/projects/social) - 社交应用开发

### 学习资源
- [官方资源](/resources/official) - 官方资源
- [社区资源](/resources/community) - 社区资源
- [书籍推荐](/resources/books) - 书籍推荐

---
*最后更新: 2026年5月23日*