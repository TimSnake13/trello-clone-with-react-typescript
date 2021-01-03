import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: string;
  text: string;
  done: boolean;

  constructor(props: string) {
    this.id = uuidv4();
    this.text = props;
    this.done = false;
  }
}

export type Todos = Array<Todo>;
