// src/main/java/com/backend/hospital/repository/LineaProductoRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.LineaProducto;

public interface LineaProductoRepository extends JpaRepository<LineaProducto, Long> {}
