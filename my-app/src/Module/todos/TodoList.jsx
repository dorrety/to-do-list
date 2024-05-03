import { useState } from "react";
import TodoItem from "../../Components/Todo/TodoItem";
import Search from "../../Components/Search/Search";
import { Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addTodoAction, removeTodoAction, removeAllTodoAction, toggleTodoAction } from "../../store/todoReducer";
import { removeAxiosTodoAction, toggleAxiosTodoAction } from "../../store/axiosReducer"

import { axiTodos } from "../../asyncActions/axiosTodos";

export default function TodoList() {
    const [inputValue, setInputValue] = useState('');
    const [searchItem, setSearchItem] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(10)

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoReducer.todos)
    const axiosTodos = useSelector(state => state.axiosReducer.axiosTodos)
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    
    const addTodo = (title) => {
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

    const handleButtonClick = () => {
        if (!isButtonClicked) {
            dispatch(axiTodos());
            setIsButtonClicked(true)
        }
    }

    const removeAxiosTodo = (id) => {
        dispatch(removeAxiosTodoAction(id))
    }

    const toggleAxiosTodo = (id, completed) => {
        dispatch(toggleAxiosTodoAction({id, completed: !completed}))
    }

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
                    addTodo(inputValue)
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
                { axiosTodos.length < 1 ? 
                <button onClick={handleButtonClick}>Получить все задачи</button>
                :
                <div>
                    <Pagination
                    total={axiosTodos.length}
                    current={currentPage}
                    pageSize={todosPerPage}
                    onChange={paginate}
                    onShowSizeChange={(_current, size) => setTodosPerPage(size)}
                    />
                    <ul>
                        {currentTodos
                        .map((todo) => (
                           <TodoItem key={Symbol(todo.id).toString()} {...todo} removeTodo={removeAxiosTodo} toggleTodo={toggleAxiosTodo}/>
                        ))}
                    </ul>
                    <Pagination
                    total={axiosTodos.length}
                    current={currentPage}
                    pageSize={todosPerPage}
                    onChange={paginate}
                    onShowSizeChange={(_current, size) => setTodosPerPage(size)}/>
                </div>
                }
            </div>
    )
}