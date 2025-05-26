from peewee import AutoField, CharField, DateTimeField
from core.database import BaseModel

class Paciente(BaseModel):
    id             = AutoField()
    nombres        = CharField()
    apellidos      = CharField()
    cedula         = CharField(unique=True)
    fecha_ingreso  = DateTimeField()
    fecha_alta     = DateTimeField(null=True)
    telefono       = CharField(null=True)
