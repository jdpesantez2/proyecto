let currentQuestion = 1;
let score = 0;
const totalQuestions = 7;
const valuePerQuestion = 10 / totalQuestions;
let draggedText = "";

/* ================= DRAG (SIN TOCAR) ================= */
document.querySelectorAll(".drag-word").forEach(word => {
  word.addEventListener("dragstart", () => {
    draggedText = word.innerText;
  });
});

document.querySelectorAll(".drop-zone").forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", () => {
    zone.innerText = draggedText;
    zone.dataset.user = draggedText;
  });
});

document.getElementById("checkDrag").addEventListener("click", () => {
  let correctCount = 0;

  document.querySelectorAll(".drop-zone").forEach(zone => {
    if (zone.dataset.user === zone.dataset.answer) {
      zone.classList.add("correct");
      correctCount++;
    } else {
      zone.classList.add("incorrect");
    }
  });

  if (correctCount === 5) score += valuePerQuestion;

  setTimeout(() => {
    transitionNext();
  }, 1200);
});

/* ================= OPCIÓN MÚLTIPLE ================= */
document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", () => {
    const parent = option.closest(".question");
    const options = parent.querySelectorAll(".option");

    // bloquear clics
    options.forEach(o => o.classList.add("disabled"));

    if (option.dataset.correct === "true") {
      option.classList.add("correct");
      score += valuePerQuestion;
    } else {
      option.classList.add("incorrect");
      parent
        .querySelector('[data-correct="true"]')
        .classList.add("correct");
    }

    setTimeout(() => {
      transitionNext();
    }, 900);
  });
});


/* ================= TRANSICIÓN ================= */
function transitionNext() {
  const current = document.getElementById(`q${currentQuestion}`);
  current.classList.add("fade-out");

  setTimeout(() => {
    current.classList.remove("active", "fade-out");

    currentQuestion++;
    const next = document.getElementById(`q${currentQuestion}`);

    if (next) {
      next.classList.add("active", "fade-in");
    } else {
      showResult();
    }
  }, 400);
}

/* ================= RESULTADO FINAL ================= */
function showResult() {
  const result = document.getElementById("result");
  result.style.display = "block";

  const finalScore = score.toFixed(1);
  let mensaje = `Tu nota final es ${finalScore} / 10`;

  if (finalScore >= 7) {
    mensaje += "\n¡Aprobado! Pasas al siguiente nivel";
    // window.location.href = "nivel4.html"; // opcional
  } else {
    mensaje += "\nNo aprobaste. Intenta nuevamente";
    // window.location.reload(); // opcional
  }

  document.getElementById("score").innerText = mensaje;
}

function finalizarNivel(nivel, nota) {
  const progreso = JSON.parse(localStorage.getItem("progreso"));

  progreso.notas[nivel] = nota;

  if (nota >= 7 && progreso.nivelDesbloqueado === nivel) {
    progreso.nivelDesbloqueado++;
  }

  localStorage.setItem("progreso", JSON.stringify(progreso));

  document.body.innerHTML = `
    <div style="text-align:center; margin-top:100px; color:white">
      <h1>Nota: ${nota}/10</h1>
      <button onclick="location.href='niveles.html'">
        Volver a niveles
      </button>
    </div>
  `;
}
