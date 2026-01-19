"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setFilter } from "@/store/slices/todoSlice";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { Todo } from "@/types";

export default function TodoList() {
  const { todos, filter } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const filteredTodos = todos.filter((todo: Todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      <TodoForm />

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => dispatch(setFilter("all"))}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => dispatch(setFilter("pending"))}
          className={`px-4 py-2 rounded ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Pending
        </button>
        <button
          onClick={() => dispatch(setFilter("completed"))}
          className={`px-4 py-2 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Completed
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks found</p>
      ) : (
        <div>
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}
