package com.backend.hospital.model.servicios;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("IMAGEN_RAYOS_X")
public class ImagenRayosX extends Servicio {
    // Campos propios, p.ej. región del cuerpo
}
