from datetime import date
from dao.descargo_dao import DescargoDAO
from dao.factura_dao import FacturaDAO
from dao.paciente_dao import PacienteDAO
from models.detalle_factura import DetalleFactura

class FacturacionService:
    @staticmethod
    def facturar_descargo(descargo_id):
        desc = DescargoDAO.get_by_id(descargo_id)
        if not desc or desc.estado != 'DESCARGADO':
            raise ValueError("Solo descargos en estado 'DESCARGADO' pueden facturarse")

        # 1) Crear cabecera de factura
        fact = FacturaDAO.create(
            nro_sri=f"{desc.nro_sri}-F",
            descargo_original=desc,
            fecha=date.today()
        )

        # 2) Clonar líneas de descargo en detalle_factura
        for ln in DescargoDAO.get_lineas(desc):
            DetalleFactura.create(
                factura=fact,
                producto=ln.producto,
                servicio=ln.servicio,
                cantidad=ln.cantidad,
                precio_unitario=ln.precio_unitario
            )

        # 3) Actualizar estados en BD
        DescargoDAO.update_estado(desc, 'FACTURADO')
        FacturaDAO.update_estado(fact, 'FACTURADO')

        return fact

    @staticmethod
    def get_factura_por_paciente(paciente_id):
        paciente = PacienteDAO.get_by_id(paciente_id)
        if not paciente:
            raise ValueError("Paciente no encontrado")

        # Recojo todas las facturas de todos los descargos del paciente
        facturas = []
        for d in paciente.descargos:
            facturas.extend(d.facturas)
        if not facturas:
            raise ValueError("No hay facturas para este paciente")

        # Elijo la última factura (por id)
        fact = sorted(facturas, key=lambda f: f.id)[-1]

        # Construyo el JSON que espera el frontend
        items = []
        total = 0.0
        for linea in fact.lineas_factura:
            entidad = linea.producto or linea.servicio
            cant = linea.cantidad
            precio = linea.precio_unitario
            items.append({
                "id": linea.id,
                "descripcion": entidad.descripcion,
                "cantidad": cant,
                "precio": precio
            })
            total += cant * precio

        return {
            "nro_sri": fact.nro_sri,
            "fecha": fact.fecha.isoformat(),
            "cliente": f"{paciente.nombres} {paciente.apellidos}",
            "items": items,
            "total": total
        }
