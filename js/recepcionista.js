

const rolUsuario = localStorage.getItem("rol_usuario")


if (rolUsuario != "recepcionista") {
    window.location = "../index.html"

}