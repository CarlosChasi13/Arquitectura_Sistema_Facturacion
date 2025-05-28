// src/main/java/com/backend/hospital/service/ServicioServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.hospital.repository.ServicioRepository;
import com.backend.hospital.dto.ServicioDTO;
import com.backend.hospital.model.servicios.Servicio;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServicioServiceImpl implements ServicioService {
  private final ServicioRepository repo;

  @Autowired
  public ServicioServiceImpl(ServicioRepository repo) {
    this.repo = repo;
  }

  @Override
  public List<ServicioDTO> listarServicios() {
    return repo.findAll().stream()
      .map(ServicioDTO::fromEntity)
      .collect(Collectors.toList());
  }

  @Override
  public ServicioDTO getServicio(Long id) {
    Servicio s = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
    return ServicioDTO.fromEntity(s);
  }

  @Override
  public ServicioDTO crearServicio(ServicioDTO dto) {
    Servicio s = dto.toEntity();
    return ServicioDTO.fromEntity(repo.save(s));
  }

  @Override
  public ServicioDTO actualizarServicio(Long id, ServicioDTO dto) {
    Servicio s = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
    s.setCodigo(dto.getCodigo());
    s.setDescripcion(dto.getDescripcion());
    s.setPrecioBase(dto.getPrecioBase());
    s.setEstado(dto.getEstado());
    return ServicioDTO.fromEntity(repo.save(s));
  }

  @Override
  public void borrarServicio(Long id) {
    repo.deleteById(id);
  }
}
