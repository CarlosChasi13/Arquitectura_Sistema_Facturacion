// src/main/java/com/backend/hospital/service/ProductoServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.backend.hospital.repository.ProductoRepository;
import com.backend.hospital.dto.ProductoDTO;
import com.backend.hospital.model.Producto;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductoServiceImpl implements ProductoService {
  private final ProductoRepository repo;

  @Autowired
  public ProductoServiceImpl(ProductoRepository repo) {
    this.repo = repo;
  }

  @Override
  public List<ProductoDTO> listarProductos() {
    return repo.findAll().stream()
      .map(ProductoDTO::fromEntity)
      .collect(Collectors.toList());
  }

  @Override
  public ProductoDTO getProducto(Long id) {
    Producto p = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    return ProductoDTO.fromEntity(p);
  }

  @Override
  public ProductoDTO crearProducto(ProductoDTO dto) {
    Producto p = dto.toEntity();
    return ProductoDTO.fromEntity(repo.save(p));
  }

  @Override
  public ProductoDTO actualizarProducto(Long id, ProductoDTO dto) {
    Producto p = repo.findById(id)
      .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    p.setCodigo(dto.getCodigo());
    p.setDescripcion(dto.getDescripcion());
    p.setPrecioUnitario(dto.getPrecioUnitario());
    p.setEstado(dto.getEstado());
    return ProductoDTO.fromEntity(repo.save(p));
  }

  @Override
  public void borrarProducto(Long id) {
    repo.deleteById(id);
  }
}
