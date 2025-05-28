// src/main/java/com/backend/hospital/state/EstadoMuerto.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public class EstadoMuerto implements PacienteState {
    @Override
    public void manejarEstado(Paciente paciente) {
        System.out.println("El paciente ha fallecido.");
        // Lógica para estado muerto
    }
}
