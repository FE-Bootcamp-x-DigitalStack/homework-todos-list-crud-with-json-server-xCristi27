const dom = {
  todosList: document.querySelector("#todos-list"),
  addTodoForm: document.querySelector("#add-todo-form"),
  todoInput: document.querySelector("#todo-input"),
};

const ui = {
  renderTodos(todos) {
    todos.forEach((todo) => {
      ui.addTodoToUI(todo);
    });
  },

  addTodoToUI(todo) {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
    <input type="checkbox" ${todo.done ? "checked" : ""} id="${todo.id}" />
            <label for="${todo.id}">${todo.title}</label>
            <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;
    dom.todosList.appendChild(todoItem);
  },

  async handleAddTodo(event) {
    event.preventDefault();

    const title = dom.todoInput.value;
    if (title === "") return;

    const newTodo = {
      title,
      done: false,
    };

    // Add todo to server and update UI
    const savedTodo = await server.addTodo(newTodo);
    ui.addTodoToUI(savedTodo);
    dom.todoInput.value = ""; // Clear the input field
  },
};

ui.handleDeleteTodo = async function (event) {
  if (!event.target.classList.contains("delete-btn")) return;

  const id = event.target.getAttribute("data-id");
  const response = await server.deleteTodo(id);

  if (response.ok) {
    event.target.parentElement.remove(); // Remove the item from UI
  } else {
    console.error("Failed to delete the todo");
  }
};

ui.handleUpdate = async function (event) {
  if (event.target.type !== "checkbox") return;

  const id = event.target.id;
  const done = event.target.checked;

  await server.updateTodo({ done }, id);
};

dom.todosList.addEventListener("click", ui.handleDeleteTodo);
dom.todosList.addEventListener("change", ui.handleUpdate);
dom.addTodoForm.addEventListener("submit", ui.handleAddTodo);
