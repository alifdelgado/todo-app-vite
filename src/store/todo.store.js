import { Todo } from "../todos/models/todo.model";

const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [
    new Todo("Piedra del alma"),
    new Todo("Piedra del infinito"),
    new Todo("Piedra del tiempo"),
    new Todo("Piedra del poder"),
    new Todo("Piedra de la realidad"),
  ],
  filter: Filters.All,
};

export const initStore = () => {
  console.log("InitStore 🥑");
};

export const loadStore = () => {};

export const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);
    default:
      throw new Error(`${filter} is not valid`);
  }
};

/**
 *
 * @param {String} description
 */
export const addTodo = (description) => {
  if (!description) throw new Error("Description is required");
  state.todos.push(new Todo(description));
};

/**
 *
 * @param {String} id
 */
export const toggleTodo = (id) => {
  state.todos = state.todos.map((item) => {
    if (item.id === id) item.done = !item.done;
    return item;
  });
};

/**
 *
 * @param {String} id
 */
export const deleteTodo = (id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
};

export const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
};

export const filterTodos = (filter = Filters.All) => {
  state.filter = filter;
};

export const getCurrentFilter = () => {
  return state.filter;
};
