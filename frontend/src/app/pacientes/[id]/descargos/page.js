// src/app/pacientes/[id]/descargos/page.js
import GestionarDescargos from '@/components/GestionDescargos';

export default async function DescargosPage({ params }) {
  // params es una promesa, así que la awaitamos
  const { id: pacienteId } = await params;

  return <GestionarDescargos pacienteId={pacienteId} />;
}
