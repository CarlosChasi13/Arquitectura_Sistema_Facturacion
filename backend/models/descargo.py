from peewee import AutoField, CharField, DateTimeField, ForeignKeyField
from core.database import BaseModel
from .paciente import Paciente

class Descargo(BaseModel):
    id        = AutoField()
    nro_sri   = CharField(unique=True)
    fecha     = DateTimeField()
    estado    = CharField(default='DESCARGADO')  # DESCARGADO / FACTURADO
    paciente  = ForeignKeyField(Paciente, backref='descargos')
