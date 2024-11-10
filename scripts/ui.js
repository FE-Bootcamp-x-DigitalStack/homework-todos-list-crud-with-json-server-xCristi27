const dom = {
    todosList: document.querySelector('#todos-list'),
};

const ui = {
    renderTodos(todos) {
        todos.forEach((todo) => {
            dom.todosList.insertAdjacentHTML(
                'beforeend',
                `<li>
                    <input type="checkbox" ${todo.done ? 'checked' : ''} id="${
                    todo.id
                }"/>
                    <label for="${todo.id}">${todo.title}</label>
                </li>`
            );
        });
    },
};
