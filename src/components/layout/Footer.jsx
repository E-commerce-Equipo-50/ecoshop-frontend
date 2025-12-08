const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="footer">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        
        {/* Sección superior: Logo y enlaces */}
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className=" flex items-center">
              <img src="/ecoshop.png" alt="" class="footer-brand-img" />
              <span className="footer-brand text-2xl font-semibold whitespace-nowrap">Ecoshop</span>
            </a>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Sostenibilidad</h2>
              <ul className=" font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Nuestro Impacto</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Certificaciones</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Metodología</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Compañía</h2>
              <ul className=" font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Sobre nosotros</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Blog Eco</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Trabaja con nosotros</a></li>                
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Soporte</h2>
              <ul className="font-medium">
                <li className="mb-4"><a href="#" className="hover:underline">Contacto</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Preguntas frecuentes</a></li>
                <li className="mb-4"><a href="#" className="hover:underline">Envíos Sostenibles</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        
        {/* Sección inferior: Copyright y redes sociales */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {currentYear} <a href="/" className="hover:underline">Ecoshop™</a>. Todos los derechos reservados.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="#" className="">
              <i class="fab fa-facebook fa-xl"></i>
            </a>
            <a href="#" className="">
              <i class="fab fa-twitter fa-xl"></i>
            </a>
            <a href="#" className="">
              <i class="fab fa-instagram fa-xl"></i>
            </a>
            <a href="#" className="">
              <i class="fab fa-youtube fa-xl"></i>
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
      .footer {
        background-color: var(--off-white);
        color: var(--white);
        padding: var(--space-xl) 0 var(--space-lg);
      }
      .footer h2 {
          color: var(--secondary-dark)
      }
      .footer-brand {
          color: var(--primary-light)
      }
      .footer-brand-img {
          width: 32px;
          margin-right: 0.5rem;
      }
      .footer a {
        color: var(--primary-medium);
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer a:hover {
        color: var(--primary-light);
      }`}
      </style>
    </footer>
  );
}