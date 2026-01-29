let current = 0;
let score = 0;

const quiz = document.getElementById("question-area");
const instruction = document.getElementById("instruction");
const result = document.getElementById("result");

/* ================= PREGUNTAS ================= */

const questions = [

/* ===== SELECT TEXTO (3) ===== */

{
  type: "select",
  question: "De acuerdo con la imagen, ¿a qué tipo de bloque pertenece?",
  image: "../imagenes/mov.jpeg",
  options: ["Motion", "Looks", "Sound", "Events"],
  answer: "Motion"
},
{
  type: "select",
  question: "Observa la imagen y selecciona el tipo de bloque correcto.",
  image: "../imagenes/looks.jpeg",
  options: ["Sound", "Looks", "Events", "Motion"],
  answer: "Looks"
},
{
  type: "select",
  question: "¿A qué tipo de bloque pertenece la siguiente imagen?",
  image: "../imagenes/sonido.jpeg",
  options: ["Events", "Motion", "Sound", "Looks"],
  answer: "Sound"
},

/* ===== IMAGE SELECT (3) ===== */

{
  type: "image-select",
  question: "¿Cuál imagen corresponde al bloque de Apariencia (Looks)?",
  options: [
    { img: "../imagenes/looks1.jpeg", value: "Looks" },
    { img: "../imagenes/2.jpeg", value: "Motion" },
    { img: "../imagenes/3.jpeg", value: "Sound" },
    { img: "../imagenes/5.jpeg", value: "Events" }
  ],
  answer: "Looks"
},
{
  type: "image-select",
  question: "Selecciona la imagen que representa un bloque de Movimiento (Motion).",
  options: [
    { img: "../imagenes/mov.jpeg", value: "Motion" },
    { img: "../imagenes/6.jpeg", value: "Looks" },
    { img: "../imagenes/7.jpeg", value: "Events" },
    { img: "../imagenes/8.jpeg", value: "Sound" }
  ],
  answer: "Motion"
},
{
  type: "image-select",
  question: "¿Qué imagen representa un bloque de Eventos (Events)?",
  options: [
    { img: "../imagenes/even.jpeg", value: "Events" },
    { img: "../imagenes/9.jpeg", value: "Sound" },
    { img: "../imagenes/10.jpeg", value: "Motion" },
    { img: "../imagenes/11.jpeg", value: "Looks" }
  ],
  answer: "Events"
},

/* ===== DRAG (2) ===== */

{
  type: "drag",
  question: "Arrastra el nombre correcto del bloque hacia el espacio en blanco.",
  image: "../imagenes/10.jpeg",
  words: ["Motion", "Looks", "Sound", "Events"],
  answer: "Events"
},
{
  type: "drag",
  question: "Identifica correctamente el tipo de bloque mostrado en la imagen.",
  image: "../imagenes/sonido.jpeg",
  words: ["Sound", "Motion", "Looks", "Events"],
  answer: "Sound"
},

/* ===== MATCH (2) ===== */

{
  type: "match",
  question: "Une cada imagen con el tipo de bloque correspondiente.",
  pairs: [
    { img: "../imagenes/mov1.jpeg", answer: "Motion" },
    { img: "../imagenes/looks2.jpeg", answer: "Looks" },
    { img: "../imagenes/even.jpeg", answer: "Sound" }
  ],
  words: ["Motion", "Looks", "Sound"]
},
{
  type: "match",
  question: "Relaciona correctamente cada imagen con su tipo de bloque.",
  pairs: [
    { img: "../imagenes/6.jpeg", answer: "Events" },
    { img: "../imagenes/mov3.jpeg", answer: "Motion" },
    { img: "../imagenes/looks2.jpeg", answer: "Looks" }
  ],
  words: ["Events", "Motion", "Looks"]
}

];

/* ================= CARGA CON TRANSICIÓN ================= */

loadQuestion();

function loadQuestion() {
  quiz.classList.remove("fade-in");
  quiz.classList.add("fade-out");

  setTimeout(() => {
    quiz.innerHTML = "";
    result.innerHTML = "";

    const q = questions[current];
    instruction.textContent = q.question;

    if (q.type === "select") renderSelect(q);
    if (q.type === "image-select") renderImageSelect(q);
    if (q.type === "drag") renderDrag(q);
    if (q.type === "match") renderMatch(q);

    quiz.classList.remove("fade-out");
    quiz.classList.add("fade-in");
  }, 400);
}

/* ================= SELECT TEXTO ================= */

function renderSelect(q) {
  quiz.innerHTML = `
    <div class="image-box"><img src="${q.image}"></div>
    <div class="options vertical"></div>
  `;

  const options = quiz.querySelector(".options");

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => validate(btn, opt === q.answer);
    options.appendChild(btn);
  });
}

/* ================= IMAGE SELECT ================= */

function renderImageSelect(q) {
  const grid = document.createElement("div");
  grid.className = "image-grid";

  q.options.forEach(opt => {
    const box = document.createElement("div");
    box.className = "image-box option";
    box.innerHTML = `<img src="${opt.img}">`;
    box.onclick = () => validate(box, opt.value === q.answer);
    grid.appendChild(box);
  });

  quiz.appendChild(grid);
}

/* ================= DRAG ================= */

function renderDrag(q) {
  quiz.innerHTML = `
    <div class="image-box"><img src="${q.image}"></div>
    <div class="drop-zone" data-answer="${q.answer}">Arrastra aquí</div>
    <div class="drag-options"></div>
  `;

  const options = quiz.querySelector(".drag-options");

  q.words.forEach(w => {
    const span = document.createElement("span");
    span.className = "drag-word";
    span.textContent = w;
    span.draggable = true;
    options.appendChild(span);
  });

  enableDrag();
}

/* ================= MATCH ================= */

function renderMatch(q) {
  const images = document.createElement("div");
  images.className = "match-images";

  q.pairs.forEach(p => {
    const zone = document.createElement("div");
    zone.className = "image-box drop-zone";
    zone.dataset.answer = p.answer;
    zone.innerHTML = `<img src="${p.img}">`;
    images.appendChild(zone);
  });

  quiz.appendChild(images);

  const options = document.createElement("div");
  options.className = "drag-options";

  q.words.forEach(w => {
    const span = document.createElement("span");
    span.className = "drag-word large";
    span.textContent = w;
    span.draggable = true;
    options.appendChild(span);
  });

  quiz.appendChild(options);
  enableDrag();
}

/* ================= DRAG LOGIC ================= */

function enableDrag() {
  document.querySelectorAll(".drag-word").forEach(word => {
    word.ondragstart = e => {
      e.dataTransfer.setData("text", word.textContent);
      word.classList.add("dragging");
    };
  });

  document.querySelectorAll(".drop-zone").forEach(zone => {
    zone.ondragover = e => e.preventDefault();

    zone.ondrop = e => {
      if (zone.classList.contains("answered")) return;

      const text = e.dataTransfer.getData("text");
      const dragged = document.querySelector(".dragging");

      zone.textContent = text;
      zone.classList.add("answered");

      if (text === zone.dataset.answer) {
        zone.classList.add("correct");
        score++;
      } else {
        zone.classList.add("incorrect");
      }

      // eliminar palabra usada
      if (dragged) dragged.remove();

      document.querySelectorAll(".drag-word").forEach(w => w.classList.remove("dragging"));

      if (
        document.querySelectorAll(".drop-zone.answered").length ===
        document.querySelectorAll(".drop-zone").length
      ) {
        setTimeout(next, 900);
      }
    };
  });
}

/* ================= VALIDACIÓN ================= */

function validate(el, ok) {
  document.querySelectorAll(".option").forEach(o => o.onclick = null);
  el.classList.add(ok ? "correct" : "incorrect");
  if (ok) score++;
  setTimeout(next, 900);
}

/* ================= CONTROL ================= */

function next() {
  current++;
  if (current < questions.length) loadQuestion();
  else showResult();
}

/* ================= RESULTADO ================= */

function showResult() {
  quiz.innerHTML = "";

  const total = questions.length;
  const nota = Math.round((score / total) * 10);
  const aprobado = nota >= 7;

  instruction.textContent = aprobado
    ? "¡Felicidades! Nivel superado 🎉"
    : "No alcanzaste la nota mínima 😕";

  result.innerHTML = `
    <div class="result-box">
      <h2>Resultado Final</h2>
      <p>Nota obtenida</p>
      <p><strong>${nota} / 10</strong></p>
      ${
        aprobado
          ? `<a href="../nivel3.html">Siguiente nivel</a>`
          : `<a href="nivel2.html">Repetir nivel</a>`
      }
    </div>
  `;
}
