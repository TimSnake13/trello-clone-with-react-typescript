import React, { useRef } from "react";
import { Todo } from "./types";

interface Props {
  todoItem: Todo;
  ToggleTodoItem: (t: Todo) => void;
}

const TodoItem = (props: Props) => {
  const strikeThroughtEl = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div
        className="draggable"
        draggable="true"
        onClick={() => {
          props.ToggleTodoItem(props.todoItem);
          if (strikeThroughtEl && strikeThroughtEl.current)
            if (props.todoItem.done)
              strikeThroughtEl.current.style.width = "80%";
            else {
              strikeThroughtEl.current.style.width = "0%";
            }
        }}
      >
        {props.todoItem.text}
        <div className="strike-through" ref={strikeThroughtEl}></div>
      </div>
    </div>
  );
};

export default TodoItem;
