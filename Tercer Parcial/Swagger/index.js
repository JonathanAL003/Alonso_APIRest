const express = require('express');
const redoc = require('redoc-express');
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
const readmeContent = fs.readFileSync(path.join(__dirname, './README.md'), { encoding: 'utf8', flag: 'r' });

const defObj =JSON.parse(def);
defObj.info.description = readmeContent;
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

app.get(
  '/docs',
  redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json', // Use the correct path for your swagger.json
    routePrefix: '/docs', // Optional, defaults to '/docs'
    options: {
      theme: {
        colors: {
          primary: {
            main: '#6EC5AB'
          }
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: '15px',
          lineHeight: '1.5',
          code: {
            code: '#87E8C7',
            backgroundColor: '#4D4D4E'
          }
        },
        menu: {
          backgroundColor: '#ffffff'
        }
      }
    }
  })
);

app.listen(PORT, () => {
  console.log(`Servidor express escuchando en el puerto ${PORT}`);
});
