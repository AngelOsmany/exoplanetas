from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

client = MongoClient('mongodb://localhost:27017')
db = client['exoplanetas_db']

exoplanetas = db['exoplanetas']
exoplanetas.insert_many([
    {
        "nombre": "Kepler-22b",
        "radio": 2.4,  
        "masa": None,  
        "periodo_orbital": 289.9,  
        "distancia": 600,  
        "estrella_id": ObjectId("60d5f4898f1b2c001eabf0d1"),  
        "descubrimiento": {
            "fecha": datetime(2011, 12, 5),
            "metodo": "Tránsito"
        }
    },
    {
        "nombre": "Proxima Centauri b",
        "radio": 1.1,  
        "masa": 1.27,  
        "periodo_orbital": 11.2,
        "distancia": 4.24,  
        "estrella_id": ObjectId("60d5f4898f1b2c001eabf0d2"),  
        "descubrimiento": {
            "fecha": datetime(2016, 8, 24),
            "metodo": "Velocidad radial"
        }
    }
])

estrellas = db['estrellas']
estrellas.insert_many([
    {
        "_id": ObjectId("60d5f4898f1b2c001eabf0d1"),
        "nombre": "Kepler-22",
        "tipo": "G5V",
        "masa": 0.97,  
        "radio": 0.98, 
        "distancia": 600  
    },
    {
        "_id": ObjectId("60d5f4898f1b2c001eabf0d2"),
        "nombre": "Proxima Centauri",
        "tipo": "M5.5Ve",
        "masa": 0.12,  
        "radio": 0.14, 
        "distancia": 4.24 
    }
])

misiones = db['misiones']
misiones.insert_many([
    {
        "nombre": "Kepler",
        "agencia": "NASA",
        "fecha_lanzamiento": datetime(2009, 3, 7),
        "estado": "Finalizada",
        "exoplanetas_descubiertos": [
            ObjectId("60d5f4898f1b2c001eabf0d1")
        ]
    },
    {
        "nombre": "ESO's HARPS",
        "agencia": "ESO",
        "fecha_lanzamiento": datetime(2003, 2, 26),
        "estado": "Operativa",
        "exoplanetas_descubiertos": [
            ObjectId("60d5f4898f1b2c001eabf0d2")
        ]
    }
])

print("Datos insertados correctamente")
