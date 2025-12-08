import { useState } from 'react'
import { Hero } from '../components/layout/Hero'
import { Footer } from '../components/layout/Footer'

export const Home = () => {
const [openCertification, setOpenCertification] = useState(0);

  const certifications = [
    {
      id: 1,
      name: "Certificación B Corp",
      logo: "https://www.birus.cl/wp-content/uploads/2025/08/Empressa-Certificada-Logo-Black-RGB.png",
      description: "Reconocimiento a empresas que cumplen con los más altos estándares de desempeño social y ambiental, transparencia y responsabilidad.",
      details: "Las empresas B Corp son evaluadas en cinco áreas: gobernanza, trabajadores, comunidad, medio ambiente y clientes. Deben demostrar un compromiso real con la sostenibilidad."
    },
    {
      id: 2,
      name: "Comercio Justo",
      logo: "https://png.pngtree.com/png-clipart/20230803/original/pngtree-fair-trade-stamp-fair-trade-fairtrade-vintage-vector-picture-image_9452527.png",
      description: "Garantiza que los productos fueron elaborados bajo condiciones laborales justas y precios equitativos.",
      details: "Esta certificación asegura que los productores reciben un pago justo, trabajan en condiciones seguras y tienen acceso a oportunidades de desarrollo."
    },
    {
      id: 3,
      name: "Orgánico USDA",
      logo: "https://rodaleinstitute.org/wp-content/uploads/USDA_organic_seal-300x300.webp",
      description: "Certificación que garantiza que los productos agrícolas fueron cultivados sin pesticidas ni fertilizantes sintéticos.",
      details: "Los estándares USDA Organic prohíben el uso de OGM, radiación ionizante y lodos de depuradora, promoviendo prácticas que conservan la biodiversidad."
    },
    {
      id: 4,
      name: "Cruelty Free",
      logo: "https://cdn2.iconfinder.com/data/icons/cruelty-free-no-animal-testing-vegetarian-vegan-he/142/cruelty-free-bunny-heart-512.png",
      description: "Asegura que ningún producto o ingrediente fue testeado en animales en ninguna etapa del desarrollo.",
      details: "Certificado por Leaping Bunny y PETA, garantiza una cadena de suministro libre de testeo animal desde los ingredientes hasta el producto final."
    },
    {
      id: 5,
      name: "Carbon Neutral",
      logo: "https://www.greensolutions.cl/img/CARBON-NEUTRAL-PRODUCT.bf44f3f0.png",
      description: "Certificación que verifica la compensación total de emisiones de carbono mediante proyectos ambientales.",
      details: "Incluye medición de huella de carbono, reducción de emisiones y compensación mediante reforestación o energías renovables."
    }
  ];

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

  const toggleCertification = (index) => {
    setOpenCertification(openCertification === index ? null : index);
  };

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

      {/* Sección: Certificaciones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold title-darkgreen mb-4">
              Certificaciones que Garantizan Nuestro Compromiso
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todas nuestras marcas asociadas cumplen con rigurosos estándares de sostenibilidad y responsabilidad social.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={cert.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  onClick={() => toggleCertification(index)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                      <img 
                        src={cert.logo} 
                        alt={`Logo ${cert.name}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-12 h-12 items-center justify-center text-2xl">
                        🌱
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold title-green">{cert.name}</h3>
                      <p className="text-gray-600 mt-1">{cert.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl title-green">
                    {openCertification === index ? '−' : '+'}
                  </div>
                </button>
                
                {openCertification === index && (
                  <div className="p-6 bg-lightgreen border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{cert.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Categorías Destacadas */}
      <section className="py-16 bg-lightgreen">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center title-darkgreen mb-12">
            Categorías Sostenibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green flex items-center justify-center">
                <span className="text-6xl">
                  <i class="fa-solid fa-shirt"></i>
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold title-green mb-3">Moda Sostenible</h3>
                <p className="text-gray-600 mb-4">Ropa orgánica, materiales reciclados y producción ética</p>
                <a href="#" className="text-green font-semibold hover:text-green-800">
                  Explorar productos →
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green flex items-center justify-center">
                <span className="text-6xl">
                  <i class="fa-solid fa-house"></i>
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold title-green mb-3">Hogar Eco</h3>
                <p className="text-gray-600 mb-4">Productos para un hogar cero waste y energéticamente eficiente</p>
                <a href="#" className="text-green font-semibold hover:text-green-800">
                  Explorar productos →
                </a>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-green flex items-center justify-center">
                <span className="text-6xl">
                  <i class="fa-solid fa-spray-can-sparkles"></i>
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold title-green mb-3">Belleza Natural</h3>
                <p className="text-gray-600 mb-4">Cosméticos cruelty-free, orgánicos y envases reciclables</p>
                <a href="#" className="text-green font-semibold hover:text-green-800">
                  Explorar productos →
                </a>
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