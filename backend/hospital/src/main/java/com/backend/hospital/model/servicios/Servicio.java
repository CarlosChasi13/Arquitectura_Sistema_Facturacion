package com.backend.hospital.model.servicios;

import jakarta.persistence.*;
import lombok.*;

import com.backend.hospital.model.EstadoDocumento;

@Entity
@Table(name = "servicio")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_servicio")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Servicio {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String descripcion;

    @Column(name = "precio_base")
    private Double precioBase;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoDocumento estado;
}
