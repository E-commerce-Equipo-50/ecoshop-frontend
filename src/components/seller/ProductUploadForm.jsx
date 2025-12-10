import { useState } from 'react';
import { createProduct, createMetric, createCertification } from '../../lib/api';
import MetricsSection from './MetricsSection';
import CertificationsSection from './CertificationsSection';

const ProductUploadForm = () => {
  const [formData, setFormData] = useState({
    brand: '',
    name: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    originCountry: '',
    materials: ''
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

  // Categorías disponibles
  const categories = [
    'Ropa Ecológica',
    'Hogar Eco',
    'Belleza Natural',
    'Alimentación',
    'Arte Sostenible',
    'Infantil',
    'Jardinería',
    'Agua Sostenible',
    'Energía Verde',
    'Empaques',
    'Deportes',
    'Muebles'
  ];

  // Países disponibles
  const countries = [
    { code: 'AR', name: 'Argentina' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'BR', name: 'Brasil' },
    { code: 'CL', name: 'Chile' },
    { code: 'CO', name: 'Colombia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'ES', name: 'España' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'HN', name: 'Honduras' },
    { code: 'MX', name: 'México' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'PA', name: 'Panamá' },
    { code: 'PE', name: 'Perú' },
    { code: 'PR', name: 'Puerto Rico' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'VE', name: 'Venezuela' }
  ];

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

      // Crear el producto primero
      const productData = {
        brand: formData.brand,
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category.toUpperCase(),
        description: formData.description,
        originCountry: formData.originCountry,
        materials: formData.materials
      };

      const productResponse = await createProduct(productData);
      
      // Obtener el ID del producto creado
      const productId = productResponse.product?.id || 
                       productResponse.product?._id || 
                       productResponse._id || 
                       productResponse.id;
      
      if (!productId) {
        throw new Error('No se pudo obtener el ID del producto creado');
      }

      // Enviar métricas
      let metricsSuccess = 0;
      let metricsFailed = 0;
      
      for (const metric of metrics) {
        try {
          await createMetric({
            productId: productId,
            type: metric.type,
            value: metric.value,
            comparison_value: metric.comparison_value,
            unit: metric.unit
          });
          metricsSuccess++;
        } catch (metricError) {
          metricsFailed++;
        }
      }

      // Enviar certificaciones
      let certificationsSuccess = 0;
      let certificationsFailed = 0;
      
      const certificationIcons = {
        FAIR_TRADE: 'https://cdn-icons-png.flaticon.com/512/2917/2917995.png',
        CARBON_NEUTRAL: 'https://cdn-icons-png.flaticon.com/512/3094/3094840.png',
        GOTS: 'https://cdn-icons-png.flaticon.com/512/2913/2913133.png'
      };
      
      for (const certType of selectedCertifications) {
        try {
          await createCertification({
            productId: productId,
            type: certType,
            iconUrl: certificationIcons[certType] || 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png'
          });
          certificationsSuccess++;
        } catch (certError) {
          certificationsFailed++;
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
        materials: ''
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
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <i className="fa-solid fa-circle-check text-green text-xl mr-3"></i>
            <p className="text-green-700 font-medium">¡Producto creado exitosamente!</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <i className="fa-solid fa-circle-xmark text-red-600 text-xl mr-3"></i>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fila 1: Marca y Nombre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">
              Marca <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              placeholder="Ej: EcoWear"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Producto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ej: Camiseta Orgánica"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>
        </div>

        {/* Fila 2: Precio y Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
              Precio <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Inicial <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>
        </div>

        {/* Fila 3: Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Fila 4: Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe tu producto..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent resize-none"
          />
        </div>

        {/* Fila 5: País de Origen y Materiales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="originCountry" className="block text-sm font-semibold text-gray-700 mb-2">
              País de Origen
            </label>
            <select
              id="originCountry"
              name="originCountry"
              value={formData.originCountry}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            >
              <option value="">Selecciona un país</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="materials" className="block text-sm font-semibold text-gray-700 mb-2">
              Materiales
            </label>
            <input
              type="text"
              id="materials"
              name="materials"
              value={formData.materials}
              onChange={handleChange}
              placeholder="Ej: Algodón orgánico, poliéster reciclado"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
            />
          </div>
        </div>

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
