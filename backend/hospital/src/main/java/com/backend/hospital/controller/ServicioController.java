// src/main/java/com/backend/hospital/controller/ServicioController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.ServicioDTO;
import com.backend.hospital.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
public class ServicioController {

    private final ServicioService servicioService;

    @GetMapping
    public List<ServicioDTO> listar() {
        return servicioService.listarServicios();
    }

    @GetMapping("/{id}")
    public ServicioDTO obtener(@PathVariable Long id) {
        return servicioService.getServicio(id);
    }

    @PostMapping
    public ResponseEntity<ServicioDTO> crear(@RequestBody ServicioDTO dto) {
        ServicioDTO creado = servicioService.crearServicio(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/{id}")
    public ServicioDTO actualizar(@PathVariable Long id,
                                  @RequestBody ServicioDTO dto) {
        return servicioService.actualizarServicio(id, dto);
    }
}
