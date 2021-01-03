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
      console.log("Here is in ADD: ");
      const newTodo = new Todo(action.payload);
      console.log(newTodo);
      console.log("newTodo.text: " + newTodo.text);
      console.log("Payload: " + action.payload);
      return { todos: [...state.todos, newTodo] };
    case TodoAction.REMOVE:
      console.log("Here is in REMOVE: ");

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

  const [text, setText] = useState("");

  function AddTodo(todo: string) {
    if (todo !== "") {
      setText(todo);
      console.log("text: " + todo);

      dispatch({ type: TodoAction.ADD, payload: text });
      console.log("Todos: " + todos);
    }
  }

  useEffect(() => {
    // BUG:
    // Somehow the first todo that pass in as props is always an empty string
    // but after that, everything works just fine.
    AddTodo("Example Todo For Testing");
  }, []);

  return (
    <>
      <h3>Todos: </h3>
      <button onClick={() => AddTodo("Test")}>Add a Test Todo</button>
      <AddTodoForm addTodo={AddTodo} />
      <div className="dropzone">
        {todos.map((todo) => {
          <div
            className="draggable"
            draggable="true"
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
            onClick={() =>
              dispatch({ type: TodoAction.TOGGLE, payload: todo.id })
            }
          >
            {todo.text}
          </div>;
        })}
      </div>
      <div className="dropzone">
        <div className="draggable">3</div>
        <div className="draggable">4</div>
      </div>
    </>
  );
};
export default TodoList;
