// src/main/java/com/backend/hospital/controller/FacturaController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.FacturaDTO;
import com.backend.hospital.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pacientes/{pacienteId}")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService facturaService;

    @PostMapping("/descargos/{descargoId}/facturar")
    public ResponseEntity<FacturaDTO> facturar(
        @PathVariable Long descargoId
    ) {
        FacturaDTO dto = facturaService.facturarDescargo(descargoId);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @GetMapping("/factura")
    public ResponseEntity<FacturaDTO> obtenerFactura(
        @PathVariable Long pacienteId
    ) {
        try {
            FacturaDTO dto = facturaService.getFacturaPorPaciente(pacienteId);
            return ResponseEntity.ok(dto);
        } catch (RuntimeException ex) {
            // si no hay factura, devolvemos 404 en lugar de 500
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .header(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE)
                                 .body(null);
        }
    }
}
