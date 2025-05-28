// src/main/java/com/backend/hospital/service/ServicioServiceImpl.java
package com.backend.hospital.service;

import com.backend.hospital.dto.ServicioDTO;
import com.backend.hospital.model.EstadoDocumento;
import com.backend.hospital.model.servicios.AtencionMedica;
import com.backend.hospital.model.servicios.ExamenLab;
import com.backend.hospital.model.servicios.ImagenRayosX;
import com.backend.hospital.model.servicios.ProcedimientoMedico;
import com.backend.hospital.model.servicios.SuministroMedicamento;
import com.backend.hospital.model.servicios.Servicio;
import com.backend.hospital.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicioServiceImpl implements ServicioService {
    private final ServicioRepository repo;

    @Override
    public List<ServicioDTO> listarServicios() {
        return repo.findAll().stream()
                   .map(ServicioDTO::fromEntity)
                   .collect(Collectors.toList());
    }

    @Override
    public ServicioDTO getServicio(Long id) {
        Servicio s = repo.findById(id)
                         .orElseThrow(() -> new NoSuchElementException("Servicio no encontrado"));
        return ServicioDTO.fromEntity(s);
    }

    @Override
    @Transactional
    public ServicioDTO crearServicio(ServicioDTO dto) {
        // Creamos la subclase correcta según el discriminator en DTO
        Servicio s = crearTipoServicio(dto.getTipo());
        s.setCodigo(dto.getCodigo());
        s.setDescripcion(dto.getDescripcion());
        s.setPrecioBase(dto.getPrecioBase());
        // Ajustamos el estado usando el enum EstadoDocumento
        s.setEstado(dto.getEstado());
        Servicio saved = repo.save(s);
        return ServicioDTO.fromEntity(saved);
    }

    @Override
    @Transactional
    public ServicioDTO actualizarServicio(Long id, ServicioDTO dto) {
        Servicio s = repo.findById(id)
                         .orElseThrow(() -> new NoSuchElementException("Servicio no encontrado"));
        s.setCodigo(dto.getCodigo());
        s.setDescripcion(dto.getDescripcion());
        s.setPrecioBase(dto.getPrecioBase());
        s.setEstado(dto.getEstado());
        Servicio saved = repo.save(s);
        return ServicioDTO.fromEntity(saved);
    }

    @Override
    @Transactional
    public void eliminarServicio(Long id) {
        repo.deleteById(id);
    }

    /**
     * Factory method que devuelve la subclase adecuada de Servicio.
     */
    private Servicio crearTipoServicio(String tipo) {
        return switch (tipo) {
            case "ATENCION_MEDICA"        -> new AtencionMedica();
            case "EXAMEN_LAB"             -> new ExamenLab();
            case "IMAGEN_RAYOS_X"         -> new ImagenRayosX();
            case "PROCEDIMIENTO_MEDICO"   -> new ProcedimientoMedico();
            case "SUMINISTRO_MEDICAMENTO" -> new SuministroMedicamento();
            default -> throw new IllegalArgumentException("Tipo de servicio desconocido: " + tipo);
        };
    }
}
