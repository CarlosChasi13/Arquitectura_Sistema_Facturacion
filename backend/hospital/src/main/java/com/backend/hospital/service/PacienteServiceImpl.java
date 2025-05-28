// src/main/java/com/backend/hospital/service/PacienteServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.hospital.repository.PacienteRepository;
import com.backend.hospital.dto.PacienteDTO;
import com.backend.hospital.model.Paciente;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteServiceImpl implements PacienteService {
  private final PacienteRepository repo;

  @Autowired
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
  public PacienteDTO crearPaciente(PacienteDTO dto) {
    Paciente p = dto.toEntity();
    return PacienteDTO.fromEntity(repo.save(p));
  }

  @Override
  public PacienteDTO actualizarPaciente(Long id, PacienteDTO dto) {
    Paciente p = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    p.setNombres(dto.getNombres());
    p.setApellidos(dto.getApellidos());
    p.setCedula(dto.getCedula());
    p.setFechaNac(dto.getFechaNac());
    p.setTelefono(dto.getTelefono());
    return PacienteDTO.fromEntity(repo.save(p));
  }

  @Override
  public void borrarPaciente(Long id) {
    repo.deleteById(id);
  }
}
