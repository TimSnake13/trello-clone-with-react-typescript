import React, { useState, useReducer, useEffect } from "react";
import { Todo } from "./types";
import AddTodoForm from "./AddTodoForm";

enum TodoAction {
  ADD = "ADD",
  REMOVE = "REMOVE",
  TOGGLE = "TOGGLE",
}

type ACTION_TYPES =
  | { type: TodoAction.ADD; payload: { text: string; dropzone_idx: number } }
  | { type: TodoAction.REMOVE; payload: string }
  | { type: TodoAction.TOGGLE; payload: string };

function reducer(state: { todos: Array<Todo> }, action: ACTION_TYPES) {
  switch (action.type) {
    case TodoAction.ADD:
      const newTodo = new Todo(
        action.payload.text,
        action.payload.dropzone_idx
      );
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
  //FIN: 1. react drag & drop between task container
  //TODO: 2. Add & remove task container
  //TODO: 3. Add some beautiful css
  //TODO: 4. line through animation with dynamic text length

  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
  const [dropzones, setDropzones] = useState([{ idx: 0, name: "Todo List" }]);

  function AddDropzone(idx?: number, name?: string) {
    let _idx, _name;
    if (!name) {
      _name = "Todo List";
    } else {
      _name = name;
    }

    if (!idx) {
      _idx = dropzones[dropzones.length - 1].idx + 1;
    } else {
      //TODO: If idx exist, place it and move everything +1 position
      _idx = idx;
    }

    setDropzones([...dropzones, { idx: _idx, name: _name }]);
  }

  function AddTodo(todo: string, dropzone?: number) {
    if (todo !== "") {
      if (dropzone) {
        if (!dropzones.find((obj) => obj.idx === dropzone)) {
          setDropzones([...dropzones, { idx: dropzone, name: "Todo List" }]);
        }

        dispatch({
          type: TodoAction.ADD,
          payload: { text: todo, dropzone_idx: dropzone },
        });
      } else {
        dispatch({
          type: TodoAction.ADD,
          payload: { text: todo, dropzone_idx: 0 },
        });
      }
    }
  }

  // AddEventListener to all todo item: Add and remove .dragging
  useEffect(() => {
    const allDraggable = document.body.querySelectorAll(".draggable");

    allDraggable.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
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

  function getDragAfterElement(container: Element, e: any) {
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

  // AddEventListener to all dropzones
  useEffect(() => {
    const allDropzones = document.body.querySelectorAll(".dropzone");

    allDropzones.forEach((dropzone) => {
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();

        const afterElement = getDragAfterElement(dropzone, e);
        const draggable = document.querySelector(".dragging");
        if (draggable)
          if (afterElement == null) {
            dropzone.appendChild(draggable);
          } else {
            dropzone.insertBefore(draggable, afterElement);
          }
        else console.log("No draggable: " + draggable);
      });
    });
  }, [dropzones]);

  return (
    <div>
      <h3>Todos: </h3>
      <button onClick={() => AddTodo("Test")}>Add a Test Todo</button>
      <button onClick={() => AddDropzone()}>New List</button>
      <div className="scrolling-wrapper">
        <div className="flex-box">
          {dropzones.map((d) => (
            <div key={d.idx} className="dropzone-wrapper">
              <div className="dropzone">
                <h4 className="dropzone-title">{d.name}</h4>
                {todos.map((t) =>
                  t.dropzone === d.idx ? (
                    <div
                      className="draggable"
                      draggable="true"
                      key={t.id}
                      style={{
                        textDecoration: t.done ? "line-through" : "none",
                      }}
                      onClick={() => {
                        dispatch({ type: TodoAction.TOGGLE, payload: t.id });
                      }}
                    >
                      {t.text}
                      <div className="strike-through"></div>
                    </div>
                  ) : (
                    <></>
                  )
                )}
              </div>
              <AddTodoForm addTodo={AddTodo} currentDropzone={d.idx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TodoList;
