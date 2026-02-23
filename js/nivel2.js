const usuario = JSON.parse(localStorage.getItem("usuario"));

let current = 0;
let puntaje = 0;

const preguntas = [
  {
    texto: "¿El bloque 'avanzar 10 pasos' a qué tipo pertenece?",
    opciones: ["Movimiento", "Apariencia", "Operadores", "Sonido"],
    correcta: 0,
    feedback: "El bloque 'avanzar 10 pasos' pertenece a Movimiento porque controla el desplazamiento del objeto."
  },
  {
    texto: "¿Qué tipo de bloque cambia el disfraz del personaje?",
    opciones: ["Movimiento", "Apariencia", "Sensores", "Operadores"],
    correcta: 1,
    feedback: "Los bloques de Apariencia permiten cambiar el disfraz, tamaño o efectos visuales."
  },
  {
    texto: "¿Qué bloque permite reproducir un sonido?",
    opciones: ["Sonido", "Movimiento", "Control", "Operadores"],
    correcta: 0,
    feedback: "El bloque Sonido se utiliza para reproducir música o efectos de audio."
  },
  {
    texto: "¿A qué tipo pertenece 'sumar 5 + 3'?",
    opciones: ["Movimiento", "Operadores", "Apariencia", "Sensores"],
    correcta: 1,
    feedback: "Pertenece a Operadores porque realiza cálculos matemáticos."
  },
  {
    texto: "¿Qué bloque permite repetir acciones?",
    opciones: ["Control", "Sonido", "Movimiento", "Sensores"],
    correcta: 0,
    feedback: "Los bloques de Control permiten repetir acciones y crear bucles."
  },
  {
    texto: "¿Qué bloque detecta si el mouse está encima?",
    opciones: ["Sensores", "Apariencia", "Movimiento", "Operadores"],
    correcta: 0,
    feedback: "Los bloques Sensores permiten detectar acciones o eventos externos."
  },
  {
    texto: "¿Qué tipo de bloque corresponde al color azul?",
    opciones: ["Movimiento", "Apariencia", "Operadores", "Sensores"],
    correcta: 0,
    feedback: "El color azul representa los bloques de Movimiento."
  },
  {
    texto: "¿Qué tipo de bloque corresponde al color morado?",
    opciones: ["Movimiento", "Apariencia", "Operadores", "Sensores"],
    correcta: 1,
    feedback: "El color morado representa los bloques de Apariencia."
  }
];

const contenedor = document.getElementById("preguntas");
const nextBtn = document.getElementById("nextbtn");

function cargarPregunta() {

  nextBtn.style.display = "none";
  contenedor.innerHTML = "";

  const p = preguntas[current];

  const div = document.createElement("div");
  div.className = "pregunta";

  div.innerHTML = `<h3>${current + 1}. ${p.texto}</h3>`;

  const opcionesDiv = document.createElement("div");
  opcionesDiv.className = "opciones-columna";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.className = "feedback";

  p.opciones.forEach((op, index) => {

    const btn = document.createElement("div");
    btn.className = "opcion";
    btn.textContent = op;

    btn.onclick = () => {

      const botones = opcionesDiv.querySelectorAll(".opcion");
      botones.forEach(b => b.style.pointerEvents = "none");

      if (index === p.correcta) {

        btn.classList.add("correcta");
        puntaje++;

        feedbackDiv.className = "feedback correcto";
        feedbackDiv.innerHTML = `
          <strong>Respuesta correcta</strong><br>
          ${p.feedback}
        `;

      } else {

        btn.classList.add("incorrecta");
        botones[p.correcta].classList.add("correcta");

        feedbackDiv.className = "feedback incorrecto";
        feedbackDiv.innerHTML = `
          <strong>Respuesta incorrecta</strong><br>
          ${p.feedback}
        `;
      }

      feedbackDiv.style.display = "block";
      nextBtn.style.display = "block";
    };

    opcionesDiv.appendChild(btn);
  });

  div.appendChild(opcionesDiv);
  div.appendChild(feedbackDiv);
  contenedor.appendChild(div);
}

nextBtn.onclick = () => {
  current++;

  if (current < preguntas.length) {
    cargarPregunta();
  } else {
    mostrarResultado();
  }
};

function mostrarResultado() {

  const nota = Math.round((puntaje / preguntas.length) * 10);

  document.body.innerHTML = `
    <div class="resultado-final">
      <div class="resultado-box">
        <h2 style="color:#00f7ff">
          ${usuario?.nombre || ""}<br><br>
          Puntaje final: <strong>${nota}/10</strong>
        </h2>

        <p style="margin-top:10px">
          ${nota >= 7 ? "¡Felicidades! Pasaste al siguiente nivel." : "Debes repetir el nivel."}
        </p>

        <div style="margin-top:30px">
          <a href="niveles.html" class="btn-volver-niveles">
            Volver a niveles
          </a>
          ${
            nota >= 7
            ? `<a href="nivel3.html" class="btn-volver-niveles">Siguiente nivel</a>`
            : `<a href="nivel2.html" class="btn-volver-niveles">Repetir nivel</a>`
          }
        </div>
      </div>
    </div>
  `;
}

cargarPregunta();

function guardarResultado(nivel, nota){

  let usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if(!usuario) return;

  usuario.progreso[nivel].intentos += 1;
  usuario.progreso[nivel].notas.push(nota);

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}
guardarResultado("nivel2", 8); // ejemplo