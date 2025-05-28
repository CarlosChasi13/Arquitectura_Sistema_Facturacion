// src/main/java/com/backend/hospital/state/EstadoRegular.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public class EstadoRegular implements PacienteState {
    @Override
    public void manejarEstado(Paciente paciente) {
        System.out.println("El paciente está en estado regular.");
        // Lógica para estado regular
    }
}
