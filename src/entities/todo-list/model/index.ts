import { makeAutoObservable } from "mobx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  todos: Todo[] = [
    { id: 1, text: "Тестовое задание", completed: false },
    { id: 2, text: "Прекрасный код", completed: true },
    { id: 3, text: "Покрытие тестами", completed: false },
  ];
  filter: "All" | "Active" | "Completed" = "All";

  constructor() {
    makeAutoObservable(this);
  }

  toggleTodo = (id: number) => {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  };

  setFilter = (filter: "All" | "Active" | "Completed") => {
    this.filter = filter;
  };

  addTodo = (text: string) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    this.todos.push(newTodo);
  };

  clearCompleted = () => {
    this.todos = this.todos.filter((todo) => !todo.completed);
  };

  get filteredTodos() {
    return this.todos.filter((todo) => {
      if (this.filter === "Active") return !todo.completed;
      if (this.filter === "Completed") return todo.completed;
      return true;
    });
  }

  get itemsLeft() {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}

const todoStore = new TodoStore();
export default todoStore;
