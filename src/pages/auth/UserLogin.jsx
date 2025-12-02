const UserLogin = () => {
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
            Iniciar Sesión
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
            <form action="#" method="POST" className="space-y-6">
              {/* CAMPO: EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-200"
                >
                  Correo personal
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jhondoe@email.com"
                    required
                    autoComplete="email"
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
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[--primary-medium] sm:text-sm sm:leading-6 pl-2"
                  />
                </div>
              </div>

              {/* BOTÓN INICIAR SESIÓN */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[--primary-medium] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[--primary-light] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--primary-medium] transition-colors"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            {/* LINK DE CREAR CUENTA */}
            <p className="mt-10 text-center text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <a
                href="/login"
                className="font-semibold leading-6 text-[--primary-medium] hover:text-[--primary-light] transition-colors"
              >
                Regístrate {/* El link debe llevarte al UserRegister */}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
