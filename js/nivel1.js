document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!user) {
    window.location.href = "registro.html";
    return;
  }

  const nombre = user.nombres;

  const questions = [
    {
      q: "¿Para qué sirve Let’s Code?",
      options: [
        "Para diseñar páginas web profesionales",
        "Para aprender a programar de manera práctica y sencilla",
        "Para crear videojuegos avanzados",
        "Para escribir código complejo"
      ],
      answer: 1
    },
    {
      q: "¿A quién está dirigido principalmente Let’s Code?",
      options: [
        "Programadores expertos",
        "Docentes universitarios",
        "Estudiantes que dan sus primeros pasos en programación",
        "Diseñadores gráficos"
      ],
      answer: 2
    },
    {
      q: "¿Cómo se crean los programas en Let’s Code?",
      options: [
        "Escribiendo código complicado",
        "Usando comandos en inglés",
        "Utilizando bloques que representan instrucciones",
        "Copiando programas de internet"
      ],
      answer: 2
    },
    {
      q: "¿Qué ventaja ofrece Let’s Code a los principiantes?",
      options: [
        "Uso de lenguajes avanzados",
        "Aprendizaje visual y sencillo",
        "Programación solo en texto",
        "Uso exclusivo para expertos"
      ],
      answer: 1
    },
    {
      q: "¿Qué evita Let’s Code al usuario principiante?",
      options: [
        "Usar colores",
        "Aprender lógica",
        "Escribir código complicado desde el inicio",
        "Crear programas"
      ],
      answer: 2
    }
  ];

  let current = 0;
  let score = 0;

  const questionEl = document.getElementById("question");
  const options = document.querySelectorAll(".option");
  const container = document.querySelector(".quiz-container");

  function loadQuestion() {
    questionEl.textContent = questions[current].q;

    options.forEach((btn, i) => {
      btn.textContent = questions[current].options[i];
      btn.className = "option";
      btn.disabled = false;
    });
  }

  options.forEach(btn => {
    btn.addEventListener("click", () => {
      selectAnswer(parseInt(btn.dataset.index));
    });
  });

  function selectAnswer(index) {
    options.forEach(btn => btn.disabled = true);

    if (index === questions[current].answer) {
      options[index].classList.add("correct");
      score += 2; // 5 preguntas → 10 puntos
    } else {
      options[index].classList.add("incorrect");
      options[questions[current].answer].classList.add("correct");
    }

    setTimeout(() => {
      current++;
      if (current < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    }, 900);
  }

  function showResult() {
    const nota = score;
    const aprobado = nota >= 7;

    container.innerHTML = `
      <h2 style="color:#00e5ff;text-align:center">
        ${nombre}<br><br>
        Puntaje final: <strong>${nota}/10</strong>
      </h2>

      <div style="text-align:center;margin-top:30px">
        ${
          aprobado
            ? `<a href="nivel2.html" class="btn-volver-niveles">Siguiente nivel ➡</a>`
            : `<a href="nivel1.html" class="btn-volver-niveles">🔁 Repetir nivel</a>`
        }
      </div>
    `;
  }

  loadQuestion();

});
