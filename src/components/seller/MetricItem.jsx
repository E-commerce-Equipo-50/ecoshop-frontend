import { useState } from 'react';

const MetricItem = ({ metric, index, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    value: metric.value,
    comparison_value: metric.comparison_value,
    unit: metric.unit
  });

  const metricTypes = [
    { type: 'CO2', label: 'Emisiones de CO2' },
    { type: 'WATER', label: 'Uso de Agua' },
    { type: 'ENERGY', label: 'Consumo de Energía' },
    { type: 'RECYCLED', label: 'Material Reciclado' }
  ];

  const metricInfo = metricTypes.find(m => m.type === metric.type);
  
  // Para RECYCLED, más es mejor (lógica inversa)
  const isRecycled = metric.type === 'RECYCLED';
  
  let reduction, isPositive;
  
  if (isRecycled) {
    // Para reciclado: diferencia absoluta (más claro)
    reduction = (metric.value - metric.comparison_value).toFixed(1);
    isPositive = parseFloat(reduction) > 0; // Más reciclado = positivo
  } else {
    // Para CO2, agua, energía: menos es mejor
    reduction = ((1 - metric.value / metric.comparison_value) * 100).toFixed(1);
    isPositive = parseFloat(reduction) > 0; // Menos contaminación = positivo
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editData.value || !editData.comparison_value || !editData.unit) {
      alert('Por favor completa todos los campos');
      return;
    }

    const metricId = metric.id || metric._id;
    onEdit(metricId, {
      type: metric.type,
      value: parseFloat(editData.value),
      comparison_value: parseFloat(editData.comparison_value),
      unit: editData.unit
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      value: metric.value,
      comparison_value: metric.comparison_value,
      unit: metric.unit
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green transition-colors">
        <div className="flex items-center mb-3">
          <span className="font-semibold text-green mr-2">
            Editando: {metricInfo?.label || metric.type}
          </span>
          {metric.type === 'CO2' && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-medium">
              Obligatorio
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Valor</label>
            <input
              type="number"
              name="value"
              value={editData.value}
              onChange={handleEditChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Comparación</label>
            <input
              type="number"
              name="comparison_value"
              value={editData.comparison_value}
              onChange={handleEditChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Unidad</label>
            <input
              type="text"
              name="unit"
              value={editData.unit}
              onChange={handleEditChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent text-sm"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
          >
            <i className="fa-solid fa-times mr-1"></i>
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-green hover:bg-darkgreen text-white rounded-lg transition-colors text-sm font-medium"
          >
            <i className="fa-solid fa-check mr-1"></i>
            Guardar
          </button>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .bg-green { background-color: var(--primary-medium); }
          .bg-darkgreen { background-color: var(--primary-dark); }
          .text-green { color: var(--primary-medium); }
          .focus\\:ring-green:focus { --tw-ring-color: var(--primary-medium); }
        `}} />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:border-green transition-colors">
      <div className="flex items-center justify-between">
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
        <div className="flex gap-2 ml-4">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 transition-colors p-2 hover:bg-blue-50 rounded"
            title="Editar métrica"
          >
            <i className="fa-solid fa-pen-to-square text-lg"></i>
          </button>
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded"
            title="Eliminar métrica"
          >
            <i className="fa-solid fa-trash text-lg"></i>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .text-green { color: var(--primary-medium); }
        .hover\\:border-green:hover { border-color: var(--primary-medium); }
      `}} />
    </div>
  );
};

export default MetricItem;
