from flask import Blueprint, request, jsonify
from services.descargo_service import DescargoService

descargo_bp = Blueprint('descargo_bp', __name__, url_prefix='/descargos')

@descargo_bp.route('/', methods=['GET'])
def listar_descargos():
    descs = DescargoService.listar_descargos()
    return jsonify([d.__data__ for d in descs]), 200

@descargo_bp.route('/<int:id_>', methods=['GET'])
def obtener_descargo(id_):
    try:
        d = DescargoService.get_descargo(id_)
        return jsonify(d.__data__), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404

@descargo_bp.route('/', methods=['POST'])
def crear_descargo():
    data = request.get_json()
    try:
        d = DescargoService.crear_descargo(
            nro_sri=data['nro_sri'],
            paciente_id=data['paciente_id'],
            fecha=data.get('fecha')
        )
        return jsonify(d.__data__), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@descargo_bp.route('/<int:id_>/items', methods=['POST'])
def agregar_item(id_):
    data = request.get_json()
    try:
        item = DescargoService.agregar_item(
            descargo_id=id_,
            producto_id=data.get('producto_id'),
            servicio_id=data.get('servicio_id'),
            cantidad=data.get('cantidad', 1),
            precio_unitario=data.get('precio_unitario')
        )
        return jsonify(item.__data__), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@descargo_bp.route('/<int:id_>/estado', methods=['PATCH'])
def cambiar_estado(id_):
    data = request.get_json()
    try:
        d = DescargoService.cambiar_estado(id_, data['nuevo_estado'])
        return jsonify(d.__data__), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
