
const CLAVE = "pacientes_registrados"

export function obtenerPacientes() {return JSON.parse(localStorage.getItem(CLAVE)) || []}

export function crearPaciente(paciente) {
    const pacientes = obtenerPacientes()
    const existe = pacientes.some((p) => p.run === paciente.run || p.email === paciente.email)

    if (existe) {return false}

    pacientes.push(paciente)
    localStorage.setItem(CLAVE, JSON.stringify(pacientes))
    return true
}


export function actualizarPaciente(run, datosNuevos) {
    const pacientes = obtenerPacientes()
    const indice = pacientes.findIndex((p) => p.run === run)

    if (indice === -1) {return false}

    pacientes[indice] = {
        ...pacientes[indice],
        ...datosNuevos,
        run: run
    }

    localStorage.setItem(CLAVE, JSON.stringify(pacientes))
    return true
}

export function eliminarPaciente(run) {
    const pacientes = obtenerPacientes()
    const nuevosPacientes = pacientes.filter((p) => p.run !== run)
    
    if (nuevosPacientes.length === pacientes.length) {
        return false
    }
    localStorage.setItem(CLAVE, JSON.stringify(nuevosPacientes))
    return true
}
