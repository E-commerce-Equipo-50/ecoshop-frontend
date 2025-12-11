import { useEffect, useRef, memo } from "react";

function SustainabilityScore({ ecoScore }) {
  const canvasRef = useRef(null);

  // Busco las metricas de CO2 y ENERGY
  const co2Metric = ecoScore?.metrics?.find(m => m.type === "CO2");
  const energyMetric = ecoScore?.metrics?.find(m => m.type === "ENERGY");

  // --- Si no hay ecoScore o no tiene métricas: mostrar fallback ---
  if (!ecoScore?.metrics || ecoScore.metrics.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-[var(--white)] text-[var(--text-dark)] border border-gray-200 shadow-sm w-full max-w-xl mx-auto">
        <h3 className="font-semibold text-lg mb-2">Nuestra Huella Ambiental</h3>
        <hr className="mb-4 border-2 border-[var(--primary-medium)]" />
        <p className="text-sm text-[var(--text-light)]">
          No hay métricas de sostenibilidad disponibles para este producto.
        </p>
      </div>
    );
  }


  //Configuracion del grafico
  useEffect(() => {
    if (!canvasRef.current) return;

    const labels = ecoScore.metrics.map(m => m.type);
    const data = ecoScore.metrics.map(m => m.weight);

    const ctx = canvasRef.current.getContext("2d");

    const chart = new window.Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#7bbb3f', // verde
              '#3197c7', // azul
              '#e7cb5d', // amarillo
              '#d16457', // rojo
            ],
            borderColor: '#ffffff',
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "right",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16,
            },
          },
        },
        layout: {
          padding: 0,
        },
      },
    });

    return () => chart.destroy();
  }, [ecoScore.metrics]);

  // Fallback: si no hay CO2, mostrar mensaje
  if (!co2Metric) {
    return (
      <div className="p-4 rounded-xl bg-[var(--white)] text-[var(--text-dark)] border border-gray-200 shadow-sm w-full max-w-xl mx-auto">
        <h3 className="font-semibold text-lg mb-2">Nuestra Huella Ambiental</h3>
        <hr className="mb-4 border-2 border-[var(--primary-medium)]" />
        <p className="text-sm text-[var(--text-light)]">
          Este producto no tiene métricas de carbono disponibles.
        </p>
      </div>
    );
  }

  // Cálculo condicional: solo si existe ENERGY
  let chargesEquivalent = null;
  if (energyMetric) {
    const energyPerPhoneCharge = 0.012;
    chargesEquivalent = Math.round(energyMetric.value / energyPerPhoneCharge);
  }

  return (
    <div className="p-4 rounded-xl bg-[var(--white)] text-[var(--text-dark)] border border-gray-200 shadow-sm w-full max-w-xl mx-auto">
      {/* Header */}
      <h3 className="font-semibold text-lg mb-2">
        Nuestra Huella Ambiental
      </h3>
      <hr className="mb-4 border-2 border-[var(--primary-medium)]" />

      <div className="flex flex-col md:flex-row items-center font-[var(--font-title)] justify-between gap-4">
        {/* Lado izquierdo: texto */}
        <div className="flex flex-col justify-between gap-5">
          <h3 className="font-bold text-2xl leading-tight">
            {co2Metric.value} kg CO₂
          </h3>
          <p className="text-sm text-[var(--text-light)]">
            Huella de carbono estimada
          </p>

          {/* ✅ Renderizado condicional para ENERGY */}
          {energyMetric && chargesEquivalent !== null ? (
            <p className="text-sm mt-3">
              El impacto total equivale a la energía
              <br />
              para cargar tu móvil{" "}
              <span className="font-semibold text-[var(--primary-dark)]">
                *{chargesEquivalent} veces
              </span>
              .
            </p>
          ) : (
            <p className="text-sm mt-3 text-[var(--text-light)]">
              Sin datos de energía disponibles.
            </p>
          )}
        </div>

        {/* Lado derecho: Chart */}
        <div className="w-40 h-40 md:w-60 md:h-60 relative">
          <canvas ref={canvasRef}></canvas>
        </div>

      </div>
    </div>
  );
}

export default memo(SustainabilityScore); // Evita renders innecesairios