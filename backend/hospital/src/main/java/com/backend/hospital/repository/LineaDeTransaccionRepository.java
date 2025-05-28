// src/main/java/com/backend/hospital/repository/LineaDeTransaccionRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.LineaDeTransaccion;
import java.util.List;

public interface LineaDeTransaccionRepository extends JpaRepository<LineaDeTransaccion, Long> {
  List<LineaDeTransaccion> findByDescargoId(Long descargoId);
  List<LineaDeTransaccion> findByFacturaId(Long facturaId);
}
