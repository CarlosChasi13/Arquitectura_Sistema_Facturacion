# backend/main.py
from flask import Flask
from core.database import db
from controllers.paciente_controller import paciente_bp
from controllers.descargo_controller import descargo_bp
from controllers.factura_controller import factura_bp

# Importa los modelos *desde* el paquete models
from models.paciente import Paciente
from models.producto import Producto
from models.servicio import Servicio
from models.descargo import Descargo
from models.detalle_descargo import DetalleDescargo
from models.factura import Factura
from models.detalle_factura import DetalleFactura

app = Flask(__name__)
app.register_blueprint(paciente_bp)
app.register_blueprint(descargo_bp)
app.register_blueprint(factura_bp)

if __name__ == '__main__':
    db.connect()
    db.create_tables([
        Paciente, Producto, Servicio,
        Descargo, DetalleDescargo,
        Factura, DetalleFactura
    ])
    app.run(debug=True, port=5000)
