import { Todo } from "../todos/models/todo.model";

export const Filters = {
  All: "all",
  Completed: "completed",
  Pending: "pending",
};

const state = {
  todos: [],
  filter: Filters.All,
};

export const initStore = () => {
  loadStore();
  console.log("InitStore 🥑");
};

export const loadStore = () => {
  if (!localStorage.getItem("todos")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("todos")
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(state));
};

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
  saveStateToLocalStorage();
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
  saveStateToLocalStorage();
};

/**
 *
 * @param {String} id
 */
export const deleteTodo = (id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
  saveStateToLocalStorage();
};

export const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveStateToLocalStorage();
};

export const filterTodos = (filter = Filters.All) => {
  state.filter = filter;
  saveStateToLocalStorage();
};

export const getCurrentFilter = () => {
  return state.filter;
};
