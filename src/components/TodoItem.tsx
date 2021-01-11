import React, { useRef } from "react";
import { Todo } from "./types";

interface Props {
  todoItem: Todo;
  ToggleTodoItem: (t: Todo) => void;
}

const TodoItem = (props: Props) => {
  const strikeThroughtEl = useRef<HTMLDivElement>(null);
  const textEl = useRef<HTMLDivElement>(null);

  function handleClick() {
    props.ToggleTodoItem(props.todoItem);
    if (strikeThroughtEl && strikeThroughtEl.current)
      if (props.todoItem.done) {
        strikeThroughtEl.current.style.width = "80%";
      } else {
        strikeThroughtEl.current.style.width = "0%";
      }
    if (textEl && textEl.current)
      if (props.todoItem.done) {
        textEl.current.style.color = "#D1D5DB";
      } else {
        textEl.current.style.color = "#1F2937";
      }
  }

  return (
    <div>
      <div className="draggable" draggable="true" onClick={handleClick}>
        <p className="todoItem-text" ref={textEl}>
          {props.todoItem.text}
        </p>
        <div className="strike-through" ref={strikeThroughtEl}></div>
      </div>
    </div>
  );
};

export default TodoItem;
