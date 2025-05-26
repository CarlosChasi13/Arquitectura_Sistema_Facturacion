from flask import Blueprint, request, jsonify
from services.paciente_service import PacienteService

paciente_bp = Blueprint('paciente_bp', __name__, url_prefix='/pacientes')

@paciente_bp.route('/', methods=['GET'])
def listar_pacientes():
    pacientes = PacienteService.listar_pacientes()
    return jsonify([p.__data__ for p in pacientes]), 200

@paciente_bp.route('/<int:id_>', methods=['GET'])
def obtener_paciente(id_):
    try:
        p = PacienteService.get_paciente(id_)
        return jsonify(p.__data__), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 404

@paciente_bp.route('/', methods=['POST'])
def crear_paciente():
    data = request.get_json()
    try:
        p = PacienteService.crear_paciente(
            nombres=data['nombres'],
            apellidos=data['apellidos'],
            cedula=data['cedula'],
            fecha_ingreso=data['fecha_ingreso'],
            fecha_alta=data.get('fecha_alta'),
            telefono=data.get('telefono')
        )
        return jsonify(p.__data__), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@paciente_bp.route('/<int:id_>', methods=['PUT'])
def actualizar_paciente(id_):
    data = request.get_json()
    try:
        p = PacienteService.actualizar_paciente(id_, **data)
        return jsonify(p.__data__), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400
