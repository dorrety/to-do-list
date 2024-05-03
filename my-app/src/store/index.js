import { createStore, combineReducers } from 'redux';
import { todoReducer } from './todoReducer';

const rootReducer = combineReducers({
    todoReducer,
})

export const store = createStore(rootReducer);