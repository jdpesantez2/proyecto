document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!user) {
    window.location.href = "registro.html";
    return;
  }

  const nombreSpan = document.getElementById("nombre-usuario");

  if (nombreSpan) {
    nombreSpan.textContent = user.nombres;
  }

});
