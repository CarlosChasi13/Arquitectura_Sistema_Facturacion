from rest_framework import serializers
from .models import Descargo, Factura, LineaDocumentoTransaccional

class LineaSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineaDocumentoTransaccional
        fields = ['servicio', 'producto', 'cantidad', 'precio_unitario']

class DescargoSerializer(serializers.ModelSerializer):
    lineas = LineaSerializer(many=True, read_only=True)
    class Meta:
        model = Descargo
        fields = ['id', 'nro_sri', 'fecha', 'paciente', 'lineas']

class FacturaSerializer(serializers.ModelSerializer):
    lineas = LineaSerializer(many=True, read_only=True)
    class Meta:
        model = Factura
        fields = ['id', 'nro_sri', 'fecha', 'paciente', 'descargo_original', 'lineas']
