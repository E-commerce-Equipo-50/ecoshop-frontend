export default function ImpactBar({ ecoScore }) {
   if (!ecoScore) return null;
  
  // Buscar CO2
  const co2Metric = ecoScore.metrics.find(m => m.type === "CO2");

  //Si el producto no contiene metricas
  if (!co2Metric) {
    return (
      <div className="text-[var(--text-dark)] text-sm">
        <p>Sin métricas de CO₂ disponibles.</p>
      </div>
    );
  }

  //Si tiene metricas, se muestra el CO2 evitado
  const { value, comparisonValue } = co2Metric;

  return (
    <div>
      <p className="font-semibold text-[var(--primary-dark)] text-sm">
        ¡Tu compra evita ~{comparisonValue-value}kg de CO2 por unidad!
      </p>
    </div>
  )
}