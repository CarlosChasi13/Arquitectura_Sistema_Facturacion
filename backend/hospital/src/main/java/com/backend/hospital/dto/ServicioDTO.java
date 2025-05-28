// src/main/java/com/backend/hospital/dto/ServicioDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.servicios.Servicio;
import com.backend.hospital.model.EstadoDocumento;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ServicioDTO {
    private Long id;
    private String codigo;
    private String descripcion;
    private Double precioBase;
    private EstadoDocumento estado;
    private String tipo; // el discriminator

    public static ServicioDTO fromEntity(Servicio s) {
        return ServicioDTO.builder()
            .id(s.getId())
            .codigo(s.getCodigo())
            .descripcion(s.getDescripcion())
            .precioBase(s.getPrecioBase())
            .estado(s.getEstado())
            .tipo(s.getClass().getSimpleName())
            .build();
    }

    public Servicio toEntity() {
        // crea la instancia base; si necesitas la subclase, hazlo en el service
        return Servicio.builder()
            .id(this.id)
            .codigo(this.codigo)
            .descripcion(this.descripcion)
            .precioBase(this.precioBase)
            .estado(this.estado)
            .build();
    }
}
