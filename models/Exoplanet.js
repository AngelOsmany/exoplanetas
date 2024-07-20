const mongoose = require('mongoose');

const ExoplanetSchema = new mongoose.Schema({
    nombre: String,
    radio: Number,
    masa: Number,
    periodo_orbital: Number,
    distancia: Number,
    estrella_id: mongoose.Schema.Types.ObjectId,
    descubrimiento: Object
});

const Exoplanet = mongoose.model('Exoplanet', ExoplanetSchema);

module.exports = Exoplanet;
