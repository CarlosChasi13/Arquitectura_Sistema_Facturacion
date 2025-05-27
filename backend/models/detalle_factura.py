from peewee import AutoField, ForeignKeyField, IntegerField, FloatField
from core.database import BaseModel
from .factura import Factura
from .producto import Producto
from .servicio import Servicio

class DetalleFactura(BaseModel):
    id               = AutoField()
    factura          = ForeignKeyField(Factura, backref='lineas_factura')
    producto         = ForeignKeyField(Producto, null=True)
    servicio         = ForeignKeyField(Servicio, null=True)
    cantidad         = IntegerField()
    precio_unitario  = FloatField()
