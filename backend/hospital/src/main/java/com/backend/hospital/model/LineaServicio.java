package com.backend.hospital.model;

import com.backend.hospital.model.servicios.Servicio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("SERVICIO")
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(callSuper = true)
public class LineaServicio extends LineaDeTransaccion {

    @ManyToOne(optional = false)
    @JoinColumn(name = "servicio_id")
    private Servicio servicio;
}
