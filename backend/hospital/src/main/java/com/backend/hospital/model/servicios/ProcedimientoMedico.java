package com.backend.hospital.model.servicios;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("PROCEDIMIENTO_MEDICO")
public class ProcedimientoMedico extends Servicio {
    // Campos propios, p.ej. duración estimada
}
