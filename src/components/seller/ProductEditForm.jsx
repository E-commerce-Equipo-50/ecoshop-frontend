import { useState } from 'react';
import { updateProduct } from '../../lib/api';
import ProductFormFields from './shared/ProductFormFields';
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
    materials: product?.materials || ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess(false);
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

      // Preparar datos del producto
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

        {/* Nota informativa */}
        <InfoMessage
          title="Nota sobre métricas y certificaciones"
          message="Las métricas de impacto y certificaciones del producto no pueden ser modificadas desde aquí. Solo puedes editar la información básica del producto."
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
