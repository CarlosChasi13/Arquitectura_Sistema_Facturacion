// src/main/java/com/backend/hospital/controller/PacienteController.java
package com.backend.hospital.controller;

import com.backend.hospital.dto.PacienteDTO;
import com.backend.hospital.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@RequiredArgsConstructor
public class PacienteController {
  
    private final PacienteService pacienteService;

    @GetMapping
    public List<PacienteDTO> listar() {
        return pacienteService.listarPacientes();
    }

    @GetMapping("/{id}")
    public PacienteDTO obtener(@PathVariable Long id) {
        return pacienteService.getPaciente(id);
    }

    @PostMapping
    public ResponseEntity<PacienteDTO> crear(@RequestBody PacienteDTO dto) {
        PacienteDTO creado = pacienteService.crearPaciente(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(creado);
    }

    @PutMapping("/{id}")
    public PacienteDTO actualizar(@PathVariable Long id,
                                  @RequestBody PacienteDTO dto) {
        return pacienteService.actualizarPaciente(id, dto);
    }
}
