import { CATEGORIES, COUNTRIES } from '../../../constants/productData';

/**
 * Campos del formulario de producto reutilizables
 * Este componente contiene todos los campos comunes entre ProductUploadForm y ProductEditForm
 */
const ProductFormFields = ({ formData, onChange }) => {
  return (
    <>
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
            onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
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
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={onChange}
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
          onChange={onChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map(cat => (
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
          onChange={onChange}
          rows="4"
          placeholder="Describe tu producto..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent resize-none"
        />
      </div>

      {/* Fila 5: URL de Imagen */}
      <div>
        <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-700 mb-2">
          URL de la Imagen del Producto
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={onChange}
          placeholder="https://ejemplo.com/imagen-producto.jpg"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Introduce la URL completa de la imagen (debe comenzar con http:// o https://)</p>
      </div>

      {/* Fila 6: País de Origen y Materiales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="originCountry" className="block text-sm font-semibold text-gray-700 mb-2">
            País de Origen
          </label>
          <select
            id="originCountry"
            name="originCountry"
            value={formData.originCountry}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          >
            <option value="">Selecciona un país</option>
            {COUNTRIES.map(country => (
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
            onChange={onChange}
            placeholder="Ej: Algodón orgánico, poliéster reciclado"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-transparent"
          />
        </div>
      </div>
    </>
  );
};

export default ProductFormFields;
