// src/main/java/com/backend/hospital/model/Paciente.java
package com.backend.hospital.model;

import com.backend.hospital.state.*;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

/**
 * Entidad Paciente que persiste un estado (enum) y mantiene en memoria
 * un objeto PacienteState para la lógica de comportamiento.
 */
@Entity
@Table(name = "paciente")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Paciente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;
    private String apellidos;
    private String cedula;

    /** Persistimos el estado como un enum en base de datos */
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", length = 20, nullable = false)
    private PacienteStatus estado;

    /** Comportamiento de estado en memoria, no persistido */
    @Transient
    private PacienteState estadoBehavior;

    @Column(name = "fecha_nac")
    private LocalDate fechaNac;

    private String telefono;

    /** Inicializa el objeto de comportamiento tras cargar o guardar */
    @PostLoad @PostPersist @PostUpdate
    private void initEstadoBehavior() {
        switch (this.estado) {
            case BUENO:
                this.estadoBehavior = new EstadoBueno();
                break;
            case REGULAR:
                this.estadoBehavior = new EstadoRegular();
                break;
            case SERIO:
                this.estadoBehavior = new EstadoSerio();
                break;
            case CRITICO:
                this.estadoBehavior = new EstadoCritico();
                break;
            case MUERTO:
                this.estadoBehavior = new EstadoMuerto();
                break;
            case INDETERMINADO:
            default:
                this.estadoBehavior = new EstadoIndeterminado();
                break;
        }
    }

    /**
     * Cambia el estado del paciente: actualiza el enum persistido
     * y dispara la lógica del nuevo estado.
     */
    public void cambiarEstado(PacienteStatus nuevoEstado) {
        this.estado = nuevoEstado;
        initEstadoBehavior();
        this.estadoBehavior.manejarEstado(this);
    }
}
