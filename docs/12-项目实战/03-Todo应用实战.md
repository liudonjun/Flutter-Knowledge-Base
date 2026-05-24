# 实战项目：Todo 应用

> 通过 Todo 应用实战学习 Flutter 开发。

## 📖 项目结构

### 1. 项目设置

```dart
// 项目结构
class TodoAppStructure {
  void explain() {
    print('''
    Todo 应用结构：
    
    lib/
      ├── main.dart
      ├── app.dart
      ├── models/
      │   └── todo.dart
      ├── providers/
      │   └── todo_provider.dart
      ├── screens/
      │   ├── home_screen.dart
      │   └── add_todo_screen.dart
      ├── widgets/
      │   ├── todo_item.dart
      │   └── todo_list.dart
      └── services/
          └── storage_service.dart
    
    // 依赖
    // provider: ^6.0.0
    // shared_preferences: ^2.0.0
    ''');
  }
}
```

### 2. 数据模型

```dart
// Todo 模型
class Todo {
  final String id;
  final String title;
  final String description;
  final bool isCompleted;
  final DateTime createdAt;
  
  Todo({
    required this.id,
    required this.title,
    this.description = '',
    this.isCompleted = false,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();
  
  Todo copyWith({
    String? id,
    String? title,
    String? description,
    bool? isCompleted,
    DateTime? createdAt,
  }) {
    return Todo(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }
  
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'isCompleted': isCompleted,
      'createdAt': createdAt.toIso8601String(),
    };
  }
  
  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(
      id: json['id'],
      title: json['title'],
      description: json['description'] ?? '',
      isCompleted: json['isCompleted'] ?? false,
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
''');
  }
}
```

### 3. 状态管理

```dart
// Todo Provider
class TodoProvider extends ChangeNotifier {
  List<Todo> _todos = [];
  final StorageService _storage = StorageService();
  
  List<Todo> get todos => _todos;
  List<Todo> get completedTodos => _todos.where((t) => t.isCompleted).toList();
  List<Todo> get pendingTodos => _todos.where((t) => !t.isCompleted).toList();
  
  TodoProvider() {
    _loadTodos();
  }
  
  Future<void> _loadTodos() async {
    _todos = await _storage.loadTodos();
    notifyListeners();
  }
  
  Future<void> _saveTodos() async {
    await _storage.saveTodos(_todos);
  }
  
  void addTodo(String title, {String description = ''}) {
    final todo = Todo(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      title: title,
      description: description,
    );
    _todos.add(todo);
    _saveTodos();
    notifyListeners();
  }
  
  void toggleTodo(String id) {
    final index = _todos.indexWhere((t) => t.id == id);
    if (index != -1) {
      _todos[index] = _todos[index].copyWith(
        isCompleted: !_todos[index].isCompleted,
      );
      _saveTodos();
      notifyListeners();
    }
  }
  
  void deleteTodo(String id) {
    _todos.removeWhere((t) => t.id == id);
    _saveTodos();
    notifyListeners();
  }
  
  void updateTodo(String id, String title, {String description = ''}) {
    final index = _todos.indexWhere((t) => t.id == id);
    if (index != -1) {
      _todos[index] = _todos[index].copyWith(
        title: title,
        description: description,
      );
      _saveTodos();
      notifyListeners();
    }
  }
}
''');
  }
}
```

## 📖 界面实现

### 1. 首页

```dart
// 首页实现
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todo 应用'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => AddTodoScreen()),
            ),
          ),
        ],
      ),
      body: Consumer<TodoProvider>(
        builder: (context, provider, child) {
          if (provider.todos.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.check_circle_outline, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('暂无待办事项', style: TextStyle(color: Colors.grey)),
                ],
              ),
            );
          }
          
          return ListView.builder(
            itemCount: provider.todos.length,
            itemBuilder: (context, index) {
              final todo = provider.todos[index];
              return TodoItem(
                todo: todo,
                onToggle: () => provider.toggleTodo(todo.id),
                onDelete: () => provider.deleteTodo(todo.id),
              );
            },
          );
        },
      ),
    );
  }
}
''');
  }
}
```

### 2. Todo 项目组件

```dart
// TodoItem 组件
class TodoItem extends StatelessWidget {
  final Todo todo;
  final VoidCallback onToggle;
  final VoidCallback onDelete;
  
  const TodoItem({
    Key? key,
    required this.todo,
    required this.onToggle,
    required this.onDelete,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key(todo.id),
      direction: DismissDirection.endToStart,
      background: Container(
        color: Colors.red,
        alignment: Alignment.centerRight,
        padding: EdgeInsets.only(right: 16),
        child: Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (_) => onDelete(),
      child: ListTile(
        leading: Checkbox(
          value: todo.isCompleted,
          onChanged: (_) => onToggle(),
        ),
        title: Text(
          todo.title,
          style: TextStyle(
            decoration: todo.isCompleted
                ? TextDecoration.lineThrough
                : null,
          ),
        ),
        subtitle: todo.description.isNotEmpty
            ? Text(todo.description)
            : null,
        trailing: IconButton(
          icon: Icon(Icons.delete_outline),
          onPressed: onDelete,
        ),
      ),
    );
  }
}
''');
  }
}
```

---

> Todo 应用是学习 Flutter 的经典项目，通过它能掌握状态管理、数据持久化等核心概念。