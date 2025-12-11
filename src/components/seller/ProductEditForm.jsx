import { useState, useEffect } from 'react';
import { updateProduct, getProductMetrics, createMetric, updateMetric, deleteMetric } from '../../lib/api';
import ProductFormFields from './shared/ProductFormFields';
import MetricsSection from './MetricsSection';
import { SuccessMessage, ErrorMessage, InfoMessage } from './shared/FormMessage';

const ProductEditForm = ({ product, onEditSuccess }) => {
  // Log para debugging - ID del producto
  console.log('🔍 Producto a editar:', {
    id: product?.id || product?._id,
    nombre: product?.name,
    productoCompleto: product
  });

  const [formData, setFormData] = useState({
    brand: product?.brand || '',
    name: product?.name || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    description: product?.description || '',
    originCountry: product?.originCountry || '',
    materials: product?.materials || '',
    imageUrl: product?.imageUrl || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Estados para métricas
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metrics, setMetrics] = useState([]);
  const [showMetricsSection, setShowMetricsSection] = useState(false);

  // Cargar métricas al montar el componente
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoadingMetrics(true);
        const productId = product.id || product._id;
        const metricsData = await getProductMetrics(productId);
        
        // Verificar formato de respuesta
        const metricsArray = Array.isArray(metricsData) ? metricsData : 
                           (metricsData.metrics || metricsData.data || []);
        
        setMetrics(metricsArray);
        
        // Si hay métricas, expandir la sección
        if (metricsArray.length > 0) {
          setShowMetricsSection(true);
        }
      } catch (err) {
        console.error('Error al cargar métricas:', err);
        setMetrics([]);
      } finally {
        setLoadingMetrics(false);
      }
    };

    loadMetrics();
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess(false);
  };

  // Handlers para métricas
  const handleAddMetric = async (metric) => {
    try {
      const productId = product.id || product._id;
      
      // Crear la métrica en el backend
      const response = await createMetric({
        productId: productId,
        ...metric
      });

      // Recargar métricas
      const metricsData = await getProductMetrics(productId);
      const metricsArray = Array.isArray(metricsData) ? metricsData : 
                         (metricsData.metrics || metricsData.data || []);
      setMetrics(metricsArray);
      
    } catch (err) {
      setError(`Error al agregar métrica: ${err.message}`);
    }
  };

  const handleRemoveMetric = async (index) => {
    try {
      const metric = metrics[index];

      // Obtener ID de la métrica
      const metricId = metric.id || metric._id;
      
      if (!metricId) {
        throw new Error('ID de métrica no encontrado');
      }

      // Eliminar del backend
      await deleteMetric(metricId);

      // Actualizar lista local
      setMetrics(prev => prev.filter((_, i) => i !== index));
      
    } catch (err) {
      setError(`Error al eliminar métrica: ${err.message}`);
    }
  };

  const handleEditMetric = async (metricId, metricData) => {
    try {
      // Actualizar en el backend
      await updateMetric(metricId, metricData);

      // Recargar métricas para reflejar cambios
      const productId = product.id || product._id;
      const metricsData = await getProductMetrics(productId);
      const metricsArray = Array.isArray(metricsData) ? metricsData : 
                         (metricsData.metrics || metricsData.data || []);
      setMetrics(metricsArray);
      
    } catch (err) {
      setError(`Error al actualizar métrica: ${err.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validaciones básicas
      if (!formData.brand || !formData.name || !formData.price || !formData.stock || !formData.category) {
        throw new Error('Por favor completa todos los campos obligatorios');
      }

      if (parseFloat(formData.price) <= 0) {
        throw new Error('El precio debe ser mayor a 0');
      }

      if (parseInt(formData.stock) < 0) {
        throw new Error('El stock no puede ser negativo');
      }

      // Validación de métrica CO2 obligatoria
      if (!metrics.some(m => m.type === 'CO2')) {
        throw new Error('El producto debe tener al menos la métrica de CO2');
      }

      // Preparar datos del producto
      const productData = {
        brand: formData.brand,
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category.toUpperCase(),
        description: formData.description,
        originCountry: formData.originCountry,
        materials: formData.materials,
        imageUrl: formData.imageUrl
      };

      // Actualizar producto
      const productId = product.id || product._id;
      await updateProduct(productId, productData);

      setSuccess(true);

      // Llamar callback de éxito después de 1.5 segundos
      setTimeout(() => {
        if (onEditSuccess) {
          onEditSuccess();
        }
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <i className="fa-solid fa-pen-to-square text-green text-2xl mr-3"></i>
        <h2 className="text-2xl font-bold title-darkgreen">Editar Producto</h2>
      </div>

      {/* Mensajes de éxito/error */}
      {success && <SuccessMessage message="¡Producto actualizado exitosamente!" />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos del formulario reutilizables */}
        <ProductFormFields formData={formData} onChange={handleChange} />

        {/* Sección de métricas */}
        <div className="pt-6 border-t border-gray-200">
          {loadingMetrics ? (
            <div className="text-center py-4">
              <i className="fa-solid fa-spinner fa-spin text-green text-2xl"></i>
              <p className="text-gray-600 mt-2">Cargando métricas...</p>
            </div>
          ) : (
            <MetricsSection
              metrics={metrics}
              onAddMetric={handleAddMetric}
              onRemoveMetric={handleRemoveMetric}
              onEditMetric={handleEditMetric}
              isExpanded={showMetricsSection}
              onToggle={() => setShowMetricsSection(!showMetricsSection)}
            />
          )}
        </div>

        {/* Nota informativa sobre certificaciones */}
        <InfoMessage
          title="Nota sobre certificaciones"
          message="Las certificaciones del producto no pueden ser modificadas después de la creación. Solo puedes editar la información básica y las métricas de impacto."
        />

        {/* Botón de envío */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="bg-green hover:bg-darkgreen text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Actualizando producto...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save mr-2"></i>
                Actualizar Producto
              </>
            )}
          </button>
        </div>
      </form>

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
    </div>
  );
};

export default ProductEditForm;
