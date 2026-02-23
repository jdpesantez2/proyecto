const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  window.location.href = "login.html";
}

// Mostrar nombre real
document.getElementById("nombre-usuario").textContent = usuario.nombre;

let sumaPromedios = 0;
let nivelesCompletados = 0;

for(let i = 1; i <= 6; i++){

  const nivel = usuario.progreso[`nivel${i}`];

  if(nivel.intentos > 0){

    // Obtener mejor nota del nivel
    const mejorNota = Math.max(...nivel.notas);

    document.getElementById(`nota-nivel${i}`).textContent = mejorNota;
    document.getElementById(`bar${i}`).style.width = (mejorNota * 10) + "%";

    sumaPromedios += mejorNota;
    nivelesCompletados++;

  } else {

    document.getElementById(`nota-nivel${i}`).textContent = "0";
    document.getElementById(`bar${i}`).style.width = "0%";
  }
}

// Calcular promedio real
let promedioFinal = 0;

if(nivelesCompletados > 0){
  promedioFinal = (sumaPromedios / nivelesCompletados).toFixed(1);
}

document.getElementById("promedio-final").textContent = promedioFinal;