
const API_URL = "http://localhost:3000/api/pacientes"

function obtenerToken() {return sessionStorage.getItem("token")}

export async function obtenerPacientes() {
    const respuesta = await fetch(API_URL, {
        headers: {Authorization: `Bearer ${obtenerToken()}`}
    })
    if (!respuesta.ok) {throw new Error("Error al obtener pacientes")}
    return await respuesta.json()
}

export async function crearPaciente(paciente) {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(paciente)
    })

    return respuesta.ok
}
export async function actualizarPaciente(run, datosNuevos) {
    const respuesta = await fetch(`${API_URL}/${encodeURIComponent(run)}`,
        {method: "PUT", headers: {"Content-Type": "application/json", Authorization: `Bearer ${obtenerToken()}`},body: JSON.stringify(datosNuevos)}
    )
    return respuesta.ok
}
export async function eliminarPaciente(run) {
    const respuesta = await fetch(
        `${API_URL}/${encodeURIComponent(run)}`,
        {method: "DELETE",headers: {Authorization: `Bearer ${obtenerToken()}`}}
    )
    return respuesta.ok
}
