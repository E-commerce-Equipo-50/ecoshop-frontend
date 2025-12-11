import { useState } from 'react';
import { createProduct, createMetric, createCertification } from '../../lib/api';
import { CERTIFICATION_ICONS } from '../../constants/productData';
import MetricsSection from './MetricsSection';
import CertificationsSection from './CertificationsSection';
import ProductFormFields from './shared/ProductFormFields';
import { SuccessMessage, ErrorMessage } from './shared/FormMessage';

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    originCountry: '',
    materials: '',
    imageUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Estados para métricas
  const [showMetricsSection, setShowMetricsSection] = useState(false);
  const [metrics, setMetrics] = useState([]);

  // Estados para certificaciones
  const [showCertificationsSection, setShowCertificationsSection] = useState(false);
  const [selectedCertifications, setSelectedCertifications] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess(false);
  };

  // Callbacks para métricas
  const handleAddMetric = (metric) => {
    setMetrics(prev => [...prev, metric]);
    setError('');
  };

  const handleRemoveMetric = (index) => {
    setMetrics(prev => prev.filter((_, i) => i !== index));
  };

  // Callback para certificaciones
  const handleToggleCertification = (certType) => {
    setSelectedCertifications(prev => {
      if (prev.includes(certType)) {
        return prev.filter(c => c !== certType);
      } else {
        return [...prev, certType];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validaciones básicas del producto
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
        throw new Error('Debes agregar al menos la métrica de CO2 antes de crear el producto');
      }

      // Validación de al menos una certificación
      if (selectedCertifications.length === 0) {
        throw new Error('Debes seleccionar al menos una certificación antes de crear el producto');
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

      // Crear nuevo producto
      const productResponse = await createProduct(productData);
      
      // Obtener el ID del producto creado
      const productId = productResponse.product?.id || 
                       productResponse.product?._id || 
                       productResponse._id || 
                       productResponse.id;
      
      if (!productId) {
        throw new Error('No se pudo obtener el ID del producto creado');
      }

      // Crear métricas
      for (const metric of metrics) {
        try {
          await createMetric({
            productId: productId,
            type: metric.type,
            value: metric.value,
            comparison_value: metric.comparison_value,
            unit: metric.unit
          });
        } catch (metricError) {
          console.error('Error creando métrica:', metricError);
        }
      }

      // Crear certificaciones
      for (const cert of selectedCertifications) {
        try {
          await createCertification({
            productId: productId,
            type: cert,
            iconUrl: CERTIFICATION_ICONS[cert] || 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png'
          });
        } catch (certError) {
          console.error('Error creando certificación:', certError);
        }
      }

      setSuccess(true);
      
      // Limpiar formulario
      setFormData({
        brand: '',
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
        originCountry: '',
        materials: '',
        imageUrl: ''
      });
      setMetrics([]);
      setSelectedCertifications([]);
      setShowMetricsSection(false);
      setShowCertificationsSection(false);

      // Mostrar mensaje de éxito por 5 segundos
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <i className="fa-solid fa-box text-green text-2xl mr-3"></i>
        <h2 className="text-2xl font-bold title-darkgreen">Cargar Nuevo Producto</h2>
      </div>

      {/* Mensajes de éxito/error */}
      {success && <SuccessMessage message="¡Producto creado exitosamente!" />}
      {error && <ErrorMessage message={error} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos del formulario reutilizables */}
        <ProductFormFields formData={formData} onChange={handleChange} />

        {/* Secciones de métricas y certificaciones */}
        <div className="pt-6 border-t border-gray-200 space-y-4">
          {/* Métricas */}
          <MetricsSection
            metrics={metrics}
            onAddMetric={handleAddMetric}
            onRemoveMetric={handleRemoveMetric}
            isExpanded={showMetricsSection}
            onToggle={() => setShowMetricsSection(!showMetricsSection)}
          />

          {/* Certificaciones */}
          <CertificationsSection
            selectedCertifications={selectedCertifications}
            onToggleCertification={handleToggleCertification}
            isExpanded={showCertificationsSection}
            onToggle={() => setShowCertificationsSection(!showCertificationsSection)}
          />
        </div>
      </form>

      {/* Botón de envío */}
      <div className="flex justify-end pt-6 border-t border-gray-200 mt-6">
        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="bg-green hover:bg-darkgreen text-white font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              Creando producto...
            </>
          ) : (
            <>
              <i className="fa-solid fa-plus mr-2"></i>
              Crear Producto
            </>
          )}
        </button>
      </div>

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

export default ProductUploadForm;
