from peewee import (
    AutoField, DeferredForeignKey,
    ForeignKeyField, IntegerField, FloatField
)
from core.database import BaseModel
from .producto import Producto
from .servicio import Servicio

# DeferredForeignKey apunta a 'models.descargo.Descargo' sin importarlo aquí
descargo = DeferredForeignKey(
    'models.descargo.Descargo',
    backref='lineas_descargo'
)

class DetalleDescargo(BaseModel):
    id               = AutoField()
    descargo         = descargo
    producto         = ForeignKeyField(Producto, null=True)
    servicio         = ForeignKeyField(Servicio, null=True)
    cantidad         = IntegerField()
    precio_unitario  = FloatField()
