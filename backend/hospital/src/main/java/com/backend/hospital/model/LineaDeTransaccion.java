package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "linea_de_transaccion")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_linea")
@Data @NoArgsConstructor @AllArgsConstructor
public abstract class LineaDeTransaccion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cantidad;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @ManyToOne
    @JoinColumn(name = "descargo_id")
    protected Descargo descargo;

    @ManyToOne
    @JoinColumn(name = "factura_id")
    protected Factura factura;
}
