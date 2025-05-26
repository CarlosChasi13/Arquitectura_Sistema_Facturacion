from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Descargo, Factura
from .serializers import DescargoSerializer, FacturaSerializer

class DescargoViewSet(viewsets.ModelViewSet):
    queryset = Descargo.objects.all()
    serializer_class = DescargoSerializer

    @action(detail=True, methods=['post'])
    def facturar(self, request, pk=None):
        descargo = self.get_object()
        try:
            factura = Factura.facturar_descargo(descargo)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(FacturaSerializer(factura).data, status=status.HTTP_201_CREATED)

class FacturaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Factura.objects.all()
    serializer_class = FacturaSerializer
