import { getCurrentFilter, getTodos } from "../store/todo.store";
import html from "./app.html?raw";
import { renderTodos } from "./use-cases/render-todos";

const ElemetIds = {
  TodoList: ".todo-list",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = getTodos(getCurrentFilter());
    renderTodos(ElemetIds.TodoList, todos);
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();
};
