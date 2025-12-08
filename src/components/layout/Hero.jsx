export function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 lg:px-8 h-screen"> 
        
        {/* Carrusel de fondo */}
        <div className="absolute inset-0 -z-10">
          <div className="hero-carousel">
            <div className="carousel-slide">
              <img
                src="https://skipper.org/cdn/shop/articles/eco_friendly_120cd6de-0473-47d2-bbf4-45f526c82391.png?v=1659684410"
                alt="Ecoshop 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img
                src="https://ecofriendlygame.com/wp-content/uploads/2023/10/slide_2-1-.jpg"
                alt="Ecoshop 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img
                src="https://etimg.etb2bimg.com/photo/95217315.cms"
                alt="Ecoshop 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="carousel-slide">
              <img
                src="https://cdn.shopify.com/s/files/1/0582/6556/7255/files/img-bp-3-ways-eco-friendly-lifestyle-my-01-dt.png"
                alt="Ecoshop 4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Tu contenido existente */}
        <div className="mx-auto max-w-2xl py-24 sm:py-20 lg:py-16">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white/70 hover:ring-white/90">
              Plataforma certificada carbono neutral.{' '}
              <a href="#" className="font-semibold">
                <span aria-hidden="true" className="absolute inset-0"></span> <span className="text-green">Conoce más</span> <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
              Compra Consciente,
              <span className="text-green"> Impacto Medible</span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
              Descubre productos sostenibles con huella ambiental verificada. Cada compra en <span className="text-green">Ecoshop</span> contribuye a un futuro más verde y transparente.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Comprar Sostenible
              </a>
              <a href="#" className="text-green text-sm/6 font-semibold">
                Cómo funciona <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Agrega este CSS al archivo global o como styled-jsx */}
      <style jsx>{`
        .hero-carousel {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          animation: carouselAnimation 15s infinite;
        }
        
        .carousel-slide:nth-child(1) {
          animation-delay: 0s;
        }
        
        .carousel-slide:nth-child(2) {
          animation-delay: 5s;
        }
        
        .carousel-slide:nth-child(3) {
          animation-delay: 10s;
        }
        .text-green {
        color: var(--primary-light)
        }
        @keyframes carouselAnimation {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          40% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}