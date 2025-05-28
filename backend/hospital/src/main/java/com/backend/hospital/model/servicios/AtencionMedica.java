// src/main/java/com/backend/hospital/model/servicios/AtencionMedica.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ATENCION_MEDICA")
@Data
@NoArgsConstructor
public class AtencionMedica extends Servicio {
    // Podrías agregar, por ejemplo:
    // private String doctorEncargado;
}
