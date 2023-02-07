/**
 *
 * @param {Todo} todo
 */
export const createTodo = (todo) => {
  if (!todo) throw new Error("Todo object is required");
  const { description, done, id } = todo;
  const html = `<div class="view">
                    <input class="toggle" type="checkbox" ${
                      done ? "checked" : ""
                    }>
                    <label>${description}</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${description}">`;
  const liElement = document.createElement("li");
  liElement.setAttribute("data-id", id);
  if (done) {
    liElement.classList.add("completed");
  }
  liElement.innerHTML = html;
  return liElement;
};
