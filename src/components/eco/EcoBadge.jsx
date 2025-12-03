export default function EcoBadge({ level = "low" }) {
  // JSON interno con textos
  const badgeInfo = {
    low: {
      label: "Baja Huella de Carbono",
      description:
        "Este producto genera un impacto ambiental reducido gracias a procesos más eficientes y materiales sostenibles.",
    },
    medium: {
      label: "Huella de Carbono Media",
      description:
        "Este producto tiene un impacto ambiental moderado. Combina prácticas sostenibles con procesos que aún pueden mejorar.",
    },
    high: {
      label: "Alta Huella de Carbono",
      description:
        "Este producto genera un impacto ambiental elevado debido a su fabricación, materiales o transporte.",
    },
  };

  const { label, description } = badgeInfo[level] || badgeInfo["low"];

  // Colores según nivel
  const colorClasses = {
    low: "bg-green-100 text-green-700 border-green-300",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-300",
    high: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${colorClasses[level]}`}
      title={description}
    >
      <i className="fa-solid fa-leaf text-sm"></i>
      <span>{label}</span>
    </div>
  );
}