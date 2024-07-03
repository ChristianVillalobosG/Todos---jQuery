import { Categoria } from "./models/Categoria.js";
import { crearCategorias } from "./utils/partials.js";
import {
  notificationSuccess,
  notificationError,
} from "./utils/notifications.js";

const refrescarUI = () => {
  $("#contenedor-categorias").html("");
  crearCategorias();
  $('.custom-card li[role="button"]').click(eliminarCategoria);
  $(".custom-card").click(navegarTodos);
  $('.custom-card span[role="button"]').click((e) => e.stopPropagation());
};



const guardarCategoria = (e) => {
  e.preventDefault();

  const form = new FormData(e.target);

  const titulo = form.get("categoria-titulo");

  const nuevaCategoria = new Categoria(titulo);

  const categorias = JSON.parse(localStorage.getItem("categorias"));

  const existeCategoria = categorias.find(
    (categoria) => categoria.title.toLowerCase() === titulo.toLowerCase()
  );


  if (existeCategoria) {
    return notificationError("Categoria dublicada, no se puede agregar");
  }

  categorias.push(nuevaCategoria);
  localStorage.setItem("categorias", JSON.stringify(categorias));

  refrescarUI();

  $("#categoria-titulo").val("");

  notificationSuccess("Categoria agregada correctamente");
};



function eliminarCategoria() {
  const idCategoria = $(this).attr("data-id-categoria");

  let categorias = JSON.parse(localStorage.getItem("categorias"));

  const nuevasCategorias = categorias.filter(
    (categoria) => categoria.id !== idCategoria
  );

  categorias = nuevasCategorias;

  localStorage.setItem("categorias", JSON.stringify(categorias));

  refrescarUI();
}



function navegarTodos() {
  const tituloCategoria = $(this).attr("data-title-categoria");

  window.location.href = `/todos.html?categoria=${tituloCategoria.toLowerCase()}`;
}

$(document).ready(() => {
  const categorias = localStorage.getItem("categorias");

  if (categorias === null) {
    localStorage.setItem("categorias", "[]");
  }

  crearCategorias();

  $("#form-categoria").submit(guardarCategoria);

  $('.custom-card li[role="button"]').click(eliminarCategoria);

  $(".custom-card").click(navegarTodos);

  $('.custom-card span[role="button"]').click((e) => {
    e.stopPropagation();
  });
});
