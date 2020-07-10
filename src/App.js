import React from "react";
import "./App.css";

// component declaration
function App() {
  var helloWorld = "Welcome to the Road to learn React";
  return (
    <div className="App">
      <h2>{helloWorld}</h2>
      <p className="CustomAttr_Underline">
        {" "}
        My own test with a custom css class
      </p>
    </div>
  );
}

// component usage (also called instantiation for a class)
// creates an instance of the component
export default App;
