from datetime import datetime
from dao.descargo_dao import DescargoDAO
from dao.factura_dao import FacturaDAO
from dao.producto_dao import ProductoDAO
from dao.servicio_dao import ServicioDAO
from models.detalle_factura import DetalleFactura

class FacturacionService:
    @staticmethod
    def facturar_descargo(descargo_id):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc:
            raise ValueError(f"Descargo id={descargo_id} no encontrado")
        if desc.estado != 'DESCARGADO':
            raise ValueError("Solo descargos en estado 'DESCARGADO' pueden facturarse")

        # 1) Crear cabecera de factura
        factura = FacturaDAO.create(
            nro_sri=f"{desc.nro_sri}-F",
            descargo_original=desc,
            fecha=datetime.now()
        )

        # 2) Clonar cada línea de descargo en detalle_factura
        for ln in DescargoDAO.get_lineas(desc):
            DetalleFactura.create(
                factura=factura,
                producto=ln.producto,
                servicio=ln.servicio,
                cantidad=ln.cantidad,
                precio_unitario=ln.precio_unitario
            )

        # 3) Actualizar estados
        DescargoDAO.update_estado(desc, 'FACTURADO')
        FacturaDAO.update_estado(factura, 'FACTURADO')

        return factura
