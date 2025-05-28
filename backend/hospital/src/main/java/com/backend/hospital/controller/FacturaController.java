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
    public FacturaDTO facturar(@PathVariable Long pacienteId,
                               @PathVariable Long descargoId) {
        return facturaService.facturarDescargo(descargoId);
    }

    @GetMapping("/factura")
    public FacturaDTO obtenerFactura(@PathVariable Long pacienteId) {
        return facturaService.getFacturaPorPaciente(pacienteId);
    }
}
