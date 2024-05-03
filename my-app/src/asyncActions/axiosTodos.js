import { getTodos } from "../service/todo.sevice";
import { addAllTodoAction } from "../store/axiosReducer";

export const axiTodos = () => {
    return function(dispatch) {
        getTodos().then(data => {
            dispatch(addAllTodoAction(data));
        })
    }
}