export default function EcoBadge({ ecoScore }) {
   if (!ecoScore) return null;

  const { badge, score, description } = ecoScore;

  const intensity = getIntensity(score);

const colorClasses = {
  excellent: "bg-green-100 text-green-700 border-green-300",
  good: "bg-lime-100 border-lime-500 text-lime-700",
  medium: "bg-yellow-50 border-yellow-500 text-yellow-700",
  poor: "bg-red-50 border-red-500 text-red-700",
};


  return (
    <div
      className={`w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${colorClasses[intensity]}`}
      title={description}
    >
      <span>{badge}</span>
    </div>
  );
}

function getIntensity(score) {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "medium";
  return "poor";
}
