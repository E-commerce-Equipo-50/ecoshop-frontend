import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../components/layout/Footer'
import { 
  TrendingUp, 
  Droplets, 
  Recycle, 
  Leaf,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  Battery,
  Sun,
  Wind,
  Zap
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: 'Carlos',
    lastName: 'Mendoza',
    email: 'carlos.mendoza@email.com',
    memberSince: 'Marzo 2023',
    ecoPoints: 1250,
    level: 'Eco-Guerrero',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  // Datos de impacto ambiental
  const [impactData, setImpactData] = useState({
    co2Avoided: 245, // kg
    waterSaved: 1250, // litros
    wasteDiverted: 48, // kg
    treesSaved: 12,
    cleanEnergySupport: 85 // porcentaje
  });

  // Certificaciones del vendedor
  const [certifications] = useState([
    { id: 1, name: 'Orgánico Certificado', logo: '🌱', description: 'Productos 100% orgánicos' },
    { id: 2, name: 'Comercio Justo', logo: '⚖️', description: 'Comercio ético y justo' },
    { id: 3, name: 'Carbon Neutral', logo: '🌍', description: 'Cero emisiones netas' },
    { id: 4, name: 'Cruelty Free', logo: '🐰', description: 'Libre de crueldad animal' },
    { id: 5, name: 'B Corp', logo: '🏆', description: 'Certificación B Corporation' },
    { id: 6, name: 'Plástico Neutral', logo: '♻️', description: 'Compensa plástico generado' }
  ]);

  // Historial de compras sustentables
  const [sustainablePurchases] = useState([
    { id: 1, name: 'Camiseta Orgánica', date: '15/06/2023', impact: 'Ahorro: 2.5kg CO₂', category: 'Ropa' },
    { id: 2, name: 'Botella Reutilizable', date: '10/06/2023', impact: 'Ahorro: 500L agua', category: 'Hogar' },
    { id: 3, name: 'Jabón Natural', date: '02/06/2023', impact: '0 químicos tóxicos', category: 'Higiene' },
    { id: 4, name: 'Bolsa de Tela', date: '25/05/2023', impact: 'Evita plástico', category: 'Accesorios' },
    { id: 5, name: 'Semillas Nativas', date: '18/05/2023', impact: 'Biodiversidad', category: 'Jardín' },
    { id: 6, name: 'Energía Solar', date: '10/05/2023', impact: 'Energía limpia', category: 'Energía' }
  ]);

  // Tipos de energía limpia
  const [energySources] = useState([
    { type: 'Solar', percentage: 45, icon: <Sun className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Eólica', percentage: 30, icon: <Wind className="w-5 h-5" />, color: 'bg-blue-100 text-blue-800' },
    { type: 'Hidroeléctrica', percentage: 20, icon: <Zap className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Biomasa', percentage: 5, icon: <Leaf className="w-5 h-5" />, color: 'bg-green-100 text-green-800' }
  ]);

  // Verificar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login-client');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-green">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Perfil y datos básicos */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tarjeta de perfil */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full border-4 border-green-600 mx-auto mb-4 overflow-hidden">
                  <img 
                    src={userData.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{userData.name} {userData.lastName}</h2>
                <p className="text-gray-600 mb-2">{userData.email}</p>
                
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">{userData.level}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userData.ecoPoints}</div>
                    <div className="text-sm text-gray-600">EcoPoints</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">12</div>
                    <div className="text-sm text-gray-600">Compras</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500">
                  Miembro desde {userData.memberSince}
                </p>
              </div>
            </div>

          </div>

          {/* Columna derecha - Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            

            {/* Sección 1: Impacto Ambiental */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Mi Impacto Ambiental Positivo</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {/* CO2 Evitado */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{impactData.co2Avoided} kg</div>
                  <div className="text-sm text-gray-600">CO₂ evitado</div>
                  <div className="text-xs text-green-600 mt-2">Equivale a 10 árboles adultos</div>
                </div>

                {/* Agua Ahorrada */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Droplets className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{impactData.waterSaved} L</div>
                  <div className="text-sm text-gray-600">Agua ahorrada</div>
                  <div className="text-xs text-blue-600 mt-2">Equivale a 50 duchas</div>
                </div>

                {/* Residuos Desviados */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Recycle className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{impactData.wasteDiverted} kg</div>
                  <div className="text-sm text-gray-600">Residuos desviados</div>
                  <div className="text-xs text-yellow-600 mt-2">Del vertedero</div>
                </div>

                {/* Árboles Salvados */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{impactData.treesSaved}</div>
                  <div className="text-sm text-gray-600">Árboles salvados</div>
                  <div className="text-xs text-emerald-600 mt-2">Gracias a tu papel reciclado</div>
                </div>
              </div>

              {/* Gráfico de apoyo a energía limpia */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Battery className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-bold text-gray-800">Apoyo a Energía Limpia</h3>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{impactData.cleanEnergySupport}%</div>
                </div>
                
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${impactData.cleanEnergySupport}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {energySources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${source.color}`}>
                          {source.icon}
                        </div>
                        <span className="font-medium text-green-700 mb-2">{source.type}</span>
                      </div>
                      <span className="font-bold text-green-700">{source.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sección 2: Historial de Compras Sustentables */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-800">Mi Historial de Compras Sustentables</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Producto</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Fecha</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Categoría</th>
                      <th className="text-left py-3 px-4 text-gray-700 font-semibold">Impacto Positivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sustainablePurchases.map((purchase) => (
                      <tr key={purchase.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-600">{purchase.name}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{purchase.date}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            {purchase.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 text-green-700">
                            <Leaf className="w-4 h-4" />
                            <span>{purchase.impact}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Resumen de tu impacto</h4>
                    <p className="text-sm text-gray-600">
                      Con tus compras has contribuido significativamente a un planeta más sostenible
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                    Ver reporte detallado
                  </button>
                </div>
              </div>
            </div>

            {/* Sección 3: Próximos objetivos */}
            <div className="bg-gradient-to-b from-white to-green-50 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-4 text-green-800">Tu Próximo Objetivo Eco</h3>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="mb-2 text-green-700">Alcanza 2,000 EcoPoints para desbloquear:</p>
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5" />
                    <span className="font-bold text-green-800">Nivel: Eco-Master</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-800">{userData.ecoPoints}/2,000</div>
                  <div className="text-sm text-green-600">EcoPoints</div>
                </div>
              </div>
              
              <div className="w-full bg-green-100 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(userData.ecoPoints / 2000) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="mb-3 text-green-700">¡Faltan {2000 - userData.ecoPoints} puntos! Sigue comprando sostenible</p>
                <Link
                  to="/catalog"
                  className="inline-block text-white bg-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                >
                  Explorar productos ecológicos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      <style jsx>
       {`
        .bg-green {
          background-color: var(--primary-light);
          color: var(--off-white)
          }
       `} 
      </style>
    </div>
  );
};

export default Profile;