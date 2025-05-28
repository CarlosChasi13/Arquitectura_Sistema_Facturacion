// src/main/java/com/backend/hospital/repository/ServicioRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.servicios.Servicio;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {}
