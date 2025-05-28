// src/main/java/com/backend/hospital/dto/DescargoUpdateDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.EstadoDocumento;
import lombok.*;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class DescargoUpdateDTO {
    private String nroSri;
    private EstadoDocumento estado;
}
