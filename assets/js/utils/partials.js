import { Categoria } from "../models/Categoria.js";
import { Todo } from "../models/Todo.js";

const crearCategoria = (categoria = new Categoria()) => {
  if (categoria.title === undefined) {
    throw new Error("No se está pasando una categoria");
  }

  return `
        <div class="col-6 col-md-3 col-lg-2">
            <div data-title-categoria="${categoria.title}" class="position-relative custom-card bg-dark text-white rounded-2 px-4 py-5 text-center">


                <div class="dropdown position-absolute top-0 end-0 me-2 mt-2">
                    <span role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i  class="bi bi-three-dots"></i>
                    </span>
                    <ul class="dropdown-menu">
                        <li data-id-categoria="${categoria.id}" role="button" class="dropdown-item">Eliminar</li>
                    </ul>
                </div>

                
                <div class="d-flex flex-column gap-3">
                    <h2 class="fs-5">${categoria.title}</h2>

                    <span class="badge rounded-pill text-bg-light text-dark py-2">No hay tareas</span>
                </div>
            </div>
        </div>
    `;
};

const crearTodo = (todo = new Todo()) => {
  if (todo.title === undefined) {
    throw new Error("Faltan datos en el la tarea");
  }

  return ` 
                    
                 
                    <div class="bg-dark text-white rounded-3 p-2 d-flex justify-content-between align-items-center">

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="flexCheckDefault" checked>
                            <label style="cursor: pointer; user-select: none;" class="form-check-label"
                                for="flexCheckDefault">${todo.title}</label>
                        </div>

                        <button class="btn btn-sm btn-outline-danger">
                            <i data-id-todo="${todo.id}" id="btn-tarea"  role="button" class="bi bi-trash3"></i>
                        </button>

               </div>
         
       
     `;
};

export const crearTodos = () => {
  const todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((todo) => {
    $("#contenedor-todos").append(crearTodo(todo));
  });
};

export const crearCategorias = () => {
  const categorias = JSON.parse(localStorage.getItem("categorias"));

  categorias.forEach((categoria) => {
    $("#contenedor-categorias").append(crearCategoria(categoria));
  });
};
