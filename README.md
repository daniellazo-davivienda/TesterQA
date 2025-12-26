https://davi-uat-sv-rc.technisys.net/profiling-backoffice/login/login.htm
70000009
S3ptiembr325$
64261
8Ctub32025.$
set __COMPAT_LAYER=RunAsInvoker
Start winrar.exe
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>CRUD Simple</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            padding: 20px;
        }
        h1 {
            text-align: center;
        }
        form {
            background: white;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        input {
            padding: 8px;
            margin: 5px 0;
            width: 100%;
        }
        button {
            padding: 8px;
            margin-top: 10px;
            cursor: pointer;
        }
        table {
            width: 100%;
            background: white;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: center;
        }
        .edit {
            background: orange;
            color: white;
        }
        .delete {
            background: red;
            color: white;
        }
    </style>
</head>
<body>

<h1>CRUD con HTML, CSS y JavaScript</h1>

<form id="form">
    <input type="hidden" id="index">
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

<script>
    let datos = JSON.parse(localStorage.getItem("datos")) || [];

    const form = document.getElementById("form");
    const nombre = document.getElementById("nombre");
    const edad = document.getElementById("edad");
    const indexInput = document.getElementById("index");
    const tabla = document.getElementById("tabla");

    function mostrar() {
        tabla.innerHTML = "";
        datos.forEach((persona, index) => {
            tabla.innerHTML += `
                <tr>
                    <td>${persona.nombre}</td>
                    <td>${persona.edad}</td>
                    <td>
                        <button class="edit" onclick="editar(${index})">Editar</button>
                        <button class="delete" onclick="eliminar(${index})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();

        const persona = {
            nombre: nombre.value,
            edad: edad.value
        };

        if (indexInput.value === "") {
            datos.push(persona); // CREATE
        } else {
            datos[indexInput.value] = persona; // UPDATE
            indexInput.value = "";
        }

        localStorage.setItem("datos", JSON.stringify(datos));
        form.reset();
        mostrar();
    });

    function editar(index) {
        nombre.value = datos[index].nombre;
        edad.value = datos[index].edad;
        indexInput.value = index;
    }

    function eliminar(index) {
        if (confirm("¿Eliminar este registro?")) {
            datos.splice(index, 1); // DELETE
            localStorage.setItem("datos", JSON.stringify(datos));
            mostrar();
        }
    }

    mostrar(); // READ
</script>

</body>
</html>
