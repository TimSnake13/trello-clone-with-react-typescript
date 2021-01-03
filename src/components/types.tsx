import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: string;
  text: string;
  done: boolean;

  constructor(props: string) {
    this.id = uuidv4();
    // BUG:
    // Somehow the first todo that pass in as props is always an empty string
    if (props === "") this.text = "Example Todo Item";
    else this.text = props;
    this.done = false;
  }
}

export type Todos = Array<Todo>;
