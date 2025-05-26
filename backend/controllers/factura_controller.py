from flask import Blueprint, jsonify
from services.facturacion_service import FacturacionService

factura_bp = Blueprint('factura_bp', __name__, url_prefix='/facturas')

@factura_bp.route('/descargo/<int:descargo_id>/facturar', methods=['POST'])
def facturar_descargo(descargo_id):
    try:
        f = FacturacionService.facturar_descargo(descargo_id)
        return jsonify({
            'id': f.id,
            'nro_sri': f.nro_sri,
            'fecha': f.fecha.isoformat(),
            'estado': f.estado
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400
