let personas = JSON.parse(localStorage.getItem("personas")) || [];
let editIndex = null;

const form = document.getElementById("form");
const tabla = document.getElementById("tabla");

form.addEventListener("submit", e => {

    
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;

    ///Ciclo para evitar nombres vacios, edades incorrectas
if (nombre.trim() === "" || edad <= 0) {
    alert("Datos inválidos");
    return;
}
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

/// filtro de busqueda
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
const btn = document.getElementById("btn");

function editar(index) {
    document.getElementById("nombre").value = personas[index].nombre;
    document.getElementById("edad").value = personas[index].edad;
    editIndex = index;
    btn.textContent = "Actualizar";
}

///referencia navbar
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