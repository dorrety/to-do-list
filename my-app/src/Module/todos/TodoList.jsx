import { useEffect, useState } from "react";
import TodoItem from "../../Components/Todo/TodoItem";
import Search from "../../Components/Search/Search";
import Timer from "../../Components/Timer/Timer"
import { Context } from '../../context'

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchItem, setSearchItem] = useState('');

    useEffect(() => {
        const raw = localStorage.getItem('todos') || [];
        setTodos(JSON.parse(raw));
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = (event) => {
        event.preventDefault();
        if (inputValue.trim() === '') return;
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false
        }
        setTodos((state) => [...state, newTodo])
        setInputValue('')
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    };

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        }))
    }

    const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchItem.toLowerCase()));

    return (
        <Context.Provider value={{
            toggleTodo, deleteTodo
        }}>
            <div className="container">
                <h1>To-do-list</h1>
                <form onSubmit={addTodo}>
                    <input 
                        type='text'
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        placeholder="Add new todo..." />
                    <input 
                        type='submit'
                        value='Add' />
                </form>
                <Search searchItem={searchItem} setSearchItem={setSearchItem} />
                <ul>
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} {...todo} />
                    ))}
                </ul>
                <Timer />
            </div>
        </Context.Provider>
    )
}