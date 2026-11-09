
const swaggerJsdoc = require("swagger-jsdoc");

const opciones = {
    definition: {openapi: "3.0.0", info: {title: "API Centro Médico Blondie-Salud",version: "1.0.0",description: "Documentación de la API REST para la gestión de pacientes."},
        servers: [
            {url: "http://localhost:3000",description: "Servidor local"}
        ]
    },
    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(opciones);
module.exports = swaggerSpec;
