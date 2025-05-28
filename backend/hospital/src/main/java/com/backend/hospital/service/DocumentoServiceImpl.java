// src/main/java/com/backend/hospital/service/DocumentoServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import com.backend.hospital.model.DocumentoTransaccion;

@Service
public class DocumentoServiceImpl implements DocumentoService {

    @Override
    @SuppressWarnings("unchecked")
    public <T extends DocumentoTransaccion> T clonarDocumento(T documento) {
        // Simplemente delegamos al método clone() definido en cada subclass
        return (T) documento.clone();
    }
}
