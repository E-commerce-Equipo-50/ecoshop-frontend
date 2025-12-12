import { Hero } from '../components/layout/Hero'
import { Footer } from '../components/layout/Footer'

export const Home = () => {

  const featuredBrands = [
    {
      id: 1,
      name: "EcoWear",
      logo: "vest-patches",
      description: "Moda sostenible con materiales orgánicos",
      category: "Ropa Ecológica",
      rating: 4.8
    },
    {
      id: 2,
      name: "GreenHome",
      logo: "house-medical-circle-check",
      description: "Productos para hogares sostenibles",
      category: "Hogar Eco",
      rating: 4.9
    },
    {
      id: 3,
      name: "PureBeauty",
      logo: "spray-can-sparkles",
      description: "Cosméticos naturales y cruelty-free",
      category: "Belleza Natural",
      rating: 4.7
    },
    {
      id: 4,
      name: "EcoFoods",
      logo: "plate-wheat",
      description: "Alimentos orgánicos y locales",
      category: "Alimentación",
      rating: 4.8
    },
    {
      id: 5,
      name: "RecycleArt",
      logo: "palette",
      description: "Arte y decoración con materiales reciclados",
      category: "Arte Sostenible",
      rating: 4.6
    },
    {
      id: 6,
      name: "BioBaby",
      logo: "baby-carriage",
      description: "Productos ecológicos para bebés",
      category: "Infantil",
      rating: 4.9
    }
  ];


  return (
    <div className='Home'>
      <Hero/>
      <section className="py-16 bg-lightgreen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold title-darkgreen mb-6">
              Transformando el Comercio Electrónico
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              En Ecoshop no solo vendemos productos sostenibles, sino que medimos y mostramos 
              el impacto ambiental positivo de cada compra. Empoderamos a los consumidores 
              para que tomen decisiones informadas y responsables.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">
                    <i class="fa-solid fa-earth title-green"></i>
                  </span>
                </div>
                <h3 className="text-xl font-semibold title-green mb-2">Huella de Carbono</h3>
                <p className="text-gray-600">Calculamos y mostramos la huella ambiental de cada producto</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">
                    <i class="fa-solid fa-chart-line title-green"></i>
                  </span>
                </div>
                <h3 className="text-xl font-semibold title-green mb-2">Transparencia Total</h3>
                <p className="text-gray-600">Datos verificados sobre materiales, origen y certificaciones</p>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">
                    <i class="fa-solid fa-leaf title-green"></i>
                  </span>
                </div>
                <h3 className="text-xl font-semibold title-green mb-2">Impacto Medible</h3>
                <p className="text-gray-600">Visualiza el impacto positivo de tus decisiones de compra</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cómo Funciona */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center title-green mb-12">
            Cómo Medimos el Impacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4 bg-green rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md">1</div>
              <h3 className="text-xl font-semibold title-green mb-3">Análisis de Productos</h3>
              <p className="text-gray-600">Evaluamos materiales, producción y transporte de cada item</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 bg-green rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md">2</div>
              <h3 className="text-xl font-semibold title-green mb-3">Cálculo de Emisiones</h3>
              <p className="text-gray-600">Calculamos CO₂ equivalente usando metodologías verificadas</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 bg-green rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md">3</div>
              <h3 className="text-xl font-semibold title-green mb-3">Visualización Clara</h3>
              <p className="text-gray-600">Mostramos datos comprensibles con eco-badges y métricas</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4 bg-green rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-md">4</div>
              <h3 className="text-xl font-semibold title-green mb-3">Reporte de Impacto</h3>
              <p className="text-gray-600">Generamos reportes personalizados de tu contribución ecológica</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Marcas Destacadas */}
      <section className="py-16 bg-lightgreen">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold title-darkgreen mb-4">
              Nuestras Marcas Destacadas
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Descubre las tiendas sostenibles que forman parte de nuestra comunidad eco-friendly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBrands.map((brand) => (
              <div key={brand.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                     <div className="w-20 h-20 flex items-center justify-center bg-lightgreen rounded-lg">
                      <i className={`fa-solid fa-${brand.logo} fa-2xl title-green`}></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold title-green">{brand.name}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 text-sm text-gray-600">{brand.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{brand.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      {brand.category}
                    </span>
                    <button className="bg-green text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition-colors">
                      Ver Tienda
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-white text-green border-2 border-green px-8 py-3 rounded-lg font-semibold hover:bg-green hover:text-white transition-colors">
              Ver Todas las Marcas
            </button>
          </div>
        </div>
      </section>
     
      {/* Sección: Contenido Educativo */}
      <section className="py-16 bg-lightgreen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center title-darkgreen mb-12">
            Aprende sobre consumo responsable
          </h2>

          {/* Grid ajustada a 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* Video 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-56 bg-green flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/1Xar55g7PYE"
                  title="Video sobre consumo responsable"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold title-green mb-3">
                  ¿Qué es el consumo responsable?
                </h3>
                <p className="text-gray-600 mb-4">
                  Conoce cómo tus decisiones al comprar pueden reducir CO₂, ahorrar agua y fomentar prácticas sustentables.
                </p>
              </div>
            </div>

            {/* Video 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-56 bg-green flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/A5pTU6SFTGY?start=159"
                  title="Certificaciones ecológicas"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold title-green mb-3">
                  Certificaciones sostenibles
                </h3>
                <p className="text-gray-600 mb-4">
                  Aprende qué significan certificaciones como Fairtrade, GOTS, FSC y otras certificaciones verdes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sección: Call to Action */}
      <section className="py-16 bg-green">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold title-darkgreen mb-6">
            Únete a la Revolución Verde
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cada compra cuenta. Con Ecoshop, no solo adquieres productos de calidad, 
            sino que contribuyes activamente a un futuro más sostenible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white title-darkgreen px-8 py-3 rounded-lg font-semibold hover:bg-green-800 hover:text-white transition-colors"
            >
              Explorar Catálogo
            </a>
            <a
              href="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
            >
              Conoce Nuestra Misión
            </a>
          </div>
        </div>
      </section>
      <Footer/>
      <style jsx>
       {`
       .bg-lightgreen {
          background-color: #d1e3a5;
        }
        .bg-green {
          background-color: var(--primary-light);
          color: var(--off-white)
          }
          .bg-darkgreen {
          background-color: var(--primary-dark);
          color: var(--off-white)
          }
        .title-darkgreen {
        color: var(--secondary-dark)
        }
        .title-green {
        color: var(--primary-medium)
        }
       `} 
      </style>
    </div>
  );
};