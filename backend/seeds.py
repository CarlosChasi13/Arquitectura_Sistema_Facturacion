# backend/seed_catalogo.py

from core.database import db
from models.producto import Producto
from models.servicio import Servicio

def seed_catalogo():
    # 1) Conectamos y creamos tablas de catálogo
    db.connect()
    db.create_tables([Producto, Servicio])
    print("🟢 Tablas Producto y Servicio listas")

    # 2) Datos de ejemplo para Productos
    productos_data = [
        {"codigo":"MED-ABC", "descripcion":"Medicamento ABC",     "precio_unitario":20.0},
        {"codigo":"COM-HOSP","descripcion":"Comida Hospitalaria", "precio_unitario":30.0},
        {"codigo":"MAT-QUIR","descripcion":"Material Quirúrgico",  "precio_unitario":15.0},
    ]

    for pd in productos_data:
        obj, created = Producto.get_or_create(
            codigo=pd["codigo"],
            defaults={
                "descripcion":     pd["descripcion"],
                "precio_unitario": pd["precio_unitario"],
                "estado":          "DISPONIBLE",
            }
        )
        action = "Creado" if created else "Ya existía"
        print(f"→ {action} Producto {obj.codigo} / {obj.descripcion}")

    # 3) Datos de ejemplo para Servicios
    servicios_data = [
        {"codigo":"SERV-AT",   "descripcion":"Atención Médica",       "tipo":"ATENCION_MEDICA",  "meta":{},                    "precio_base":100.0},
        {"codigo":"SERV-LAB",  "descripcion":"Examen de Laboratorio",  "tipo":"LABORATORIO",      "meta":{"tipo_examen":"sangre"}, "precio_base":50.0},
        {"codigo":"SERV-RX",   "descripcion":"Imágenes Rayos X",       "tipo":"RAYOS_X",          "meta":{"zona_cuerpo":"tórax"},   "precio_base":80.0},
        {"codigo":"SERV-PRO",  "descripcion":"Procedimiento Médico",   "tipo":"PROCEDIMIENTO",    "meta":{"procedimiento":"suturar"}, "precio_base":120.0},
    ]

    for sd in servicios_data:
        obj, created = Servicio.get_or_create(
            codigo=sd["codigo"],
            defaults={
                "descripcion": sd["descripcion"],
                "tipo":        sd["tipo"],
                "meta":        sd["meta"],
                "precio_base": sd["precio_base"],
                "estado":      "DISPONIBLE",
            }
        )
        action = "Creado" if created else "Ya existía"
        print(f"→ {action} Servicio {obj.codigo} / {obj.descripcion}")

    print("✅ Seeder de catálogo finalizado.")
    db.close()

if __name__ == "__main__":
    seed_catalogo()
