// src/main/java/com/backend/hospital/model/servicios/SuministroMedicamento.java
package com.backend.hospital.model.servicios;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("SUMINISTRO_MEDICAMENTO")
@Data
@NoArgsConstructor
public class SuministroMedicamento extends Servicio {
    @Column(name = "numero_lote")
    private String numeroLote;
}
