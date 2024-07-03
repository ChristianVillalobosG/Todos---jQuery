
// Agregar alerta que le indique al usuario que se agregó el todo y las alertas de errores que considere necesarias. 

export const notificationSuccess = (message) => {
  toastr.success(null, message, {
    closeButton: true,
    positionClass: "toast-bottom-right",
  });
};

export const notificationError = (message) => {
  toastr.error(null, message, {
    closeButton: true,
    positionClass: "toast-bottom-right",
  });
};
