// src/main/java/com/backend/hospital/service/LineaDeTransaccionServiceImpl.java
package com.backend.hospital.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import com.backend.hospital.repository.LineaDeTransaccionRepository;
import com.backend.hospital.repository.DescargoRepository;
import com.backend.hospital.repository.FacturaRepository;
import com.backend.hospital.dto.LineaDTO;
import com.backend.hospital.model.LineaDeTransaccion;
import com.backend.hospital.model.Descargo;
import com.backend.hospital.model.Factura;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LineaDeTransaccionServiceImpl implements LineaDeTransaccionService {
  private final LineaDeTransaccionRepository linRepo;
  private final DescargoRepository descRepo;
  private final FacturaRepository facRepo;

  @Autowired
  public LineaDeTransaccionServiceImpl(
    LineaDeTransaccionRepository linRepo,
    DescargoRepository descRepo,
    FacturaRepository facRepo
  ) {
    this.linRepo  = linRepo;
    this.descRepo = descRepo;
    this.facRepo  = facRepo;
  }

  @Override
  public List<LineaDTO> listarLineasDescargo(Long descargoId) {
    return linRepo.findByDescargoId(descargoId).stream()
      .map(LineaDTO::fromEntity)
      .collect(Collectors.toList());
  }

  @Override
  public List<LineaDTO> listarLineasFactura(Long facturaId) {
    return linRepo.findByFacturaId(facturaId).stream()
      .map(LineaDTO::fromEntity)
      .collect(Collectors.toList());
  }

  @Override
  @Transactional
  public LineaDTO agregarLineaADescargo(Long descargoId, LineaDTO dto) {
    Descargo d = descRepo.findById(descargoId)
      .orElseThrow(() -> new RuntimeException("Descargo no encontrado"));
    LineaDeTransaccion ln = dto.toEntity();
    ln.setDescargo(d);
    ln.setFactura(null);
    return LineaDTO.fromEntity(linRepo.save(ln));
  }

  @Override
  @Transactional
  public LineaDTO agregarLineaAFactura(Long facturaId, LineaDTO dto) {
    Factura f = facRepo.findById(facturaId)
      .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
    LineaDeTransaccion ln = dto.toEntity();
    ln.setFactura(f);
    ln.setDescargo(null);
    return LineaDTO.fromEntity(linRepo.save(ln));
  }
}
