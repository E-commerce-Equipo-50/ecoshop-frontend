import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductUploadForm from '../components/seller/ProductUploadForm';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('productos');
  const [sellerData, setSellerData] = useState(null);

  useEffect(() => {
    // Verificar si el vendedor está logueado
    const seller = localStorage.getItem('seller');
    if (!seller) {
      navigate('/login-company');
      return;
    }
    setSellerData(JSON.parse(seller));
  }, [navigate]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('seller');
    window.dispatchEvent(new Event('authChange'));
    navigate('/');
  };

  if (!sellerData) {
    return null; // O un loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER DEL PANEL */}
      <div className="bg-white shadow-md border-b-2 border-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            {/* Lado Izquierdo: Info del Vendedor */}
            <div className="flex items-center space-x-4">
              <div className="bg-lightgreen rounded-lg p-3">
                <i className="fa-solid fa-store text-green text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold title-darkgreen">
                  {sellerData.brandName || 'Mi Tienda'}
                </h1>
                <p className="text-sm text-gray-500">
                  {sellerData.email}
                </p>
              </div>
            </div>

            {/* Lado Derecho: Botones de Acción */}
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-green hover:bg-lightgreen rounded-lg text-sm font-medium transition-colors flex items-center">
                <i className="fa-solid fa-bell mr-2"></i>
                Notificaciones
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN CON TABS */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('productos')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'productos'
                  ? 'border-green text-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fa-solid fa-box mr-2"></i>
              Cargar Productos
            </button>
            <button
              onClick={() => setActiveTab('inventario')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'inventario'
                  ? 'border-green text-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fa-solid fa-warehouse mr-2"></i>
              Gestión de Inventario
            </button>
            <button
              onClick={() => setActiveTab('metricas')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'metricas'
                  ? 'border-green text-green'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <i className="fa-solid fa-chart-line mr-2"></i>
              Métricas
            </button>
          </nav>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab: Cargar Productos */}
        {activeTab === 'productos' && (
          <ProductUploadForm />
        )}

        {/* Tab: Gestión de Inventario */}
        {activeTab === 'inventario' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <i className="fa-solid fa-warehouse text-green text-2xl mr-3"></i>
              <h2 className="text-2xl font-bold title-darkgreen">Gestión de Inventario</h2>
            </div>
            <div className="text-center py-12 text-gray-500">
              <i className="fa-solid fa-boxes-stacked text-6xl mb-4 text-gray-300"></i>
              <p className="text-lg">Tabla de productos y stock</p>
              <p className="text-sm mt-2">Esta sección se implementará en el siguiente paso</p>
            </div>
          </div>
        )}

        {/* Tab: Métricas */}
        {activeTab === 'metricas' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <i className="fa-solid fa-chart-line text-green text-2xl mr-3"></i>
              <h2 className="text-2xl font-bold title-darkgreen">Métricas del Vendedor</h2>
            </div>
            <div className="text-center py-12 text-gray-500">
              <i className="fa-solid fa-chart-pie text-6xl mb-4 text-gray-300"></i>
              <p className="text-lg">Dashboard de métricas y estadísticas</p>
              <p className="text-sm mt-2">Esta sección se implementará en el siguiente paso</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-green {
          background-color: var(--primary-medium);
        }
        .bg-darkgreen {
          background-color: var(--primary-dark);
        }
        .bg-lightgreen {
          background-color: #f0f7e6;
        }
        .text-green {
          color: var(--primary-medium);
        }
        .border-green {
          border-color: var(--primary-medium);
        }
        .title-darkgreen {
          color: var(--secondary-dark);
        }
      `}</style>
    </div>
  );
};

export default SellerDashboard;
