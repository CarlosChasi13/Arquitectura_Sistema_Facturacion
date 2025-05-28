package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public abstract class DocumentoTransaccion
        implements Prototype<DocumentoTransaccion> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nro_sri", nullable = false, unique = true)
    private String nroSri;

    @Column(nullable = false)
    private LocalDate fecha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoDocumento estado;

    @ManyToOne(optional = false)
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    /** Cada subclase debe implementar clone() para su tipo concreto **/
    @Override
    public abstract DocumentoTransaccion clone();
}
