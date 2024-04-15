import { useEffect, useState } from "react"
import Button from "../Button/Button";

export default function Timeout() {
    const [startAt, setStartAt] = useState(62)
    const [isActive, setIsActive] = useState(false)

    const startTimer = () => {
        setIsActive(true);
        setStartAt(startAt);
    }

    const stopTimer = () => {
        setIsActive(false)
    }

    const resetTimer = () => {
        setIsActive(false);
        setStartAt(62);
    }

    useEffect(() => {
        if(!isActive) return;
        const timer = setInterval(() => {
            setStartAt((t) => Math.max(t - 1, 0))
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [isActive]);
    
    const formattedTime = (sec) => {
        const pad = val => ('0' + val).slice(-2);
        return [Math.floor((sec % 3600) / 60), sec % 60]
            .map(pad)
            .join(':');
    }

    return (
        <>
            <h1>Timer {formattedTime(startAt)}</h1>
            <div>
                <Button name="start" startTimer={startTimer}/>
                <Button name="stop" startTimer={stopTimer}/>
                <Button name="reset" startTimer={resetTimer}/>
            </div>
        </>
    )
}