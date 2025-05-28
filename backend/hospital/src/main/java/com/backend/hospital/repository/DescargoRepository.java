// src/main/java/com/backend/hospital/repository/DescargoRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.Descargo;
import java.util.List;

public interface DescargoRepository extends JpaRepository<Descargo, Long> {
  List<Descargo> findByPacienteId(Long pacienteId);
}
