// src/main/java/com/backend/hospital/service/FacturaServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.backend.hospital.dto.FacturaDTO;
import com.backend.hospital.model.Descargo;
import com.backend.hospital.model.Factura;
import com.backend.hospital.model.LineaDeTransaccion;
import com.backend.hospital.model.EstadoDocumento;
import com.backend.hospital.model.Paciente;
import com.backend.hospital.repository.DescargoRepository;
import com.backend.hospital.repository.FacturaRepository;
import com.backend.hospital.repository.LineaDeTransaccionRepository;
import com.backend.hospital.repository.PacienteRepository;

@Service
public class FacturaServiceImpl implements FacturaService {
    private final DescargoRepository descRepo;
    private final FacturaRepository facRepo;
    private final LineaDeTransaccionRepository linRepo;
    private final PacienteRepository pacRepo;

    @Autowired
    public FacturaServiceImpl(
        DescargoRepository descRepo,
        FacturaRepository facRepo,
        LineaDeTransaccionRepository linRepo,
        PacienteRepository pacRepo
    ) {
        this.descRepo = descRepo;
        this.facRepo  = facRepo;
        this.linRepo  = linRepo;
        this.pacRepo  = pacRepo;
    }

    @Override
    @Transactional
    public FacturaDTO facturarDescargo(Long descargoId) {
        // 1) Obtener el descargo y validar estado
        Descargo desc = descRepo.findById(descargoId)
            .orElseThrow(() -> new RuntimeException("Descargo no encontrado"));
        if (desc.getEstado() != EstadoDocumento.DESCARGADO) {
            throw new IllegalStateException("Solo descargos en estado DESCARGADO pueden facturarse");
        }

        // 2) Crear una nueva Factura a partir del Descargo
        Factura nueva = Factura.fromDescargo(desc);
        Factura savedFac = facRepo.save(nueva);

        // 3) Clonar líneas del descargo en la factura
        linRepo.findByDescargoId(descargoId).forEach(ln -> {
            ln.setId(null);                   // forzar inserción de nueva línea
            ln.setFactura(savedFac);
            ln.setDescargo(null);
            linRepo.save(ln);
        });

        // 4) Actualizar estados de descargo y factura
        desc.setEstado(EstadoDocumento.FACTURADO);
        descRepo.save(desc);

        savedFac.setEstado(EstadoDocumento.FACTURADO);
        facRepo.save(savedFac);

        // 5) Devolver DTO
        return FacturaDTO.fromEntity(savedFac);
    }

    @Override
    public FacturaDTO getFacturaPorPaciente(Long pacienteId) {
        // 1) Validar existencia de paciente
        Paciente p = pacRepo.findById(pacienteId)
            .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        // 2) Tomar la última factura del paciente
        return facRepo.findByPacienteId(pacienteId).stream()
            .reduce((a, b) -> a.getId() > b.getId() ? a : b)
            .map(FacturaDTO::fromEntity)
            .orElseThrow(() -> new RuntimeException("No hay facturas para este paciente"));
    }
}
