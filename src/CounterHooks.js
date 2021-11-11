import { useContext, useState } from "react";

import { ThemeContext } from "./App";

export default function CounterHooks({initialCount}){
    const [count, setCount] = useState(initialCount);
    const {style, changeStyle} = useContext(ThemeContext);

    const increment = () => {
        setCount(count + 1);
        changeStyle("yellow");
    }

    const decrement = () => {
        setCount(count - 1);
        changeStyle("pink");
    }

    return (
        <>
            <button style={style} onClick={decrement}>-</button>
            <span>{count}</span>
            <button style={style} onClick={increment}>+</button>
        </>
    )
}