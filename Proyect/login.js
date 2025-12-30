document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Si no hay usuarios en localStorage, crear el usuario por defecto
    if (!localStorage.getItem("usuarios")) {
        const usuariosDefecto = [
            { username: "admin", password: "1234", role: "admin" }
        ];
        localStorage.setItem("usuarios", JSON.stringify(usuariosDefecto));
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        // Obtener usuarios desde localStorage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(u => u.username === username && u.password === password);

        if (usuarioEncontrado) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", username);
            localStorage.setItem("userRole", usuarioEncontrado.role);
            window.location.href = "index.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    });
});