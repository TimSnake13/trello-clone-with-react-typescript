import React, { useState, useReducer, useEffect } from "react";
import { Todo } from "./types";
import AddTodoForm from "./AddTodoForm";

import DraggableItem from "./DraggableItem";
import ReactCursorPosition, { INTERACTIONS } from "react-cursor-position";
import PositionLabel from "./PositionLabel";

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

  useEffect(() => {
    const allDraggable = document.body.querySelectorAll(".draggable");

    allDraggable.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add(".dragging");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    return () => {
      // Clean up unfinished
      // allDraggable.forEach((draggable) => {
      //   draggable.removeEventListener("dragstart");
      //   draggable.removeEventListener("dragend");
      // });
    };
  }, [todos]);

  function getDragAfterElement(
    container: Element,
    e: React.MouseEvent<HTMLElement>
  ) {
    const draggableElements = Array.prototype.slice.call(
      container.querySelectorAll(".draggable:not(.dragging)")
    );
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - box.height / 2; // Mouse Y dst to box center
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  useEffect(() => {
    const allDropzones = document.body.querySelectorAll(".dropzone");

    allDropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();

        // const afterElement = getDragAfterElement(dropzone, e);
      });
    });
  }, []);

  //TODO: 1. react drag & drop between task container
  //TODO: 2. Add & remove task container
  //TODO: 3. Add some beautiful css
  //TODO: 4. line through animation with dynamic text length

  return (
    <div className="todo-list-wrapper">
      <ReactCursorPosition activationInteractionMouse={INTERACTIONS.CLICK}>
        <PositionLabel />

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
              onClick={() =>
                dispatch({ type: TodoAction.TOGGLE, payload: t.id })
              }
            >
              {t.text}
              <div className="strike-through"></div>
            </div>
          ))}
        </div>
        <div className="dropzone">
          <div className="draggable">3</div>
          <div className="draggable">4</div>
          <DraggableItem />
        </div>
      </ReactCursorPosition>
    </div>
  );
};
export default TodoList;
