// src/main/java/com/backend/hospital/controller/LineaDeTransaccionController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.LineaDTO;
import com.backend.hospital.service.DescargoService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/descargos/{descargoId}/lineas")
@RequiredArgsConstructor
public class LineaDeTransaccionController {

    private final DescargoService descargoService;

    @GetMapping
    public List<LineaDTO> listar(@PathVariable Long descargoId) {
        return descargoService.listarLineas(descargoId);
    }

    @PostMapping
    public ResponseEntity<LineaDTO> agregar(
            @PathVariable Long descargoId,
            @RequestBody LineaDTO linea) {
        LineaDTO creada = descargoService.agregarLinea(descargoId, linea);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(creada);
    }
}
