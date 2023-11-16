const OpenAPISnippet = require('openapi-snippet');

// Utiliza import() en lugar de require()
const fetch = require('node-fetch');

fetch("http://localhost:8080/api-docs-json")
    .then(response => response.json())
    .then(desc => {
        console.log(desc);

        const openApi = desc;
        const targets = ['node_unirest'];

        try {
            const results = OpenAPISnippet.getSnippets(openApi, targets);
            console.log(results.node_unirest);
        } catch (err) {
            console.log("Ocurrió un error:", err);
        }
    })
    .catch(error => {
        console.error("Error al obtener el archivo JSON:", error);
    });
