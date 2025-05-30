"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { obtenerProductos, obtenerServicios } from "@/services/productoService";
import {
  crearDescargo,
  agregarLineaADescargo,
} from "@/services/descargoService";
import { toast } from "react-toastify";

export default function ModalAgregarDescargo({
  pacienteId,
  descargoPendiente,
  onGuardarLinea,
  onCancelar,
}) {
  const [form, setForm] = useState({
    tipo: "Producto",
    producto_id: null,
    servicio_id: null,
    descripcion: "",
    precio: 0.0,
    cantidad: 1,
    estado: "Descargado",
  });

  const { id } = useParams();
  const [opciones, setOpciones] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [serviciosAgregados, setServiciosAgregados] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState("");
  const [idEditando, setIdEditando] = useState(null);

  useEffect(() => {
    async function cargarOpciones() {
      const res =
        form.tipo === "Producto"
          ? await obtenerProductos()
          : await obtenerServicios();

      if (res.success && res.data.length > 0) {
        const lista = res.data;
        const primero = lista[0];

        setOpciones(lista);
        setIdSeleccionado(primero.id.toString());

        const descripcionDefinida =
          form.tipo === "Producto"
            ? primero.nombre ||
              primero.descripcion ||
              "Producto sin descripción"
            : primero.descripcion ||
              primero.nombre ||
              primero.tipo_servicio ||
              "Servicio sin descripción";

        setForm((prev) => ({
          ...prev,
          descripcion: descripcionDefinida,
          precio:
            form.tipo === "Producto"
              ? primero.precioUnitario ?? 0.0
              : primero.precioBase ?? 0.0,
          producto_id: form.tipo === "Producto" ? primero.id : null,
          servicio_id: form.tipo === "Servicio" ? primero.id : null,
          cantidad: 1,
        }));
      } else {
        setOpciones([]);
        setIdSeleccionado("");
        setForm((prev) => ({
          ...prev,
          descripcion: "",
          precio: 0.0,
          cantidad: 1,
        }));
      }
    }

    cargarOpciones();
  }, [form.tipo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeleccion = (e) => {
    const id = e.target.value;
    setIdSeleccionado(id);

    const seleccionado = opciones.find((item) => item.id === parseInt(id));
    if (seleccionado) {
      const descripcionDefinida =
        form.tipo === "Producto"
          ? seleccionado.nombre ||
            seleccionado.descripcion ||
            "Producto sin descripción"
          : seleccionado.descripcion ||
            seleccionado.nombre ||
            seleccionado.tipo_servicio ||
            "Servicio sin descripción";

      setForm((prev) => ({
        ...prev,
        descripcion: descripcionDefinida,
        precio:
          form.tipo === "Producto"
            ? seleccionado.precioUnitario ?? 0.0
            : seleccionado.precioBase ?? 0.0,
        producto_id: prev.tipo === "Producto" ? seleccionado.id : null,
        servicio_id: prev.tipo === "Servicio" ? seleccionado.id : null,
      }));
    }
  };

  const agregarItem = () => {
    console.log(form);
    if (
      (form.tipo === "Producto" && !form.producto_id) ||
      (form.tipo === "Servicio" && !form.servicio_id) ||
      !form.precio ||
      form.precio === "0.00"
    ) {
      toast.error("Por favor completa los campos.");
      return;
    }

    const nuevoItem = {
      id: Date.now(),
      tipo: form.tipo,
      producto_id: form.producto_id,
      servicio_id: form.servicio_id,
      descripcion: form.descripcion,
      precio_unitario: parseFloat(form.precio),
      cantidad: form.tipo === "Producto" ? parseInt(form.cantidad) || 1 : 1,
      precio_total:
        form.tipo === "Producto"
          ? parseFloat(form.precio) * (parseInt(form.cantidad) || 1)
          : parseFloat(form.precio),
      estado: "Descargado",
    };

    if (form.tipo === "Producto") {
      setProductosAgregados((prev) => [...prev, nuevoItem]);
    } else {
      setServiciosAgregados((prev) => [...prev, nuevoItem]);
    }

    setIdSeleccionado("");
    setForm({
      tipo: "Producto",
      descripcion: "",
      precio: 0.0,
      cantidad: 1,
      estado: "Descargado",
    });
  };

  const eliminarItem = (id, tipo) => {
    if (tipo === "Producto") {
      setProductosAgregados((prev) => prev.filter((p) => p.id !== id));
    } else {
      setServiciosAgregados((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const editarItem = (item) => {
    setIdEditando(item.id);
    setIdSeleccionado(""); // Lo puedes actualizar con el id del producto/servicio si quieres
    setForm({
      tipo: item.tipo,
      descripcion: item.descripcion,
      precio: item.precio_unitario,
      cantidad: item.cantidad,
      estado: item.estado,
    });

    const opcionEncontrada = opciones.find(
      (op) =>
        op.nombre === item.descripcion || op.descripcion === item.descripcion
    );
    if (opcionEncontrada) {
      setIdSeleccionado(opcionEncontrada.id.toString());
    }
  };
  const guardarCambios = () => {
    if (!form.descripcion || !form.precio || form.precio === "0.00") {
      toast.error("Por favor completa los campos.");
      return;
    }

    if (!idEditando) return;

    const itemActualizado = {
      id: idEditando,
      tipo: form.tipo,
      descripcion: form.descripcion,
      precio_unitario: parseFloat(form.precio),
      cantidad: form.tipo === "Producto" ? parseInt(form.cantidad) || 1 : 1,
      precio_total:
        form.tipo === "Producto"
          ? parseFloat(form.precio) * (parseInt(form.cantidad) || 1)
          : parseFloat(form.precio),
      estado: "Descargado",
    };

    if (form.tipo === "Producto") {
      setProductosAgregados((prev) =>
        prev.map((p) => (p.id === idEditando ? itemActualizado : p))
      );
    } else {
      setServiciosAgregados((prev) =>
        prev.map((s) => (s.id === idEditando ? itemActualizado : s))
      );
    }

    // Limpiar estado de edición y formulario
    setIdEditando(null);
    setIdSeleccionado("");
    setForm({
      tipo: "Producto",
      descripcion: "",
      precio: 0.0,
      cantidad: 1,
      estado: "Descargado",
    });
  };

  const [loading, setLoading] = useState(false);

  const guardarLineaDescargo = async () => {
    if (productosAgregados.length === 0 && serviciosAgregados.length === 0) {
      toast.error("Debes agregar al menos un producto o servicio.");
      return;
    }

    setLoading(true);

    let descargoId = descargoPendiente?.descargo_id || descargoPendiente?.id; // Ajusta según estructura

    if (!descargoId) {
      // Crear nuevo descargo con estado PENDIENTE
      const datosDescargo = {
        fecha: new Date().toISOString(),
        observacion: "Descargo generado desde UI",
        estado: "PENDIENTE",
        // otros campos si necesitas
      };

      const respuesta = await crearDescargo(id, datosDescargo);

      if (!respuesta.success) {
        toast.error(respuesta.message || "Error al crear el descargo");
        setLoading(false);
        return;
      }
      descargoId = respuesta.data.id;
    }

    try {
      await Promise.all(
        [...productosAgregados, ...serviciosAgregados].map((linea) => {
          const datosLinea = {
            tipo: linea.tipo,
            descripcion: linea.descripcion,
            precioUnitario: linea.precio_unitario,
            cantidad: linea.cantidad,
            precio_total: linea.precio_total,
            estado: linea.estado,
            productoId: linea.tipo === "Producto" ? linea.producto_id : null,
            servicioId: linea.tipo === "Servicio" ? linea.servicio_id : null,
          };
          return agregarLineaADescargo(descargoId, datosLinea);
        })
      );

      toast.success("Descargo y líneas guardadas correctamente");

      onGuardarLinea({
        descargo_id: descargoId,
        precio_total_linea: productosAgregados
          .concat(serviciosAgregados)
          .reduce((acc, cur) => acc + cur.precio_total, 0),
        productos: productosAgregados,
        servicios: serviciosAgregados,
      });

      setProductosAgregados([]);
      setServiciosAgregados([]);
      setForm({
        tipo: "Producto",
        descripcion: "",
        precio: 0.0,
        cantidad: 1,
        estado: "Descargado",
      });
      setIdSeleccionado("");
      setIdEditando(null);
    } catch (error) {
      toast.error("Error al agregar las líneas del descargo: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full space-y-4 text-gray-900">
        <h2 className="text-2xl font-bold">Nueva Línea de Descargo</h2>

        <div className="flex gap-4">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-1/2"
          >
            <option value="Producto">Producto</option>
            <option value="Servicio">Servicio</option>
          </select>

          <select
            name="descripcion"
            value={idSeleccionado}
            onChange={handleSeleccion}
            className="border px-4 py-2 rounded w-1/2"
          >
            <option value="">Seleccionar {form.tipo}</option>
            {opciones.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nombre || item.tipo || item.descripcion}
              </option>
            ))}
          </select>
        </div>

        {form.tipo === "Producto" && (
          <input
            type="number"
            name="cantidad"
            value={form.cantidad}
            onChange={handleChange}
            placeholder="Cantidad"
            className="w-full border px-4 py-2 rounded"
            min="1"
          />
        )}

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio ?? 0.0}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          min="0"
          step="0.01"
        />

        <button
          type="button"
          onClick={idEditando ? guardarCambios : agregarItem}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {idEditando ? "Guardar Cambios" : "Agregar a la Línea"}
        </button>

        <div>
          <h3 className="font-semibold mt-4">Productos</h3>
          {productosAgregados.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {productosAgregados.map((p) => (
            <div key={p.id} className="flex justify-between text-sm py-1">
              <span>
                {p.descripcion} x{p.cantidad}
              </span>
              <span>${p.precio_total.toFixed(2)}</span>
              <div>
                <button
                  onClick={() => editarItem(p)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarItem(p.id, "Producto")}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-semibold mt-4">Servicios</h3>
          {serviciosAgregados.length === 0 && (
            <p className="text-sm text-gray-500">Ninguno agregado</p>
          )}
          {serviciosAgregados.map((s) => (
            <div key={s.id} className="flex justify-between text-sm py-1">
              <span>{s.descripcion}</span>
              <span>${s.precio_total.toFixed(2)}</span>
              <button
                onClick={() => eliminarItem(s.id, "Servicio")}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
            onClick={onCancelar}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={guardarLineaDescargo}
          >
            Guardar Línea de Descargo
          </button>
        </div>
      </div>
    </div>
  );
}
