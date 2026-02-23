// REGISTRAR
function registrar(){

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  if(!nombre || !correo || !clave){
    alert("Completa todos los campos");
    return;
  }

  const usuario = {
    nombre: nombre,
    correo: correo,
    clave: clave,
    progreso: {
      nivel1: { intentos: 0, notas: [] },
      nivel2: { intentos: 0, notas: [] },
      nivel3: { intentos: 0, notas: [] },
      nivel4: { intentos: 0, notas: [] },
      nivel5: { intentos: 0, notas: [] },
      nivel6: { intentos: 0, notas: [] }
    }
  };

  localStorage.setItem("usuarioRegistrado", JSON.stringify(usuario));
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

  alert("Registro exitoso");
  window.location.href = "niveles.html";
}


// LOGIN
function login(){

  const correo = document.getElementById("correo").value.trim();
  const clave = document.getElementById("clave").value.trim();

  const usuario = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if(!usuario){
    alert("No existe una cuenta registrada");
    return;
  }

  if(correo === usuario.correo && clave === usuario.clave){

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    alert("Bienvenido " + usuario.nombre);
    window.location.href = "niveles.html";

  } else{
    alert("Correo o contraseña incorrectos");
  }
}


// PROTEGER PÁGINAS
function verificarSesion(){
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
  if(!usuario){
    window.location.href = "login.html";
  }
}