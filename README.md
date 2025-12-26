https://davi-uat-sv-rc.technisys.net/profiling-backoffice/login/login.htm
70000009
S3ptiembr325$
64261
8Ctub32025.$
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
/// style css
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
///js

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
