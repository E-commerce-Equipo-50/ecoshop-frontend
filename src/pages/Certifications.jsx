import { useState } from 'react';
import { Footer } from '../components/layout/Footer';

export const Certifications = () => {
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

  const toggleCertification = (index) => {
    setOpenCertification(openCertification === index ? null : index);
  };

  return (
    <div className="bg-[var(--off-white)] min-h-screen flex flex-col">
      {/* Encabezado igual a Catálogo/Marcas */}
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-extrabold tracking-tight text-[var(--secondary-dark)] mb-6">
            Certificaciones que Garantizan Nuestro Compromiso
          </h2>
          <p className="text-xl text-[var(--text-light)] mb-4 font-medium">
            Todas nuestras marcas asociadas cumplen con rigurosos estándares de sostenibilidad y responsabilidad social.
          </p>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="mb-4 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                className="w-full p-6 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                onClick={() => toggleCertification(index)}
                aria-expanded={openCertification === index}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-2">{cert.name}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                </div>
                <div className="text-3xl text-[var(--primary-medium)] font-bold ml-4">
                  {openCertification === index ? '−' : '+'}
                </div>
              </button>
              {openCertification === index && (
                <div className="p-6 bg-[var(--off-white)] border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed text-lg">{cert.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}