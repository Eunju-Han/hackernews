import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// ReactDOM.render()
// - uses a DOM node in your HTML to replace it with JSX.
// - can be used multiple times across your application
// - You can use it to bootstrap
// -- simple JSX syntax,
// -- a React component,
// -- multiple React components,
// -- or an entire application.

//ReactDOM.render has two arguments
// first: This is for rendering the JSX
// second: the place where the React application hooks into your HTML
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) is a tool
// for reloading your application in the browser WITHOUT the PAGE REFRESH.
// In a big application, it improves development productivity;
if (module.hot) {
  module.hot.accept();
}
