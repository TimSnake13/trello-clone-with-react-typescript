import React from "react";
import { Todo } from "./types";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {
  let todos: Array<Todo> = new Array<Todo>();

  //   useEffect(() => {
  //     todos;
  //     return () => {
  //       cleanup;
  //     };
  //   }, [todos]);\

  function AddTodo(todo: Todo) {
    todos = [...todos, todo];
    console.log(todos);
  }

  return (
    <div>
      <h3>Todos: </h3>
      <AddTodoForm addTodo={AddTodo} />
      <div className="dropzone">
        {todos &&
          todos.map((todo) => {
            <div className="draggable" draggable="true">
              {todo.text}
            </div>;
          })}
      </div>
      <div className="dropzone">
        <div className="draggable">3</div>
        <div className="draggable">4</div>
      </div>
    </div>
  );
};

export default TodoList;
