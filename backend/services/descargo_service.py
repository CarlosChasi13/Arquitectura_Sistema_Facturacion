from datetime import date
from dao.descargo_dao import DescargoDAO
from dao.paciente_dao import PacienteDAO
from dao.producto_dao import ProductoDAO
from dao.servicio_dao import ServicioDAO

class DescargoService:
    @staticmethod
    def listar_descargos_por_paciente(paciente_id):
        paciente = PacienteDAO.get_by_id(paciente_id)
        if not paciente:
            raise ValueError("Paciente no encontrado")
        return DescargoDAO.get_by_paciente(paciente)

    @staticmethod
    def crear_descargo(paciente_id, nro_sri, fecha=None):
        paciente = PacienteDAO.get_by_id(paciente_id)
        if not paciente:
            raise ValueError("Paciente no encontrado")
        return DescargoDAO.create(nro_sri, paciente, fecha or date.today())

    @staticmethod
    def listar_lineas(descargo_id):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc:
            raise ValueError("Descargo no encontrado")
        return DescargoDAO.get_lineas(desc)

    @staticmethod
    def agregar_linea(descargo_id, producto_id=None, servicio_id=None, cantidad=1, precio_unitario=None):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc or desc.estado != 'DESCARGADO':
            raise ValueError("Descargo inválido o ya facturado")

        producto = None
        servicio = None
        if producto_id:
            producto = ProductoDAO.get_by_id(producto_id)
            if not producto:
                raise ValueError("Producto no encontrado")
        if servicio_id:
            servicio = ServicioDAO.get_by_id(servicio_id)
            if not servicio:
                raise ValueError("Servicio no encontrado")

        precio = precio_unitario
        if precio is None:
            precio = producto.precio_unitario if producto else servicio.precio_base

        return DescargoDAO.add_linea(
            desc,
            producto=producto,
            servicio=servicio,
            cantidad=cantidad,
            precio_unitario=precio
        )
