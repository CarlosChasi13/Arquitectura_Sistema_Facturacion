from datetime import datetime
from dao.descargo_dao import DescargoDAO
from dao.paciente_dao import PacienteDAO
from dao.producto_dao import ProductoDAO
from dao.servicio_dao import ServicioDAO

class DescargoService:
    @staticmethod
    def crear_descargo(nro_sri, paciente_id, fecha=None):
        paciente = PacienteDAO.get_by_id(paciente_id)
        if not paciente:
            raise ValueError(f"Paciente id={paciente_id} no encontrado")
        return DescargoDAO.create(
            nro_sri=nro_sri,
            paciente=paciente,
            fecha=fecha or datetime.now()
        )

    @staticmethod
    def listar_descargos():
        return DescargoDAO.get_all()

    @staticmethod
    def get_descargo(id_):
        desc = DescargoDAO.get_by_id(id_)
        if not desc:
            raise ValueError(f"Descargo id={id_} no encontrado")
        return desc

    @staticmethod
    def agregar_item(descargo_id, producto_id=None, servicio_id=None, cantidad=1, precio_unitario=None):
        desc = DescargoService.get_descargo(descargo_id)
        if desc.estado != 'DESCARGADO':
            raise ValueError("Solo descargos en estado 'DESCARGADO' pueden modificarse")

        producto = None
        servicio = None

        if producto_id:
            producto = ProductoDAO.get_by_id(producto_id)
            if not producto:
                raise ValueError(f"Producto id={producto_id} no encontrado")
            precio_unitario = precio_unitario if precio_unitario is not None else producto.precio_unitario

        if servicio_id:
            servicio = ServicioDAO.get_by_id(servicio_id)
            if not servicio:
                raise ValueError(f"Servicio id={servicio_id} no encontrado")
            precio_unitario = precio_unitario if precio_unitario is not None else servicio.precio_base

        return DescargoDAO.add_linea(
            descargo=desc,
            producto=producto,
            servicio=servicio,
            cantidad=cantidad,
            precio_unitario=precio_unitario or 0.0
        )

    @staticmethod
    def cambiar_estado(descargo_id, nuevo_estado):
        desc = DescargoService.get_descargo(descargo_id)
        return DescargoDAO.update_estado(desc, nuevo_estado)
