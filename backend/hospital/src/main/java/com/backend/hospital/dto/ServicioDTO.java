// src/main/java/com/backend/hospital/dto/ServicioDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.EstadoDocumento;
import com.backend.hospital.model.servicios.Servicio;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ServicioDTO {
    private Long id;
    private String codigo;
    private String descripcion;
    private Double precioBase;
    private EstadoDocumento estado;  // Ya es un enum
    private String tipo;             // p.ej. "EXAMEN_LAB"

    public static ServicioDTO fromEntity(Servicio s) {
        return ServicioDTO.builder()
            .id(s.getId())
            .codigo(s.getCodigo())
            .descripcion(s.getDescripcion())
            .precioBase(s.getPrecioBase())
            .estado(s.getEstado())
            .tipo(s.getClass().getAnnotation(
                   jakarta.persistence.DiscriminatorValue.class
                 ).value())
            .build();
    }

    // No necesitas toEntity aquí si delegas la creación de la subclase al service
}
