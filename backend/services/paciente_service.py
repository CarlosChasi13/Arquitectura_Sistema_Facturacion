from dao.paciente_dao import PacienteDAO

class PacienteService:
    @staticmethod
    def listar_pacientes():
        return PacienteDAO.get_all()

    @staticmethod
    def get_paciente(id_):
        paciente = PacienteDAO.get_by_id(id_)
        if not paciente:
            raise ValueError(f"Paciente con id={id_} no encontrado")
        return paciente

    @staticmethod
    def crear_paciente(nombres, apellidos, cedula, fecha_nac, estado, telefono=None):
        # aquí podrías validar duplicados o formatos
        return PacienteDAO.create(nombres, apellidos, cedula, fecha_nac, estado, telefono)

    @staticmethod
    def actualizar_paciente(id_, **kwargs):
        paciente = PacienteService.get_paciente(id_)
        return PacienteDAO.update(paciente, **kwargs)
