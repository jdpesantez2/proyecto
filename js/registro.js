document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombres = document.getElementById("nombres").value;
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    if (!nombres || !usuario || !contrasena) {
        alert("Por favor complete todos los campos");
        return;
    }

    const usuarioData = {
        nombres,
        usuario,
        contrasena
    };

    // Guardar en localStorage (simulación real)
    localStorage.setItem("usuarioRegistrado", JSON.stringify(usuarioData));

    alert("Registro exitoso ✅");
    document.getElementById("registroForm").reset();
});

function volver() {
    // Cambia esto por tu página real
    window.location.href = "index.html";
}