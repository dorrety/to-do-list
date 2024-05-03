export default function TodoItem({ id, title, completed, removeTodo, toggleTodo }) {

    return (
        <label>
            <li className="todo-item">
                <input
                    className="todo-checkbox"
                    type="checkbox" 
                    checked={completed}
                    onChange={() => toggleTodo(id, completed)}
                    />
                <span className={`todo-text ${completed ? 'checked' : ''}`}>{title}</span>
                <button className="delete-button" onClick={() => removeTodo(id)}>-</button>
            </li>
        </label>
    )
}