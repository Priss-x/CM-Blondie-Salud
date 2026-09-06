class Navbar extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

            <nav class="navbar navbar-expand-lg navbar-dark navbar-blondie">

                <div class="container">

                    <a
                        class="navbar-brand"
                        href="index.html">

                        <img
                            src="assets/img/logo.png"
                            alt="Logo Blondie-Salud"
                            class="logo-navbar">

                    </a>


                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup">

                        <span class="navbar-toggler-icon"></span>

                    </button>


                    <div
                        class="collapse navbar-collapse"
                        id="navbarNavAltMarkup">

                        <div class="navbar-nav ms-auto">
                            <a
                                class="nav-link"
                                href="agendar-hora.html">

                                Agendar hora

                            </a>


                            <a
                                class="nav-link"
                                href="reagendar-hora.html">

                                Reagendar

                            </a>


                            <a
                                class="nav-link"
                                href="index.html#nosotros">

                                Nosotros

                            </a>


                            <a
                                class="nav-link"
                                href="inicio-sesion.html">

                                Iniciar sesión

                            </a>


                            <a
                                class="btn btn-blondie ms-lg-3"
                                href="registro.html">

                                Registrarse

                            </a>

                        </div>

                    </div>

                </div>

            </nav>

        `
    }
}


customElements.define("custom-navbar", Navbar)