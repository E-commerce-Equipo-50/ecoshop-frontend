export function AdminRegister() { 
  return (
    <>
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Únete a EcoShop
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-900 py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-700">
            
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mb-6">
              <img
                alt="EcoShop Logo"
                src="src/assets/home.png"
                className="mx-auto h-16 w-auto" 
              />
            </div>

            <form action="#" method="POST" className="space-y-6">
              
              {/* CAMPO: NOMBRE */}
              <div>
                <label htmlFor="Name" className="block text-sm font-medium text-gray-200">
                  Nombre de la organización
                </label>
                <div className="mt-2">
                  <input
                    id="Name"
                    name="Name"
                    type="text"
                    placeholder="Nombre"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>
              
              {/* CAMPO: EMAIL */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                  Correo de la organización
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* CAMPO: CONTRASEÑA */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* BOTÓN REGISTRARSE */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[--primary-medium] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-light] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
                >
                  Registrarse
                </button>
              </div>
            </form>

            {/* 👇 AQUÍ AGREGUÉ EL LINK DE INICIO DE SESIÓN 👇 */}
            <p className="mt-10 text-center text-sm text-gray-400">
              ¿Ya tienes cuenta?{' '}
              {/* Si usas Link de react-router-dom, cambia 'a' por 'Link' y 'href' por 'to' */}
              <a href="/login" className="font-semibold leading-6 text-[--primary-medium] hover:text-[--primary-light] transition-colors">
                Inicia sesión {/* El link debe llevarte al AdminLogin */}
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  )
}