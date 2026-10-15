
import { Link, Navigate } from "react-router"
import { useState } from "react"

function Recepcionista() {
    const [mostrarCitas, setMostrarCitas] = useState(false)
    const [mostrarMuestras, setMostrarMuestras] = useState(false)
    const [muestras, setMuestras] = useState(JSON.parse(localStorage.getItem("examenes_agendados")) || [])

    const rolUsuario = localStorage.getItem("rol_usuario")

    const citas = JSON.parse(localStorage.getItem("horas_agendadas")) || []

    function cambiarEstado(indice, nuevoEstado) {
        const nuevasMuestras = [...muestras]

        nuevasMuestras[indice].estado = nuevoEstado
        setMuestras(nuevasMuestras)

        localStorage.setItem("examenes_agendados",JSON.stringify(nuevasMuestras))
    }

    if (rolUsuario !== "recepcionista") {
        return <Navigate to="/" replace />
    }

    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Panel Recepcionista</h1>
                <p>Bienvenida al sistema de recepción del Centro Médico Blondie-Salud.</p>
            </section>

            <section>
                <h2 className="mb-4">Gestión de horas médicas</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Agendar hora</h3>
                                <p>Registra una nueva hora médicapara un paciente.</p>
                                <Link to="/agendar-hora" className="btn btn-blondie">
                                    Agendar hora
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Reagendar hora</h3>
                                <p>Modifica la fecha u hora deuna cita existente.</p>
                                <Link to="/reagendar-hora" className="btn btn-blondie">
                                    Reagendar hora
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Citas médicas</h3>
                                <p>Consulta las horas médicas registradas en el sistema.</p>

                                <button className="btn btn-blondie" onClick={() => setMostrarCitas(!mostrarCitas)}>
                                    {mostrarCitas ? "Ocultar citas" : "Ver citas"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {mostrarCitas && (
                <section className="mt-5">
                    <h2>Citas registradas</h2>

                    {citas.length === 0 ? (
                        <p>No hay citas registradas.</p>
                    ) : (
                        <ul className="list-group"> {citas.map((cita, indice) => (
                                <li className="list-group-item" key={indice}>
                                    {cita.nombre} - {cita.medico} -
                                    {cita.fecha} - {cita.hora}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}

            <section className="mt-5">
                <h2 className="mb-4">Laboratorio Clínico</h2>
                <div className="row g-4">

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Agendar toma de muestras</h3>
                                <p>Registra una nueva reserva para toma de muestras.
                                </p>

                                <Link to="/agendar-examen" className="btn btn-blondie">
                                    Agendar toma de muestras
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Reservas de laboratorio</h3>
                                <p>Consulta las reservas y actualiza el estado de atención.</p>

                                <button className="btn btn-blondie" onClick={() => setMostrarMuestras(!mostrarMuestras)}>
                                    {mostrarMuestras ? "Ocultar reservas" : "Ver reservas"}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {mostrarMuestras && (
                <section className="mt-5">
                    <h2 className="mb-4"> Reservas de toma de muestras </h2>
                    {muestras.length === 0 ? (
                        <p>No hay reservas de laboratorio registradas.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>RUN</th>
                                        <th>Paciente</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {muestras.map((muestra, indice) => (
                                        <tr key={indice}>
                                            <td>{muestra.run}</td>
                                            <td>{muestra.nombre}</td>
                                            <td>{muestra.fecha}</td>
                                            <td>{muestra.hora}</td>

                                            <td>
                                                <select className="form-select" value={muestra.estado || "Agendado"}
                                                    onChange={(e) => cambiarEstado(indice, e.target.value)}
                                                >
                                                    <option value="Agendado">Agendado</option>
                                                    <option value="Muestra tomada">Muestra tomada</option>
                                                    <option value="Finalizado">Finalizado</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}

            <section className="mt-5">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="mb-3">Atención de pacientes</h2>
                        <p>Desde este panel puedes gestionar las horas
                            médicas y las reservas de toma de muestras
                            del Centro Médico Blondie-Salud.</p>

                        <Link to="/" className="btn btn-outline-dark">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Recepcionista
