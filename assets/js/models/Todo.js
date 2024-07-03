
// Crear el método de crear un todo

export class Todo {
  constructor(title, description, category) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.category = category;
    this.state = false;
  }
}
