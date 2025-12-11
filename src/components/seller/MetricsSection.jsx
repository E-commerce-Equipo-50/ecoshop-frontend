import MetricItem from './MetricItem';
import MetricForm from './MetricForm';

const MetricsSection = ({ metrics, onAddMetric, onRemoveMetric, onEditMetric, isExpanded, onToggle }) => {

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

          {/* Lista de métricas agregadas */}
          {metrics.length > 0 && (
            <div className="mb-6 space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Métricas Agregadas:</h4>
              {metrics.map((metric, index) => (
                <MetricItem
                  key={metric.id || metric._id || index}
                  metric={metric}
                  index={index}
                  onRemove={onRemoveMetric}
                  onEdit={onEditMetric}
                />
              ))}
            </div>
          )}

          {/* Formulario para agregar métrica */}
          <MetricForm metrics={metrics} onAdd={onAddMetric} />
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
