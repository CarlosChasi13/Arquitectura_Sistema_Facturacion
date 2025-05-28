// src/main/java/com/backend/hospital/service/ProductoService.java
package com.backend.hospital.service;

import com.backend.hospital.dto.ProductoDTO;
import java.util.List;

public interface ProductoService {
  List<ProductoDTO> listarProductos();
  ProductoDTO getProducto(Long id);
  ProductoDTO crearProducto(ProductoDTO dto);
  ProductoDTO actualizarProducto(Long id, ProductoDTO dto);
  void borrarProducto(Long id);
}
