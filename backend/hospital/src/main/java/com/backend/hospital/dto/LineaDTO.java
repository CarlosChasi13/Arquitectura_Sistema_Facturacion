// src/main/java/com/backend/hospital/dto/LineaDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.*;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class LineaDTO {
    private Long id;
    private Long descargoId;
    private Long facturaId;
    private Long productoId;
    private Long servicioId;
    private Integer cantidad;
    private Double precioUnitario;

    public static LineaDTO fromEntity(LineaDeTransaccion ln) {
        LineaDTO dto = LineaDTO.builder()
            .id(ln.getId())
            .cantidad(ln.getCantidad())
            .precioUnitario(ln.getPrecioUnitario())
            .build();

        if (ln.getDescargo() != null) dto.setDescargoId(ln.getDescargo().getId());
        if (ln.getFactura()  != null) dto.setFacturaId(ln.getFactura().getId());
        if (ln instanceof LineaProducto) {
            dto.setProductoId(((LineaProducto) ln).getProducto().getId());
        } else if (ln instanceof LineaServicio) {
            dto.setServicioId(((LineaServicio) ln).getServicio().getId());
        }
        return dto;
    }

    public LineaDeTransaccion toEntity() {
        LineaDeTransaccion ln;
        if (this.productoId != null) {
            ln = new LineaProducto();
        } else {
            ln = new LineaServicio();
        }
        ln.setId(this.id);
        ln.setCantidad(this.cantidad);
        ln.setPrecioUnitario(this.precioUnitario);
        return ln;
    }
}
