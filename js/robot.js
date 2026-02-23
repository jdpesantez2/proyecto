const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuario) {
  window.location.href = "login.html";
}
document.querySelectorAll(".tarjeta").forEach(tarjeta=>{
  tarjeta.addEventListener("click", ()=>{
    tarjeta.classList.toggle("girar");
  });
});