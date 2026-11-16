
import { useState } from "react"
import { Navigate } from "react-router"

function AgendarExamen() {
    const token = sessionStorage.getItem("token")
    const rolUsuario = localStorage.getItem("rol_usuario")
    const runPaciente = localStorage.getItem("paciente_actual")

    const [nombre, setNombre] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [exito, setExito] = useState(false)
    const [enviando, setEnviando] = useState(false)

    const horarios = [
        "07:30", "08:00", "08:30",
        "09:00", "09:30", "10:00",
        "10:30", "11:00", "11:30"]

    const hoy = new Date()

    const fechaHoy =
        hoy.getFullYear() + "-" +
        String(hoy.getMonth() + 1).padStart(2, "0") + "-" +
        String(hoy.getDate()).padStart(2, "0")

    async function agendarExamen(evento) {
        evento.preventDefault()

        setMensaje("")
        setExito(false)

        if (!runPaciente || !nombre.trim() || !fecha || !hora) {setMensaje("Debe completar todos los campos.")
            return}
        if (fecha < fechaHoy) {setMensaje("No puede agendar una fecha pasada.")
            return}
        const nuevaReserva = {run: runPaciente, nombre: nombre.trim(), examen: "Toma de muestras", fecha, hora}
         
        setEnviando(true)

        try {
            const respuesta = await fetch("http://localhost:3000/api/agendamientos/examenes",
                {method: "POST", headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`}, body: JSON.stringify(nuevaReserva)})

            const datos = await respuesta.json()

            if (!respuesta.ok) {
                setMensaje(datos.mensaje || "No se pudo reservar la toma de muestras.")
                return
            }

            setMensaje(`¡Hora de toma de muestras agendada correctamente! Número de orden: ${datos.reserva.numeroOrden}`)

            setExito(true)

            setNombre("")
            setFecha("")
            setHora("")

        } catch (error) {
            setMensaje("Error de conexión con el servidor. Verifique que Express esté funcionando.")
        } finally {
            setEnviando(false)
        }
    }

    if (rolUsuario !== "paciente" || !token || !runPaciente) {
        return <Navigate to="/inicio-sesion" replace />
    }

    return (
        <main className="container my-5">
            <h1 className="text-center mb-3">Laboratorio Clínico </h1>
            <p className="text-center mb-4">Agenda tu hora para toma de muestras.</p>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h4 className="text-center mb-4">Reserva de toma de muestras</h4>

                            <form onSubmit={agendarExamen}>
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
                                        placeholder="Ingrese su nombre"
                                        value={nombre}
                                        onChange={(e) =>setNombre(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        min={fechaHoy}
                                        value={fecha}
                                        onChange={(e) =>
                                            setFecha(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Hora</label>

                                    <select
                                        className="form-select"
                                        value={hora}
                                        onChange={(e) => setHora(e.target.value)}
                                        required
                                    >
                                        <option value="">
                                            Seleccione hora
                                        </option>

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

                                <div className="alert alert-light border">
                                    <strong>
                                        Información importante:
                                    </strong>

                                    <p className="mb-0 mt-2">
                                        Recuerde traer su orden médica.
                                        Algunos exámenes requieren ayuno
                                        o preparación previa. Consulte las
                                        indicaciones antes de asistir.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                    disabled={enviando}
                                >
                                    {enviando
                                        ? "Reservando..."
                                        : "Reservar hora"
                                    }
                                </button>

                                {mensaje !== "" && (
                                    <div
                                        className={
                                            exito
                                                ? "alert alert-success mt-3"
                                                : "alert alert-danger mt-3"
                                        }
                                    >
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

export default AgendarExamen
