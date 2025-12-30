// --- VERIFICACIÓN DE SESIÓN ---
// Esto se ejecuta inmediatamente al cargar el script, antes que el DOMContentLoaded.
// Si el usuario no está logueado, se redirige a la página de login.
(function() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
        window.location.href = "login.html";
    }
})();

// Este código se ejecuta una vez que todo el HTML de la página ha sido cargado.
document.addEventListener("DOMContentLoaded", () => {

    // --- VARIABLES GLOBALES ---
    let personas = JSON.parse(localStorage.getItem("personas")) || [];
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let editIndex = null;
    let editUserIndex = null;
    const userRole = localStorage.getItem("userRole"); // Obtenemos el rol del usuario: 'admin' o 'user'

    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    // Referencias para el CRUD de Miembros
    const form = document.getElementById("form");
    const tabla = document.getElementById("tabla");
    const inputBuscar = document.getElementById("buscar");
    const btnBuscar = document.getElementById("btn");

    // Referencias para el CRUD de Usuarios
    const userForm = document.getElementById("user-form");
    const userTabla = document.getElementById("user-tabla");

    // Referencias para la Navbar
    const userWelcome = document.getElementById("user-welcome");
    const logoutBtn = document.getElementById("logout-btn");

    // --- LÓGICA DE ROLES ---
    // Si el usuario no es 'admin', ocultamos todos los elementos que requieren privilegios.
    if (userRole !== "admin") {
        const adminElements = document.querySelectorAll(".admin-only");
        adminElements.forEach(el => el.style.display = "none");
    }

    // --- LÓGICA DE SESIÓN (Navbar) ---
    // Mostramos el mensaje de bienvenida y configuramos el botón de cerrar sesión.
    if (userWelcome) {
        userWelcome.textContent = `Hola, ${localStorage.getItem("currentUser")}`;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userRole");
            window.location.href = "login.html";
        });
    }
    
    // --- LÓGICA DE NAVEGACIÓN (Navbar) ---
    function mostrarSeccion(id) {
        document.querySelectorAll(".section").forEach(sec => sec.classList.add("oculto"));
        document.getElementById(id).classList.remove("oculto");
    }

    window.irCRUD = () => mostrarSeccion("crud");
    window.volver = () => mostrarSeccion("home");

    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("href").substring(1);
            mostrarSeccion(id);
        });
    });

    // =====================================================
    // LÓGICA PARA MIEMBROS (EXISTENTE)
    // =====================================================
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (userRole !== "admin") {
            alert("No tienes permisos para realizar esta acción.");
            return;
        }

        const nombre = document.getElementById("nombre").value;
        const bau = document.getElementById("bau").value;
        const edad = document.getElementById("edad").value;

        if (nombre.trim() === "" || bau.trim() === "" || edad <= 0) {
            alert("Por favor, completa todos los campos correctamente.");
            return;
        }

        if (editIndex === null) {
            personas.push({ nombre, bau, edad });
        } else {
            personas[editIndex] = { nombre, bau, edad };
            editIndex = null;
            form.querySelector("button[type='submit']").textContent = "Guardar";
        }

        localStorage.setItem("personas", JSON.stringify(personas));
        form.reset();
        mostrar();
    });

    function mostrar(filtro = "") {
        tabla.innerHTML = "";
        const personasFiltradas = personas.filter(p => 
            p.nombre.toLowerCase().includes(filtro) || 
            p.bau.toLowerCase().includes(filtro)
        );

        if (personasFiltradas.length === 0 && filtro !== "") {
            const colspan = userRole === "admin" ? "4" : "3";
            tabla.innerHTML = `<tr><td colspan="${colspan}">No se encontraron resultados</td></tr>`;
            return;
        }

        personasFiltradas.forEach((p, index) => {
            const accionesHTML = userRole === "admin" ? `
                <td class="admin-only">
                    <button class="editar" onclick="editar(${index})">Editar</button>
                    <button class="eliminar" onclick="eliminar(${index})">Eliminar</button>
                </td>
            ` : "";

            tabla.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.bau}</td>
                    <td>${p.edad}</td>
                    ${accionesHTML}
                </tr>
            `;
        });
    }

    window.editar = (index) => {
        if (userRole !== "admin") { alert("No tienes permisos para editar."); return; }
        const persona = personas[index];
        document.getElementById("nombre").value = persona.nombre;
        document.getElementById("bau").value = persona.bau;
        document.getElementById("edad").value = persona.edad;
        editIndex = index;
        form.querySelector("button[type='submit']").textContent = "Actualizar";
    };

    window.eliminar = (index) => {
        if (userRole !== "admin") { alert("No tienes permisos para eliminar."); return; }
        if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
            personas.splice(index, 1);
            localStorage.setItem("personas", JSON.stringify(personas));
            mostrar();
        }
    };

    inputBuscar.addEventListener("input", (e) => mostrar(e.target.value.toLowerCase()));
    btnBuscar.addEventListener("click", () => mostrar(inputBuscar.value.toLowerCase()));

    // =====================================================
    // LÓGICA PARA USUARIOS (NUEVO)
    // =====================================================
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("user-username").value.trim();
        const password = document.getElementById("user-password").value;
        const role = document.getElementById("user-role").value;

        if (!username || !password || !role) {
            alert("Por favor, completa todos los campos para el usuario.");
            return;
        }
        
        // Comprobar si el usuario ya existe (solo para nuevos usuarios)
        if (editUserIndex === null && usuarios.some(u => u.username.toLowerCase() === username.toLowerCase())) {
            alert("El nombre de usuario ya está en uso.");
            return;
        }

        if (editUserIndex === null) {
            usuarios.push({ username, password, role });
        } else {
            usuarios[editUserIndex] = { username, password, role };
            editUserIndex = null;
            userForm.querySelector("button[type='submit']").textContent = "Guardar Usuario";
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        userForm.reset();
        mostrarUsuarios();
    });

    function mostrarUsuarios() {
        userTabla.innerHTML = "";
        if (usuarios.length === 0) {
            userTabla.innerHTML = `<tr><td colspan="3">No hay usuarios registrados.</td></tr>`;
            return;
        }

        usuarios.forEach((u, index) => {
            userTabla.innerHTML += `
                <tr>
                    <td>${u.username}</td>
                    <td><span class="role-badge ${u.role}">${u.role === 'admin' ? 'Administrador' : 'Usuario'}</span></td>
                    <td>
                        <button class="editar" onclick="editarUsuario(${index})">Editar</button>
                        <button class="eliminar" onclick="eliminarUsuario(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    window.editarUsuario = (index) => {
        const usuario = usuarios[index];
        document.getElementById("user-username").value = usuario.username;
        document.getElementById("user-password").value = usuario.password;
        document.getElementById("user-role").value = usuario.role;
        editUserIndex = index;
        userForm.querySelector("button[type='submit']").textContent = "Actualizar Usuario";
    };

    window.eliminarUsuario = (index) => {
        const usuarioAEliminar = usuarios[index];
        
        // Prevenir que el usuario se elimine a sí mismo
        if (usuarioAEliminar.username === localStorage.getItem("currentUser")) {
            alert("No puedes eliminar tu propio usuario mientras estás logueado.");
            return;
        }

        if (confirm(`¿Estás seguro de que quieres eliminar al usuario "${usuarioAEliminar.username}"?`)) {
            usuarios.splice(index, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            mostrarUsuarios();
        }
    };

    // =====================================================
    // INICIALIZACIÓN
    // =====================================================
    mostrar(); // Carga la tabla de miembros
    mostrarUsuarios(); // Carga la tabla de usuarios

}); // Fin del DOMContentLoaded