from peewee import AutoField, CharField, DateTimeField, ForeignKeyField
from core.database import BaseModel
from .descargo import Descargo

class Factura(BaseModel):
    id                  = AutoField()
    nro_sri             = CharField(unique=True)
    fecha               = DateTimeField()
    estado              = CharField(default='FACTURADO')  # FACTURADO
    descargo_original   = ForeignKeyField(Descargo, backref='facturas')
