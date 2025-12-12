import { useState, useEffect, useRef } from "react";
import logo from "../../assets/home.png";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../common/SearchBar";
import { getCartItemCount } from "../../lib/api/cart";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userMenuRef = useRef(null);
  const createMenuRef = useRef(null);

  // Función para cargar cantidad del carrito
  const loadCartCount = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const count = await getCartItemCount();
      setCartCount(count);
    } else {
      setCartCount(0);
    }
  };

  // Verificar si hay sesión activa y cargar carrito
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
      loadCartCount();
    };
    
    // Verificar al cargar
    checkAuth();
    
    // Escuchar cambios en localStorage (para cuando se hace login/logout)
    window.addEventListener('storage', checkAuth);
    // Evento custom para actualizar sin recargar página
    window.addEventListener('authChange', checkAuth);
    // Evento custom para actualizar carrito
    window.addEventListener('cartUpdated', loadCartCount);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
      window.removeEventListener('cartUpdated', loadCartCount);
    };
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('seller');
    setIsLoggedIn(false);
    setCartCount(0); // Resetear contador del carrito
    setUserMenuOpen(false);
    navigate('/');
  };

  // Datos del menú (evita duplicación)
  const mainLinks = [
    { label: "Catálogo", to: "/catalog" },
    { label: "Marcas", to: "/brands" },
    { label: "Certificaciones", to: "/certifications" },
  ];

  const loginLinks = [
    { label: "Acceder como Cliente", to: "/login-client" },
    { label: "Acceder como Empresa", to: "/login-company" },
  ];

  const registerLinks = [
    { label: "Como Cliente", to: "/register-client" },
    { label: "Como Empresa", to: "/register-company" },
  ];

  // Cierra dropdowns al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(e.target)) {
        setCreateMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Tecla ESC para cerrar cualquier menú
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserMenuOpen(false);
        setCreateMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="shadow-sm sticky top-0 z-50 bg-[var(--white)] border-b border-[var(--border-light)]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">

          {/* Mobile: Hamburguesa */}
          <button
            className="focus-ring lg:hidden text-[var(--text-light)] active:text-[var(--text-dark)] p-2 mr-2"
            aria-label="Abrir menú móvil"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="focus-ring flex items-center"
            aria-label="Ir al inicio"
          >
            <img src={logo} alt="EcoShop logo" className="h-7 w-auto" />
          </Link>


          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 ml-10 font-medium">
            {mainLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="focus-ring navbar-link"
              >
                {item.label}
              </Link>
            ))}
          </div>


          {/* Right side */}
          <div className="flex items-center gap-5 ml-auto">

            {/* Buscador si hay sesión, Crear cuenta si no hay sesión */}
            {isLoggedIn ? (
              // Usuario logueado → Mostrar buscador
              <div className="hidden lg:block">
                <SearchBar />
              </div>
            ) : (
              // Usuario NO logueado → Mostrar botón Crear cuenta
              <div className="hidden lg:block relative" ref={createMenuRef}>
              <button
                className="focus-ring navbar-btn-signup"
                aria-haspopup="true"
                aria-expanded={createMenuOpen}
                onClick={() => setCreateMenuOpen((v) => !v)}
              >
                Crear cuenta
              </button>

              {/* Desplegar menu Crear cuenta*/}
              {createMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-10 w-48 bg-[var(--white)] border border-[var(--border-light)] rounded-lg shadow-md z-40"
                >
                  {registerLinks.map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      role="menuitem"
                      className="block px-4 py-2 text-[var(--text-dark)] hover:bg-[var(--off-white)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              </div>
            )}

            {/* Carrito */}
            <Link
              to="/cart"
              aria-label="Carrito"
              className="focus-ring relative text-[var(--text-light)] hover:text-[var(--text-dark)] transition p-2"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              <span className="absolute -top-0 -right-2 text-xs bg-[var(--primary-medium)] text-[var(--white)] rounded-full px-1.5">
                {cartCount}
              </span>
            </Link>

            {/* Usuario */}
            <div className="hidden lg:block relative" ref={userMenuRef}>
              <button
                className="focus-ring text-[var(--text-light)] hover:text-[var(--text-dark)] p-2 transition"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                <i className="fa-solid fa-user text-lg"></i>
              </button>


              {/* Desplegar menu Login o Logout*/}
              {userMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-10 w-56 bg-[var(--white)] border border-[var(--border-light)] rounded-lg shadow-md z-40"
                >
                  {isLoggedIn ? (
                    // Usuario logueado - Mostrar Mi Perfil y Cerrar sesión
                    <>
                      <Link
                        to="/profile"
                        role="menuitem"
                        className="focus-ring block px-4 py-2 text-[var(--text-dark)] hover:bg-[var(--off-white)]"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Mi Perfil
                      </Link>
                      <div className="border-t my-2"></div>
                      <button
                        onClick={handleLogout}
                        role="menuitem"
                        className="focus-ring w-full text-left block px-4 py-2 text-[var(--text-dark)] hover:bg-[var(--off-white)]"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    // Usuario NO logueado - Mostrar opciones de login
                    loginLinks.map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        role="menuitem"
                        className="focus-ring block px-4 py-2 text-[var(--text-dark)] hover:bg-[var(--off-white)]"
                      >
                        {item.label}
                      </Link>
                    ))
                  )}
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-50 lg:hidden transition-opacity duration-300 opacity-100"
            aria-hidden={!mobileOpen}
          >
            <div
              className={`bg-[var(--white)] w-72 h-full shadow-lg p-6 transform transition-transform duration-300 
              ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
              `}
              role="dialog"
              aria-modal="true"
            >
              {/* Botón cerrar menu */}
              <button
                className="focus-ring mb-6 text-[var(--text-light)] hover:text-[var(--text-dark)] p-1"
                aria-label="Cerrar menú móvil"
                onClick={() => setMobileOpen(false)}
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>

              {/* Menú móvil reutiliza los mismos arrays */}
              <nav className="flex flex-col" aria-label="Navegación móvil">
                {mainLinks.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition"
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-6 border-t pt-4">
                  {isLoggedIn ? (
                    // Usuario logueado - Mostrar Mi Perfil y Cerrar sesión
                    <>
                      <p className="text-[var(--text-light)] text-sm mb-2">
                        Mi cuenta
                      </p>
                      <Link
                        to="/profile"
                        onClick={() => setMobileOpen(false)}
                        className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition"
                      >
                        Mi Perfil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition w-full text-left"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    // Usuario NO logueado - Mostrar login y registro
                    <>
                      <p className="text-[var(--text-light)] text-sm mb-2">
                        Acceder
                      </p>
                      {loginLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition"
                        >
                          {item.label}
                        </Link>
                      ))}

                      <div className="my-3 border-t"></div>
                      <p className="text-[var(--text-light)] text-sm mb-2">
                        Crear cuenta
                      </p>

                      {registerLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </>
                  )}

                  <div className="mt-6 border-t pt-4">
                    <p className="text-[var(--text-light)] text-sm mb-2">
                      Carrito
                    </p>
                    <Link
                      to="/cart"
                      onClick={() => setMobileOpen(false)}
                      className="focus-ring block text-[var(--text-dark)] active:font-semibold p-4 transition"
                    >
                      Ver carrito ({cartCount})
                    </Link>
                  </div>

                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}