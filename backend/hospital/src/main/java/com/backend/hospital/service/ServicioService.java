// src/main/java/com/backend/hospital/service/ServicioService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.ServicioDTO;
import java.util.List;

public interface ServicioService {
  List<ServicioDTO> listarServicios();
  ServicioDTO getServicio(Long id);
  ServicioDTO crearServicio(ServicioDTO dto);
  ServicioDTO actualizarServicio(Long id, ServicioDTO dto);
  void borrarServicio(Long id);
}
