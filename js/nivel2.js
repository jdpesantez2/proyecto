const preguntas = [
  {
    texto: "¿El bloque 'avanzar 10 pasos' a qué tipo pertenece?",
    tipo: "columna",
    opciones: ["Movimiento", "Apariencia", "Operadores", "Sonido"],
    correcta: 0
  },
  {
    texto: "¿Qué tipo de bloque cambia el disfraz del personaje?",
    tipo: "columna",
    opciones: ["Movimiento", "Apariencia", "Sensores", "Operadores"],
    correcta: 1
  },
  {
    texto: "¿Qué bloque permite reproducir un sonido?",
    tipo: "columna",
    opciones: ["Sonido", "Movimiento", "Control", "Operadores"],
    correcta: 0
  },
  {
    texto: "¿A qué tipo pertenece 'sumar 5 + 3'?",
    tipo: "cuatro",
    opciones: ["Movimiento", "Operadores", "Apariencia", "Sensores"],
    correcta: 1
  },
  {
    texto: "¿Qué bloque permite repetir acciones?",
    tipo: "cuatro",
    opciones: ["Control", "Sonido", "Movimiento", "Sensores"],
    correcta: 0
  },
  {
    texto: "¿Qué bloque detecta si el mouse está encima?",
    tipo: "cuatro",
    opciones: ["Sensores", "Apariencia", "Movimiento", "Operadores"],
    correcta: 0
  },
  {
    texto: "¿Qué tipo de bloque corresponde al color AZUL?",
    tipo: "color",
    correcta: "Movimiento"
  },
  {
    texto: "¿Qué tipo de bloque corresponde al color MORADO?",
    tipo: "color",
    correcta: "Apariencia"
  }
];

let puntaje = 0;
const contenedor = document.getElementById("preguntas");

preguntas.forEach((p, i) => {
  const div = document.createElement("div");
  div.className = "pregunta";
  div.dataset.respondida = "false";
  div.innerHTML = `<h3>${i + 1}. ${p.texto}</h3>`;

  /* OPCIONES NORMALES */
  if (p.tipo === "columna" || p.tipo === "cuatro") {
    const opcionesDiv = document.createElement("div");
    opcionesDiv.className =
      p.tipo === "columna" ? "opciones-columna" : "opciones-cuatro";

    p.opciones.forEach((op, index) => {
      const btn = document.createElement("div");
      btn.className = "opcion";
      btn.textContent = op;

      btn.onclick = () => {
        if (div.dataset.respondida === "true") return;

        div.dataset.respondida = "true";

        const todas = opcionesDiv.querySelectorAll(".opcion");
        todas.forEach(o => o.style.pointerEvents = "none");

        if (index === p.correcta) {
          btn.classList.add("correcta");
          puntaje++;
        } else {
          btn.classList.add("incorrecta");
          todas[p.correcta].classList.add("correcta");
        }
      };

      opcionesDiv.appendChild(btn);
    });

    div.appendChild(opcionesDiv);
  }

  /* PREGUNTAS DE COLORES */
  if (p.tipo === "color") {
    const colores = document.createElement("div");
    colores.className = "colores";

    ["Movimiento", "Apariencia", "Operadores", "Sensores"].forEach(op => {
      const box = document.createElement("div");
      box.className = "color-box";
      box.textContent = op;

      box.onclick = () => {
        if (div.dataset.respondida === "true") return;

        div.dataset.respondida = "true";

        const todas = colores.querySelectorAll(".color-box");
        todas.forEach(c => c.style.pointerEvents = "none");

        if (op === p.correcta) {
          box.classList.add("correcta");
          puntaje++;
        } else {
          box.classList.add("incorrecta");
          todas.forEach(c => {
            if (c.textContent === p.correcta) {
              c.classList.add("correcta");
            }
          });
        }
      };

      colores.appendChild(box);
    });

    div.appendChild(colores);
  }

  contenedor.appendChild(div);
});

/* BOTÓN FINAL */
document.getElementById("finalizar").onclick = () => {
  mostrarModal();
};

/* MODAL FINAL */
function mostrarModal() {
  const modal = document.createElement("div");
  modal.className = "modal";

  const box = document.createElement("div");
  box.className = "modal-box";

  const aprobado = puntaje >= 7;

  box.innerHTML = `
    <h2>${aprobado ? "¡Felicidades!" : "Inténtalo otra vez"}</h2>
    <p>Tu nota es:</p>
    <h1>${puntaje}/10</h1>
    <p>${aprobado ? "Pasaste al siguiente nivel" : "Debes repetir el nivel"}</p>
    <button id="accionFinal">
      ${aprobado ? "Continuar" : "Volver a intentar"}
    </button>
  `;

  modal.appendChild(box);
  document.body.appendChild(modal);

  document.getElementById("accionFinal").onclick = () => {
    if (aprobado) {
      window.location.href = "niveles.html";
    } else {
      location.reload();
    }
  };
}
