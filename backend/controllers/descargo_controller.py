from flask import Blueprint, request, jsonify
from services.descargo_service import DescargoService

descargo_bp = Blueprint('descargo_bp', __name__, url_prefix='/pacientes')

@descargo_bp.route('/<int:paciente_id>/descargos', methods=['GET'])
def listar_descargos(paciente_id):
    try:
        lst = DescargoService.listar_descargos_por_paciente(paciente_id)
        # convierto cada Descargo a dict simple
        result = []
        for d in lst:
            lineas = []
            total_desc = 0.0
            for ln in d.lineas_descargo:
                prods = [
                    {
                        "descripcion": pd.producto.descripcion,
                        "precio_unitario": pd.precio_unitario,
                        "cantidad": pd.cantidad,
                        "precio_total": pd.precio_unitario * pd.cantidad,
                    } for pd in ln.descargolineasfilter if pd.producto
                ]
                servs = [
                    {
                        "descripcion": sd.servicio.descripcion,
                        "precio_total": sd.precio_unitario,
                    } for sd in ln.descargolineasfilter if sd.servicio
                ]
                subtotal = sum(p["precio_total"] for p in prods) + sum(s["precio_total"] for s in servs)
                total_desc += subtotal
                lineas.append({
                    "linea_id": ln.id,
                    "productos": prods,
                    "servicios": servs,
                    "precio_total_linea": subtotal
                })
            result.append({
                "descargo_id": d.id,
                "paciente_id": paciente_id,
                "fecha": d.fecha.isoformat(),
                "lineas_descargo": lineas,
                "precio_total_descargo": total_desc
            })
        return jsonify(result), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 404

@descargo_bp.route('/<int:paciente_id>/descargos', methods=['POST'])
def crear_descargo_con_lineas(paciente_id):
    payload = request.get_json()
    try:
        d = DescargoService.crear_con_lineas(paciente_id, payload)
        return jsonify({"descargo_id": d.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@descargo_bp.route('/<int:paciente_id>/descargos/<int:descargo_id>/items', methods=['POST'])
def agregar_item(paciente_id, descargo_id):
    data = request.get_json()
    try:
        item = DescargoService.agregar_item(
            descargo_id   = descargo_id,
            producto_id   = data.get('producto_id'),
            servicio_id   = data.get('servicio_id'),
            cantidad      = data.get('cantidad', 1),
            precio_unitario = data.get('precio_unitario')
        )
        return jsonify(item.__data__), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@descargo_bp.route('/<int:paciente_id>/descargos/<int:descargo_id>/estado', methods=['PATCH'])
def cambiar_estado(paciente_id, descargo_id):
    data = request.get_json()
    try:
        d = DescargoService.cambiar_estado(descargo_id, data['nuevo_estado'])
        return jsonify(d.__data__), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
