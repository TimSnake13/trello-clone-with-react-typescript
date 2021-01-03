import React, { useState, useReducer, useEffect } from "react";
import { Todo } from "./types";
import AddTodoForm from "./AddTodoForm";

enum TodoAction {
  ADD = "ADD",
  REMOVE = "REMOVE",
  TOGGLE = "TOGGLE",
}

type ACTION_TYPES =
  | { type: TodoAction.ADD; payload: string }
  | { type: TodoAction.REMOVE; payload: string }
  | { type: TodoAction.TOGGLE; payload: string };

function reducer(state: { todos: Array<Todo> }, action: ACTION_TYPES) {
  switch (action.type) {
    case TodoAction.ADD:
      const newTodo = new Todo(action.payload);
      return { todos: [...state.todos, newTodo] };
    case TodoAction.REMOVE:
      return {
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload),
      };
    case TodoAction.TOGGLE:
      return {
        todos: state.todos.map((todo: Todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        ),
      };
    default:
      return state;
  }
}

const TodoList = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });

  function AddTodo(todo: string) {
    if (todo !== "") {
      dispatch({ type: TodoAction.ADD, payload: todo });
    }
  }

  return (
    <>
      <h3>Todos: </h3>
      <button onClick={() => AddTodo("Test")}>Add a Test Todo</button>
      <AddTodoForm addTodo={AddTodo} />
      <div className="dropzone">
        {todos.map((t) => (
          <div
            className="draggable"
            draggable="true"
            key={t.id}
            style={{ textDecoration: t.done ? "line-through" : "none" }}
            onClick={() => dispatch({ type: TodoAction.TOGGLE, payload: t.id })}
          >
            {t.text}
          </div>
        ))}
      </div>
      <div className="dropzone">
        <div className="draggable">3</div>
        <div className="draggable">4</div>
      </div>
    </>
  );
};
export default TodoList;
