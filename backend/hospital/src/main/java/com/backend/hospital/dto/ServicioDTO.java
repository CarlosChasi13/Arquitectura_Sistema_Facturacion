// src/main/java/com/backend/hospital/dto/ServicioDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.servicios.AtencionMedica;
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
    private String estado;           // guardamos el enum como String
    private String tipo;             // discriminator (p.ej. "ATENCION_MEDICA", etc.)
    private String doctorEncargado;  // sólo para AtencionMedica

    /**
     * Convierte una entidad Servicio (o subclase) a DTO
     */
    public static ServicioDTO fromEntity(Servicio s) {
        ServicioDTOBuilder b = ServicioDTO.builder()
            .id(s.getId())
            .codigo(s.getCodigo())
            .descripcion(s.getDescripcion())
            .precioBase(s.getPrecioBase())
            .estado(s.getEstado().name())
            .tipo(s.getClass().getAnnotation(
                 jakarta.persistence.DiscriminatorValue.class
              ).value());

        // si es AtencionMedica, incluimos doctorEncargado
        if (s instanceof AtencionMedica am) {
            b.doctorEncargado(am.getDoctorEncargado());
        }

        return b.build();
    }

    /**
     * Convierte este DTO en una instancia (base) de Servicio.
     * La subclase concreta se debe instanciar luego en el service.
     */
    public Servicio toEntity() {
        Servicio s = new Servicio();
        s.setId(this.id);
        s.setCodigo(this.codigo);
        s.setDescripcion(this.descripcion);
        s.setPrecioBase(this.precioBase);
        s.setEstado(
            com.backend.hospital.model.EstadoDocumento.valueOf(this.estado)
        );
        // doctorEncargado no va aquí, se asigna tras hacer el instanceof
        return s;
    }
}
