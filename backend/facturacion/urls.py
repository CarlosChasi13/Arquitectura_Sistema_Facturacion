from rest_framework.routers import DefaultRouter
from .views import DescargoViewSet, FacturaViewSet

router = DefaultRouter()
router.register(r'descargos', DescargoViewSet, basename='descargo')
router.register(r'facturas', FacturaViewSet, basename='factura')

urlpatterns = router.urls
