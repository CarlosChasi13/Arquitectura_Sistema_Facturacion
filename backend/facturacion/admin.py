from django.contrib import admin
from .models import Paciente, Servicio, Producto, Descargo, Factura, LineaDocumentoTransaccional

admin.site.register([Paciente, Servicio, Producto, Descargo, Factura, LineaDocumentoTransaccional])
