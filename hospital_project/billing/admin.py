from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import (
    Paciente, Descargo, Factura,
    LineaDocTransaccion, Servicio, Producto,
    AtencionMedica, ExamenLaboratorio, ImagenRayoX,
    SuministroMedicamento, ProcedimientoMedico,
    Medicamento, Insumo
)

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('idPaciente', 'nombre', 'fechaNacimiento')

@admin.register(Descargo)
class DescargoAdmin(admin.ModelAdmin):
    list_display = ('nro', 'paciente', 'fecha', 'valor', 'estado')

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ('nro', 'paciente', 'fecha', 'valor', 'estado')

@admin.register(LineaDocTransaccion)
class LineaAdmin(admin.ModelAdmin):
    list_display = ('documento', 'item', 'cantidad', 'precioUnitario')

# Registra los tipos de Servicio y Producto
admin.site.register(Servicio)
admin.site.register(Producto)
admin.site.register(AtencionMedica)
admin.site.register(ExamenLaboratorio)
admin.site.register(ImagenRayoX)
admin.site.register(SuministroMedicamento)
admin.site.register(ProcedimientoMedico)
admin.site.register(Medicamento)
admin.site.register(Insumo)
