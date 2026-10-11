
function Footer() {
    return (
        <footer className="footer-blondie py-4 mt-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-md-4">
                        <h3>Blondie-Salud</h3>
                        <p>
                            Centro médico comprometido con una
                            atención cercana, profesional y de calidad
                            para nuestros pacientes.
                        </p>
                    </div>

                    <div className="col-md-4">
                        <h3>Enlaces rápidos</h3>
                        <ul className="list-unstyled">
                            <li><a href="/">Inicio</a></li>
                            <li><a href="/agendar-hora">Agendar hora</a></li>
                            <li><a href="/registro">Registrarse</a></li>
                        </ul>
                    </div>

                    <div className="col-md-4">
                        <h3>Contacto</h3>
                        <p>Dirección: Av. Libertador Bernardo O'Higgins 2879, Santiago</p>
                        <p>Teléfono: +56 9 1234 5678</p>
                        <p>Correo: contacto@blondiesalud.cl</p>
                    </div>
                </div>
                <hr />

                <p className="text-center mb-0">
                    © 2026 Centro Médico Blondie-Salud.
                    Todos los derechos reservados.
                </p>

            </div>
        </footer>
    )
}

export default Footer
