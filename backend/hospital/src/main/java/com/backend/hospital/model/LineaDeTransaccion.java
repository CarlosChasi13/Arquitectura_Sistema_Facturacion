// src/main/java/com/backend/hospital/model/LineaDeTransaccion.java
package com.backend.hospital.model;

import com.backend.hospital.model.servicios.Servicio;
import jakarta.persistence.*;

@Entity
@Table(name = "linea_de_transaccion")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_linea", length = 20)
public abstract class LineaDeTransaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer cantidad;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @ManyToOne(optional = true)
    @JoinColumn(name = "descargo_id")
    private Descargo descargo;

    @ManyToOne(optional = true)
    @JoinColumn(name = "factura_id")
    private Factura factura;

    @ManyToOne(optional = true)
    @JoinColumn(name = "producto_id", nullable = true)
    private Producto producto;

    @ManyToOne(optional = true)
    @JoinColumn(name = "servicio_id", nullable = true)
    private Servicio servicio;

    public LineaDeTransaccion() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecioUnitario() {
        return precioUnitario;
    }

    public void setPrecioUnitario(Double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    public Descargo getDescargo() {
        return descargo;
    }

    public void setDescargo(Descargo descargo) {
        this.descargo = descargo;
    }

    public Factura getFactura() {
        return factura;
    }

    public void setFactura(Factura factura) {
        this.factura = factura;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Servicio getServicio() {
        return servicio;
    }

    public void setServicio(Servicio servicio) {
        this.servicio = servicio;
    }
}
