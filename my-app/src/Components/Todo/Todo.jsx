export default function Todo({todo, deleteTodo}) {

    return (
        <>
            <li>
                {todo}
                <button onClick={() => deleteTodo(todo)}>-</button>
            </li>
        </>
    )
}