export default function TablaProductos({ productos }) {
  return (
    <table className="w-full mb-4 border-collapse border border-gray-300">
      <thead className="bg-white">
        <tr>
          <th className="border p-2">Descripción</th>
          <th className="border p-2">Precio Unitario</th>
          <th className="border p-2">Cantidad</th>
          <th className="border p-2">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((prod, idx) => (
          <tr key={idx}>
            <td className="border p-2">{prod.descripcion}</td>
            <td className="border p-2 text-right">${prod.precio_unitario.toFixed(2)}</td>
            <td className="border p-2 text-center">{prod.cantidad}</td>
            <td className="border p-2 text-right">${prod.precio_total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
