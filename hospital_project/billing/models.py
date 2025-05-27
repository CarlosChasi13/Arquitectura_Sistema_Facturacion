# billing/models.py

from django.db import models
from django.utils import timezone

class Paciente(models.Model):
    idPaciente = models.CharField(max_length=20, primary_key=True)
    nombre = models.CharField(max_length=100)
    fechaNacimiento = models.DateField()

    def __str__(self):
        return f"{self.nombre} ({self.idPaciente})"


class DocumentoTransaccional(models.Model):
    ESTADOS = [
        ('ABIERTO', 'Abierto'),
        ('GENERADA', 'Generada'),
        ('CERRADO', 'Cerrado'),
    ]
    nro = models.CharField(max_length=20, unique=True)
    fecha = models.DateTimeField(default=timezone.now)
    valor = models.FloatField(default=0)
    estado = models.CharField(max_length=10, choices=ESTADOS, default='ABIERTO')
    paciente = models.ForeignKey(
        Paciente,
        related_name='%(class)ss',
        on_delete=models.CASCADE
    )

    def add_linea(self, linea):
        linea.documento = self
        linea.save()
        self.recalcular_total()

    def recalcular_total(self):
        total = sum(l.subtotal() for l in self.lineas.all())
        self.valor = total
        self.save()


class Descargo(DocumentoTransaccional):
    def generar_factura(self):
        from .models import Factura, LineaDocTransaccion
        fac = Factura.objects.create(
            nro=f"F{self.nro}",
            fecha=timezone.now(),
            paciente=self.paciente,
            estado='GENERADA'
        )
        for ld in self.lineas.all():
            LineaDocTransaccion.objects.create(
                documento=fac,
                cantidad=ld.cantidad,
                precioUnitario=ld.precioUnitario,
                item=ld.item
            )
        fac.recalcular_total()
        return fac



class Factura(DocumentoTransaccional):
    pass


class ItemCobro(models.Model):
    id = models.CharField(max_length=20, primary_key=True)
    descripcion = models.CharField(max_length=200)
    precioUnitario = models.FloatField()

    def get_precio(self) -> float:
        return self.precioUnitario

    class Meta:
        verbose_name = "Item de Cobro"
        verbose_name_plural = "Items de Cobro"


class Servicio(ItemCobro):
    fechaHora = models.DateTimeField(default=timezone.now)

    def registrar(self):
        # Implementar lógica de registro si es necesario
        pass


class Producto(ItemCobro):
    unidadMedida = models.CharField(max_length=50)


class LineaDocTransaccion(models.Model):
    cantidad = models.PositiveIntegerField()
    precioUnitario = models.FloatField()
    documento = models.ForeignKey(
        DocumentoTransaccional,
        related_name='lineas',
        on_delete=models.CASCADE
    )
    item = models.ForeignKey(
        ItemCobro,
        on_delete=models.PROTECT
    )

    def subtotal(self) -> float:
        return self.cantidad * self.precioUnitario


class AtencionMedica(Servicio):
    medico = models.CharField(max_length=100)


class ExamenLaboratorio(Servicio):
    # Agregar campos específicos si hace falta
    pass


class ImagenRayoX(Servicio):
    rutaImagen = models.CharField(max_length=200)


class SuministroMedicamento(Servicio):
    lote = models.CharField(max_length=50)


class ProcedimientoMedico(Servicio):
    enfermera = models.CharField(max_length=100)


class Medicamento(Producto):
    laboratorio = models.CharField(max_length=100)


class Insumo(Producto):
    proveedor = models.CharField(max_length=100)
