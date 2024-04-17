import { useContext } from "react";
import { Context } from "../../context";

export default function TodoItem({ text, id, completed }) {
    const { toggleTodo, deleteTodo } = useContext(Context)

    return (
        <label>
            <li className="todo-item">
                <input
                    className="todo-checkbox"
                    type="checkbox" 
                    checked={completed}
                    onChange={() => toggleTodo(id)}
                    />
                <span className={`todo-text ${completed ? 'checked' : ''}`}>{text}</span>
                <button className="delete-button" onClick={() => deleteTodo(id)}>-</button>
            </li>
        </label>
    )
}