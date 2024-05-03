import { createStore, combineReducers, applyMiddleware } from 'redux';
import { todoReducer } from './todoReducer';
import { axiosReducer } from './axiosReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    todoReducer,
    axiosReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));