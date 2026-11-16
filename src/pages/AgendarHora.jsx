
import { useState } from "react"
import { Navigate } from "react-router"

function AgendarHora() {
    const token = sessionStorage.getItem("token")
    const rolUsuario = localStorage.getItem("rol_usuario")
    const runPaciente = localStorage.getItem("paciente_actual")

    const [nombre, setNombre] = useState("")
    const [especialidad, setEspecialidad] = useState("")
    const [medico, setMedico] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [enviando, setEnviando] = useState(false)

    const medicos = {
        "Medicina General": [
            "Dr. Leorio Paladiknight",
            "Dr. Chanandler Bong"
        ],
        "Pediatría": [
            "Dra. Louise Ciccone",
            "Dr. Michael Myers"
        ],
        "Neurología": [
            "Dr. Thomas Wilis",
            "Dra. Rita Levi-Montalcini"
        ]
    }

    const horarios = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "14:00",
        "15:00",
        "16:00"
    ]

    const hoy = new Date()

    const fechaHoy =
        hoy.getFullYear() + "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoy.getDate()).padStart(2, "0")

    async function agendarHora(evento) {
        evento.preventDefault()
        setMensaje("")

        if (!runPaciente || !nombre.trim() || !especialidad || !medico || !fecha || !hora) { setMensaje("Debe completar todos los campos.")
            return}
        if (fecha < fechaHoy) {setMensaje("No puede agendar una fecha pasada.")
            return}
        const nuevaReserva = { run: runPaciente, nombre: nombre.trim(), especialidad, medico, fecha, hora}
        setEnviando(true)

        try {
            const respuesta = await fetch("http://localhost:3000/api/agendamientos/horas",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json",Authorization: `Bearer ${token}`},
                    body: JSON.stringify(nuevaReserva)
                }
            )

            const datos = await respuesta.json()

            if (!respuesta.ok) {setMensaje(  datos.mensaje || "No se pudo agendar la hora.")
                return
            }
            setMensaje(`¡Hora agendada correctamente! Número de orden: ${datos.reserva.numeroOrden}`)

            setNombre("")
            setEspecialidad("")
            setMedico("")
            setFecha("")
            setHora("")

        } catch (error) {
            setMensaje("Error de conexión con el servidor. Verifique que Express esté funcionando.")
        } finally {setEnviando(false)}
    }

    if (rolUsuario !== "paciente" || !token || !runPaciente) {return <Navigate to="/inicio-sesion" replace />}

    return (
        <main className="container my-5">
            <h1 className="text-center mb-3">Agendamiento de hora médica</h1>
            <p className="text-center mb-4">Complete sus datos para reservar una atención.</p>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">

                            <form onSubmit={agendarHora}>
                                <div className="mb-3">
                                    <label className="form-label">RUN</label>

                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={runPaciente}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nombre completo</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label"> Especialidad</label>

                                    <select
                                        className="form-select"
                                        value={especialidad}
                                        onChange={(e) => {setEspecialidad(e.target.value)
                                            setMedico("")}}
                                        required
                                    >
                                        <option value="">Seleccione especialidad </option>
                                        <option value="Medicina General"> Medicina General </option>
                                        <option value="Pediatría">Pediatría</option>
                                        <option value="Neurología">Neurología</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Médico</label>
                                    <select
                                        className="form-select"
                                        value={medico}
                                        onChange={(e) =>setMedico(e.target.value)}
                                        disabled={!especialidad}
                                        required
                                    >
                                        <option value="">Seleccione médico</option>

                                        {especialidad &&
                                            medicos[especialidad].map(
                                                (doctor) => (
                                                    <option
                                                        key={doctor}
                                                        value={doctor}
                                                    >
                                                        {doctor}
                                                    </option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        min={fechaHoy}
                                        value={fecha}
                                        onChange={(e) =>
                                            setFecha(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Hora</label>
                                    <select
                                        className="form-select"
                                        value={hora}
                                        onChange={(e) =>
                                            setHora(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">Seleccione hora</option>
                                        {horarios.map((horario) => (
                                            <option
                                                key={horario}
                                                value={horario}
                                            >
                                                {horario}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                    disabled={enviando}
                                >
                                    {enviando
                                        ? "Agendando..."
                                        : "Agendar hora"
                                    }
                                </button>

                                {mensaje && (
                                    <div className="alert alert-info mt-3">
                                        {mensaje}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AgendarHora
