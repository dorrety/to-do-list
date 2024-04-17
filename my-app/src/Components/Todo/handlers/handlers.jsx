export const deleteTodo = (setTodos, todos, id) => {
    if(todos) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
}