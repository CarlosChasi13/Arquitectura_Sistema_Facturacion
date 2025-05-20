# seed_data.py
#!/usr/bin/env python
import os
import django
from django.utils import timezone

# 1. Configura Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hospital_project.settings")
django.setup()

# 2. Importa los modelos
from billing.models import (
    Paciente, AtencionMedica, Medicamento,
    Descargo, Factura, LineaDocTransaccion
)

def run():
    # Elimina datos previos (opcional)
    LineaDocTransaccion.objects.all().delete()
    Factura.objects.all().delete()
    Descargo.objects.all().delete()
    Paciente.objects.all().delete()
    AtencionMedica.objects.all().delete()
    Medicamento.objects.all().delete()

    # 1) Crea un paciente
    p = Paciente.objects.create(
        idPaciente="P001",
        nombre="Juan Pérez",
        fechaNacimiento="1980-01-01"
    )
    print(f"✅ Paciente creado: {p}")

    # 2) Crea un servicio y un producto
    serv = AtencionMedica.objects.create(
        id="S001",
        descripcion="Consulta General",
        precioUnitario=75.0,
        fechaHora=timezone.now(),
        medico="Dra. López"
    )
    prod = Medicamento.objects.create(
        id="M001",
        descripcion="Paracetamol 500mg",
        precioUnitario=1.5,
        unidadMedida="tableta",
        laboratorio="FarmacosSA"
    )
    print(f"✅ Servicio y Producto creados: {serv}, {prod}")

    # 3) Crea un descargo
    desc = Descargo.objects.create(
        nro="D100",
        fecha=timezone.now(),
        paciente=p
    )
    print(f"✅ Descargo creado: {desc}")

    # 4) Agrega líneas al descargo
    LineaDocTransaccion.objects.create(
        documento=desc,
        item=serv,
        cantidad=2,
        precioUnitario=serv.precioUnitario
    )
    LineaDocTransaccion.objects.create(
        documento=desc,
        item=prod,
        cantidad=10,
        precioUnitario=prod.precioUnitario
    )
    desc.recalcular_total()
    desc.refresh_from_db()
    print(f"✅ Líneas añadidas, total descargo: {desc.valor}")

    # 5) Genera factura desde el descargo
    fac = desc.generar_factura()
    print(f"✅ Factura generada: {fac}, total: {fac.valor}, líneas: {fac.lineas.count()}")

if __name__ == "__main__":
    run()
