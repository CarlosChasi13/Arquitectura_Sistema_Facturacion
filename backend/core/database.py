# backend/core/database.py

from peewee import SqliteDatabase, Model

class DatabaseConnection:
    _instance = None

    @classmethod
    def get_database(cls):
        if cls._instance is None:
            cls._instance = SqliteDatabase('hospital.db')
        return cls._instance

# Alias para compatibilidad
db = DatabaseConnection.get_database()

class BaseModel(Model):
    class Meta:
        database = db
