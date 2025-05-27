from models.servicio import Servicio

class ServicioDAO:
    @staticmethod
    def get_by_id(id_):
        return Servicio.get_or_none(Servicio.id == id_)

    @staticmethod
    def get_all():
        return list(Servicio.select())

    @staticmethod
    def create(codigo, descripcion, precio_base, estado='DISPONIBLE'):
        return Servicio.create(
            codigo=codigo,
            descripcion=descripcion,
            precio_base=precio_base,
            estado=estado
        )

    @staticmethod
    def update_estado(servicio, nuevo_estado):
        servicio.estado = nuevo_estado
        servicio.save()
        return servicio
