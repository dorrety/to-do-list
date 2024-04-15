export const deleteTodo = (setTodo, todos, id) => {
    if(todos) {
        setTodo(todos.filter((todo) => todo.id !== id))
    }
}