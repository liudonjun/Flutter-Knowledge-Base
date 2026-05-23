# Todo 应用开发

> 开发一个完整的 Todo 应用，掌握 Flutter 实战技能。

## 🎯 项目目标

### 核心功能
- **任务管理**: 添加、编辑、删除、完成任务
- **分类管理**: 任务分类和标签
- **优先级**: 设置任务优先级
- **提醒功能**: 任务提醒和通知
- **数据同步**: 本地存储和云同步

### 技术栈
- **状态管理**: BLoC
- **数据库**: SQLite (sqflite)
- **通知**: Flutter Local Notifications
- **UI 组件**: Material Design

## 🏗️ 项目架构

```
lib/
├── main.dart                 # 应用入口
├── app.dart                  # 应用配置
├── config/                   # 配置文件
│   ├── database_config.dart
│   ├── notification_config.dart
│   └── theme_config.dart
├── core/                     # 核心功能
│   ├── database/             # 数据库层
│   │   ├── database_helper.dart
│   │   └── migrations.dart
│   ├── services/             # 服务层
│   │   ├── todo_service.dart
│   │   ├── notification_service.dart
│   │   └── sync_service.dart
│   └── utils/                # 工具类
│       ├── date_utils.dart
│       └── priority_utils.dart
├── data/                     # 数据层
│   ├── models/               # 数据模型
│   │   ├── todo.dart
│   │   ├── category.dart
│   │   └── reminder.dart
│   ├── repositories/         # 数据仓库
│   │   ├── todo_repository.dart
│   │   └── category_repository.dart
│   └── datasources/          # 数据源
│       ├── todo_local_datasource.dart
│       └── category_local_datasource.dart
├── domain/                   # 领域层
│   ├── entities/             # 实体类
│   │   ├── todo_entity.dart
│   │   └── category_entity.dart
│   └── repositories/         # 仓库接口
│       ├── todo_repository_interface.dart
│       └── category_repository_interface.dart
├── presentation/             # 表现层
│   ├── pages/                # 页面
│   │   ├── home_page.dart
│   │   ├── todo_list_page.dart
│   │   ├── todo_detail_page.dart
│   │   ├── add_todo_page.dart
│   │   ├── category_page.dart
│   │   └── settings_page.dart
│   ├── widgets/              # 自定义 Widget
│   │   ├── todo_item.dart
│   │   ├── priority_badge.dart
│   │   ├── category_chip.dart
│   │   ├── date_picker.dart
│   │   └── progress_indicator.dart
│   └── blocs/                # BLoC 状态管理
│       ├── todo_bloc.dart
│       ├── category_bloc.dart
│       └── filter_bloc.dart
└── l10n/                     # 国际化
    ├── app_en.arb
    └── app_zh.arb
```

## 📱 功能模块详解

### 1. Todo 数据模型
```dart
// Todo 数据模型
class Todo {
  final int? id;
  final String title;
  final String description;
  final bool isCompleted;
  final Priority priority;
  final DateTime createdAt;
  final DateTime? dueDate;
  final DateTime? reminderTime;
  final int categoryId;
  final List<String> tags;
  
  Todo({
    this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    this.priority = Priority.medium,
    DateTime? createdAt,
    this.dueDate,
    this.reminderTime,
    required this.categoryId,
    this.tags = const [],
  }) : createdAt = createdAt ?? DateTime.now();
  
  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'],
      title: json['title'],
      description: json['description'] ?? '',
      isCompleted: json['is_completed'] == 1,
      priority: Priority.values[json['priority']],
      createdAt: DateTime.parse(json['created_at']),
      dueDate: json['due_date'] != null ? DateTime.parse(json['due_date']) : null,
      reminderTime: json['reminder_time'] != null ? DateTime.parse(json['reminder_time']) : null,
      categoryId: json['category_id'],
      tags: json['tags'] != null ? List<String>.from(json['tags'].split(',')) : [],
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'is_completed': isCompleted ? 1 : 0,
      'priority': priority.index,
      'created_at': createdAt.toIso8601String(),
      'due_date': dueDate?.toIso8601String(),
      'reminder_time': reminderTime?.toIso8601String(),
      'category_id': categoryId,
      'tags': tags.join(','),
    };
  }
  
  Todo copyWith({
    int? id,
    String? title,
    String? description,
    bool? isCompleted,
    Priority? priority,
    DateTime? createdAt,
    DateTime? dueDate,
    DateTime? reminderTime,
    int? categoryId,
    List<String>? tags,
  }) {
    return Todo(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      priority: priority ?? this.priority,
      createdAt: createdAt ?? this.createdAt,
      dueDate: dueDate ?? this.dueDate,
      reminderTime: reminderTime ?? this.reminderTime,
      categoryId: categoryId ?? this.categoryId,
      tags: tags ?? this.tags,
    );
  }
}

enum Priority { low, medium, high, urgent }

// 分类数据模型
class Category {
  final int? id;
  final String name;
  final String color;
  final String icon;
  final int sortOrder;
  
  Category({
    this.id,
    required this.name,
    required this.color,
    required this.icon,
    this.sortOrder = 0,
  });
  
  factory Category.fromJson(Map<String, dynamic> json) {
    return Category(
      id: json['id'],
      name: json['name'],
      color: json['color'],
      icon: json['icon'],
      sortOrder: json['sort_order'] ?? 0,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'color': color,
      'icon': icon,
      'sort_order': sortOrder,
    };
  }
}
```

### 2. 数据库服务
```dart
// 数据库服务
class DatabaseHelper {
  static Database? _database;
  
  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  static Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'todo.db');
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) {
        // 创建分类表
        db.execute('''
          CREATE TABLE categories(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            icon TEXT NOT NULL,
            sort_order INTEGER DEFAULT 0
          )
        ''');
        
        // 创建 Todo 表
        db.execute('''
          CREATE TABLE todos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            is_completed INTEGER DEFAULT 0,
            priority INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            due_date TEXT,
            reminder_time TEXT,
            category_id INTEGER,
            tags TEXT,
            FOREIGN KEY (category_id) REFERENCES categories (id)
          )
        ''');
        
        // 插入默认分类
        db.execute('''
          INSERT INTO categories (name, color, icon, sort_order) VALUES
          ('工作', '#FF5722', 'work', 1),
          ('个人', '#2196F3', 'person', 2),
          ('购物', '#4CAF50', 'shopping_cart', 3),
          ('健康', '#E91E63', 'favorite', 4)
        ''');
      },
    );
  }
  
  // 插入 Todo
  static Future<int> insertTodo(Todo todo) async {
    final db = await database;
    return await db.insert('todos', todo.toJson());
  }
  
  // 获取所有 Todo
  static Future<List<Todo>> getAllTodos() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'todos',
      orderBy: 'created_at DESC',
    );
    return List.generate(maps.length, (i) => Todo.fromJson(maps[i]));
  }
  
  // 根据分类获取 Todo
  static Future<List<Todo>> getTodosByCategory(int categoryId) async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'todos',
      where: 'category_id = ?',
      whereArgs: [categoryId],
      orderBy: 'created_at DESC',
    );
    return List.generate(maps.length, (i) => Todo.fromJson(maps[i]));
  }
  
  // 更新 Todo
  static Future<int> updateTodo(Todo todo) async {
    final db = await database;
    return await db.update(
      'todos',
      todo.toJson(),
      where: 'id = ?',
      whereArgs: [todo.id],
    );
  }
  
  // 删除 Todo
  static Future<int> deleteTodo(int id) async {
    final db = await database;
    return await db.delete(
      'todos',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  // 获取统计数据
  static Future<Map<String, int>> getStatistics() async {
    final db = await database;
    
    final totalResult = await db.rawQuery('SELECT COUNT(*) as count FROM todos');
    final completedResult = await db.rawQuery('SELECT COUNT(*) as count FROM todos WHERE is_completed = 1');
    final pendingResult = await db.rawQuery('SELECT COUNT(*) as count FROM todos WHERE is_completed = 0');
    
    return {
      'total': totalResult.first['count'] as int,
      'completed': completedResult.first['count'] as int,
      'pending': pendingResult.first['count'] as int,
    };
  }
}
```

### 3. Todo BLoC
```dart
// Todo BLoC
// Event
abstract class TodoEvent extends Equatable {
  const TodoEvent();
  
  @override
  List<Object> get props => [];
}

class LoadTodos extends TodoEvent {}
class AddTodo extends TodoEvent {
  final Todo todo;
  const AddTodo(this.todo);
  
  @override
  List<Object> get props => [todo];
}

class UpdateTodo extends TodoEvent {
  final Todo todo;
  const UpdateTodo(this.todo);
  
  @override
  List<Object> get props => [todo];
}

class DeleteTodo extends TodoEvent {
  final int id;
  const DeleteTodo(this.id);
  
  @override
  List<Object> get props => [id];
}

class ToggleTodo extends TodoEvent {
  final int id;
  const ToggleTodo(this.id);
  
  @override
  List<Object> get props => [id];
}

class FilterTodos extends TodoEvent {
  final TodoFilter filter;
  const FilterTodos(this.filter);
  
  @override
  List<Object> get props => [filter];
}

// State
class TodoState extends Equatable {
  final List<Todo> todos;
  final List<Todo> filteredTodos;
  final TodoFilter filter;
  final bool isLoading;
  final String? error;
  
  const TodoState({
    this.todos = const [],
    this.filteredTodos = const [],
    this.filter = TodoFilter.all,
    this.isLoading = false,
    this.error,
  });
  
  TodoState copyWith({
    List<Todo>? todos,
    List<Todo>? filteredTodos,
    TodoFilter? filter,
    bool? isLoading,
    String? error,
  }) {
    return TodoState(
      todos: todos ?? this.todos,
      filteredTodos: filteredTodos ?? this.filteredTodos,
      filter: filter ?? this.filter,
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
    );
  }
  
  @override
  List<Object> get props => [todos, filteredTodos, filter, isLoading, error ?? ''];
}

// BLoC
class TodoBloc extends Bloc<TodoEvent, TodoState> {
  final TodoRepository _todoRepository;
  
  TodoBloc(this._todoRepository) : super(const TodoState()) {
    on<LoadTodos>(_onLoadTodos);
    on<AddTodo>(_onAddTodo);
    on<UpdateTodo>(_onUpdateTodo);
    on<DeleteTodo>(_onDeleteTodo);
    on<ToggleTodo>(_onToggleTodo);
    on<FilterTodos>(_onFilterTodos);
  }
  
  Future<void> _onLoadTodos(LoadTodos event, Emitter<TodoState> emit) async {
    emit(state.copyWith(isLoading: true));
    
    try {
      final todos = await _todoRepository.getTodos();
      final filteredTodos = _applyFilter(todos, state.filter);
      
      emit(state.copyWith(
        todos: todos,
        filteredTodos: filteredTodos,
        isLoading: false,
      ));
    } catch (e) {
      emit(state.copyWith(
        isLoading: false,
        error: e.toString(),
      ));
    }
  }
  
  Future<void> _onAddTodo(AddTodo event, Emitter<TodoState> emit) async {
    try {
      await _todoRepository.addTodo(event.todo);
      add(LoadTodos());
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
  
  Future<void> _onUpdateTodo(UpdateTodo event, Emitter<TodoState> emit) async {
    try {
      await _todoRepository.updateTodo(event.todo);
      add(LoadTodos());
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
  
  Future<void> _onDeleteTodo(DeleteTodo event, Emitter<TodoState> emit) async {
    try {
      await _todoRepository.deleteTodo(event.id);
      add(LoadTodos());
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
  
  Future<void> _onToggleTodo(ToggleTodo event, Emitter<TodoState> emit) async {
    try {
      final todo = state.todos.firstWhere((t) => t.id == event.id);
      final updatedTodo = todo.copyWith(isCompleted: !todo.isCompleted);
      await _todoRepository.updateTodo(updatedTodo);
      add(LoadTodos());
    } catch (e) {
      emit(state.copyWith(error: e.toString()));
    }
  }
  
  void _onFilterTodos(FilterTodos event, Emitter<TodoState> emit) {
    final filteredTodos = _applyFilter(state.todos, event.filter);
    emit(state.copyWith(
      filter: event.filter,
      filteredTodos: filteredTodos,
    ));
  }
  
  List<Todo> _applyFilter(List<Todo> todos, TodoFilter filter) {
    switch (filter) {
      case TodoFilter.all:
        return todos;
      case TodoFilter.completed:
        return todos.where((t) => t.isCompleted).toList();
      case TodoFilter.pending:
        return todos.where((t) => !t.isCompleted).toList();
      case TodoFilter.highPriority:
        return todos.where((t) => t.priority == Priority.high || t.priority == Priority.urgent).toList();
    }
  }
}

enum TodoFilter { all, completed, pending, highPriority }
```

## 🎨 UI 设计

### 1. Todo 列表页面
```dart
// Todo 列表页面
class TodoListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocBuilder<TodoBloc, TodoState>(
      builder: (context, state) {
        if (state.isLoading) {
          return Center(child: CircularProgressIndicator());
        }
        
        if (state.error != null) {
          return Center(child: Text('错误: ${state.error}'));
        }
        
        if (state.filteredTodos.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.check_circle_outline, size: 64, color: Colors.grey),
                SizedBox(height: 16),
                Text(
                  '没有待办事项',
                  style: TextStyle(fontSize: 18, color: Colors.grey),
                ),
                SizedBox(height: 8),
                Text(
                  '点击右下角按钮添加新任务',
                  style: TextStyle(fontSize: 14, color: Colors.grey[400]),
                ),
              ],
            ),
          );
        }
        
        return ListView.builder(
          itemCount: state.filteredTodos.length,
          itemBuilder: (context, index) {
            final todo = state.filteredTodos[index];
            return TodoItem(
              todo: todo,
              onToggle: () {
                context.read<TodoBloc>().add(ToggleTodo(todo.id!));
              },
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => TodoDetailPage(todo: todo),
                  ),
                );
              },
              onDelete: () {
                context.read<TodoBloc>().add(DeleteTodo(todo.id!));
              },
            );
          },
        );
      },
    );
  }
}
```

### 2. Todo 项目组件
```dart
// Todo 项目组件
class TodoItem extends StatelessWidget {
  final Todo todo;
  final VoidCallback onToggle;
  final VoidCallback onTap;
  final VoidCallback onDelete;
  
  const TodoItem({
    Key? key,
    required this.todo,
    required this.onToggle,
    required this.onTap,
    required this.onDelete,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key(todo.id.toString()),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 20),
        color: Colors.red,
        child: Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (direction) => onDelete(),
      child: Card(
        margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
        child: ListTile(
          leading: Checkbox(
            value: todo.isCompleted,
            onChanged: (value) => onToggle(),
            activeColor: Colors.green,
          ),
          title: Text(
            todo.title,
            style: TextStyle(
              decoration: todo.isCompleted ? TextDecoration.lineThrough : null,
              color: todo.isCompleted ? Colors.grey : null,
            ),
          ),
          subtitle: todo.description.isNotEmpty
              ? Text(
                  todo.description,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: todo.isCompleted ? Colors.grey[400] : Colors.grey[600],
                  ),
                )
              : null,
          trailing: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              PriorityBadge(priority: todo.priority),
              SizedBox(width: 8),
              if (todo.dueDate != null)
                Icon(
                  Icons.calendar_today,
                  size: 16,
                  color: _getDueDateColor(todo.dueDate!),
                ),
            ],
          ),
          onTap: onTap,
        ),
      ),
    );
  }
  
  Color _getDueDateColor(DateTime dueDate) {
    final now = DateTime.now();
    final difference = dueDate.difference(now).inDays;
    
    if (difference < 0) {
      return Colors.red; // 已过期
    } else if (difference == 0) {
      return Colors.orange; // 今天到期
    } else if (difference <= 3) {
      return Colors.yellow; // 即将到期
    } else {
      return Colors.grey; // 正常
    }
  }
}
```

### 3. 添加 Todo 页面
```dart
// 添加 Todo 页面
class AddTodoPage extends StatefulWidget {
  @override
  _AddTodoPageState createState() => _AddTodoPageState();
}

class _AddTodoPageState extends State<AddTodoPage> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  
  Priority _priority = Priority.medium;
  DateTime? _dueDate;
  int? _categoryId;
  List<String> _tags = [];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('添加任务'),
        actions: [
          TextButton(
            onPressed: _saveTodo,
            child: Text('保存', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: EdgeInsets.all(16),
          children: [
            // 标题输入
            TextFormField(
              controller: _titleController,
              decoration: InputDecoration(
                labelText: '任务标题',
                hintText: '输入任务标题',
                border: OutlineInputBorder(),
              ),
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return '请输入任务标题';
                }
                return null;
              },
            ),
            SizedBox(height: 16),
            
            // 描述输入
            TextFormField(
              controller: _descriptionController,
              decoration: InputDecoration(
                labelText: '任务描述',
                hintText: '输入任务描述（可选）',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            SizedBox(height: 16),
            
            // 优先级选择
            Text('优先级', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: Priority.values.map((priority) {
                return ChoiceChip(
                  label: Text(_getPriorityText(priority)),
                  selected: _priority == priority,
                  selectedColor: _getPriorityColor(priority),
                  onSelected: (selected) {
                    setState(() {
                      _priority = priority;
                    });
                  },
                );
              }).toList(),
            ),
            SizedBox(height: 16),
            
            // 截止日期
            ListTile(
              title: Text('截止日期'),
              subtitle: Text(_dueDate != null
                  ? DateFormat('yyyy-MM-dd').format(_dueDate!)
                  : '未设置'),
              trailing: Icon(Icons.calendar_today),
              onTap: _selectDate,
            ),
            SizedBox(height: 16),
            
            // 分类选择
            ListTile(
              title: Text('分类'),
              subtitle: Text(_categoryId != null ? '已选择' : '未选择'),
              trailing: Icon(Icons.arrow_forward_ios),
              onTap: _selectCategory,
            ),
            SizedBox(height: 16),
            
            // 标签
            TextFormField(
              decoration: InputDecoration(
                labelText: '标签',
                hintText: '输入标签，用逗号分隔',
                border: OutlineInputBorder(),
              ),
              onChanged: (value) {
                setState(() {
                  _tags = value.split(',').map((e) => e.trim()).toList();
                });
              },
            ),
          ],
        ),
      ),
    );
  }
  
  void _saveTodo() {
    if (_formKey.currentState!.validate()) {
      final todo = Todo(
        title: _titleController.text,
        description: _descriptionController.text,
        priority: _priority,
        dueDate: _dueDate,
        categoryId: _categoryId ?? 1,
        tags: _tags,
      );
      
      context.read<TodoBloc>().add(AddTodo(todo));
      Navigator.pop(context);
    }
  }
  
  Future<void> _selectDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: _dueDate ?? DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime.now().add(Duration(days: 365)),
    );
    
    if (date != null) {
      setState(() {
        _dueDate = date;
      });
    }
  }
  
  void _selectCategory() {
    // 显示分类选择对话框
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('选择分类'),
        content: CategorySelector(
          selectedCategoryId: _categoryId,
          onCategorySelected: (categoryId) {
            setState(() {
              _categoryId = categoryId;
            });
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
  
  String _getPriorityText(Priority priority) {
    switch (priority) {
      case Priority.low:
        return '低';
      case Priority.medium:
        return '中';
      case Priority.high:
        return '高';
      case Priority.urgent:
        return '紧急';
    }
  }
  
  Color _getPriorityColor(Priority priority) {
    switch (priority) {
      case Priority.low:
        return Colors.green;
      case Priority.medium:
        return Colors.blue;
      case Priority.high:
        return Colors.orange;
      case Priority.urgent:
        return Colors.red;
    }
  }
}
```

## 🚀 开发步骤

### 第一阶段: 基础功能
1. 项目搭建和架构设计
2. 数据库设计
3. Todo 数据模型
4. 基础 UI 设计

### 第二阶段: 核心功能
1. Todo CRUD 操作
2. 状态管理实现
3. 列表展示
4. 添加/编辑页面

### 第三阶段: 高级功能
1. 分类管理
2. 优先级设置
3. 截止日期
4. 搜索和过滤

## 📚 学习资源

### 相关包
- [sqflite](https://pub.dev/packages/sqflite)
- [flutter_bloc](https://pub.dev/packages/flutter_bloc)
- [equatable](https://pub.dev/packages/equatable)
- [intl](https://pub.dev/packages/intl)

### 示例项目
- [Todo 应用示例](https://github.com/niclin/flutter-todo-app)
- [BLoC 示例](https://github.com/niclin/flutter-bloc-example)

### 学习资源
- [Flutter Todo 应用教程](https://flutterchina.club/todo-app/)
- [BLoC 最佳实践](https://medium.com/flutter-community/flutter-bloc-best-practices-7b3bf6f0d78e)

## 🔗 相关链接

### 核心概念
- [[架构概览]] - Flutter 架构概览
- [[一切皆 Widget]] - 一切皆 Widget
- [[状态管理基础]] - 状态管理基础

### 指南
- [[Widget 系统]] - Widget 系统详解
- [[数据存储基础]] - 数据存储基础
- [[测试基础]] - 测试基础

### 实战项目
- [[电商应用]] - 电商应用实战
- [[社交应用]] - 社交应用开发

### 学习资源
- [[官方资源]] - 官方资源
- [[社区资源]] - 社区资源
- [[书籍推荐]] - 书籍推荐

---
*最后更新: 2026年5月23日*