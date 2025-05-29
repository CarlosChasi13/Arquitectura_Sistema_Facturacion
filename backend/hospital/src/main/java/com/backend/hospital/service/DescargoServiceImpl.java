// src/main/java/com/backend/hospital/service/DescargoServiceImpl.java
package com.backend.hospital.service;

import com.backend.hospital.dto.DescargoDTO;
import com.backend.hospital.dto.LineaDTO;
import com.backend.hospital.model.*;
import com.backend.hospital.model.servicios.Servicio;
import com.backend.hospital.repository.*;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DescargoServiceImpl implements DescargoService {

    private final DescargoRepository descargoRepo;
    private final PacienteRepository pacienteRepo;
    private final LineaDeTransaccionRepository lineaRepo;
    private final ProductoRepository productoRepo;
    private final ServicioRepository servicioRepo;

    @Override
    public List<DescargoDTO> listarDescargosPorPaciente(Long pacienteId) {
        return descargoRepo.findByPacienteId(pacienteId).stream()
                .map(DescargoDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DescargoDTO crearDescargo(Long pacienteId, DescargoDTO dto) {
        Paciente paciente = pacienteRepo.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
        Descargo descargo = dto.toEntity();
        descargo.setPaciente(paciente);
        descargo.setEstado(EstadoDocumento.PENDIENTE);
        // si el DTO trae nroSri la usamos, si no, generamos una:
        if (descargo.getNroSri() == null) {
            descargo.setNroSri("DS-" + System.currentTimeMillis());
        }
        descargoRepo.save(descargo);
        return DescargoDTO.fromEntity(descargo);
    }

    @Override
    public List<LineaDTO> listarLineas(Long descargoId) {
        return lineaRepo.findByDescargoId(descargoId).stream()
                .map(LineaDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LineaDTO agregarLinea(Long descargoId, LineaDTO dto) {
        Descargo d = descargoRepo.findById(descargoId)
                .orElseThrow(() -> new RuntimeException("Descargo no encontrado"));

        // 1) convertir DTO ↔ entidad
        LineaDeTransaccion ln = dto.toEntity();
        ln.setDescargo(d);

        // 2) asociar producto o servicio
        if (dto.getProductoId() != null) {
            Producto p = productoRepo.findById(dto.getProductoId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
            ((LineaProducto) ln).setProducto(p);

        } else if (dto.getServicioId() != null) {
            Servicio s = servicioRepo.findById(dto.getServicioId())
                    .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));
            ((LineaServicio) ln).setServicio(s);

        } else {
            throw new IllegalArgumentException("Debe indicar productoId o servicioId");
        }

        // 3) guardar y devolver DTO
        LineaDeTransaccion saved = lineaRepo.save(ln);
        return LineaDTO.fromEntity(saved);
    }

    @Override
    @Transactional
    public DescargoDTO descargarDescargo(Long pacienteId, Long descargoId) {
        // 1) validaciones…
        Descargo d = descargoRepo.findById(descargoId)
                .orElseThrow(() -> new RuntimeException("Descargo no encontrado"));
        if (d.getEstado() != EstadoDocumento.PENDIENTE) {
            throw new IllegalStateException("Solo descargos PENDIENTE pueden descargarse");
        }
        // 2) cambiar estado
        d.setEstado(EstadoDocumento.DESCARGADO);
        Descargo saved = descargoRepo.save(d);
        return DescargoDTO.fromEntity(saved);
    }
}
