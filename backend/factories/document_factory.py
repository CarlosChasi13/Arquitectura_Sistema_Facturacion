from datetime import date
from dao.descargo_dao import DescargoDAO
from models.descargo import Descargo

class DocumentFactory:
    @staticmethod
    def create_descargo(nro_sri, paciente, fecha=None):
        """Crea un descargo con valores por defecto."""
        return DescargoDAO.create(
            nro_sri=nro_sri,
            paciente=paciente,
            fecha=fecha or date.today()
        )

    @staticmethod
    def create_factura_from_descargo(descargo: Descargo):
        """Factory + Prototype: clona y retorna la factura."""
        new_nro = f"{descargo.nro_sri}-F"
        factura = descargo.clone(new_nro)
        return factura