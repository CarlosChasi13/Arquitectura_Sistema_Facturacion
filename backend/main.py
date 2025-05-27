from flask import Flask
from flask_cors import CORS  # <-- Importa flask-cors
from core.database import db
from controllers.paciente_controller import paciente_bp
from controllers.descargo_controller import descargo_bp
from controllers.factura_controller import factura_bp

app = Flask(__name__)

# Configura CORS para permitir solicitudes desde localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Health-check en /
@app.route('/', methods=['GET'])
def index():
    return {"message": "API Hospital corriendo 🎉"}, 200

# Registro de Blueprints
app.register_blueprint(paciente_bp)
app.register_blueprint(descargo_bp)
app.register_blueprint(factura_bp)

if __name__ == '__main__':
    # Importar modelos para crear tablas
    from models import (
        Paciente, Producto, Servicio,
        Descargo, DetalleDescargo,
        Factura, DetalleFactura
    )
    db.connect()
    db.create_tables([
        Paciente, Producto, Servicio,
        Descargo, DetalleDescargo,
        Factura, DetalleFactura
    ])
    app.run(debug=True, port=5000)
