import { Todo } from "./models/Todo.js";
import { crearTodos } from "./utils/partials.js";

import {
  notificationSuccess,
  notificationError,
} from "./utils/notifications.js";

const listadoCategorias = () => {
  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  const nombresCategorias = categorias.map((categoria) => {
    return categoria.title.toLowerCase();
  });

  nombresCategorias.forEach((categoria) => {
    $("#tarea-categoria").append(
      `<option class="text-capitalize" value="${categoria}">${categoria}</option>`
    );
  });
};

const titulosTareas = () => {
  const currentURL = window.location.href;
  const params = new URL(currentURL).searchParams;
  const categoria = params.get("categoria") || "";

  const categorias = JSON.parse(localStorage.getItem("categorias")) || [];

  categorias.map((categoria) => {
    return categoria.title.toLowerCase();
  });

  $("#titulos").append(`<h1 class="display-6">Tareas de ${categoria}</h1>`);
};

 // refrescar la UI

const refrescarTodos = () => {
  $("#contenedor-todos").html("");
  crearTodos();

  $('.btn i[role="button"]').click(eliminarTodo);
};


// Crear el método de crear un todo y guardarlo en el localStorage.
// Agregar alerta que le indique al usuario que se agregó el todo y las alertas de errores que considere necesarias.
const guardarTodo = (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const titulo = form.get("tarea-titulo");

  const nuevoTodo = new Todo(titulo);

  const todos = JSON.parse(localStorage.getItem("todos"));

  const existeTodo = todos.find(
    (todo) => todo.title.toLowerCase() === titulo.toLowerCase()
  );

  if (existeTodo) {
    return notificationError("Tarea dublicada, no se puede agregar");
  }

  todos.push(nuevoTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  refrescarTodos();

  $("#tarea-titulo").val("");

  notificationSuccess("Tarea agregada correctamente");
};


// Eliminar un todo

function eliminarTodo() {
  const idTodo = $(this).attr("data-id-todo");

  let todos = JSON.parse(localStorage.getItem("todos"));

  const nuevosTodos = todos.filter((todo) => todo.id !== idTodo);

  todos = nuevosTodos;

  localStorage.setItem("todos", JSON.stringify(todos));

  refrescarTodos();
}



$(document).ready(() => {
  titulosTareas();

  listadoCategorias();

  const todos = localStorage.getItem("todos");

  if (todos === null) {
    localStorage.setItem("todos", "[]");
  }

  crearTodos();

  $("#form-tarea").submit(guardarTodo);

  $('.btn i[role="button"]').click(eliminarTodo);
});
