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
            raise ValueError(f"Paciente id={paciente_id} no encontrado")
        return DescargoDAO.get_by_paciente(paciente)

    @staticmethod
    def crear_descargo(paciente_id, nro_sri, fecha=None):
        paciente = PacienteDAO.get_by_id(paciente_id)
        if not paciente:
            raise ValueError(f"Paciente id={paciente_id} no encontrado")
        return DescargoDAO.create(nro_sri, paciente, fecha or date.today())

    @staticmethod
    def crear_con_lineas(paciente_id, payload):
        # payload == ejemplo.json
        desc = DescargoService.crear_descargo(
            paciente_id,
            payload["descargo_id"],         # usar este nro_sri provisional
            payload.get("fecha")
        )
        for linea in payload["lineas_descargo"]:
            for prod in linea.get("productos", []):
                DescargoDAO.add_linea(
                    desc,
                    producto=ProductoDAO.create(
                        codigo=f"TMP-P-{prod['descripcion']}",
                        descripcion=prod["descripcion"],
                        precio_unitario=prod["precio_unitario"]
                    ),
                    cantidad=prod["cantidad"],
                    precio_unitario=prod["precio_unitario"]
                )
            for serv in linea.get("servicios", []):
                DescargoDAO.add_linea(
                    desc,
                    servicio=ServicioDAO.create(
                        codigo=f"TMP-S-{serv['descripcion']}",
                        descripcion=serv["descripcion"],
                        precio_base=serv["precio_total"]
                    ),
                    cantidad=1,
                    precio_unitario=serv["precio_total"]
                )
        return desc

    @staticmethod
    def agregar_item(descargo_id, producto_id=None, servicio_id=None, cantidad=1, precio_unitario=None):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc or desc.estado != 'DESCARGADO':
            raise ValueError("Descargo inválido o ya facturado")
        prod = ProductoDAO.get_by_id(producto_id) if producto_id else None
        serv = ServicioDAO.get_by_id(servicio_id) if servicio_id else None
        return DescargoDAO.add_linea(
            desc,
            producto=prod,
            servicio=serv,
            cantidad=cantidad,
            precio_unitario=precio_unitario or (prod.precio_unitario if prod else serv.precio_base)
        )

    @staticmethod
    def cambiar_estado(descargo_id, nuevo_estado):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc:
            raise ValueError("Descargo no encontrado")
        return DescargoDAO.update_estado(desc, nuevo_estado)
