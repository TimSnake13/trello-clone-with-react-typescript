import React, { useState } from "react";
import { Todo } from "./types";

interface Props {
  addTodo: (todo: string, dropzone?: number) => void;
  currentDropzone?: number;
}

const AddTodoForm = (Props: Props) => {
  const [newTodo, setNewTodo] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Props.addTodo(newTodo, Props.currentDropzone);
    setNewTodo("");
  };

  return (
    <div>
      <form>
        <button type="submit" onClick={handleAddTodo}>
          +
        </button>
        <input type="text" value={newTodo} onChange={handleChange}></input>
      </form>
    </div>
  );
};

export default AddTodoForm;
