import GestionarDescargos from "@/components/GestionDescargos";

export default async function DescargosPage({ params }) {
  return <GestionarDescargos pacienteId={params.id} />;
}
