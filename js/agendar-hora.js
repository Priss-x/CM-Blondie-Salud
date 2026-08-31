const inputRunPaciente = document.getElementById("input-run-paciente")
const inputNombrePaciente = document.getElementById("input-nombre-paciente")
const selectEspecialidad=document.getElementById("select-especialidad")
const selectMedico=document.getElementById("select-medico")
const inputFechaHora=document.getElementById("input-fecha-hora")
const selectHora=document.getElementById("select-hora")
const botonAgendar=document.getElementById("btn-agendar")

const medicosPorEspecialidad = {

    "medicina-general":[
        "Dr. Leorio Paladiknight",
        "Dr. Chanandler Bong"
    ],

    "pediatria":[
        "Dra. Louise Ciccone",
        "Dr. Michael Myers"
    ],
    "neurologia": [
        "Dr. Thomas Wilis",
        "Dra. Rita Levi-Montalcini"
    ]
}

selectEspecialidad.addEventListener("change", function() {
    const especialidadSeleccionada = selectEspecialidad.value

    selectMedico.innerHTML = '<option value="">Seleccione un medico</option>'

    if(especialidadSeleccionada === "") {
        return
    }
    const medicos = medicosPorEspecialidad[especialidadSeleccionada]

    medicos.forEach(function(medico) {
        const option = document.createElement("option")
        option.value = medico
        option.textContent = medico
        selectMedico.appendChild(option)
    })
})

botonAgendar.addEventListener("click", function() {
    const runPaciente = inputRunPaciente.value
    const nombrePaciente = inputNombrePaciente.value
    const especialidad = selectEspecialidad.value
    const medico = selectMedico.value
    const fecha = inputFechaHora.value
    const hora = selectHora.value
    
    if (runPaciente === "") {
        alert("Por favor ingrese el RUN del paciente")
        return
    }
    if (runPaciente.includes(".") || runPaciente.includes("-")) {
        alert("Ingrese por favor el RUN sin puntos ni guion")
        return
    }
    if (runPaciente.length < 7 || runPaciente.length > 9) {
        alert("El RUN debe tener entre 7 y 9 caracteres")
        return
    }
    if (nombrePaciente === "") {
        alert("Ingrese el nombre del paciente")
        return
    }
    if (especialidad ==="") {
        alert("Por favor seleccione una especialidad")
        return
    }
    if (medico === "") {
        alert("Por favor seleccione un medico")
        return
    }
    if (fecha === "") {
        alert("Por favor ingrese una fecha y hora")
        return
    }
    if (hora === "") {
        alert("Por favor ingrese una hora")
        return
    }

    alert("Hora médica agendada con éxito para:  " + nombrePaciente)
})
