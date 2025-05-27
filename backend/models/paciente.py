from peewee import AutoField, CharField, DateField
from core.database import BaseModel

class Paciente(BaseModel):
    id         = AutoField()
    nombres    = CharField()
    apellidos  = CharField()
    cedula     = CharField(unique=True)
    fecha_nac  = DateField()      # fecha de nacimiento
    estado     = CharField()      # Internado / Alta
    telefono   = CharField(null=True)
