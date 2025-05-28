// src/main/java/com/backend/hospital/model/servicios/ImagenRayosX.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("IMAGEN_RAYOS_X")
@Data
@NoArgsConstructor
public class ImagenRayosX extends Servicio {
    @Column(name = "region_cuerpo")
    private String regionCuerpo;
}
