import todoStore from "entities/todo-list/model";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { ReactComponent as ExpandMore } from "shared/assets/icons/expand_more.svg";

const Home: React.FC = observer(() => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim()) {
      todoStore.addTodo(newTodo);
      setNewTodo("");
    }
  };

  return (
    <>
      <h1 className="text-8xl text-[#e9dad9] text-center py-4">todos</h1>
      <div className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden">
        <div className="flex items-center border-b-[1.5px] px-[2px]">
          <ExpandMore fill="#e6e6e6" />
          <input
            className="w-full p-2 text-lg text-gray-700 focus:outline-none"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleAddTodo}
          />
        </div>
        <ul className="divide-y-[1.5px]">
          {todoStore.filteredTodos.map((todo) => (
            <li key={todo.id} className="flex items-center py-2 px-2 gap-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => todoStore.toggleTodo(todo.id)}
                className="mr-2 rounded-full"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t-[1.5px] flex justify-between items-center text-sm text-gray-500 p-2">
          <span>{todoStore.itemsLeft} items left</span>
          <div>
            {["All", "Active", "Completed"].map((f) => (
              <button
                key={f}
                onClick={() =>
                  todoStore.setFilter(f as "All" | "Active" | "Completed")
                }
                className={`mx-1 ${
                  todoStore.filter === f
                    ? "border-[1.5px] py-[2px] px-[6px] border-[#edd9d9] rounded-sm"
                    : ""
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => todoStore.clearCompleted()}>
            Clear completed
          </button>
        </div>
      </div>
    </>
  );
});

export default Home;
