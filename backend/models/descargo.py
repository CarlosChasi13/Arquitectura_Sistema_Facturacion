from datetime import date
from peewee import AutoField, CharField, DateField, ForeignKeyField
from core.database import BaseModel
from .paciente import Paciente

class Descargo(BaseModel):
    id        = AutoField()
    nro_sri   = CharField(unique=True)
    fecha     = DateField()
    estado    = CharField(default='DESCARGADO')
    paciente  = ForeignKeyField(Paciente, backref='descargos')

    def clone(self, new_nro_sri):
        """Prototype: clona cabecera + todas sus líneas."""
        from .detalle_descargo import DetalleDescargo

        nueva = Descargo.create(
            nro_sri=new_nro_sri,
            paciente=self.paciente,
            fecha=date.today(),
            estado='FACTURADO'
        )
        for linea in self.lineas_descargo:
            DetalleDescargo.create(
                descargo=nueva,
                producto=linea.producto,
                servicio=linea.servicio,
                cantidad=linea.cantidad,
                precio_unitario=linea.precio_unitario
            )
        return nueva
