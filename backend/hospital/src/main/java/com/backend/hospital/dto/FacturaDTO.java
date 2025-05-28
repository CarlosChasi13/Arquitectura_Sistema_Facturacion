// src/main/java/com/backend/hospital/dto/FacturaDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.Factura;
import com.backend.hospital.model.EstadoDocumento;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class FacturaDTO {
    private Long id;
    private String nroSri;
    private LocalDate fecha;
    private Long pacienteId;
    private Long descargoOriginalId;
    private EstadoDocumento estado;
    private List<LineaDTO> lineas;

    public static FacturaDTO fromEntity(Factura f) {
        return FacturaDTO.builder()
            .id(f.getId())
            .nroSri(f.getNroSri())
            .fecha(f.getFecha())
            .pacienteId(f.getPaciente().getId())
            .descargoOriginalId(f.getDescargoOriginal().getId())
            .estado(f.getEstado())
            .lineas(
                f.getLineas().stream()
                 .map(LineaDTO::fromEntity)
                 .collect(Collectors.toList())
            )
            .build();
    }
}
