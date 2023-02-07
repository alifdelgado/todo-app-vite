import "./style.css";
import { App } from "./src/todos/app";
import { initStore } from "./src/store/todo.store";

initStore();
App("#app");
