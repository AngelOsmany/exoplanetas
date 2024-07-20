const express = require('express');
const mongoose = require('mongoose');
const Exoplanet = require('./models/exoplanet');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/exoplanetas_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a MongoDB exitosa');
}).catch(err => {
    console.error('Error al conectar a MongoDB', err);
});

app.use(express.static('public'));

app.get('/search', async (req, res) => {
    try {
        const name = req.query.name;
        console.log(`Buscando exoplaneta con nombre: ${name}`);
        const result = await Exoplanet.find({ nombre: { $regex: new RegExp(name, 'i') } });
        console.log('Resultados de la búsqueda:', result);
        res.json(result);
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
