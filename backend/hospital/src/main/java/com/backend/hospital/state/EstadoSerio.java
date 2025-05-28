// src/main/java/com/backend/hospital/state/EstadoSerio.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public class EstadoSerio implements PacienteState {
    @Override
    public void manejarEstado(Paciente paciente) {
        System.out.println("El paciente está en estado serio.");
        // Lógica para estado serio
    }
}
