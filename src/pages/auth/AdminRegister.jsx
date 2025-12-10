import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerSeller } from '../../lib/api/client';

const AdminRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ brandName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await registerSeller(formData);
      console.log('Registro de vendedor exitoso:', response);
      
      // Guardar el token
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('seller', JSON.stringify(response.seller));
      
      // Notificar al Navbar del cambio de autenticación
      window.dispatchEvent(new Event('authChange'));
      
      alert(`¡Registro exitoso! Bienvenido ${response.seller.brandName}`);
      // Aquí podrías redirigir: window.location.href = '/';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* CONTENEDOR PRINCIPAL (Fondo Claro)
          - min-h-screen: Ocupa toda la altura de la pantalla
          - bg-gray-50: Color de fondo gris muy claro (casi blanco)
          - flex ... center: Centra el contenido vertical y horizontalmente
        */}

      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        {/* TÍTULO (Fuera de la tarjeta) */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Únete a EcoShop
          </h2>
        </div>

        {/* TARJETA OSCURA (Donde va el formulario) 
          - bg-gray-900: Fondo oscuro
          - shadow-2xl: Sombra profunda para efecto flotante
          - rounded-xl: Bordes redondeados
        */}

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-900 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-700">
            {/* LOGO */}
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
              <img
                alt="EcoShop Logo"
                src="src/assets/home.png"
                className="mx-auto h-16 w-auto"
              />
            </div>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* MENSAJE DE ERROR */}
              {error && (
                <div className="rounded-md bg-red-900/50 border border-red-500 p-3">
                  <p className="text-sm text-red-200">{error}</p>
                </div>
              )}
              
              {/* CAMPO: NOMBRE */}
              <div>
                <label
                  htmlFor="Name"
                  className="block text-sm font-medium text-gray-200"
                >
                  Nombre de la organización
                </label>
                <div className="mt-2">
                  <input
                    id="brandName"
                    name="brandName"
                    type="text"
                    placeholder="Ej: EcoTextiles S.A."
                    required
                    autoComplete="organization"
                    value={formData.brandName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[--primary-medium] sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* CAMPO: EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Correo de la organización
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="contacto@empresa.com"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[--primary-medium] sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* CAMPO: CONTRASEÑA */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="..............."
                    required
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[--primary-medium] sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* BOTÓN REGISTRARSE */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-[--primary-medium] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-light] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary-medium] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>
            </form>

            {/* LINK DE INICIO DE SESIÓN */}
            <p className="mt-10 text-center text-sm text-gray-400">
              ¿Ya tienes cuenta?{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-[--primary-medium] hover:text-[--primary-light] transition-colors"
              >
                Inicia sesión {/* El link debe llevarte al AdminLogin */}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminRegister;
