from django.db import models
from django.utils import timezone

# -- Estad o global --
class Estado(models.TextChoices):
    DISPONIBLE = 'DISP', 'Disponible'
    DESCARGADO = 'DESC', 'Descargado'
    FACTURADO  = 'FACT', 'Facturado'

# -- Paciente --
class Paciente(models.Model):
    nombres    = models.CharField(max_length=100)
    apellidos  = models.CharField(max_length=100)
    cedula     = models.CharField(max_length=20, unique=True)
    fecha_ing  = models.DateField(default=timezone.now)
    fecha_alt  = models.DateField(null=True, blank=True)
    telefono   = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"

# -- Productos y Servicios --
class Producto(models.Model):
    codigo     = models.CharField(max_length=50, unique=True)
    descripcion= models.CharField(max_length=200)
    precio     = models.DecimalField(max_digits=10, decimal_places=2)
    estado     = models.CharField(max_length=4, choices=Estado.choices, default=Estado.DISPONIBLE)

    def __str__(self):
        return f"{self.codigo} – {self.descripcion}"

class Servicio(models.Model):
    codigo     = models.CharField(max_length=50, unique=True)
    descripcion= models.CharField(max_length=200)
    precio     = models.DecimalField(max_digits=10, decimal_places=2)
    estado     = models.CharField(max_length=4, choices=Estado.choices, default=Estado.DISPONIBLE)

    class Meta:
        abstract = False  # si quieres tabla única, deja así; o cambia a abstract=True y crea subclases

    def __str__(self):
        return f"{self.codigo} – {self.descripcion}"

# Subclases de Servicio para datos específicos
class ExamenLab(Servicio):
    tipo_examen = models.CharField(max_length=100)

class ImagenRayosX(Servicio):
    zona_cuerpo  = models.CharField(max_length=100)

class SuministroMedicamento(Servicio):
    tipo_suministro = models.CharField(max_length=100)

class AtencionMedica(Servicio):
    medico_acargo   = models.CharField(max_length=100)

class ProcedimientoMedico(Servicio):
    procedimiento   = models.CharField(max_length=200)

# -- Documento Transaccional (Base) --
class DocumentoTransaccional(models.Model):
    nro_sri    = models.CharField(max_length=50, unique=True)
    fecha      = models.DateTimeField(default=timezone.now)
    paciente   = models.ForeignKey(Paciente, on_delete=models.PROTECT, related_name="%(class)ss")

    class Meta:
        abstract = True

# -- Descargo y Factura --
class Descargo(DocumentoTransaccional):
    ESTADOS = Estado.choices

    def agregar_servicio(self, item: Servicio, cantidad: int = 1):
        if self.lineas.filter(servicio=item).exists():
            # lógica de actualización de cantidad/precio…
            pass
        else:
            LineaDocumentoTransaccional.objects.create(
                documento_descargo=self,
                servicio=item,
                cantidad=cantidad,
                precio_unitario=item.precio
            )

class Factura(DocumentoTransaccional):
    descargo_original = models.OneToOneField(Descargo, on_delete=models.PROTECT)

    @classmethod
    def facturar_descargo(cls, descargo: Descargo):
        if descargo.lineas.count() == 0 or descargo.lineas.filter(servicio__estado__ne=Estado.DESCARGADO).exists():
            raise ValueError("Solo descargos en estado 'Descargado' pueden facturarse")
        # clonar cabecera
        factura = cls.objects.create(
            nro_sri=f"F-{descargo.nro_sri}",
            paciente=descargo.paciente,
            descargo_original=descargo
        )
        # clonar lineas
        for linea in descargo.lineas.all():
            LineaDocumentoTransaccional.objects.create(
                documento_factura=factura,
                servicio=linea.servicio,
                cantidad=linea.cantidad,
                precio_unitario=linea.precio_unitario
            )
            # actualizar estados
            linea.servicio.estado = Estado.FACTURADO
            linea.servicio.save()
        descargo.paciente.fecha_alt = timezone.now()
        descargo.paciente.save()
        return factura

# -- Líneas genéricas (un solo modelo para ambos) --
class LineaDocumentoTransaccional(models.Model):
    documento_descargo = models.ForeignKey(Descargo, null=True, blank=True, on_delete=models.CASCADE, related_name="lineas")
    documento_factura  = models.ForeignKey(Factura, null=True, blank=True, on_delete=models.CASCADE, related_name="lineas")
    servicio           = models.ForeignKey(Servicio, null=True, blank=True, on_delete=models.PROTECT)
    producto           = models.ForeignKey(Producto, null=True, blank=True, on_delete=models.PROTECT)
    cantidad           = models.PositiveIntegerField(default=1)
    precio_unitario    = models.DecimalField(max_digits=10, decimal_places=2)
