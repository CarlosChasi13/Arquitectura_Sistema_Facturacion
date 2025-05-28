// src/main/java/com/backend/hospital/service/PacienteService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.PacienteDTO;
import java.util.List;

public interface PacienteService {
  List<PacienteDTO> listarPacientes();
  PacienteDTO getPaciente(Long id);
  PacienteDTO crearPaciente(PacienteDTO dto);
  PacienteDTO actualizarPaciente(Long id, PacienteDTO dto);
  void borrarPaciente(Long id);
}
