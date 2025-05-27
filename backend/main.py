from flask import Flask
from flask_cors import CORS
from flask_cors import CORS  # <-- Importa flask-cors
from core.database import db

from controllers.paciente_controller import paciente_bp
from controllers.descargo_controller import descargo_bp
from controllers.detalle_descargo_controller import detalle_descargo_bp
from controllers.factura_controller import factura_bp
from controllers.catalogo_controller import cat_bp

app = Flask(__name__)
CORS(app)
app.url_map.strict_slashes = False


# Configura CORS para permitir solicitudes desde localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Health-check en /
@app.route('/', methods=['GET'])
def index():
    return {"message": "API Hospital corriendo 🎉"}, 200

# Registro de Blueprints
app.register_blueprint(paciente_bp)
app.register_blueprint(descargo_bp)
app.register_blueprint(detalle_descargo_bp)
app.register_blueprint(factura_bp)
app.register_blueprint(cat_bp)

if __name__ == "__main__":
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

    print("🟢 Iniciando API en http://127.0.0.1:5000")  # ← línea de verificación

    app.run(debug=True, port=5000)
