
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-blondie">
            <div className="container">

                <a className="navbar-brand" href="/">
                    <img
                        src="/assets/img/logo.png"
                        alt="Logo Blondie-Salud"
                        className="logo-navbar"
                    />
                </a>

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
                        <a className="nav-link" href="/">Inicio</a>
                        <a className="nav-link" href="/agendar-hora">
                            Agendar hora </a>

                        <a className="nav-link" href="/reagendar-hora">
                            Reagendar</a>

                        <a className="nav-link" href="/#nosotros">
                            Nosotros </a>

                        <a className="nav-link" href="/inicio-sesion">
                            Iniciar sesión </a>

                        <a className="btn btn-blondie ms-lg-3" href="/registro">
                            Registrarse </a>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
