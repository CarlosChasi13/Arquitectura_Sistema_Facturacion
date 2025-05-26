from flask import Blueprint, jsonify
from services.facturacion_service import FacturacionService

factura_bp = Blueprint('factura_bp', __name__, url_prefix='/pacientes')

@factura_bp.route('/<int:paciente_id>/factura', methods=['GET'])
def ver_factura(paciente_id):
    try:
        f = FacturacionService.get_factura_por_paciente(paciente_id)
        return jsonify(f), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 404

@factura_bp.route('/<int:paciente_id>/descargos/<int:descargo_id>/facturar', methods=['POST'])
def facturar_descargo(paciente_id, descargo_id):
    try:
        f = FacturacionService.facturar_descargo(descargo_id)
        return jsonify({
            "id": f.id,
            "nro_sri": f.nro_sri,
            "fecha": f.fecha.isoformat(),
            "estado": f.estado
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
