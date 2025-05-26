from datetime import datetime
from models.factura import Factura

class FacturaDAO:
    @staticmethod
    def get_by_id(id_):
        return Factura.get_or_none(Factura.id == id_)

    @staticmethod
    def get_all():
        return list(Factura.select())

    @staticmethod
    def create(nro_sri, descargo_original, fecha=None, estado='FACTURADO'):
        return Factura.create(
            nro_sri=nro_sri,
            descargo_original=descargo_original,
            fecha=fecha or datetime.now(),
            estado=estado
        )

    @staticmethod
    def update_estado(factura, nuevo_estado):
        factura.estado = nuevo_estado
        factura.save()
        return factura

    @staticmethod
    def get_by_descargo(descargo):
        return list(Factura.select().where(Factura.descargo_original == descargo))
