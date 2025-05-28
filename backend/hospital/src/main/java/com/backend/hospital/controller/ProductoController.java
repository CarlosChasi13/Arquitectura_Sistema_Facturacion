// src/main/java/com/backend/hospital/controller/ProductoController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.ProductoDTO;
import com.backend.hospital.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public List<ProductoDTO> listar() {
        return productoService.listarProductos();
    }

    @GetMapping("/{id}")
    public ProductoDTO obtener(@PathVariable Long id) {
        return productoService.getProducto(id);
    }

    @PostMapping
    public ResponseEntity<ProductoDTO> crear(@RequestBody ProductoDTO dto) {
        ProductoDTO creado = productoService.crearProducto(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ProductoDTO actualizar(@PathVariable Long id,
                                  @RequestBody ProductoDTO dto) {
        return productoService.actualizarProducto(id, dto);
    }
}
