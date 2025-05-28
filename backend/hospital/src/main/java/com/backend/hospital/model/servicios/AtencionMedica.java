package com.backend.hospital.model.servicios;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("ATENCION_MEDICA")
public class AtencionMedica extends Servicio {
    // Aquí podrías añadir campos específicos de atención médica
}
