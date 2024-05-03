const defaultState = {
    todos: []
}

export const axiosReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'REMOVE_TODO':
            return {...state, todos: state.todos.filter(todo => todo.id !== action.payload)}
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? {...todo, completed: action.payload.completed} : todo
            )}
        default:
            return state;
    }
}