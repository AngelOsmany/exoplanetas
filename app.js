const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
    .then(() => {
        console.log('Conexión a MongoDB exitosa');
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB', err);
    });

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    try {
        const name = req.query.name;
        console.log(`Buscando con nombre: ${name}`);

        const database = client.db('exoplanetas_db');
        
        const exoplanetas = await database.collection('exoplanetas').find({ nombre: { $regex: new RegExp(name, 'i') } }).toArray();
        const estrellas = await database.collection('estrellas').find({ nombre: { $regex: new RegExp(name, 'i') } }).toArray();
        const misiones = await database.collection('misiones').find({ nombre: { $regex: new RegExp(name, 'i') } }).toArray();

        const results = { exoplanetas, estrellas, misiones };
        console.log('Resultados de la búsqueda:', results);
        res.json(results);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
