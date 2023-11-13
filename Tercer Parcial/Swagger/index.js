const express = require('express');
const app = express();
const path = require('path');
const fs =require('fs');
const cors = require('cors');
const mysql = require('mysql2');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const productoRoutes = require('./routes/productoRoutes');
const PORT = 8080;

app.use(cors());
app.use(express.json());

const def = fs.readFileSync(path.join(__dirname,"./swaggerOptions.json"), {encoding: "utf8", flag:"r"});
const defObj =JSON.parse(def);
const swaggerOptions = {
  definition: defObj,
  apis : [path.join(__dirname,"./routes/productoRoutes.js")]
}
const { SwaggerTheme } = require('swagger-themes');
const Theme = new SwaggerTheme('v3');
const option_v1 = {
  explorer : true,
  customCss : Theme.getBuffer("dark")
}

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs, option_v1));


app.use('/producto', productoRoutes);

app.use('/api-docs-json', (req,res) => {
  res.json(swaggerDocs);
})

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
