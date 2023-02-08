import { Filters, getTodos } from "../../store/todo.store";

let element;
/**
 *
 * @param {String} id
 */
export const renderPending = (id) => {
  if (!element) element = document.querySelector(id);
  if (!element) throw new Error("Element not found");
  element.innerHTML = getTodos(Filters.Pending).length;
};
