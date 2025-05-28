// src/main/java/com/backend/hospital/dto/ProductoDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.Producto;
import com.backend.hospital.model.EstadoDocumento;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductoDTO {
    private Long id;
    private String codigo;
    private String descripcion;
    private Double precioUnitario;
    private EstadoDocumento estado;

    public static ProductoDTO fromEntity(Producto p) {
        return ProductoDTO.builder()
            .id(p.getId())
            .codigo(p.getCodigo())
            .descripcion(p.getDescripcion())
            .precioUnitario(p.getPrecioUnitario())
            .estado(p.getEstado())
            .build();
    }

    public Producto toEntity() {
        return Producto.builder()
            .id(this.id)
            .codigo(this.codigo)
            .descripcion(this.descripcion)
            .precioUnitario(this.precioUnitario)
            .estado(this.estado)
            .build();
    }
}
