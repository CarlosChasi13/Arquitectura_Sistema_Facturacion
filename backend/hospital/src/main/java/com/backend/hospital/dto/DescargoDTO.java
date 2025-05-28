// src/main/java/com/backend/hospital/dto/DescargoDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.Descargo;
import com.backend.hospital.model.EstadoDocumento;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DescargoDTO {
    private Long id;
    private String nroSri;
    private LocalDate fecha;
    private Long pacienteId;
    private EstadoDocumento estado;
    private List<LineaDTO> lineas;

    public static DescargoDTO fromEntity(Descargo d) {
        return DescargoDTO.builder()
            .id(d.getId())
            .nroSri(d.getNroSri())
            .fecha(d.getFecha())
            .pacienteId(d.getPaciente().getId())
            .estado(d.getEstado())
            .lineas(
                d.getLineas().stream()
                 .map(LineaDTO::fromEntity)
                 .collect(Collectors.toList())
            )
            .build();
    }

    public Descargo toEntity() {
        Descargo d = new Descargo();
        d.setId(this.id);
        d.setNroSri(this.nroSri);
        d.setFecha(this.fecha);
        d.setEstado(this.estado);
        // las líneas se añaden en el service
        return d;
    }
}
