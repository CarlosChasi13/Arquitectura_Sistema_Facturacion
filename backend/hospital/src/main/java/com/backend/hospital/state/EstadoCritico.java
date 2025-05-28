// src/main/java/com/backend/hospital/state/EstadoCritico.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public class EstadoCritico implements PacienteState {
    @Override
    public void manejarEstado(Paciente paciente) {
        System.out.println("El paciente está en estado crítico.");
        // Lógica para estado crítico
    }
}
