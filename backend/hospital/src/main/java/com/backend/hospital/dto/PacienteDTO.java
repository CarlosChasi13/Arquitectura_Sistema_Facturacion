// src/main/java/com/backend/hospital/dto/PacienteDTO.java
package com.backend.hospital.dto;

import com.backend.hospital.model.*;
import lombok.*;
import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class PacienteDTO {
    private Long id;
    private String nombres;
    private String apellidos;
    private String cedula;
    private LocalDate fechaNac;
    private String telefono;
    private PacienteStatus estado;

    public static PacienteDTO fromEntity(Paciente p) {
        return PacienteDTO.builder()
            .id(p.getId())
            .nombres(p.getNombres())
            .apellidos(p.getApellidos())
            .cedula(p.getCedula())
            .fechaNac(p.getFechaNac())
            .telefono(p.getTelefono())
            .estado(p.getEstado())
            .build();
    }

    public Paciente toEntity() {
        // NOTA: el servicio le pondrá el estado por defecto
        return Paciente.builder()
            .id(this.id)
            .nombres(this.nombres)
            .apellidos(this.apellidos)
            .cedula(this.cedula)
            .fechaNac(this.fechaNac)
            .telefono(this.telefono)
            .build();
    }
}
