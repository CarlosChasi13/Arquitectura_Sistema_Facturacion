package com.backend.hospital.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@DiscriminatorValue("PRODUCTO")
@Data @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode(callSuper = true)
public class LineaProducto extends LineaDeTransaccion {

    @ManyToOne(optional = false)
    @JoinColumn(name = "producto_id")
    private Producto producto;
}
