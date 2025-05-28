// src/main/java/com/backend/hospital/repository/PacienteRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.Paciente;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {}
