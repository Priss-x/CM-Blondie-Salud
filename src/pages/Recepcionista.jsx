
import { Link, Navigate } from "react-router"
import { useState } from "react"

function Recepcionista() {
    const [mostrarCitas, setMostrarCitas] = useState(false)
    const rolUsuario = localStorage.getItem("rol_usuario")

    if (rolUsuario !== "recepcionista") {
        return <Navigate to="/" replace />
    }

    const citas = JSON.parse(localStorage.getItem("horas_agendadas")) || []
    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Panel Recepcionista</h1>
                <p>
                    Bienvenida al sistema de recepción del
                    Centro Médico Blondie-Salud.
                </p>
            </section>

            <section>
                <h2 className="mb-4">Gestión de horas médicas</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Agendar hora</h3>
                                <p>
                                    Registra una nueva hora médica
                                    para un paciente.
                                </p>

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
                                <p>
                                    Modifica la fecha u hora de
                                    una cita existente.
                                </p>

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
                                <p>
                                    Consulta las horas médicas
                                    registradas en el sistema.
                                </p>

                                <button
                                    className="btn btn-blondie"
                                    onClick={() => setMostrarCitas(!mostrarCitas)}
                                >
                                    Ver citas
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
                        <ul className="list-group">
                            {citas.map((cita, indice) => (
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
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h2 className="mb-3">Atención de pacientes</h2>
                        <p>
                            Desde este panel puedes gestionar las horas
                            médicas y apoyar la atención de los pacientes
                            de Blondie-Salud.
                        </p>

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
