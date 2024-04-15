export default function Button({ startTimer, name}) {
    return (
        <button onClick={startTimer}>{name}</button>
    )
}