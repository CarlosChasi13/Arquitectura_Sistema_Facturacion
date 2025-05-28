// src/main/java/com/backend/hospital/model/PacienteStatus.java
package com.backend.hospital.model;

/**
 * Valores permitidos para el estado persistido del paciente.
 */
public enum PacienteStatus {
    INDETERMINADO,
    BUENO,
    REGULAR,
    SERIO,
    CRITICO,
    MUERTO
}
