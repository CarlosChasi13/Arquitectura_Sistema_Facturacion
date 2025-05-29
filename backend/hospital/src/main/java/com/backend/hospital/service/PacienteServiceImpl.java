// src/main/java/com/backend/hospital/service/PacienteServiceImpl.java
package com.backend.hospital.service;

import com.backend.hospital.dto.PacienteDTO;
import com.backend.hospital.model.*;
import com.backend.hospital.repository.PacienteRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PacienteServiceImpl implements PacienteService {
  private final PacienteRepository repo;

  public PacienteServiceImpl(PacienteRepository repo) {
    this.repo = repo;
  }

  @Override
  public List<PacienteDTO> listarPacientes() {
    return repo.findAll().stream()
      .map(PacienteDTO::fromEntity)
      .collect(Collectors.toList());
  }

  @Override
  public PacienteDTO getPaciente(Long id) {
    Paciente p = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    return PacienteDTO.fromEntity(p);
  }

  @Override
  @Transactional
  public PacienteDTO crearPaciente(PacienteDTO dto) {
    // Convertimos DTO → entidad sin estado
    Paciente p = dto.toEntity();
    // Asignamos el estado por defecto
    p.setEstado(PacienteStatus.INDETERMINADO);
    // guardamos y devolvemos DTO
    Paciente saved = repo.save(p);
    return PacienteDTO.fromEntity(saved);
  }

  @Override
  @Transactional
  public PacienteDTO actualizarPaciente(Long id, PacienteDTO dto) {
    Paciente p = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    p.setNombres(dto.getNombres());
    p.setApellidos(dto.getApellidos());
    p.setCedula(dto.getCedula());
    p.setFechaNac(dto.getFechaNac());
    p.setTelefono(dto.getTelefono());
    // opcional: permitir cambiar manualmente el estado vía DTO
    if (dto.getEstado() != null) {
      p.setEstado(dto.getEstado());
    }
    Paciente saved = repo.save(p);
    return PacienteDTO.fromEntity(saved);
  }

  @Override
  @Transactional
  public void borrarPaciente(Long id) {
    repo.deleteById(id);
  }
}
