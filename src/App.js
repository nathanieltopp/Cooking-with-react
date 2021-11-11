import React, { useState } from "react";
import Counter from "./Counter";
import CounterHooks from "./CounterHooks";

export const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState("grey");

  const changeBackground = (color) => {
    console.log("change background called");
    setTheme(color);
  }

  const contextData = {
    style: {
      backgroundColor: theme
    },
    changeStyle: changeBackground
  }

  return (
    <ThemeContext.Provider value={contextData}>
      <h3>Class Counter</h3>
      <Counter initialCount={0}/>

      <h3>Fumctional Counter</h3>
      <CounterHooks initialCount={3}/>
      <br/>
      <button onClick={() =>changeBackground("green")}>Toggle Theme</button>
    </ThemeContext.Provider>
  )
}

export default App;
