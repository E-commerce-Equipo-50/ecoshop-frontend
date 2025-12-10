/**
 * Componente de tarjeta de marca reutilizable
 * @param {Object} brand - Objeto con la información de la marca
 * @param {number} brand.id - ID de la marca
 * @param {string} brand.name - Nombre de la marca
 * @param {string} brand.logo - Icono de FontAwesome
 * @param {string} brand.description - Descripción de la marca
 * @param {string} brand.category - Categoría de la marca
 * @param {number} brand.rating - Calificación (0-5)
 * @param {number} brand.productsCount - Cantidad de productos
 */
export const BrandCard = ({ brand }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 flex flex-col h-full"
    >
      {/* Header de la tarjeta con logo centrado */}
      <div className="bg-gradient-to-r from-green to-lightgreen p-6">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow-md">
            <i className={`fa-solid fa-${brand.logo} fa-2xl title-green`}></i>
          </div>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6 flex-grow flex flex-col">
        {/* Nombre y categoría */}
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold title-darkgreen mb-1">{brand.name}</h3>
          <p className="text-sm text-gray-500">{brand.category}</p>
        </div>
        
        {/* Rating y productos */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fa-solid fa-star text-yellow-400 mr-1"></i>
            <span className="font-semibold text-gray-700">{brand.rating}</span>
          </div>
          <div className="text-sm text-gray-500">
            <i className="fa-solid fa-box mr-1"></i>
            {brand.productsCount} productos
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 mb-6 leading-relaxed h-12 overflow-hidden">
          {brand.description}
        </p>

        {/* Botón de acción */}
        <a
          href={`/marcas/${brand.id}/productos`}
          className="block w-full bg-green hover:bg-darkgreen text-white text-center font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Ver todos los productos
          <i className="fa-solid fa-arrow-right ml-2"></i>
        </a>
      </div>

      {/* Footer con badges */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center text-green font-medium">
            <i className="fa-solid fa-leaf mr-1"></i>
            Certificado Eco
          </span>
          <span className="flex items-center text-green font-medium">
            <i className="fa-solid fa-handshake mr-1"></i>
            Comercio Justo
          </span>
        </div>
      </div>

      <style jsx>{`
        .bg-green {
          background-color: var(--primary-medium);
        }
        .bg-darkgreen {
          background-color: var(--primary-dark);
        }
        .bg-lightgreen {
          background-color: var(--off-white);
        }
        .title-green {
          color: var(--primary-medium);
        }
        .title-darkgreen {
          color: var(--secondary-dark);
        }
        .text-green {
          color: var(--primary-medium);
        }
      `}</style>
    </div>
  );
};
