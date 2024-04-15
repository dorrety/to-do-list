export default function Todo({todo, deleteTodo}) {
    return (
        <>
            <li>
                {todo.text}
                <button onClick={() => deleteTodo(todo.id)}>-</button>
            </li>
        </>
    )
}