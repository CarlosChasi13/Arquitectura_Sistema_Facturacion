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
        // 1) Creamos la subclase adecuada
        Servicio s = crearTipoServicio(dto.getTipo());

        // 2) Asignamos campos comunes
        s.setCodigo(dto.getCodigo());
        s.setDescripcion(dto.getDescripcion());
        s.setPrecioBase(dto.getPrecioBase());
        s.setEstado(EstadoDocumento.valueOf(dto.getEstado()));

        // 3) Si es atención médica, asignamos doctor encargado
        if (s instanceof AtencionMedica am) {
            am.setDoctorEncargado(dto.getDoctorEncargado());
        }

        // 4) Guardamos y devolvemos DTO
        Servicio saved = repo.save(s);
        return ServicioDTO.fromEntity(saved);
    }

    @Override
    @Transactional
    public ServicioDTO actualizarServicio(Long id, ServicioDTO dto) {
        Servicio s = repo.findById(id)
                         .orElseThrow(() -> new NoSuchElementException("Servicio no encontrado"));

        // Campos comunes
        s.setCodigo(dto.getCodigo());
        s.setDescripcion(dto.getDescripcion());
        s.setPrecioBase(dto.getPrecioBase());
        s.setEstado(EstadoDocumento.valueOf(dto.getEstado()));

        // Doctor encargado si aplica
        if (s instanceof AtencionMedica am) {
            am.setDoctorEncargado(dto.getDoctorEncargado());
        }

        Servicio saved = repo.save(s);
        return ServicioDTO.fromEntity(saved);
    }

    @Override
    @Transactional
    public void eliminarServicio(Long id) {
        repo.deleteById(id);
    }

    /**
     * Factory method que devuelve la subclase adecuada de Servicio
     * según el discriminator recibido.
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
