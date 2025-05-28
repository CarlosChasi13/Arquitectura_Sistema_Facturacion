// src/main/java/com/backend/hospital/service/DescargoService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.DescargoDTO;
import com.backend.hospital.dto.LineaDTO;
import java.util.List;

public interface DescargoService {
    List<DescargoDTO> listarDescargosPorPaciente(Long pacienteId);
    DescargoDTO crearDescargo(Long pacienteId, DescargoDTO dto);
    List<LineaDTO> listarLineas(Long descargoId);
    LineaDTO agregarLinea(Long descargoId, LineaDTO linea);
}
