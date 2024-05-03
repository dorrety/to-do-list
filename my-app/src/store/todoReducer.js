const defaultState = {
    todos: []
}

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const REMOVE_ALL_TODO = 'REMOVE_ALL_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

export const todoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {...state, todos: [...state.todos, action.payload]}
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)}
        case REMOVE_ALL_TODO:
            return {...state, todos: []}
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? {...todo, completed: action.payload.completed} : todo
            )}
        default:
            return state;
    }
}

export const addTodoAction = (payload) => ({type: ADD_TODO, payload});
export const removeTodoAction = (payload) => ({type: REMOVE_TODO, payload});
export const removeAllTodoAction = (payload) => ({type: REMOVE_ALL_TODO, payload});
export const toggleTodoAction = (payload) => ({type: TOGGLE_TODO, payload});