import React, { useState } from "react";
import { Todo } from "./types";

interface Props {
  addTodo: (todo: Todo) => void;
}

const AddTodoForm = (Props: Props) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const todo = new Todo(newTodo);
    console.log("New Todo: " + todo.text);
    Props.addTodo(todo);
    setNewTodo("");
  };

  return (
    <div>
      <form>
        <input type="text" value={newTodo} onChange={handleChange}></input>
        <button type="submit" onClick={handleAddTodo}>
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoForm;
