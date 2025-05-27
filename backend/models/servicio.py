from peewee import AutoField, CharField, FloatField
from core.database import BaseModel

class Servicio(BaseModel):
    id             = AutoField()
    codigo         = CharField(unique=True)
    descripcion    = CharField()
    precio_base    = FloatField()
    estado         = CharField(default='DISPONIBLE')  # DISPONIBLE / DESCARGADO / FACTURADO
