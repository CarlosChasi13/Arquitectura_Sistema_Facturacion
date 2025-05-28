// src/main/java/com/backend/hospital/state/EstadoIndeterminado.java
package com.backend.hospital.state;

import com.backend.hospital.model.Paciente;

public class EstadoIndeterminado implements PacienteState {
    @Override
    public void manejarEstado(Paciente paciente) {
        System.out.println("El paciente está en estado indeterminado.");
        // Aquí lógica propia para estado indeterminado
    }
}
