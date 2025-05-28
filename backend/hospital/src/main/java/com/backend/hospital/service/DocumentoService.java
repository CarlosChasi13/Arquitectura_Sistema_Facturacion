// src/main/java/com/backend/hospital/service/DocumentoService.java
package com.backend.hospital.service;

import com.backend.hospital.model.DocumentoTransaccion;

/**
 * Servicio genérico para operar sobre documentos transaccionales,
 * aprovechando el patrón Prototype para clonar instancias.
 */
public interface DocumentoService {
    /**
     * Clona un documento transaccional (Descargo o Factura).
     * @param documento el documento original a clonar
     * @param <T> tipo concreto de DocumentoTransaccion
     * @return una copia nueva del documento
     */
    <T extends DocumentoTransaccion> T clonarDocumento(T documento);
}
