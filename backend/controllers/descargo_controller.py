from flask import Blueprint, request, jsonify
from services.descargo_service import DescargoService

# Le damos un nombre único "descargo" y url_prefix de "/pacientes/<paciente_id>/descargos"
descargo_bp = Blueprint(
    'descargo', 
    __name__, 
    url_prefix='/pacientes/<int:paciente_id>/descargos'
)

@descargo_bp.route('', methods=['GET'])
def listar_descargos(paciente_id):
    ds = DescargoService.listar_descargos_por_paciente(paciente_id)
    return jsonify([{
        "descargo_id": d.id,
        "nro_sri": d.nro_sri,
        "fecha": d.fecha.isoformat(),
        "estado": d.estado
    } for d in ds]), 200

@descargo_bp.route('', methods=['POST'])
def crear_descargo(paciente_id):
    data = request.get_json()
    d = DescargoService.crear_descargo(
        paciente_id,
        data.get('nro_sri'),
        data.get('fecha')
    )
    return jsonify({
        "descargo_id": d.id,
        "nro_sri": d.nro_sri,
        "fecha": d.fecha.isoformat(),
        "estado": d.estado
    }), 201
