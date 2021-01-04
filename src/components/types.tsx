import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: string;
  text: string;
  done: boolean;
  dropzone: number;

  constructor(prop_text: string, prop_dropzone?: number) {
    this.id = uuidv4();
    if (prop_text === "") this.text = "Example Todo Item";
    else this.text = prop_text;
    this.done = false;
    if (prop_dropzone) this.dropzone = prop_dropzone;
    else this.dropzone = 0;
  }
}

export type Todos = Array<Todo>;
