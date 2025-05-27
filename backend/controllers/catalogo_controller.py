from flask import Blueprint, jsonify
from services.catalogo_service import CatalogoService

cat_bp = Blueprint('cat_bp', __name__)

@cat_bp.route('/productos', methods=['GET'])
def listar_productos():
    prods = CatalogoService.listar_productos()
    return jsonify([p.__data__ for p in prods]), 200

@cat_bp.route('/servicios', methods=['GET'])
def listar_servicios():
    servs = CatalogoService.listar_servicios()
    return jsonify([s.__data__ for s in servs]), 200
