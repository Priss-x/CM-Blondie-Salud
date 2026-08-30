
// Identificar el input de correo
const inputEmail = document.getElementById("input-email")


// Identificar el input de contraseña
const inputPassword = document.getElementById("input-password")


// Identificar el boton de inicio de sesion
const botonInicioSesion = document.getElementById("btn-inicio-sesion")


// Agregamos evento click al boton
botonInicioSesion.addEventListener("click", function() {

    // Obtener correo ingresado
    const email = inputEmail.value

    // Obtener contraseña ingresada
    const password = inputPassword.value


    // Usuario administrador
    if (email === "admin@centromedico.cl" && password === "1234") {
        localStorage.setItem("rol_usuario", "admin")
        window.location = "admin/index.html"
    }


    // Usuario recepcionista
    else if (
        email === "recepcionista@centromedico.cl" && password === "1234") {
        localStorage.setItem("rol_usuario", "recepcionista")
        window.location = "admin/recepcionista.html"
    }


    else {
    alert("Correo o contraseña incorrectos")
    }

})