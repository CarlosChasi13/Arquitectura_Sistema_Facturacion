// src/main/java/com/backend/hospital/service/FacturaService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.FacturaDTO;

public interface FacturaService {
  FacturaDTO facturarDescargo(Long descargoId);
  FacturaDTO getFacturaPorPaciente(Long pacienteId);
}
