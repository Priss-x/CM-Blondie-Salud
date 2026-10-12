
import { Link } from "react-router"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-blondie">
            <div className="container">

                <Link className="navbar-brand" to="/">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/img/logo.png`}
                        alt="Logo Blondie-Salud"
                        style={{ width: "100px", height: "auto" }}
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarBlondie"
                    aria-controls="navbarBlondie"
                    aria-expanded="false"
                    aria-label="Abrir menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarBlondie">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/"> Inicio </Link>
                        <Link className="nav-link" to="/agendar-hora"> Agendar hora </Link>
                        <Link className="nav-link" to="/reagendar-hora">Reagendar</Link>
                        <Link className="nav-link" to="/#nosotros">
                            Nosotros
                        </Link>
                        <Link className="nav-link" to="/inicio-sesion">Iniciar sesión </Link>
                        <Link className="btn btn-blondie ms-lg-3" to="/registro">
                            Registrarse
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
