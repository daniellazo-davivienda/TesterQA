https://davi-uat-sv-rc.technisys.net/profiling-backoffice/login/login.htm
70000009
S3ptiembr325$
64261
8Ctub32025.$


Frontend (HTML/CSS/JS).

HTML + CSS 🌐

Páginas web, portfolios, blogs.

TypeScript

Similar a JS, más ordenado.

Navegador (para probar web)


HTML + CSS 🌐
CRUD = Crear, Leer, Actualizar, Eliminar

🧠 Qué vamos a construir
Un CRUD de personas:

Agregar nombre y edad

Ver la lista

Editar

Eliminar
👉 Todo se guarda en LocalStorage (no se pierde al recargar)

📁 Estructura del proyecto
crud/
│── index.html
│── style.css
└── script.js
1️⃣ index.html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CRUD Básico</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>CRUD Personas</h1>

<form id="form">
    <input type="text" id="nombre" placeholder="Nombre" required>
    <input type="number" id="edad" placeholder="Edad" required>
    <button type="submit">Guardar</button>
</form>

<table>
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody id="tabla"></tbody>
</table>

<script src="script.js"></script>
</body>
</html>
2️⃣ style.css
body {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f4f4f4;
}

h1 {
    text-align: center;
}

form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
}

input, button {
    padding: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: white;
}

th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
}

button.editar {
    background: orange;
    color: white;
}

button.eliminar {
    background: red;
    color: white;
}
3️⃣ script.js
let personas = JSON.parse(localStorage.getItem("personas")) || [];
let editIndex = null;

const form = document.getElementById("form");
const tabla = document.getElementById("tabla");

form.addEventListener("submit", e => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    if (editIndex === null) {
        personas.push({ nombre, edad });
    } else {
        personas[editIndex] = { nombre, edad };
        editIndex = null;
    }

    localStorage.setItem("personas", JSON.stringify(personas));
    form.reset();
    mostrar();
});

function mostrar() {
    tabla.innerHTML = "";

    personas.forEach((p, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.edad}</td>
                <td>
                    <button class="editar" onclick="editar(${index})">Editar</button>
                    <button class="eliminar" onclick="eliminar(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editar(index) {
    document.getElementById("nombre").value = personas[index].nombre;
    document.getElementById("edad").value = personas[index].edad;
    editIndex = index;
}

function eliminar(index) {
    personas.splice(index, 1);
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrar();
}

mostrar();
✅ Qué aprendiste aquí
✔ Crear datos
✔ Mostrar datos
✔ Editar datos
✔ Eliminar datos
✔ Usar LocalStorage
✔ Conectar HTML + CSS + JS

🚀 Siguientes mejoras (si quieres)
Buscar personas 🔍

Validaciones más avanzadas

Estilos más modernos

CRUD de productos, notas o tareas

Pasarlo a Bootstrap

Si quieres, dime:
👉 qué nivel tienes
👉 qué tema te gusta (juegos, escuela, tienda, etc.)

y lo mejoramos paso a paso 💪

Dijiste:
Siguientes mejoras
ChatGPT dijo:
¡Genial! Vamos a mejorar tu CRUD paso a paso 💪
Te dejo mejoras útiles + código listo para que las agregues una por una.

✅ 1. BÚSQUEDA 🔍
HTML (debajo del título)
<input type="text" id="buscar" placeholder="Buscar por nombre">
JS
document.getElementById("buscar").addEventListener("input", e => {
    mostrar(e.target.value.toLowerCase());
});

function mostrar(filtro = "") {
    tabla.innerHTML = "";
    personas
        .filter(p => p.nombre.toLowerCase().includes(filtro))
        .forEach((p, index) => {
            tabla.innerHTML += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.edad}</td>
                    <td>
                        <button class="editar" onclick="editar(${index})">Editar</button>
                        <button class="eliminar" onclick="eliminar(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
}
✅ 2. VALIDACIONES ⚠️
Evita nombres vacíos o edades incorrectas.

if (nombre.trim() === "" || edad <= 0) {
    alert("Datos inválidos");
    return;
}
Ponlo antes de guardar en el submit.

✅ 3. CONFIRMAR ELIMINAR 🗑️
function eliminar(index) {
    if (!confirm("¿Seguro que quieres eliminar?")) return;

    personas.splice(index, 1);
    localStorage.setItem("personas", JSON.stringify(personas));
    mostrar();
}
✅ 4. BOTÓN CAMBIA TEXTO AL EDITAR ✏️
HTML
<button type="submit" id="btn">Guardar</button>
JS
const btn = document.getElementById("btn");

function editar(index) {
    document.getElementById("nombre").value = personas[index].nombre;
    document.getElementById("edad").value = personas[index].edad;
    editIndex = index;
    btn.textContent = "Actualizar";
}
Después de guardar:

btn.textContent = "Guardar";
✅ 5. ID ÚNICO (MEJOR PRÁCTICA)
En vez de usar índices:

personas.push({
    id: Date.now(),
    nombre,
    edad
});
Y elimina así:

personas = personas.filter(p => p.id !== id);
✅ 6. ESTILO MÁS MODERNO ✨
button {
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

input {
    border-radius: 5px;
    border: 1px solid #ccc;
}
🚀 SIGUIENTE NIVEL (elige uno)
1️⃣ CRUD de tareas escolares
2️⃣ CRUD tipo tienda (productos/precios)
3️⃣ Guardar en JSON descargable
4️⃣ Pasarlo a Bootstrap
5️⃣ Usar modal para editar

👉 Dime cuál quieres y lo hacemos completo paso a paso 😎

Dijiste:
Ayudame hacer un home con menu y opciones
ChatGPT dijo:
¡Vamos a hacerlo! 😄
Te ayudaré a crear un HOME con menú y opciones, usando HTML + CSS + JS, sencillo, moderno y perfecto para conectar luego tu CRUD.

🧠 Qué vamos a construir
Un Home (inicio) con:

Barra de navegación (menú)

Opciones (cards/botones)

Diseño responsive

Navegación entre secciones (sin backend)

📁 Estructura del proyecto
home/
│── index.html
│── style.css
└── script.js
1️⃣ index.html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<nav class="navbar">
    <h2 class="logo">Mi App</h2>
    <ul class="menu">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#crud">CRUD</a></li>
        <li><a href="#about">Acerca</a></li>
    </ul>
</nav>

<section id="home" class="section">
    <h1>Bienvenido 👋</h1>
    <p>Selecciona una opción</p>

    <div class="cards">
        <div class="card" onclick="irCRUD()">
            <h3>CRUD Personas</h3>
            <p>Gestionar datos</p>
        </div>

        <div class="card">
            <h3>Reportes</h3>
            <p>Ver estadísticas</p>
        </div>

        <div class="card">
            <h3>Configuración</h3>
            <p>Ajustes</p>
        </div>
    </div>
</section>

<section id="crud" class="section oculto">
    <h1>CRUD</h1>
    <p>Aquí va tu CRUD</p>
    <button onclick="volver()">Volver</button>
</section>

<section id="about" class="section oculto">
    <h1>Acerca de</h1>
    <p>Proyecto hecho con HTML, CSS y JS</p>
</section>

<script src="script.js"></script>
</body>
</html>
2️⃣ style.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background: #f2f2f2;
}

/* NAVBAR */
.navbar {
    background: #222;
    color: white;
    padding: 15px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.menu {
    list-style: none;
    display: flex;
    gap: 20px;
}

.menu a {
    color: white;
    text-decoration: none;
}

.menu a:hover {
    text-decoration: underline;
}

/* SECCIONES */
.section {
    padding: 40px;
    text-align: center;
}

.oculto {
    display: none;
}

/* CARDS */
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 30px;
}

.card {
    background: white;
    padding: 25px;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
    background: #eaeaea;
}
3️⃣ script.js
function mostrarSeccion(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.add("oculto");
    });

    document.getElementById(id).classList.remove("oculto");
}

function irCRUD() {
    mostrarSeccion("crud");
}

function volver() {
    mostrarSeccion("home");
}

/* Menú */
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const id = link.getAttribute("href").replace("#", "");
        mostrarSeccion(id);
    });
});
✅ Qué tienes ahora
✔ Home funcional
✔ Menú de navegación
✔ Opciones tipo dashboard
✔ Secciones ocultas/visibles
✔ Listo para integrar tu CRUD

🚀 Próximas mejoras
Animaciones suaves

Menú responsive (hamburguesa)

Iconos (Font Awesome)

Login simple

Conectar el CRUD real dentro del Home

👉 Dime:
1️⃣ ¿Quieres integrar el CRUD que ya hicimos?
2️⃣ ¿Quieres que el menú sea responsive?
3️⃣ ¿Quieres un diseño más “pro”?

Y lo seguimos mejorando paso a paso 😎


