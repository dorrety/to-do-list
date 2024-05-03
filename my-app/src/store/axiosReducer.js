const defaultState = {
    axiosTodos: []
}

const ADD_ALL_TODO = 'ADD_ALL_TODO';
const REMOVE_AXIOS_TODO = 'REMOVE_AXIOS_TODO';
const TOGGLE_AXIOS_TODO = 'TOGGLE_AXIOS_TODO';

export const axiosReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_ALL_TODO:
            return {...state, axiosTodos: [...state.axiosTodos, ...action.payload]}
        case REMOVE_AXIOS_TODO:
            return {...state, axiosTodos: state.axiosTodos.filter(todo => todo.id !== action.payload)}
        case TOGGLE_AXIOS_TODO:
            return {
                ...state,
                axiosTodos: state.axiosTodos.map(todo =>
                    todo.id === action.payload.id ? {...todo, completed: action.payload.completed} : todo
            )}
        default:
            return state;
    }
}

export const addAllTodoAction = (payload) => ({type: ADD_ALL_TODO, payload});
export const removeAxiosTodoAction = (payload) => ({type: REMOVE_AXIOS_TODO, payload});
export const toggleAxiosTodoAction = (payload) => ({type: TOGGLE_AXIOS_TODO, payload});