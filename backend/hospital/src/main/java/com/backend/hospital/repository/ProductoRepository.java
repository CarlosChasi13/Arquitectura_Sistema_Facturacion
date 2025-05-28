// src/main/java/com/backend/hospital/repository/ProductoRepository.java
package com.backend.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.hospital.model.Producto;

public interface ProductoRepository extends JpaRepository<Producto, Long> {}
