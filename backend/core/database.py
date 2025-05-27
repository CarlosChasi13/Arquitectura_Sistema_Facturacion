from peewee import SqliteDatabase, Model

# Base de datos SQLite (hospital.db)
db = SqliteDatabase('hospital.db')

class BaseModel(Model):
    class Meta:
        database = db
