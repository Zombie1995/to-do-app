import { fireEvent, render, screen } from "@testing-library/react";
import todoStore from "entities/todo-list/model";
import Home from ".";

describe("Home Component", () => {
  beforeEach(() => {
    todoStore.todos = [
      { id: 1, text: "Тестовое задание", completed: false },
      { id: 2, text: "Прекрасный код", completed: true },
      { id: 3, text: "Покрытие тестами", completed: false },
    ];
    todoStore.filter = "All";
  });

  test("renders component with initial state", () => {
    render(<Home />);
    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.getByText("Прекрасный код")).toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<Home />);
    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);
    expect(todoStore.todos[0].completed).toBe(true);
    fireEvent.click(checkbox);
    expect(todoStore.todos[0].completed).toBe(false);
  });

  test("filters todos based on filter state", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Active"));
    expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Completed"));
    expect(screen.queryByText("Тестовое задание")).not.toBeInTheDocument();
    expect(screen.queryByText("Покрытие тестами")).not.toBeInTheDocument();
    expect(screen.getByText("Прекрасный код")).toBeInTheDocument();

    fireEvent.click(screen.getByText("All"));
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.getByText("Прекрасный код")).toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
  });

  test("clears completed todos", () => {
    render(<Home />);
    fireEvent.click(screen.getByText("Clear completed"));
    expect(screen.queryByText("Прекрасный код")).not.toBeInTheDocument();
    expect(screen.getByText("Тестовое задание")).toBeInTheDocument();
    expect(screen.getByText("Покрытие тестами")).toBeInTheDocument();
  });
});
