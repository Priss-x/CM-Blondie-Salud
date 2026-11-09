
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pacientesRoutes = require("./routes/pacientes.routes");

const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({mensaje: "API de Blondie-Salud funcionando correctamente"});
});

//ruta del crud de pctes
app.use("/api/pacientes", pacientesRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//iniciar server
app.listen(PORT, () => {console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
