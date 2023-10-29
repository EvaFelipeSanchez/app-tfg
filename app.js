const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Middleware para analizar datos del formulario HTML
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para mostrar el formulario HTML
app.get('/', (req, res) => {
  // Envia el archivo HTML en respuesta a la solicitud GET
  res.sendFile(__dirname + '/public/index.html');
});

// Ruta para procesar los datos del formulario (POST)
app.post('/guardar', (req, res) => {
  // Conectar a la base de datos
  MongoClient.connect('mongodb://localhost:27017/mi_basededatos', (err, client) => {
    if (err) return console.error(err);
    console.log('Conexión exitosa a la base de datos');

    const db = client.db('mi_basededatos');
    const collection = db.collection('misdatos');

    // Insertar datos en la colección
    collection.insertOne(req.body, (err, result) => {
      if (err) return console.error(err);
      console.log('Datos insertados con éxito');
      client.close();
      res.redirect('/');
    });
  });
});

// Configura la carpeta "public" para servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Aplicación en ejecución en http://localhost:3000');
});