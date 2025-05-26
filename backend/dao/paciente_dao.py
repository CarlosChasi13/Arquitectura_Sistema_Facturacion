from models.paciente import Paciente

class PacienteDAO:
    @staticmethod
    def get_by_id(id_):
        return Paciente.get_or_none(Paciente.id == id_)

    @staticmethod
    def get_all():
        return list(Paciente.select())

    @staticmethod
    def create(nombres, apellidos, cedula, fecha_nac, estado, telefono=None):
        return Paciente.create(
            nombres=nombres,
            apellidos=apellidos,
            cedula=cedula,
            fecha_nac=fecha_nac,
            estado=estado,
            telefono=telefono
        )

    @staticmethod
    def update(paciente, **kwargs):
        for attr, val in kwargs.items():
            setattr(paciente, attr, val)
        paciente.save()
        return paciente
