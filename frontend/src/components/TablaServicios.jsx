export default function TablaServicios({ servicios }) {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-white">
        <tr>
          <th className="border p-2">Descripción</th>
          <th className="border p-2">Precio Total</th>
        </tr>
      </thead>
      <tbody>
        {servicios.map((serv, idx) => (
          <tr key={idx}>
            <td className="border p-2">{serv.descripcion}</td>
            <td className="border p-2 text-right">${serv.precio_total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
