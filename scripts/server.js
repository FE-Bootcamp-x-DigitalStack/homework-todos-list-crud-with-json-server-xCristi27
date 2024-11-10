const URL = 'http://localhost:3000/todos';

const server = {
    async getTodos() {
        const response = await fetch(URL);

        if (!response.ok) {
            return [];
        }

        return await response.json();
    },
    async getTodo(id) {
        const response = await fetch(`${URL}/${id}`);

        if (!response.ok) {
            return null;
        }

        return await response.json();
    },
    async addTodo(todo) {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        // returns the newly created todo record (with the DB id)
        return await response.json();
    },
    async updateTodo(todo, id) {
        const response = await fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });

        // we simply return the response object
        // for our simple application, the UI can just ignore it
        return response;
    },
    async deleteTodo(id) {
        const response = await fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });

        // we just return the response and delete the item from UI if response.ok
        return response;
    },
};
