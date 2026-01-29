const notas = [8, 9, 7, 10, 8, 9]; // ejemplo
const nombre = "Estudiante";

document.getElementById("nombre-usuario").textContent = nombre;

let suma = 0;

notas.forEach((nota, i) => {
    document.getElementById(`nota-nivel${i + 1}`).textContent = nota;
    document.getElementById(`bar${i + 1}`).style.width = (nota * 10) + "%";
    suma += nota;
});

document.getElementById("promedio-final").textContent = (suma / notas.length).toFixed(1);