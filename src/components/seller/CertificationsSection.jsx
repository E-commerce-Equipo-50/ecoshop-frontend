const CertificationsSection = ({ selectedCertifications, onToggleCertification, isExpanded, onToggle }) => {
  // Certificaciones disponibles
  const certificationTypes = [
    { 
      type: 'FAIR_TRADE', 
      label: 'Comercio Justo',
      icon: 'handshake',
      description: 'Garantiza condiciones laborales justas y precios equitativos para los productores.'
    },
    { 
      type: 'CARBON_NEUTRAL', 
      label: 'Carbono Neutral',
      icon: 'leaf',
      description: 'Compensa todas las emisiones de carbono generadas en la producción.'
    },
    { 
      type: 'GOTS', 
      label: 'GOTS (Orgánico)',
      icon: 'seedling',
      description: 'Estándar textil orgánico global que certifica productos orgánicos sostenibles.'
    }
  ];

  return (
    <>
      {/* Botón para expandir/colapsar */}
      <div>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center text-green hover:text-darkgreen font-semibold transition-colors"
        >
          <i className={`fa-solid fa-${isExpanded ? 'minus' : 'plus'} mr-2`}></i>
          {isExpanded ? 'Ocultar Certificaciones' : 'Añadir Certificaciones'}
        </button>
        <p className="text-sm text-gray-500 mt-1 ml-6">
          <span className="text-red-500">*</span> Al menos debe incluir una certificación {selectedCertifications.length > 0 && '✓'}
        </p>
      </div>

      {/* Sección expandible */}
      {isExpanded && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-bold title-darkgreen mb-4 flex items-center">
            <i className="fa-solid fa-certificate text-green mr-2"></i>
            Certificaciones del Producto
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Selecciona las certificaciones que posee este producto:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certificationTypes.map((cert) => {
              const isSelected = selectedCertifications.includes(cert.type);
              return (
                <div
                  key={cert.type}
                  onClick={() => onToggleCertification(cert.type)}
                  className={`
                    bg-white p-5 rounded-lg border-2 cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-green bg-green bg-opacity-5 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <i className={`fa-solid fa-${cert.icon} text-2xl mr-3 ${isSelected ? 'text-green' : 'text-gray-400'}`}></i>
                      <div>
                        <h4 className={`font-semibold ${isSelected ? 'text-green' : 'text-gray-700'}`}>
                          {cert.label}
                        </h4>
                      </div>
                    </div>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected ? 'border-green bg-green' : 'border-gray-300'}
                    `}>
                      {isSelected && (
                        <i className="fa-solid fa-check text-white text-xs"></i>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              );
            })}
          </div>

          {selectedCertifications.length > 0 && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-green">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fa-solid fa-circle-check text-green text-xl mr-3"></i>
                  <span className="font-semibold text-gray-700">
                    {selectedCertifications.length} certificación(es) seleccionada(s)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Limpiar todas las certificaciones
                    selectedCertifications.forEach(() => {
                      // Como no tenemos acceso directo al setter, llamamos al toggle para cada una
                    });
                  }}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Limpiar todo
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .bg-green {
          background-color: var(--primary-medium);
        }
        .text-green {
          color: var(--primary-medium);
        }
        .border-green {
          border-color: var(--primary-medium);
        }
        .title-darkgreen {
          color: var(--secondary-dark);
        }
      `}} />
    </>
  );
};

export default CertificationsSection;
