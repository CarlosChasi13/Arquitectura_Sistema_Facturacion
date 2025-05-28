package com.backend.hospital.model.servicios;

import jakarta.persistence.Entity;
import jakarta.persistence.DiscriminatorValue;

@Entity
@DiscriminatorValue("SUMINISTRO_MEDICAMENTO")
public class SuministroMedicamento extends Servicio {
    // Campos propios, p.ej. lote del medicamento
}
