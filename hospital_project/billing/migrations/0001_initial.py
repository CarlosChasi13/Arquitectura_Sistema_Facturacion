# Generated by Django 5.2.1 on 2025-05-15 13:07

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DocumentoTransaccional',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nro', models.CharField(max_length=20, unique=True)),
                ('fecha', models.DateTimeField(default=django.utils.timezone.now)),
                ('valor', models.FloatField(default=0)),
                ('estado', models.CharField(choices=[('ABIERTO', 'Abierto'), ('GENERADA', 'Generada'), ('CERRADO', 'Cerrado')], default='ABIERTO', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='ItemCobro',
            fields=[
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=200)),
                ('precioUnitario', models.FloatField()),
            ],
            options={
                'verbose_name': 'Item de Cobro',
                'verbose_name_plural': 'Items de Cobro',
            },
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('idPaciente', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=100)),
                ('fechaNacimiento', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Descargo',
            fields=[
                ('documentotransaccional_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.documentotransaccional')),
            ],
            bases=('billing.documentotransaccional',),
        ),
        migrations.CreateModel(
            name='Factura',
            fields=[
                ('documentotransaccional_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.documentotransaccional')),
            ],
            bases=('billing.documentotransaccional',),
        ),
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('itemcobro_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.itemcobro')),
                ('unidadMedida', models.CharField(max_length=50)),
            ],
            bases=('billing.itemcobro',),
        ),
        migrations.CreateModel(
            name='Servicio',
            fields=[
                ('itemcobro_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.itemcobro')),
                ('fechaHora', models.DateTimeField(default=django.utils.timezone.now)),
            ],
            bases=('billing.itemcobro',),
        ),
        migrations.CreateModel(
            name='LineaDocTransaccion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cantidad', models.PositiveIntegerField()),
                ('precioUnitario', models.FloatField()),
                ('documento', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lineas', to='billing.documentotransaccional')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='billing.itemcobro')),
            ],
        ),
        migrations.AddField(
            model_name='documentotransaccional',
            name='paciente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)ss', to='billing.paciente'),
        ),
        migrations.CreateModel(
            name='Insumo',
            fields=[
                ('producto_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.producto')),
                ('proveedor', models.CharField(max_length=100)),
            ],
            bases=('billing.producto',),
        ),
        migrations.CreateModel(
            name='Medicamento',
            fields=[
                ('producto_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.producto')),
                ('laboratorio', models.CharField(max_length=100)),
            ],
            bases=('billing.producto',),
        ),
        migrations.CreateModel(
            name='AtencionMedica',
            fields=[
                ('servicio_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.servicio')),
                ('medico', models.CharField(max_length=100)),
            ],
            bases=('billing.servicio',),
        ),
        migrations.CreateModel(
            name='ExamenLaboratorio',
            fields=[
                ('servicio_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.servicio')),
            ],
            bases=('billing.servicio',),
        ),
        migrations.CreateModel(
            name='ImagenRayoX',
            fields=[
                ('servicio_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.servicio')),
                ('rutaImagen', models.CharField(max_length=200)),
            ],
            bases=('billing.servicio',),
        ),
        migrations.CreateModel(
            name='ProcedimientoMedico',
            fields=[
                ('servicio_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.servicio')),
                ('enfermera', models.CharField(max_length=100)),
            ],
            bases=('billing.servicio',),
        ),
        migrations.CreateModel(
            name='SuministroMedicamento',
            fields=[
                ('servicio_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='billing.servicio')),
                ('lote', models.CharField(max_length=50)),
            ],
            bases=('billing.servicio',),
        ),
    ]
