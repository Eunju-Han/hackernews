import React from "react";
import "./App.css";

// component declaration
function App() {
  const helloWorld = "Welcome to the Road to learn React";
  const helloW = {
    text: "Welcome to the Road to learn React"
  };
  helloW.text =
    "When a const variable is an array or object, the values it holds can get updated through indirect";

  return (
    <div className="App">
      <h2>{helloWorld}</h2>
      <p className="CustomAttr_Underline">{helloW.text}</p>
    </div>
  );
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;
