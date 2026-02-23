import { auth } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navUser = document.getElementById("nav-user");

  onAuthStateChanged(auth, (user) => {
    if (user && navUser) {
      navUser.innerHTML = `
        <div class="nav-user">
          <img src="${user.photoURL || '../imagenes/avatar.png'}" class="nav-avatar">
          <span>${user.displayName || "Usuario"}</span>
          <button id="logout">Salir</button>
        </div>
      `;

      document.getElementById("logout").onclick = () => {
        signOut(auth).then(() => {
          window.location.href = "index.html";
        });
      };
    }
  });
});
