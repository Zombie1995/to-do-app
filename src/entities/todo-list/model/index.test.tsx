import { TodoStore } from ".";

describe("TodoStore", () => {
  let store: TodoStore;

  beforeEach(() => {
    store = new TodoStore();
  });

  test("initial state is correct", () => {
    expect(store.todos.length).toBe(3);
    expect(store.filter).toBe("All");
  });

  test("toggleTodo toggles the completed state", () => {
    store.toggleTodo(1);
    expect(store.todos.find((todo) => todo.id === 1)?.completed).toBe(true);
    store.toggleTodo(1);
    expect(store.todos.find((todo) => todo.id === 1)?.completed).toBe(false);
  });

  test("setFilter updates the filter", () => {
    store.setFilter("Active");
    expect(store.filter).toBe("Active");
    store.setFilter("Completed");
    expect(store.filter).toBe("Completed");
  });

  test("filteredTodos returns correct todos based on filter", () => {
    store.setFilter("Active");
    expect(store.filteredTodos.length).toBe(2);

    store.setFilter("Completed");
    expect(store.filteredTodos.length).toBe(1);

    store.setFilter("All");
    expect(store.filteredTodos.length).toBe(3);
  });

  test("itemsLeft returns correct count of uncompleted todos", () => {
    expect(store.itemsLeft).toBe(2);
    store.toggleTodo(1);
    expect(store.itemsLeft).toBe(1);
  });
});
