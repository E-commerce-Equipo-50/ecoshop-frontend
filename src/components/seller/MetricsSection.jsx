import { useState } from 'react';

const MetricsSection = ({ metrics, onAddMetric, onRemoveMetric, isExpanded, onToggle }) => {
  const [currentMetric, setCurrentMetric] = useState({
    type: '',
    value: '',
    comparison_value: '',
    unit: ''
  });

  const [localError, setLocalError] = useState('');

  // Tipos de métricas disponibles
  const metricTypes = [
    { type: 'CO2', label: 'Emisiones de CO2', defaultUnit: 'kg CO2e' },
    { type: 'WATER', label: 'Uso de Agua', defaultUnit: 'litros' },
    { type: 'ENERGY', label: 'Consumo de Energía', defaultUnit: 'kWh' },
    { type: 'RECYCLED', label: 'Material Reciclado', defaultUnit: '%' }
  ];

  const handleMetricChange = (e) => {
    const { name, value } = e.target;
    
    // Si cambia el tipo de métrica, establecer la unidad por defecto
    if (name === 'type') {
      const selectedMetric = metricTypes.find(m => m.type === value);
      setCurrentMetric(prev => ({
        ...prev,
        type: value,
        unit: selectedMetric ? selectedMetric.defaultUnit : ''
      }));
    } else {
      setCurrentMetric(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setLocalError('');
  };

  const handleAddMetric = () => {
    // Validar que todos los campos estén completos
    if (!currentMetric.type || !currentMetric.value || !currentMetric.comparison_value || !currentMetric.unit) {
      setLocalError('Por favor completa todos los campos de la métrica');
      return;
    }

    // Validar que no exista ya una métrica del mismo tipo
    if (metrics.some(m => m.type === currentMetric.type)) {
      setLocalError('Ya existe una métrica de este tipo. Elimínala primero si deseas agregar una nueva.');
      return;
    }

    // Llamar al callback del padre para agregar la métrica
    onAddMetric({
      type: currentMetric.type,
      value: parseFloat(currentMetric.value),
      comparison_value: parseFloat(currentMetric.comparison_value),
      unit: currentMetric.unit
    });

    // Limpiar formulario
    setCurrentMetric({
      type: '',
      value: '',
      comparison_value: '',
      unit: ''
    });
    setLocalError('');
  };

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
          {isExpanded ? 'Ocultar Métricas' : 'Añadir Métricas de Sostenibilidad'}
        </button>
        <p className="text-sm text-gray-500 mt-1 ml-6">
          <span className="text-red-500">*</span> Al menos debe incluir la métrica de CO2 {metrics.some(m => m.type === 'CO2') && '✓'}
        </p>
      </div>

      {/* Sección expandible */}
      {isExpanded && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-bold title-darkgreen mb-4 flex items-center">
            <i className="fa-solid fa-chart-line text-green mr-2"></i>
            Métricas de Impacto Ambiental
          </h3>

          {/* Error local */}
          {localError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{localError}</p>
            </div>
          )}

          {/* Lista de métricas agregadas */}
          {metrics.length > 0 && (
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Métricas Agregadas:</h4>
              {metrics.map((metric, index) => {
                const metricInfo = metricTypes.find(m => m.type === metric.type);
                const reduction = ((1 - metric.value / metric.comparison_value) * 100).toFixed(1);
                const isPositive = parseFloat(reduction) > 0;
                
                return (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:border-green transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="font-semibold text-green mr-2">
                          {metricInfo?.label || metric.type}
                        </span>
                        {metric.type === 'CO2' && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
                            Obligatorio
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Valor:</span> {metric.value} {metric.unit}
                        </div>
                        <div>
                          <span className="font-medium">Comparación:</span> {metric.comparison_value} {metric.unit}
                        </div>
                        <div>
                          <span className="font-medium">Impacto:</span> 
                          <span className={`font-semibold ml-1 ${isPositive ? 'text-green' : 'text-red-600'}`}>
                            {isPositive ? '↓' : '↑'} {Math.abs(reduction)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveMetric(index)}
                      className="ml-4 text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
                      title="Eliminar métrica"
                    >
                      <i className="fa-solid fa-trash text-lg"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Formulario para agregar métrica */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">Agregar Nueva Métrica</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de métrica */}
              <div>
                <label htmlFor="metricType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipo de Métrica <span className="text-red-500">*</span>
                </label>
                <select
                  id="metricType"
                  name="type"
                  value={currentMetric.type}
                  onChange={handleMetricChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                >
                  <option value="">Selecciona un tipo</option>
                  {metricTypes.map(m => (
                    <option 
                      key={m.type} 
                      value={m.type}
                      disabled={metrics.some(metric => metric.type === m.type)}
                    >
                      {m.label} {metrics.some(metric => metric.type === m.type) && '(Ya agregada)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Valor */}
              <div>
                <label htmlFor="metricValue" className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor del Producto <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="metricValue"
                  name="value"
                  value={currentMetric.value}
                  onChange={handleMetricChange}
                  step="0.01"
                  min="0"
                  placeholder="Ej: 2.5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>

              {/* Valor de comparación */}
              <div>
                <label htmlFor="metricComparison" className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor de Comparación <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="metricComparison"
                  name="comparison_value"
                  value={currentMetric.comparison_value}
                  onChange={handleMetricChange}
                  step="0.01"
                  min="0"
                  placeholder="Ej: 8.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Valor promedio de productos similares</p>
              </div>

              {/* Unidad */}
              <div>
                <label htmlFor="metricUnit" className="block text-sm font-semibold text-gray-700 mb-2">
                  Unidad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="metricUnit"
                  name="unit"
                  value={currentMetric.unit}
                  onChange={handleMetricChange}
                  placeholder="Ej: kg CO2e"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Botón para agregar métrica */}
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleAddMetric}
                className="bg-green hover:bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <i className="fa-solid fa-plus mr-2"></i>
                Agregar Métrica
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .bg-green {
          background-color: var(--primary-medium);
        }
        .bg-darkgreen {
          background-color: var(--primary-dark);
        }
        .text-green {
          color: var(--primary-medium);
        }
        .focus\\:ring-green:focus {
          --tw-ring-color: var(--primary-medium);
        }
        .title-darkgreen {
          color: var(--secondary-dark);
        }
      `}} />
    </>
  );
};

export default MetricsSection;
