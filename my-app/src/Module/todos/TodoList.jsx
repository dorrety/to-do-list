import { useEffect, useState } from "react";
import TodoItem from "../../Components/Todo/TodoItem";
import Search from "../../Components/Search/Search";
import { Context } from '../../context';
import { getTodos } from "../../service/getTodos";
import { Pagination } from "antd";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const [axiosTodos, setAxiosTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(10)

    useEffect(() => {
        getTodos().then(data => {
            setAxiosTodos([...data]);
        })
    }, [])

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
            title: inputValue,
            completed: false
        }
        setTodos((state) => [...state, newTodo])
        setInputValue('')
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setAxiosTodos(axiosTodos.filter((todo) => todo.id !== id))
    };

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        }))
        setAxiosTodos(axiosTodos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        }))
    }

    const deleteAll = () => {
        setTodos([])
    }

    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchItem.toLowerCase()));


    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = axiosTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                <div>
                    <button onClick={deleteAll}>Delete all</button>
                    <ul>
                        {filteredTodos.map((todo) => (
                            <TodoItem key={todo.id} {...todo} />
                        ))}
                    </ul>
                </div>
                <h2>AXIOS LIST</h2>
                <div>
                    <Pagination
                    total={axiosTodos.length}
                    current={currentPage}
                    pageSize={todosPerPage}
                    onChange={paginate}
                    onShowSizeChange={(current, size) => setTodosPerPage(size)}
                    />
                    <ul>
                        {currentTodos
                        .map((todo) => (
                           <TodoItem key={Symbol(todo.id).toString()} {...todo} />
                        ))}
                    </ul>
                    <Pagination
                    total={axiosTodos.length}
                    current={currentPage}
                    pageSize={todosPerPage}
                    onChange={paginate}
                    onShowSizeChange={(_current, size) => setTodosPerPage(size)}/>
                </div>
            </div>
        </Context.Provider>
    )
}