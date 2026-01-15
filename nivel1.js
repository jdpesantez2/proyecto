const preguntas = [
  {
    texto: "¿Para qué sirve Let’s Code?",
    opciones: [
      "Para diseñar páginas web profesionales",
      "Para aprender a programar de manera práctica y sencilla",
      "Para crear videos educativos",
      "Para escribir código avanzado en texto"
    ],
    correcta: 1
  },
  {
    texto: "¿A quién está dirigido Let’s Code?",
    opciones: [
      "Programadores expertos",
      "Docentes universitarios",
      "Estudiantes que dan sus primeros pasos en programación",
      "Diseñadores gráficos"
    ],
    correcta: 2
  },
  {
    texto: "¿Cómo se crean los programas en Let’s Code?",
    opciones: [
      "Escribiendo código complicado",
      "Usando comandos en inglés",
      "Utilizando bloques que representan instrucciones",
      "Copiando programas de internet"
    ],
    correcta: 2
  }
];

let indicePregunta = 0;
let puntaje = 0;

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");

// Mostrar pregunta
function mostrarPregunta() {
  const preguntaActual = preguntas[indicePregunta];
  preguntaElemento.textContent = preguntaActual.texto;
  opcionesElemento.innerHTML = "";

  preguntaActual.opciones.forEach((opcion, index) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;

    boton.onclick = () => seleccionarRespuesta(boton, index);
    opcionesElemento.appendChild(boton);
  });
}

// Seleccionar respuesta
function seleccionarRespuesta(botonSeleccionado, indiceSeleccionado) {
  const correcta = preguntas[indicePregunta].correcta;
  const botones = document.querySelectorAll(".opciones button");

  botones.forEach((boton, index) => {
    if (index === correcta) {
      boton.classList.add("correcto");
    } else if (boton === botonSeleccionado) {
      boton.classList.add("incorrecto");
    }
    boton.disabled = true;
  });

  if (indiceSeleccionado === correcta) {
    puntaje++;
  }

  setTimeout(() => {
    indicePregunta++;
    if (indicePregunta < preguntas.length) {
      mostrarPregunta();
    } else {
      mostrarResultado();
    }
  }, 1200);
}

// Mostrar resultado final
function mostrarResultado() {
  const notaFinal = Math.round((puntaje / preguntas.length) * 10);

  // Guardar progreso
  let progreso = JSON.parse(localStorage.getItem("progreso"));
  progreso.nivel1 = true;
  progreso.notas.push(notaFinal);
  localStorage.setItem("progreso", JSON.stringify(progreso));

  preguntaElemento.textContent = "🎉 Nivel completado 🎉";
  opcionesElemento.innerHTML = `
    <p style="
      color:white;
      font-size:22px;
      text-align:center;
      margin-top:20px;
    ">
      Tu nota es <strong>${notaFinal}/10</strong>
    </p>
    <button onclick="window.location.href='niveles.html'"
      style="
        margin-top:30px;
        padding:15px;
        border:none;
        border-radius:15px;
        font-size:18px;
        cursor:pointer;
        background:linear-gradient(135deg,#6f6cff,#5ad7ff);
        color:white;
      ">
      Volver a niveles
    </button>
  `;
}

// Iniciar
mostrarPregunta();
