from peewee import AutoField, ForeignKeyField, IntegerField, FloatField
from core.database import BaseModel
from .descargo import Descargo
from .producto import Producto
from .servicio import Servicio

class DetalleDescargo(BaseModel):
    id               = AutoField()
    descargo         = ForeignKeyField(Descargo, backref='lineas_descargo')
    producto         = ForeignKeyField(Producto, null=True)
    servicio         = ForeignKeyField(Servicio, null=True)
    cantidad         = IntegerField()
    precio_unitario  = FloatField()
