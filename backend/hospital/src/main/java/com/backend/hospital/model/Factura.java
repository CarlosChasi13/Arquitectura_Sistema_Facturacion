package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

// src/main/java/com/backend/hospital/model/Factura.java
@Entity
@Table(name = "factura")
@Data @EqualsAndHashCode(callSuper = true)
@NoArgsConstructor @AllArgsConstructor @Builder
public class Factura extends DocumentoTransaccion {
    @ManyToOne(optional = false)
    @JoinColumn(name = "descargo_id")
    private Descargo descargoOriginal;

    @OneToMany(
      mappedBy = "factura",
      cascade = CascadeType.ALL,
      orphanRemoval = true
    )
    private List<LineaDeTransaccion> lineas;

    @Override
    public Factura clone() {
        // sigue clonando solo Factura, no se usa aquí
        Factura copia = new Factura();
        copia.setNroSri(this.getNroSri() + "-FACT");
        copia.setFecha(LocalDate.now());
        copia.setEstado(EstadoDocumento.PENDIENTE);
        copia.setPaciente(this.getPaciente());
        copia.setDescargoOriginal(this.getDescargoOriginal());
        return copia;
    }

    /**
     * Crea una nueva Factura a partir de un Descargo,
     * copiando los campos comunes y dejando el resto para que
     * FacturaServiceImpl llene las líneas.
     */
    public static Factura fromDescargo(Descargo desc) {
        Factura f = new Factura();
        f.setNroSri(desc.getNroSri() + "-F");
        f.setFecha(LocalDate.now());
        f.setEstado(EstadoDocumento.PENDIENTE);
        f.setPaciente(desc.getPaciente());
        f.setDescargoOriginal(desc);
        return f;
    }
}
