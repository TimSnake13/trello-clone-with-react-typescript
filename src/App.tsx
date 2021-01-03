import React, { useRef } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import TodoList from "./components/TodoList";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <TodoList />
      <input ref={inputRef} name="email" type="search" />
      <button
        onClick={() => {
          console.log(inputRef.current);
          if (inputRef.current) inputRef.current.focus();
        }}
      >
        Focus
      </button>
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
