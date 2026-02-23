const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  window.location.href = "registro.html";
}

if (!usuario.progreso) {
  usuario.progreso = {
nivel1: { intentos: 0, notas: [], desbloqueado: true },
nivel2: { intentos: 0, notas: [], desbloqueado: false },
nivel3: { intentos: 0, notas: [], desbloqueado: false },
nivel4: { intentos: 0, notas: [], desbloqueado: false },
nivel5: { intentos: 0, notas: [], desbloqueado: false },
nivel6: { intentos: 0, notas: [], desbloqueado: false }
  };
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

document.addEventListener("DOMContentLoaded", () => {

  const nombre = usuario.nombre;

  const questions = [
  {
    q: "¿Para qué sirve LetsCode?",
    options: [
      "Para diseñar páginas web profesionales",
      "Para aprender a programar de manera práctica y sencilla",
      "Para crear videojuegos avanzados",
      "Para escribir código complejo"
    ],
    answer: 1,
    feedback: "LetsCode está diseñado para aprender programación de forma sencilla y visual."
  },
  {
    q: "¿A quién está dirigido principalmente LetsCode?",
    options: [
      "Programadores expertos",
      "Docentes universitarios",
      "Estudiantes que dan sus primeros pasos en programación",
      "Diseñadores gráficos"
    ],
    answer: 2,
    feedback: "Está enfocado en estudiantes principiantes."
  },
  {
    q: "¿Cómo se crean los programas en LetsCode?",
    options: [
      "Escribiendo código complicado",
      "Usando comandos en inglés",
      "Utilizando bloques que representan instrucciones",
      "Copiando programas de internet"
    ],
    answer: 2, // CORREGIDO
    feedback: "Se utilizan bloques visuales que representan instrucciones."
  },
  {
    q: "¿Qué ventaja ofrece LetsCode a los principiantes?",
    options: [
      "Uso de lenguajes avanzados",
      "Aprendizaje visual y sencillo",
      "Programación solo en texto",
      "Uso exclusivo para expertos"
    ],
    answer: 1,
    feedback: "Es visual y fácil de entender."
  },
  {
    q: "¿Qué evita LetsCode al usuario principiante?",
    options: [
      "Usar colores",
      "Aprender lógica",
      "Escribir código complicado desde el inicio",
      "Crear programas"
    ],
    answer: 2, // CORREGIDO
    feedback: "Evita que escriban código complejo al inicio."
  }
];

  let current = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const options = document.querySelectorAll(".option");
  const feedbackBox = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

  function loadQuestion() {

    questionEl.classList.remove("show");
    feedbackBox.classList.remove("show");
    feedbackBox.style.display = "none";
    nextBtn.style.display = "none";

    setTimeout(() => {
      questionEl.textContent = questions[current].q;
      questionEl.classList.add("fade-question", "show");

      options.forEach((btn, i) => {
        btn.textContent = questions[current].options[i];
        btn.className = "option";
        btn.disabled = false;
      });
    }, 200);
  }

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      selectAnswer(parseInt(btn.dataset.index));
    });
  });

  function selectAnswer(index) {

    options.forEach(btn => btn.disabled = true);

    const correctIndex = questions[current].answer;

    if (index === correctIndex) {
      options[index].classList.add("correct");
      score += 2;

      feedbackBox.className = "feedback-box feedback-correct";
      feedbackBox.innerHTML = `
        <strong>Respuesta correcta</strong><br>
        ${questions[current].feedback}
      `;
    } else {
      options[index].classList.add("incorrect");
      options[correctIndex].classList.add("correct");

      feedbackBox.className = "feedback-box feedback-incorrect";
      feedbackBox.innerHTML = `
        <strong>Respuesta incorrecta</strong><br>
        ${questions[current].feedback}
      `;
    }

    feedbackBox.style.display = "block";

    setTimeout(() => {
      feedbackBox.classList.add("show");
    }, 50);

    nextBtn.style.display = "inline-block";
  }

  nextBtn.addEventListener("click", () => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {

    const nota = score;
    const aprobado = nota >= 7;

usuario.progreso.nivel1.intentos += 1;
usuario.progreso.nivel1.notas.push(nota);

localStorage.setItem("usuarioActivo", JSON.stringify(usuario));


    document.querySelector(".quiz-container").innerHTML = `
      <h2 style="color:#00e5ff;text-align:center">
        ${nombre}<br><br>
        Puntaje final: <strong>${nota}/10</strong><br>
        Intentos: ${usuario.progreso.nivel1.intentos}
      </h2>

      <div style="text-align:center;margin-top:30px;display:flex;gap:20px;justify-content:center">

        <a href="niveles.html" class="btn-volver-niveles">
          Volver a niveles
        </a>

        ${
          aprobado
            ? `<a href="nivel2.html" class="btn-volver-niveles">
                Siguiente nivel
               </a>`
            : `<a href="nivel1.html" class="btn-volver-niveles">
                Repetir nivel
               </a>`
        }

      </div>
    `;
  }

  

  loadQuestion();
});

