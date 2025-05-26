from datetime import datetime
from models.descargo import Descargo
from models.detalle_descargo import DetalleDescargo

class DescargoDAO:
    @staticmethod
    def get_by_id(id_):
        return Descargo.get_or_none(Descargo.id == id_)

    @staticmethod
    def get_all():
        return list(Descargo.select())

    @staticmethod
    def create(nro_sri, paciente, fecha=None, estado='DESCARGADO'):
        return Descargo.create(
            nro_sri=nro_sri,
            paciente=paciente,
            fecha=fecha or datetime.now(),
            estado=estado
        )

    @staticmethod
    def add_linea(descargo, producto=None, servicio=None, cantidad=1, precio_unitario=0.0):
        return DetalleDescargo.create(
            descargo=descargo,
            producto=producto,
            servicio=servicio,
            cantidad=cantidad,
            precio_unitario=precio_unitario
        )

    @staticmethod
    def update_estado(descargo, nuevo_estado):
        descargo.estado = nuevo_estado
        descargo.save()
        return descargo

    @staticmethod
    def get_lineas(descargo):
        return list(descargo.lineas_descargo)
