import VerFactura from "@/components/Factura";

export default async function FacturaPage({ params }) {
  return <VerFactura id={params.id} />;
}
