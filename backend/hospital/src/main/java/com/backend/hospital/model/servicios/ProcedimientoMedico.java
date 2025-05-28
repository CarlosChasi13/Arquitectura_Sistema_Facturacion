// src/main/java/com/backend/hospital/model/servicios/ProcedimientoMedico.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("PROCEDIMIENTO_MEDICO")
@Data
@NoArgsConstructor
public class ProcedimientoMedico extends Servicio {
    @Column(name = "duracion_minutos")
    private Integer duracionMinutos;
}
