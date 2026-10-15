
import { useState } from "react"
import { Link, Navigate } from "react-router"

function Administrador() {
    const [seccion, setSeccion] = useState("")

    const rolUsuario = localStorage.getItem("rol_usuario")

    const medicos = [
        "Dr. Leorio Paladiknight",
        "Dr. Chanandler Bong",
        "Dra. Louise Ciccone",
        "Dr. Michael Myers",
        "Dr. Thomas Wilis",
        "Dra. Rita Levi-Montalcini"]

    const citas = JSON.parse(localStorage.getItem("horas_agendadas")) || []
    const muestras = JSON.parse(localStorage.getItem("examenes_agendados")) || []
    const pacientes = JSON.parse(localStorage.getItem("pacientes_registrados")) || []

    if (rolUsuario !== "admin") { return <Navigate to="/" replace /> }

    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Panel Administrador</h1>
                <p>Bienvenido al sistema administrativo del
                    Centro Médico Blondie-Salud.</p>
            </section>

            <section>
                <h2 className="mb-4">Resumen del sistema</h2>
                <div className="row g-4">

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Pacientes</h3>
                                <p>Revisa los pacientes registrados en el centro médico.</p>

                                <button className="btn btn-blondie" onClick={() => setSeccion("pacientes")}>
                                    Ver pacientes
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Citas médicas</h3>
                                <p>Consulta las horas médicas registradas en el sistema.</p>
                                <button className="btn btn-blondie" onClick={() => setSeccion("citas")}>
                                    Ver citas
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Médicos</h3>
                                <p>Consulta los profesionales disponibles en Blondie-Salud.</p>

                                <button className="btn btn-blondie" onClick={() => setSeccion("medicos")}>
                                    Ver médicos
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Laboratorio clínico</h3>
                                <p>Consulta las reservas de toma de muestras y su estado.</p>

                                <button className="btn btn-blondie" onClick={() => setSeccion("laboratorio")}>
                                    Ver reservas
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {seccion !== "" && (
                <section className="mt-5">
                    <div className="card shadow-sm">
                        <div className="card-body">

                            {seccion === "pacientes" && (
                                <>
                                    <h2>Pacientes registrados</h2>
                                    {pacientes.length === 0 ? (
                                        <p>No hay pacientes registrados.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>RUN</th>
                                                        <th>Nombre</th>
                                                        <th>Apellidos</th>
                                                        <th>Correo</th>
                                                        <th>Comuna</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {pacientes.map((paciente, indice) => (
                                                        <tr key={indice}>
                                                            <td>{paciente.run}</td>
                                                            <td>{paciente.nombre}</td>
                                                            <td>{paciente.apellidos}</td>
                                                            <td>{paciente.email}</td>
                                                            <td>{paciente.comuna}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                            {seccion === "citas" && (
                                <>
                                    <h2>Citas médicas</h2>
                                    {citas.length === 0 ? (
                                        <p>No hay citas registradas.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Paciente</th>
                                                        <th>Médico</th>
                                                        <th>Fecha</th>
                                                        <th>Hora</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {citas.map((cita, indice) => (
                                                        <tr key={indice}>
                                                            <td>{cita.nombre}</td>
                                                            <td>{cita.medico}</td>
                                                            <td>{cita.fecha}</td>
                                                            <td>{cita.hora}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                            {seccion === "medicos" && (
                                <>
                                    <h2>Médicos disponibles</h2>
                                    <ul className="list-group">
                                        {medicos.map((medico) => (
                                            <li key={medico} className="list-group-item">
                                                {medico}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {seccion === "laboratorio" && (
                                <>
                                    <h2>Reservas de laboratorio clínico</h2>
                                    <p>Consulta las horas de toma de muestras
                                        y el estado de atención de cada paciente.
                                    </p>

                                    {muestras.length === 0 ? (<p>No hay reservas registradas.</p>
                                    ) : (
                                        <div className="table-responsive">
                                            <table className="table table-striped">
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
                                                                {muestra.estado || "Agendado"}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                </section>
            )}

            <section className="mt-5">
                <h2 className="mb-4">¿Gestión administrativa </h2>

                <div className="card shadow-sm">
                    <div className="card-body">
                        <p>Desde este panel puedes acceder a las principales
                            funciones administrativas del centro médico.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <Link to="/agendar-hora" className="btn btn-blondie">
                                Agendar hora
                            </Link>

                            <Link to="/reagendar-hora" className="btn btn-blondie">
                                Reagendar hora
                            </Link>

                            <Link to="/agendar-examen" className="btn btn-blondie">
                                Agendar toma de muestras
                            </Link>

                            <Link to="/" className="btn btn-outline-dark">
                                Volver al inicio
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Administrador
