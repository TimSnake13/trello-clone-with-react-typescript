import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <div className="flex-box">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
            </ul>

            <div>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/todo" component={TodoList} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
