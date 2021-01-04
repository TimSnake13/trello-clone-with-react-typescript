import React from "react";
import { Todo } from "./types";

interface Props {
  todoItem: Todo;
  ToggleTodoItem: (t: Todo) => void;
}

const TodoItem = (props: Props) => {
  return (
    <div>
      <div
        className="draggable"
        draggable="true"
        style={{
          textDecoration: props.todoItem.done ? "line-through" : "none",
        }}
        onClick={() => {
          props.ToggleTodoItem(props.todoItem);
        }}
      >
        {props.todoItem.text}
        <div className="strike-through"></div>
      </div>
    </div>
  );
};

export default TodoItem;
