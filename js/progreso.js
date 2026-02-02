// Datos de ejemplo
const notas = [8, 9, 7, 10, 8, 9];
const nombre = "Estudiante";

// Mostrar nombre
document.getElementById("nombre-usuario").textContent = nombre;

// Variables
let suma = 0;

// Recorrer notas y actualizar barras
notas.forEach((nota, i) => {
    document.getElementById(`nota-nivel${i + 1}`).textContent = nota;
    document.getElementById(`bar${i + 1}`).style.width = (nota * 10) + "%";
    suma += nota;

    // Guardar progreso solo si la nota >= 7
    if(nota >= 7) {
        localStorage.setItem(`nivel${i+1}`, nota);
    }
});

// Calcular promedio
const promedio = (suma / notas.length).toFixed(1);
document.getElementById("promedio-final").textContent = promedio;

// Guardar promedio final solo si >=7
if(promedio >= 7){
    localStorage.setItem("promedioFinal", promedio);
}
