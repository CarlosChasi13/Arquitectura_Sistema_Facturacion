from flask import Blueprint, request, jsonify
from services.descargo_service import DescargoService

# Lo nombramos "detalle_descargo" y url_prefix bajo "/descargos/<descargo_id>/lineas"
detalle_descargo_bp = Blueprint(
    'detalle_descargo',
    __name__,
    url_prefix='/descargos/<int:descargo_id>/lineas'
)

@detalle_descargo_bp.route('', methods=['GET'])
def listar_lineas(descargo_id):
    ls = DescargoService.listar_lineas(descargo_id)
    return jsonify([{
        "linea_id": l.id,
        "producto_id": l.producto.id if l.producto else None,
        "servicio_id": l.servicio.id if l.servicio else None,
        "cantidad": l.cantidad,
        "precio_unitario": l.precio_unitario
    } for l in ls]), 200

@detalle_descargo_bp.route('', methods=['POST'])
def agregar_linea(descargo_id):
    data = request.get_json()
    l = DescargoService.agregar_linea(
        descargo_id,
        producto_id     = data.get('producto_id'),
        servicio_id     = data.get('servicio_id'),
        cantidad        = data.get('cantidad', 1),
        precio_unitario = data.get('precio_unitario')
    )
    return jsonify({
        "linea_id": l.id,
        "producto_id": l.producto.id if l.producto else None,
        "servicio_id": l.servicio.id if l.servicio else None,
        "cantidad": l.cantidad,
        "precio_unitario": l.precio_unitario
    }), 201
