import { useState } from "react";
import Todo from "../../Components/Todo/Todo";
import Search from "../../Components/Search/Search";

export default function TodoList() {
    const [todos, setTodo] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const addTodo = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') return;
        const newTodo = {
            id: Symbol(inputValue),
            text: inputValue
        }
        setTodo([...todos, newTodo])
        setInputValue('')
    }

    const deleteTodo = (id) => {
        setTodo(todos.filter((todo) => todo.id !== id))
    }

    const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchItem.toLowerCase()));

    return (
        <div>
            <h1>To-do-list</h1>
            <form onSubmit={addTodo}>
                <input type='text' onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Add new todo..." />
                <input type='submit' value='Add' />
            </form>
            <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            <ul>
                {filteredTodos.map((todo) => (
                    <Todo key={todo.id.toString()} todo={todo} deleteTodo={() => deleteTodo(todo.id)} />
                ))}
            </ul>
        </div>
    )
}