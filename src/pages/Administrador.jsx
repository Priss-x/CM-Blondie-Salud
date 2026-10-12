
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"

function Administrador() {
    console.log("ENTRÉ AL ADMINISTRADOR")

    const navigate = useNavigate()
    const [seccion, setSeccion] = useState("")

    useEffect(() => {
       const rolUsuario = localStorage.getItem("rol_usuario")

        if (rolUsuario !== "admin") {
            navigate("/")
        }
    }, [navigate])

    const rolUsuario = localStorage.getItem("rol_usuario")

    if (rolUsuario !== "admin") {
        return null
    }
    const medicos = [
        "Dr. Leorio Paladiknight",
        "Dr. Chanandler Bong",
        "Dra. Louise Ciccone",
        "Dr. Michael Myers",
        "Dr. Thomas Wilis",
        "Dra. Rita Levi-Montalcini"
    ]

    const citas = JSON.parse(
        localStorage.getItem("horas_agendadas")
    ) || []
    return (
        <main className="container mt-5 mb-5">
            <section className="text-center mb-5">
                <h1>Panel Administrador</h1>
                <p>
                    Bienvenido al sistema administrativo del
                    Centro Médico Blondie-Salud.
                </p>
            </section>

            <section>
                <h2 className="mb-4">Resumen del sistema</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Pacientes</h3>
                                <p>
                                    Revisa los pacientes registrados
                                    en el centro médico.
                                </p>

                                <button
                                    className="btn btn-blondie"
                                    onClick={() => setSeccion("pacientes")}
                                >
                                    Ver pacientes
                                </button>
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
                                    onClick={() => setSeccion("citas")}
                                >
                                    Ver citas
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body text-center">
                                <h3>Médicos</h3>
                                <p>
                                    Consulta los profesionales
                                    disponibles en Blondie-Salud.
                                </p>

                                <button
                                    className="btn btn-blondie"
                                    onClick={() => setSeccion("medicos")}
                                >
                                    Ver médicos
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
                                    <p>
                                        Todavía no tenemos un listado de
                                        pacientes guardado en el sistema.
                                    </p>
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
                        </div>
                    </div>
                </section>
            )}

            <section className="mt-5">
                <h2 className="mb-4">
                    Gestión administrativa
                </h2>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <p>
                            Desde este panel puedes acceder a las principales
                            funciones administrativas del centro médico.
                        </p>

                        <div className="d-flex flex-wrap gap-3">
                            <Link to="/agendar-hora" className="btn btn-blondie">
                                Agendar hora
                            </Link>

                            <Link to="/reagendar-hora" className="btn btn-blondie">
                                Reagendar hora
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
