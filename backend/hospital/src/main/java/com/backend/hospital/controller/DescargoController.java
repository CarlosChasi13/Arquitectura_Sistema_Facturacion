// src/main/java/com/backend/hospital/controller/DescargoController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.DescargoDTO;
import com.backend.hospital.service.DescargoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pacientes/{pacienteId}/descargos")
@RequiredArgsConstructor
public class DescargoController {

    private final DescargoService descargoService;

    @GetMapping
    public List<DescargoDTO> listar(@PathVariable Long pacienteId) {
        return descargoService.listarDescargosPorPaciente(pacienteId);
    }

    @PostMapping
    public ResponseEntity<DescargoDTO> crear(
            @PathVariable Long pacienteId,
            @RequestBody(required = false) DescargoDTO dto) {
        DescargoDTO creado = descargoService.crearDescargo(pacienteId, dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creado);
    }

    @PostMapping("/{descargoId}/descargar")
    public ResponseEntity<DescargoDTO> descargar(
            @PathVariable Long pacienteId,
            @PathVariable Long descargoId) {
        DescargoDTO updated = descargoService.descargarDescargo(pacienteId, descargoId);
        return ResponseEntity.ok(updated);
    }
}
