class Footer extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

            <footer class="footer">

                <div class="container">

                    <div class="row">


                        <div class="col-md-4">

                            <h5>
                                Blondie-Salud
                            </h5>

                            <p>
                                Centro Médico comprometido con una atención
                                cercana, profesional y de calidad.
                            </p>

                        </div>


                        <div class="col-md-4">

                            <h5>
                                Accesos rápidos
                            </h5>

                            <ul class="list-unstyled">

                                <li>
                                    <a href="index.html">
                                        Inicio
                                    </a>
                                </li>

                                <li>
                                    <a href="agendar-hora.html">
                                        Agendar hora
                                    </a>
                                </li>

                                <li>
                                    <a href="inicio-sesion.html">
                                        Iniciar sesión
                                    </a>
                                </li>

                                <li>
                                    <a href="registro.html">
                                        Registrarse
                                    </a>
                                </li>

                            </ul>

                        </div>


                        <div class="col-md-4">

                            <h5>
                                Contacto
                            </h5>

                            <p>
                                Av. Libertador Bernardo O'Higgins 2879
                            </p>

                            <p>
                                +56 9 1234 5678
                            </p>

                            <p>
                                contacto@blondiesalud.cl
                            </p>

                        </div>


                    </div>


                    <hr>


                    <p class="text-center mb-0">

                        © 2026 Blondie-Salud.
                        Todos los derechos reservados.

                    </p>

                </div>

            </footer>

        `
    }
}


customElements.define("custom-footer", Footer)