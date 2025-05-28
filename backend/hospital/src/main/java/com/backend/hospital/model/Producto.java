package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "producto")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Producto {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigo;
    private String descripcion;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoDocumento estado;
}
