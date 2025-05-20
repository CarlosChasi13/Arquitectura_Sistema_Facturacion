# billing/tests.py

from django.test import TestCase
from django.utils import timezone
from .models import (
    Paciente, Servicio, Producto,
    AtencionMedica, Medicamento,
    Descargo, Factura, LineaDocTransaccion
)

class BillingWorkflowTest(TestCase):

    def setUp(self):
        # 1) Paciente
        self.p = Paciente.objects.create(
            idPaciente="P001",
            nombre="Juan Pérez",
            fechaNacimiento="1980-01-01"
        )

        # 2) ItemCobro: un servicio y un producto
        self.servicio = AtencionMedica.objects.create(
            id="S001",
            descripcion="Consulta general",
            precioUnitario=50.0,
            fechaHora=timezone.now(),
            medico="Dr. López"
        )
        self.producto = Medicamento.objects.create(
            id="M001",
            descripcion="Paracetamol 500mg",
            precioUnitario=2.5,
            unidadMedida="tableta",
            laboratorio="Farmaco"
        )

    def test_descargo_and_factura(self):
        # 3) Crear descargo
        desc = Descargo.objects.create(
            nro="D100",
            fecha=timezone.now(),
            paciente=self.p
        )
        # 4) Añadir líneas al descargo
        LineaDocTransaccion.objects.create(
            documento=desc,
            item=self.servicio,
            cantidad=2,
            precioUnitario=self.servicio.precioUnitario
        )
        LineaDocTransaccion.objects.create(
            documento=desc,
            item=self.producto,
            cantidad=10,
            precioUnitario=self.producto.precioUnitario
        )
        # 5) Recalcular total y refrescar
        desc.recalcular_total()
        desc.refresh_from_db()
        expected_total = 2 * 50.0 + 10 * 2.5
        self.assertAlmostEqual(desc.valor, expected_total)

        # 6) Generar factura desde el descargo
        factura = desc.generar_factura()
        factura.refresh_from_db()

        # 7) La factura debe copiar el total y las líneas
        self.assertEqual(factura.valor, expected_total)
        self.assertEqual(factura.lineas.count(), 2)

        # 8) Comprobar que cada línea de factura coincide
        items = {linea.item.id: linea for linea in factura.lineas.all()}
        self.assertIn(self.servicio.id, items)
        self.assertIn(self.producto.id, items)
        self.assertEqual(items[self.servicio.id].subtotal(), 2 * 50.0)
        self.assertEqual(items[self.producto.id].subtotal(), 10 * 2.5)

        # 9) Estado de la factura
        self.assertEqual(factura.estado, 'GENERADA')
