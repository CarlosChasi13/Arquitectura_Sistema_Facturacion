from peewee import AutoField, CharField, FloatField
from core.database import BaseModel

class Producto(BaseModel):
    id               = AutoField()
    codigo           = CharField(unique=True)
    descripcion      = CharField()
    precio_unitario  = FloatField()
    estado           = CharField(default='DISPONIBLE')  # DISPONIBLE / DESCARGADO / FACTURADO
