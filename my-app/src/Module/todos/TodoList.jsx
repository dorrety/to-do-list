import { useEffect, useState } from "react";
import TodoItem from "../../Components/Todo/TodoItem";
import Search from "../../Components/Search/Search";
import { getTodos } from "../../service/todo.sevice";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addTodoAction, removeTodoAction, removeAllTodoAction, toggleTodoAction } from "../../store/todoReducer";

export default function TodoList() {
    const [inputValue, setInputValue] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const [axiosTodos, setAxiosTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(10)

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoReducer.todos)
    
    const addedTodo = (title) => {
        if (!title.length) return;
        const todo = {
            id: Date.now(),
            title,
            completed: false,
        }
        dispatch(addTodoAction(todo))
    }

    const removeTodo = (id) => {
        dispatch(removeTodoAction(id))
    }

    const deleteAll = (todo) => {
        dispatch(removeAllTodoAction(todo))
    }

    const toggleTodo = (id, completed) => {
        dispatch(toggleTodoAction({id, completed: !completed}))
    }

    useEffect(() => {
        getTodos().then(data => {
            setAxiosTodos([...data]);
        })
    }, [])

    // useEffect(() => {
    //     const raw = localStorage.getItem('todos') || [];
    //     setTodos(JSON.parse(raw));
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }, [todos]);


    const filteredTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchItem.toLowerCase()));


    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = axiosTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
            <div className="container">
                <h1>To-do-list</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    addedTodo(inputValue)
                    setInputValue('')
                }}>
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
                    { todos.length > 0 ?
                    <ul>
                        {filteredTodos.map((todo) => (
                            <TodoItem key={todo.id} {...todo} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
                        ))}
                    </ul>
                    :
                    <div style={{marginTop:20}}>
                        Задач нет!
                    </div>
                    }
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
    )
}