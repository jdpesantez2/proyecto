document.addEventListener("DOMContentLoaded", () => {

  const registrado = localStorage.getItem("registrado");

  document.querySelectorAll(".nivel").forEach(nivel => {
    nivel.addEventListener("click", (e) => {
      const link = nivel.querySelector("a");

      if (!registrado) {
        e.preventDefault();
        alert("Debes registrarte primero");
        window.location.href = "registro.html";
      }
    });
  });

});
const nota1 = parseFloat(localStorage.getItem("notaNivel1"));

if (localStorage.getItem("registrado")) {
  document.getElementById("nivel1").classList.remove("bloqueado");
}

if (nota1 >= 7) {
  // aquí luego desbloquearás nivel 2
}
