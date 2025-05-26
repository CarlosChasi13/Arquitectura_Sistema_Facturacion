from dao.producto_dao import ProductoDAO
from dao.servicio_dao import ServicioDAO

class CatalogoService:
    # Productos
    @staticmethod
    def listar_productos():
        return ProductoDAO.get_all()

    @staticmethod
    def get_producto(id_):
        prod = ProductoDAO.get_by_id(id_)
        if not prod:
            raise ValueError(f"Producto id={id_} no encontrado")
        return prod

    # Servicios
    @staticmethod
    def listar_servicios():
        return ServicioDAO.get_all()

    @staticmethod
    def get_servicio(id_):
        serv = ServicioDAO.get_by_id(id_)
        if not serv:
            raise ValueError(f"Servicio id={id_} no encontrado")
        return serv
