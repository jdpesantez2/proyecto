document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     REGISTRO DE USUARIO
  ========================= */
  const form = document.getElementById("registroForm");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombres = document.getElementById("nombres").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();

      if (nombres === "" || apellidos === "") {
        alert("Completa todos los campos");
        return;
      }

      const fecha = new Date().toLocaleDateString();

      // Guardar datos del usuario
      localStorage.setItem("registrado", "true");
      localStorage.setItem("usuario", nombres + " " + apellidos);
      localStorage.setItem("fecha", fecha);

      // Inicializar progreso
      const progresoInicial = {
        nivel1: false,
        nivel2: false,
        notas: []
      };

      localStorage.setItem("progreso", JSON.stringify(progresoInicial));

      alert("Registro exitoso");
      window.location.href = "index.html";
    });
  }

});

/* =========================
   INICIALIZACIÓN SEGURA
========================= */

// Si entra sin registrarse
if (!localStorage.getItem("usuario")) {
  localStorage.setItem("usuario", "Invitado");
}

// Si no existe progreso
if (!localStorage.getItem("progreso")) {
  localStorage.setItem("progreso", JSON.stringify({
    nivel1: false,
    nivel2: false,
    notas: []
  }));
}

/* =========================
   FUNCIONES DE APOYO
========================= */

// Mostrar nombre del usuario
function mostrarUsuario() {
  const nombre = localStorage.getItem("usuario");
  const elemento = document.getElementById("nombreUsuario");

  if (elemento && nombre) {
    elemento.textContent = "👤 " + nombre;
  }
}

// Verificar acceso a niveles
function verificarAccesoNivel(nivel) {
  const progreso = JSON.parse(localStorage.getItem("progreso"));

  if (!progreso) {
    alert("Debes registrarte primero");
    window.location.href = "registro.html";
    return;
  }

  if (nivel === 1) {
    window.location.href = "nivel1.html";
  }

  if (nivel === 2 && !progreso.nivel1) {
    alert("Primero debes completar el Nivel 1");
  } else if (nivel === 2) {
    window.location.href = "nivel2.html";
  }
}

// Cerrar sesión
function cerrarSesion() {
  localStorage.clear();
  window.location.href = "index.html";
}
