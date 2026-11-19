
import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router"

function Paciente() {
    const rolUsuario = localStorage.getItem("rol_usuario")
    const runPaciente = localStorage.getItem("paciente_actual")
    const token = sessionStorage.getItem("token")

    const [paciente, setPaciente] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState("")
    const [misCitas, setMisCitas] = useState([])
    const [misMuestras, setMisMuestras] = useState([])
    const [errorReservas, setErrorReservas] = useState("")


    useEffect(() => {
        if (rolUsuario !== "paciente" || !token || !runPaciente) {setCargando(false)
            return
        }

        async function cargarDatos() {
            try {
                const respuestaPerfil = await fetch("http://localhost:3000/api/pacientes/mi-perfil",
                    {headers: { Authorization: `Bearer ${token}`}})
                const datosPerfil = await respuestaPerfil.json()
                if (!respuestaPerfil.ok) {throw new Error(datosPerfil.mensaje || "No se pudo cargar tu perfil")}
                setPaciente(datosPerfil)

            } catch (error) {setError(error.message)
            } finally {setCargando(false)}
        }
        cargarDatos()
    }, [rolUsuario, token, runPaciente])

    useEffect(() => {
        if (rolUsuario !== "paciente" || !token) return

        async function cargarReservas() {
            try {
                const respuesta = await fetch("http://localhost:3000/api/agendamientos/mis-reservas",
                    {headers: {Authorization: `Bearer ${token}`}})

                const datos = await respuesta.json()

                if (!respuesta.ok) {throw new Error(datos.mensaje || "No se pudieron cargar las reservas")}
                setMisCitas(datos.horasMedicas || [])
                setMisMuestras(datos.examenes || [])

            } catch (error) {
                setErrorReservas(error.message)
            }
        }

        cargarReservas()
    }, [rolUsuario, token])

    async function cancelarHora(numeroOrden) {const confirmar = window.confirm("¿Está seguro de cancelar esta hora médica?")
        if (!confirmar) return
        try {
            const respuesta = await fetch(`http://localhost:3000/api/agendamientos/horas/${numeroOrden}/cancelar`,
                {method: "PATCH", headers: {Authorization: `Bearer ${token}`}})

            const datos = await respuesta.json()
            if (!respuesta.ok) {throw new Error(datos.mensaje || "No se pudo cancelar la hora")}

            setMisCitas((citasActuales) => citasActuales.map((cita) =>cita.numeroOrden === numeroOrden ? { ...cita, estado: "Cancelada" } : cita))
            setErrorReservas("")
            alert("Hora médica cancelada correctamente")

        } catch (error) {
            setErrorReservas(error.message)
        }
    }
    if (rolUsuario !== "paciente" || !token || !runPaciente) {return <Navigate to="/inicio-sesion" replace/>}

    if (cargando) {
        return (<main className="container mt-5"> <p>Cargando tu perfil...</p></main>)}

    if (error || !paciente) {
        return (<main className="container mt-5">
                <p className="alert alert-danger"> {error || "No se encontró tu perfil"} </p> </main>)}

    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Mi Panel de Paciente</h1>
                <p>¡Bienvenido/a, {paciente.nombre}!</p>
                <p>Desde aquí puedes consultar tus datos y tus reservas en Blondie-Salud.</p>
            </section>

            <section>
                <h2 className="mb-4">Mis servicios</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Horas médicas</h3>
                                <p>Agenda una consulta con nuestros médicos.</p>
                                <Link to="/agendar-hora" className="btn btn-blondie"
                                > Agendar hora </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Laboratorio clínico</h3>
                                <p>Reserva una hora para toma de muestras.</p>
                                <Link to="/agendar-examen" className="btn btn-blondie"
                                > Agendar toma de muestras</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className="mt-5">
                <h2 className="mb-4">Mis horas médicas</h2>

                {errorReservas && (
                    <p className="alert alert-warning"> {errorReservas}</p>
                )}

                {misCitas.length === 0 ? (
                    <p>No tienes horas médicas registradas.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>N° orden</th>
                                    <th>Médico</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                    <th>Acción</th>
                                </tr>
                            </thead>

                            <tbody>
                                {misCitas.map((cita) => (
                                    <tr key={cita.numeroOrden}>
                                        <td>{cita.numeroOrden}</td>
                                        <td>{cita.medico}</td>
                                        <td>{cita.fecha}</td>
                                        <td>{cita.hora}</td>
                                        <td>{cita.estado}</td>
                                        <td>{cita.estado !== "Cancelada" && (
                                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => cancelarHora(cita.numeroOrden)}
                                                > Cancelar hora </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="mt-5">
                <h2 className="mb-4">Mis reservas de laboratorio</h2>

                {misMuestras.length === 0 ? (
                    <p>No tienes reservas de laboratorio.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>N° orden</th>
                                    <th>Examen</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>

                            <tbody>
                                {misMuestras.map((muestra) => (
                                    <tr key={muestra.numeroOrden}>
                                        <td>{muestra.numeroOrden}</td>
                                        <td>{muestra.examen}</td>
                                        <td>{muestra.fecha}</td>
                                        <td>{muestra.hora}</td>
                                        <td>{muestra.estado || "Agendado"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            <section className="mt-5">
                <div className="card shadow-sm">
                    <div className="card-body">

                        <h2 className="mb-3">Mis datos personales</h2>
                        <p><strong>Nombre:</strong>{" "} {paciente.nombre} {paciente.apellidos}</p>
                        <p> <strong>RUN:</strong> {paciente.run} </p>
                        <p><strong>Correo:</strong> {paciente.email} </p>
                        <p> <strong>Fecha de nacimiento:</strong>{" "} {paciente.fecha}</p>
                        <p> <strong>Comuna:</strong> {paciente.comuna}</p>

                        <Link to="/" className="btn btn-outline-dark"
                        > Volver al inicio </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Paciente
