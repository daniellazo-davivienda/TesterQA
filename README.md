https://davi-uat-sv-rc.technisys.net/profiling-backoffice/login/login.htm
70000009
S3ptiembr325$
64261
8Ctub32025.$
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
/// css
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

///js
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
