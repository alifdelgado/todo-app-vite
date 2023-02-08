import {
  Filters,
  addTodo,
  deleteCompleted,
  deleteTodo,
  filterTodos,
  getCurrentFilter,
  getTodos,
  toggleTodo,
} from "../store/todo.store";
import html from "./app.html?raw";
import { renderPending } from "./use-cases/render-pending";
import { renderTodos } from "./use-cases/render-todos";

const ElemetIds = {
  ClearCompleted: ".clear-completed",
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  TodoFilters: ".filtro",
  PendingCount: "#pending-count",
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const updatePendingCount = () => {
    renderPending(ElemetIds.PendingCount);
  };

  const displayTodos = () => {
    const todos = getTodos(getCurrentFilter());
    renderTodos(ElemetIds.TodoList, todos);
    updatePendingCount();
  };

  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  const todoListUl = document.querySelector(ElemetIds.TodoList);
  const clearCompleted = document.querySelector(ElemetIds.ClearCompleted);
  const newDescriptionInput = document.querySelector(ElemetIds.NewTodoInput);
  const filtersLinks = document.querySelectorAll(ElemetIds.TodoFilters);

  newDescriptionInput.addEventListener("keyup", (e) => {
    if (e.keyCode !== 13) return;
    if (!e.target.value.trim().length) return;
    addTodo(e.target.value);
    e.target.value = "";
    displayTodos();
  });

  todoListUl.addEventListener("click", (e) => {
    const element = e.target.closest("[data-id]");
    const id = element.getAttribute("data-id");
    toggleTodo(id);
    if (e.target.className.includes("destroy")) {
      deleteTodo(id);
    }
    displayTodos();
  });

  clearCompleted.addEventListener("click", (e) => {
    deleteCompleted();
    displayTodos();
  });

  filtersLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      filtersLinks.forEach((item) => item.classList.remove("selected"));
      e.target.classList.add("selected");
      switch (e.target.text) {
        case "Todos":
          filterTodos(Filters.All);
          break;
        case "Pendientes":
          filterTodos(Filters.Pending);
          break;
        case "Completados":
          filterTodos(Filters.Completed);
          break;
      }
      displayTodos();
    });
  });
};
