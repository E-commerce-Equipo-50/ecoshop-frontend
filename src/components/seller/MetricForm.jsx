import { useState } from 'react';

const MetricForm = ({ metrics, onAdd }) => {
  const [formData, setFormData] = useState({
    type: '',
    value: '',
    comparison_value: '',
    unit: ''
  });

  const [error, setError] = useState('');

  const metricTypes = [
    { type: 'CO2', label: 'Emisiones de CO2', defaultUnit: 'kg CO2' },
    { type: 'WATER', label: 'Uso de Agua', defaultUnit: 'litros' },
    { type: 'ENERGY', label: 'Consumo de Energía', defaultUnit: 'kWh' },
    { type: 'RECYCLED', label: 'Material Reciclado', defaultUnit: '%' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'type') {
      const selectedMetric = metricTypes.find(m => m.type === value);
      setFormData(prev => ({
        ...prev,
        type: value,
        unit: selectedMetric ? selectedMetric.defaultUnit : ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setError('');
  };

  const handleSubmit = () => {
    if (!formData.type || !formData.value || !formData.comparison_value || !formData.unit) {
      setError('Por favor completa todos los campos de la métrica');
      return;
    }

    if (metrics.some(m => m.type === formData.type)) {
      setError('Ya existe una métrica de este tipo. Elimínala primero si deseas agregar una nueva.');
      return;
    }

    onAdd({
      type: formData.type,
      value: parseFloat(formData.value),
      comparison_value: parseFloat(formData.comparison_value),
      unit: formData.unit
    });

    setFormData({ type: '', value: '', comparison_value: '', unit: '' });
    setError('');
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-4">Agregar Nueva Métrica</h4>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="metricType" className="block text-sm font-semibold text-gray-700 mb-2">
            Tipo de Métrica <span className="text-red-500">*</span>
          </label>
          <select
            id="metricType"
            name="type"
            value={formData.type}
            onChange={handleChange}
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

        <div>
          <label htmlFor="metricValue" className="block text-sm font-semibold text-gray-700 mb-2">
            Valor del Producto <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="metricValue"
            name="value"
            value={formData.value}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="Ej: 2.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="metricComparison" className="block text-sm font-semibold text-gray-700 mb-2">
            Valor de Comparación <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="metricComparison"
            name="comparison_value"
            value={formData.comparison_value}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="Ej: 8.0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Valor promedio de productos similares</p>
        </div>

        <div>
          <label htmlFor="metricUnit" className="block text-sm font-semibold text-gray-700 mb-2">
            Unidad <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="metricUnit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Ej: kg CO2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green hover:bg-darkgreen text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          Agregar Métrica
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .bg-green { background-color: var(--primary-medium); }
        .bg-darkgreen { background-color: var(--primary-dark); }
        .focus\\:ring-green:focus { --tw-ring-color: var(--primary-medium); }
      `}} />
    </div>
  );
};

export default MetricForm;
