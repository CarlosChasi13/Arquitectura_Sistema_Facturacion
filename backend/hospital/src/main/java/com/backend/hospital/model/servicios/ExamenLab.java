package com.backend.hospital.model.servicios;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("EXAMEN_LAB")
public class ExamenLab extends Servicio {
    // Campos propios, p.ej. tipo de examen
}
