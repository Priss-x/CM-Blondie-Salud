
const inputEmail = document.getElementById("input-email")

const inputPassword = document.getElementById("input-password")

const botonInicioSesion = document.getElementById("btn-inicio-sesion")

botonInicioSesion.addEventListener("click", function() {
    const email = inputEmail.value

    const password = inputPassword.value
    if (email === "admin@blondiesalud.cl" && password === "9999") {
        localStorage.setItem("rol_usuario", "admin")
        window.location = "admin/index.html"
    }
    else if (
        email === "recepcionista@blondiesalud.cl" && password === "9999") {
        localStorage.setItem("rol_usuario", "recepcionista")
        window.location = "admin/recepcionista.html"
    }
    else {
    alert("Correo o contraseña incorrectos")
    }

})