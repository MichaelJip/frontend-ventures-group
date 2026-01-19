"use client";

import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo } from "@/store/slices/todoSlice";
import { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-3 p-3 border rounded mb-2">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="w-5 h-5"
      />
      <span
        className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}
