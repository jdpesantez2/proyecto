const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  window.location.href = "login.html";
}

// ===== OBSERVADOR =====
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".animar").forEach(el => {
  observador.observe(el);
});

// ===== CARRUSEL =====
const track = document.querySelector(".carrusel-track");
const slides = document.querySelectorAll(".carrusel-track .bloque");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function actualizarCarrusel() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

next.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  actualizarCarrusel();
});

prev.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  actualizarCarrusel();
});