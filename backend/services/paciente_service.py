from dao.paciente_dao import PacienteDAO

class PacienteService:
    @staticmethod
    def get_paciente(id_):
        paciente = PacienteDAO.get_by_id(id_)
        if not paciente:
            raise ValueError(f"Paciente con id={id_} no encontrado")
        return paciente

    @staticmethod
    def listar_pacientes():
        return PacienteDAO.get_all()

    @staticmethod
    def crear_paciente(nombres, apellidos, cedula, fecha_ingreso, fecha_alta=None, telefono=None):
        # Podrías validar aquí duplicados de cédula, formatos, etc.
        return PacienteDAO.create(
            nombres=nombres,
            apellidos=apellidos,
            cedula=cedula,
            fecha_ingreso=fecha_ingreso,
            fecha_alta=fecha_alta,
            telefono=telefono
        )

    @staticmethod
    def actualizar_paciente(id_, **kwargs):
        paciente = PacienteService.get_paciente(id_)
        return PacienteDAO.update(paciente, **kwargs)
