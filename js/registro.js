
const inputRun = document.getElementById("input-run")
const inputNombre = document.getElementById("input-nombre")
const inputApellidos = document.getElementById("input-apellidos")
const inputEmail = document.getElementById("input-email")
const inputFecha = document.getElementById("input-fecha")
const selectRegion = document.getElementById("select-region")
const selectComuna = document.getElementById("select-comuna")
const inputDireccion = document.getElementById("input-direccion")
const inputPassword = document.getElementById("input-password")
const botonRegistro = document.getElementById("btn-registro")


const comunasPorRegion = {
    metropolitana: [
            "Santiago",
            "Providencia",
            "Maipu",
            "Pudahuel",
            "Ñuñoa"
        ],
    valparaiso: [
            "Valparaiso",
            "Viña del Mar",
            "Quilpue"
        ]
    }
    
selectRegion.addEventListener("change", function() {
    const regionSeleccionada = selectRegion.value
    selectComuna.innerHTML = '<option value="">Seleccione una comuna</option>'
    if (regionSeleccionada === "") {
        return
        }
    const comunas = comunasPorRegion[regionSeleccionada]
    comunas.forEach(function(comuna) {
            
        const option = document.createElement("option")
        option.value = comuna
        option.textContent = comuna
        selectComuna.appendChild(option)
        })
    })
   

botonRegistro.addEventListener("click", function() {

    const run = inputRun.value
    const nombre = inputNombre.value
    const apellidos = inputApellidos.value
    const email = inputEmail.value
    const fecha = inputFecha.value
    const region = selectRegion.value
    const comuna = selectComuna.value
    const direccion = inputDireccion.value
    const password = inputPassword.value

    if (run === "") {
        alert ("El RUN es de caracter obligatorio")
        return
    }
    if (run.includes(".") || run.includes("-")) {
        alert("Ingrese por favor el RUN sin puntos ni guion")
        return
    }
    if (run.length < 7 || run.length > 9) {
        alert("El RUN debe tener entre 7 y 9 caracteres")
        return
    }

    if (run === ""){
        alert("El RUN es de caracter obligatorio")
        return
    }
    if (nombre === ""){
        alert("El nombre es obligatorio")
        return
    }
    if (apellidos === ""){
        alert("Los apellidos son obligatorios")
        return
    }
    if (email === ""){
        alert("El correo es obligatorio")
        return
    }
    if (fecha === ""){
        alert("La fecha es obligatoria")
        return
    }
    if (region === ""){
        alert("La region es obligatoria")
        return
    }
    if (comuna === ""){
        alert("La comuna es obligatoria")
        return
    }
    if (direccion === ""){
        alert("La direccion es obligatoria")
        return
    }
    if (password === ""){
        alert("La contraseña es obligatoria")
        return
    }
    if (password.length < 4 || password.length > 10) {
        alert("La contraseña debe tener entre 4 y 10 caracteres")
        return
    }

    if (nombre.length > 50){
        alert("El nombre no puede superar los 50 caracteres")
        return
    }
    if (apellidos.length > 100){
        alert("Los apellidos no pueden tener mas de 100 caracteres")
        return
    }
    if (email.length > 100){
        alert("El correo no puede tener mas de 100 caracteres")
        return
    }
    if (direccion.length > 300){
        alert("La direccion no puede tener mas de 300 caracteres")
        return
    }

      /* aqui va la validacion de email */

    alert("Paciente registrado con éxito")

})