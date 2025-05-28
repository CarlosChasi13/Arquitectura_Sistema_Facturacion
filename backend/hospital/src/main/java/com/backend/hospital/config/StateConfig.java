// src/main/java/com/backend/hospital/config/StateConfig.java
package com.backend.hospital.config;

import com.backend.hospital.state.*;
import org.springframework.context.annotation.*;

@Configuration
public class StateConfig {

    @Bean @Scope("prototype")
    public PacienteState estadoIndeterminado() {
        return new EstadoIndeterminado();
    }

    @Bean @Scope("prototype")
    public PacienteState estadoBueno() {
        return new EstadoBueno();
    }

    @Bean @Scope("prototype")
    public PacienteState estadoRegular() {
        return new EstadoRegular();
    }

    @Bean @Scope("prototype")
    public PacienteState estadoSerio() {
        return new EstadoSerio();
    }

    @Bean @Scope("prototype")
    public PacienteState estadoCritico() {
        return new EstadoCritico();
    }

    @Bean @Scope("prototype")
    public PacienteState estadoMuerto() {
        return new EstadoMuerto();
    }
}
