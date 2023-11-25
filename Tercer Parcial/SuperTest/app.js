const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('hello, world!');
});

app.get('/alumnos', (req, res) => {
  res.status(200).json({ alumnos: [] });
});

app.post('/alumnos', express.json(), (req, res) => {
  const nuevoAlumno = req.body;
  res.status(201).json({ mensaje: 'Alumno agregado correctamente' });
});

module.exports = app;