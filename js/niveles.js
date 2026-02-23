verificarSesion();
protegerPagina();
actualizarNavbar();
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  window.location.href = "login.html";
}

const progreso = JSON.parse(localStorage.getItem("progreso"));

document.querySelectorAll(".nivel").forEach(nivel => {
  const num = Number(nivel.dataset.nivel);

  if (num > progreso.nivelDesbloqueado) {
    nivel.classList.add("bloqueado");
    nivel.onclick = () => alert("Nivel bloqueado");
  }
});
