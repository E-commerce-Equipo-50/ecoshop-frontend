export default function CertificationList({ certifications }) {
if (!certifications || certifications.length === 0) {
    return (
      <p className="text-sm text-[var(--text-light)]">
        Este producto no posee certificaciones.
      </p>
    );
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-3 text-lg text-[var(--text-dark)]">
        Certificaciones
      </h3>

      <div className="flex flex-wrap gap-6">
        {certifications.map(cert => (
          <div 
            key={cert.id} 
            className="flex flex-col items-center w-24"
          >
            {/* Círculo con el icono */}
            <div className="
              w-16 h-16 rounded-full 
              border border-[var(--primary-medium)]
              flex items-center justify-center 
              p-3 bg-white shadow-sm
            ">
              <img 
                src={cert.iconUrl} 
                alt={cert.type}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Nombre debajo */}
            <span className="text-xs mt-2 text-[var(--primary-dark)] font-medium text-center">
              {formatCertificationName(cert.type)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatCertificationName(type) {
  const map = {
    FAIR_TRADE: "Fair Trade",
    CARBON_NEUTRAL: "Carbon Neutral",
    GOTS: "GOTS",
  };
  return map[type] || type;
}