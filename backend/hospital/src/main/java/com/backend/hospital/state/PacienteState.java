// src/main/java/com/backend/hospital/state/PacienteState.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public interface PacienteState {
    /**
     * Ejecuta la lógica asociada a este estado en el paciente dado.
     */
    void manejarEstado(Paciente paciente);
}
