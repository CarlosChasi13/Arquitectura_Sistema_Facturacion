# backend/core/database.py
from peewee import SqliteDatabase, Model

db = SqliteDatabase('hospital.db')  # crea hospital.db en tu carpeta
class BaseModel(Model):
    class Meta:
        database = db
