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
        setTodo([...todos, inputValue])
        setInputValue('')
    }

    const deleteTodo = (index) => {
        setTodo(todos.filter((_, todoIndex) => todoIndex !== index))
    }

    const filteredTodos = todos.filter((todo) => todo.toLowerCase().includes(searchItem.toLowerCase()));

    return (
        <div>
            <h1>To-do-list</h1>
            <form onSubmit={addTodo}>
                <input type='text' onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Add new todo..." />
                <input type='submit' value='Add' />
            </form>
            <Search searchItem={searchItem} setSearchItem={setSearchItem} />
            <ul>
                {filteredTodos.map((todo, index) => (
                    <Todo key={index} todo={todo} deleteTodo={() => deleteTodo(index)} />
                ))}
            </ul>
        </div>
    )
}