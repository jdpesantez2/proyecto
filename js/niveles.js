document.addEventListener("DOMContentLoaded", () => {

  const user = localStorage.getItem("usuarioRegistrado");

  if (!user) {
    window.location.href = "registro.html";
    return;
  }

  const btnNivel1 = document.getElementById("btn-nivel1");

  if (btnNivel1) {
    btnNivel1.addEventListener("click", () => {
      window.location.href = "nivel1.html";
    });
  }

});


