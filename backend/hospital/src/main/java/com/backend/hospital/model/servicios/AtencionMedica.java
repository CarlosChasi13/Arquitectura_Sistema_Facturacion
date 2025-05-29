// src/main/java/com/backend/hospital/model/servicios/AtencionMedica.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("ATENCION_MEDICA")
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AtencionMedica extends Servicio {
    /**
     * Nombre del doctor encargado de esta atención.
     */
    @Column(name = "doctor_encargado")
    private String doctorEncargado;
    
    // Podrías agregar otros campos específicos aquí...
}
