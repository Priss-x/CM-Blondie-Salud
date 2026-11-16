
import { useEffect, useState } from "react"
import { Navigate } from "react-router"

function ReagendarHora() {
    const token = sessionStorage.getItem("token")
    const rolUsuario = localStorage.getItem("rol_usuario")
    const runPaciente = localStorage.getItem("paciente_actual")

    const [reservas, setReservas] = useState([])
    const [numeroOrden, setNumeroOrden] = useState("")
    const [fecha, setFecha] = useState("")
    const [hora, setHora] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [exito, setExito] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [enviando, setEnviando] = useState(false)

    const hoy = new Date()

    const fechaHoy =
        hoy.getFullYear() + "-" + String(hoy.getMonth() + 1).padStart(2, "0") + "-" + String(hoy.getDate()).padStart(2, "0")

    useEffect(() => {
        if (rolUsuario !== "paciente" || !token || !runPaciente) {setCargando(false)
            return
        }

        async function cargarReservas() {
            try {
                const respuesta = await fetch("http://localhost:3000/api/agendamientos/mis-reservas",
                    {headers: {Authorization: `Bearer ${token}`}})

                const datos = await respuesta.json()

                if (!respuesta.ok) {
                    throw new Error(datos.mensaje || "No se pudieron cargar las reservas.")
                }

                setReservas(datos.horasMedicas || [])

            } catch (error) {
                setMensaje(error.message)
            } finally {
                setCargando(false)
            }
        }

        cargarReservas()
    }, [rolUsuario, token, runPaciente])

    async function reagendarHora(evento) {
        evento.preventDefault()

        setMensaje("")
        setExito(false)

        if (!numeroOrden || !fecha || !hora) {setMensaje("Debe completar todos los campos.")
            return
        }

        if (fecha < fechaHoy) {setMensaje("No puede seleccionar una fecha pasada.")
            return
        }

        const reservaSeleccionada = reservas.find(
            (reserva) => reserva.numeroOrden === Number(numeroOrden))

        if (!reservaSeleccionada) {setMensaje("No se encontró la reserva seleccionada.")
            return
        }

        if (reservaSeleccionada.fecha === fecha && reservaSeleccionada.hora === hora) {
            setMensaje("Seleccione una fecha u hora diferente a la actual.")
            return
        }

        setEnviando(true)

        try {
            const respuesta = await fetch(`http://localhost:3000/api/agendamientos/horas/${numeroOrden}`,
                {method: "PUT", headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                    body: JSON.stringify({fecha,hora})
                }
            )
            const datos = await respuesta.json()

            if (!respuesta.ok) {
                throw new Error(datos.mensaje || "No se pudo reagendar la hora.")
            }

            setReservas((anteriores) =>
                anteriores.map((reserva) =>
                    reserva.numeroOrden === Number(numeroOrden)
                        ? datos.reserva
                        : reserva
                )
            )
            setMensaje(`¡Hora médica reagendada correctamente! Número de orden: ${datos.reserva.numeroOrden}`)
            setExito(true)
            setNumeroOrden("")
            setFecha("")
            setHora("")

        } catch (error) {
            setMensaje(error.message)
        } finally {
            setEnviando(false)
        }
    }

    if (rolUsuario !== "paciente" || !token || !runPaciente) {
        return <Navigate to="/inicio-sesion" replace />
    }

    return (
        <main className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">

                            <h1 className="text-center mb-3"> Reagendar hora médica </h1>
                            <p className="text-center mb-4">Selecciona una de tus reservas para modificar su fecha y hora.</p>

                            <form onSubmit={reagendarHora}>

                                <div className="mb-3">
                                    <label className="form-label"> RUN del paciente</label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={runPaciente}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Hora médica agendada </label>
                                    <select
                                        className="form-select"
                                        value={numeroOrden}
                                        onChange={(e) => setNumeroOrden(e.target.value)}
                                        disabled={cargando ||reservas.length === 0}
                                        required
                                    >
                                        <option value=""> Seleccione una reserva </option>
                                        {reservas.map((reserva) => (
                                            <option
                                                key={reserva.numeroOrden}
                                                value={reserva.numeroOrden}
                                            >
                                                Orden #{reserva.numeroOrden}
                                                {" - "}
                                                {reserva.medico}
                                                {" - "}
                                                {reserva.fecha}
                                                {" "}
                                                {reserva.hora}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nueva fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        min={fechaHoy}
                                        value={fecha}
                                        onChange={(e) =>setFecha(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Nueva hora</label>
                                    
                                    <select
                                        className="form-select"
                                        value={hora}
                                        onChange={(e) =>
                                            setHora(e.target.value)
                                        }
                                        required
                                    >
                                        <option value="">Seleccione una hora</option>
                                        <option value="09:00">09:00</option>
                                        <option value="10:00">10:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="12:00">12:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="15:00">15:00</option>
                                        <option value="16:00">16:00</option>
                                    </select>
                                </div>

                                {cargando && (
                                    <p className="text-muted"> Cargando tus reservas...</p>
                                )}

                                {!cargando && reservas.length === 0 && (
                                    <div className="alert alert-info">No tienes horas médicas para reagendar.</div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-blondie w-100"
                                    disabled={enviando || cargando || reservas.length === 0}
                                >
                                    {enviando
                                        ? "Reagendando..."
                                        : "Reagendar hora"
                                    }
                                </button>

                                {mensaje && (
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

export default ReagendarHora
