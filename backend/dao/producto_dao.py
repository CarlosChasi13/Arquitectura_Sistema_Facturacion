from models.producto import Producto

class ProductoDAO:
    @staticmethod
    def get_by_id(id_):
        return Producto.get_or_none(Producto.id == id_)

    @staticmethod
    def get_all():
        return list(Producto.select())

    @staticmethod
    def get_by_codigo(codigo):
        return Producto.get_or_none(Producto.codigo == codigo)

    @staticmethod
    def create(codigo, descripcion, precio_unitario, estado='DISPONIBLE'):
        return Producto.create(
            codigo=codigo,
            descripcion=descripcion,
            precio_unitario=precio_unitario,
            estado=estado
        )

    @staticmethod
    def update_estado(producto, nuevo_estado):
        producto.estado = nuevo_estado
        producto.save()
        return producto

    @staticmethod
    def update(producto, **kwargs):
        for attr, val in kwargs.items():
            setattr(producto, attr, val)
        producto.save()
        return producto
