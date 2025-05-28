// src/main/java/com/backend/hospital/repository/FacturaRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.Factura;
import java.util.List;

public interface FacturaRepository extends JpaRepository<Factura, Long> {
  List<Factura> findByPacienteId(Long pacienteId);
}
