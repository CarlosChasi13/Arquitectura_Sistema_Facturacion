package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "descargo")
@Data @EqualsAndHashCode(callSuper = true)
@NoArgsConstructor @AllArgsConstructor @Builder
public class Descargo extends DocumentoTransaccion {

    @OneToMany(
      mappedBy = "descargo",
      cascade = CascadeType.ALL,
      orphanRemoval = true
    )
    private List<LineaDeTransaccion> lineas;

    @Override
    public Descargo clone() {
        Descargo copia = new Descargo();
        copia.setNroSri(this.getNroSri() + "-CLONE");
        copia.setFecha(LocalDate.now());
        copia.setEstado(EstadoDocumento.PENDIENTE);
        copia.setPaciente(this.getPaciente());
        // las líneas se clonan en el servicio de facturación
        return copia;
    }
}
