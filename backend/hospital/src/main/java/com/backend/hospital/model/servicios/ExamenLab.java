// src/main/java/com/backend/hospital/model/servicios/ExamenLab.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("EXAMEN_LAB")
@Data
@NoArgsConstructor
public class ExamenLab extends Servicio {
    @Column(name = "tipo_examen")
    private String tipoExamen;
}
