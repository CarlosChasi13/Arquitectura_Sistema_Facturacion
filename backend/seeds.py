# backend/seeds.py

import random
from datetime import date, timedelta
from core.database import db
from models.paciente import Paciente
from models.producto import Producto
from models.servicio import Servicio
from models.descargo import Descargo
from models.detalle_descargo import DetalleDescargo
from models.factura import Factura
from models.detalle_factura import DetalleFactura

def seed_database():
    # Conectar y crear tablas (si no existen)
    db.connect()
    db.create_tables([
        Paciente, Producto, Servicio,
        Descargo, DetalleDescargo,
        Factura, DetalleFactura
    ])

    print("🟢 Tablas creadas / existentes")

    # 1) Pacientes
    pacientes_data = [
        {"nombres": "Juan",    "apellidos": "Pérez",      "cedula":"0102030405", "fecha_nac": date(1980,5,10), "estado":"Internado", "telefono":"0987654321"},
        {"nombres": "María",   "apellidos": "García",     "cedula":"0607080910", "fecha_nac": date(1990,8,22), "estado":"Alta",       "telefono":"0991122334"},
        {"nombres": "Carlos",  "apellidos": "Rodríguez",  "cedula":"1122334455", "fecha_nac": date(1975,2,14), "estado":"Internado", "telefono":"0983344556"},
    ]
    pacientes = []
    for p in pacientes_data:
        obj, created = Paciente.get_or_create(
            cedula=p["cedula"],
            defaults={
                "nombres":    p["nombres"],
                "apellidos":  p["apellidos"],
                "fecha_nac":  p["fecha_nac"],
                "estado":     p["estado"],
                "telefono":   p["telefono"],
            }
        )
        pacientes.append(obj)
    print(f"🟢 Insertados {len(pacientes)} pacientes")

    # 2) Catálogo de Productos
    productos_data = [
        {"codigo":"MED-ABC", "descripcion":"Medicamento ABC",     "precio_unitario":20.0},
        {"codigo":"COM-HOSP","descripcion":"Comida Hospitalaria", "precio_unitario":30.0},
        {"codigo":"MAT-QUIR","descripcion":"Material Quirúrgico",  "precio_unitario":15.0},
    ]
    productos = []
    for pd in productos_data:
        obj, created = Producto.get_or_create(
            codigo=pd["codigo"],
            defaults={
                "descripcion":     pd["descripcion"],
                "precio_unitario": pd["precio_unitario"],
                "estado":          "DISPONIBLE",
            }
        )
        productos.append(obj)
    print(f"🟢 Insertados {len(productos)} productos")

    # 3) Catálogo de Servicios
    servicios_data = [
        {"codigo":"SERV-AT",   "descripcion":"Atención Médica",       "tipo":"ATENCION_MEDICA",  "meta":{},           "precio_base":100.0},
        {"codigo":"SERV-LAB",  "descripcion":"Examen de Laboratorio",  "tipo":"LABORATORIO",      "meta":{"tipo_examen":"sangre"}, "precio_base":50.0},
        {"codigo":"SERV-RX",   "descripcion":"Imágenes Rayos X",       "tipo":"RAYOS_X",          "meta":{"zona_cuerpo":"torax"},   "precio_base":80.0},
        {"codigo":"SERV-PRO",  "descripcion":"Procedimiento Médico",   "tipo":"PROCEDIMIENTO",    "meta":{"procedimiento":"suturar"}, "precio_base":120.0},
    ]
    servicios = []
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
        servicios.append(obj)
    print(f"🟢 Insertados {len(servicios)} servicios")

    # 4) Un descargo de ejemplo para el primer paciente
    paciente = pacientes[0]
    nro_sri_desc = "001-001-000000001"
    desc, created = Descargo.get_or_create(
        nro_sri=nro_sri_desc,
        paciente=paciente,
        defaults={
            "fecha": date.today() - timedelta(days=1),
            "estado":"DESCARGADO",
        }
    )

    # 5) Detalles del descargo (líneas)
    #   - 2 unidades de Medicamento ABC
    #   - 1 examen de laboratorio
    DetalleDescargo.get_or_create(
        descargo=desc,
        producto=productos[0],
        servicio=None,
        defaults={"cantidad":2, "precio_unitario":productos[0].precio_unitario}
    )
    DetalleDescargo.get_or_create(
        descargo=desc,
        producto=None,
        servicio=servicios[1],
        defaults={"cantidad":1, "precio_unitario":servicios[1].precio_base}
    )
    print("🟢 Descargo y líneas de ejemplo insertados")

    # 6) Clonar el descargo en una factura
    nro_sri_fac = "001-001-000000001-F"
    fact = desc.clone(nro_sri_fac)
    # Si quieres también guardarlo en tabla Factura explícita:
    Factura.create(
        nro_sri=nro_sri_fac,
        fecha=date.today(),
        estado="FACTURADO",
        descargo_original=desc
    )
    # Y las líneas en DetalleFactura
    for ld in desc.lineas_descargo:
        DetalleFactura.create(
            factura=fact,
            producto=ld.producto,
            servicio=ld.servicio,
            cantidad=ld.cantidad,
            precio_unitario=ld.precio_unitario
        )
    print("🟢 Factura de ejemplo creada a partir del descargo")

    print("✅ Seed completado.")

if __name__ == "__main__":
    seed_database()
    db.close()
