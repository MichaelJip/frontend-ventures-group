import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "@/types";

interface TodoState {
  todos: Todo[];
  filter: "all" | "completed" | "pending";
}

const loadTodosFromStorage = (): Todo[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
};

const initialState: TodoState = {
  todos: loadTodosFromStorage(),
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: Date.now(),
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem("todos", JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    setFilter: (
      state,
      action: PayloadAction<"all" | "completed" | "pending">,
    ) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
