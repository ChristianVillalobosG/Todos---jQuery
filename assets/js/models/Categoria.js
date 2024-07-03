// Crear el método de crear un todo

class Categoria {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.createAt = new Date();
  }

  getInformation() {
    return `id: ${this.id} - title: ${this.title}`;
  }
}

export { Categoria };
