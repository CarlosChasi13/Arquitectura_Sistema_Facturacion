// src/main/java/com/backend/hospital/service/LineaDeTransaccionService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.LineaDTO;
import java.util.List;

public interface LineaDeTransaccionService {
  List<LineaDTO> listarLineasDescargo(Long descargoId);
  List<LineaDTO> listarLineasFactura(Long facturaId);
  LineaDTO agregarLineaADescargo(Long descargoId, LineaDTO dto);
  LineaDTO agregarLineaAFactura(Long facturaId, LineaDTO dto);
}
