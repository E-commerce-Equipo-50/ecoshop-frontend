import { useState, useEffect, useMemo } from 'react';
import { Footer } from '../components/layout/Footer';
import { AlphabetFilter } from '../components/common/AlphabetFilter';
import { BrandCard } from '../components/brand/BrandCard';
import { ResultCounter } from '../components/common/ResultCounter';
import { API_BASE_URL, ENDPOINTS } from '../config/api';

const VistaMarca = () => {
  const [selectedLetter, setSelectedLetter] = useState('Todas');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos del backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}${ENDPOINTS.PRODUCTS}`);
        const data = await response.json();
        
        if (response.ok) {
          const productsList = data.productos || data.products || [];
          console.log('📦 Productos del backend:', productsList);
          console.log('📦 Primer producto:', productsList[0]);
          setProducts(productsList);
        } else {
          console.error('Error al cargar productos:', data.message);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Función para contar productos de una marca
  const contarProductos = (nombreMarca) => {
    const count = products.filter(p => {
      // Intentar con diferentes campos posibles
      const brandField = p.brand || p.marca || p.Brand || p.Marca;
      return brandField === nombreMarca;
    }).length;
    
    return count;
  };
  
  // Datos de marcas con contador dinámico (se recalcula cuando cambian los productos)
  const brandsData = useMemo(() => [
    {
      id: 1,
      name: "EcoWear",
      logo: "vest-patches",
      description: "Moda sostenible con materiales orgánicos certificados.",
      category: "Ropa Ecológica",
      rating: 4.8,
      productsCount: contarProductos("EcoWear")
    },
    {
      id: 2,
      name: "GreenHome",
      logo: "house-medical-circle-check",
      description: "Productos innovadores para hogares sostenibles.",
      category: "Hogar Eco",
      rating: 4.9,
      productsCount: contarProductos("GreenHome")
    },
    {
      id: 3,
      name: "PureBeauty",
      logo: "spray-can-sparkles",
      description: "Cosméticos naturales y cruelty-free con ingredientes orgánicos.",
      category: "Belleza Natural",
      rating: 4.7,
      productsCount: contarProductos("PureBeauty")
    },
    {
      id: 4,
      name: "EcoFoods",
      logo: "plate-wheat",
      description: "Alimentos orgánicos y locales de productores certificados.",
      category: "Alimentación",
      rating: 4.8,
      productsCount: contarProductos("EcoFoods")
    },
    {
      id: 5,
      name: "RecycleArt",
      logo: "palette",
      description: "Arte y decoración única con materiales reciclados.",
      category: "Arte Sostenible",
      rating: 4.6,
      productsCount: contarProductos("RecycleArt")
    },
    {
      id: 6,
      name: "BioBaby",
      logo: "baby-carriage",
      description: "Productos ecológicos para bebés con materiales naturales.",
      category: "Infantil",
      rating: 4.9,
      productsCount: contarProductos("BioBaby")
    },
    {
      id: 7,
      name: "NatureGarden",
      logo: "seedling",
      description: "Herramientas y productos para un jardín eco-friendly.",
      category: "Jardinería",
      rating: 4.7,
      productsCount: contarProductos("NatureGarden")
    },
    {
      id: 8,
      name: "CleanWater",
      logo: "droplet",
      description: "Soluciones de purificación y ahorro de agua ecológicas.",
      category: "Agua Sostenible",
      rating: 4.8,
      productsCount: contarProductos("CleanWater")
    },
    {
      id: 9,
      name: "SolarTech",
      logo: "solar-panel",
      description: "Tecnología solar y energías renovables para un futuro limpio.",
      category: "Energía Verde",
      rating: 4.9,
      productsCount: contarProductos("SolarTech")
    },
    {
      id: 10,
      name: "EarthPack",
      logo: "box-open",
      description: "Empaques biodegradables y compostables para negocios.",
      category: "Empaques",
      rating: 4.6,
      productsCount: contarProductos("EarthPack")
    },
    {
      id: 11,
      name: "BioTech Sports",
      logo: "person-running",
      description: "Equipamiento deportivo con materiales reciclados.",
      category: "Deportes",
      rating: 4.7,
      productsCount: contarProductos("BioTech Sports")
    },
    {
      id: 12,
      name: "Artisan Wood",
      logo: "tree",
      description: "Muebles artesanales de madera certificada FSC.",
      category: "Muebles",
      rating: 4.8,
      productsCount: contarProductos("Artisan Wood")
    }
  ], [products]); // Se recalcula cuando cambian los productos

  // Log para debug después de cargar productos
  useEffect(() => {
    if (products.length > 0) {
      console.log(`✅ Total de productos cargados: ${products.length}`);
      brandsData.forEach(brand => {
        console.log(`📊 ${brand.name}: ${brand.productsCount} productos`);
      });
    }
  }, [products, brandsData]);

  // Filtrar marcas por letra seleccionada
  const filteredBrands = selectedLetter === 'Todas' 
    ? brandsData 
    : brandsData.filter(brand => brand.name.toUpperCase().startsWith(selectedLetter));

  return (
    <div className="VistaMarca">
      {/* Hero Section */}
      <section className="bg-lightgreen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold title-darkgreen mb-6">
              Nuestras Marcas Sostenibles
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Descubre marcas comprometidas con el medio ambiente y la sostenibilidad
            </p>
            <p className="text-lg text-gray-600">
              Cada marca ha sido cuidadosamente seleccionada por su compromiso con prácticas ecológicas, 
              comercio justo y transparencia en sus procesos de producción.
            </p>
          </div>
        </div>
      </section>

      {/* Filtro por Alfabeto */}
      <AlphabetFilter
        selectedLetter={selectedLetter}
        onLetterChange={setSelectedLetter}
        items={brandsData}
        nameField="name"
      />

      {/* Contador de resultados */}
      <ResultCounter
        count={filteredBrands.length}
        itemType="marca"
        itemTypePlural="marcas"
        filter={selectedLetter}
      />

      {/* Grid de Marcas */}
      <section className="py-12 bg-lightgreen min-h-screen">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          {filteredBrands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <i className="fa-solid fa-search fa-4x text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-500 mb-2">
                No hay marcas que comiencen con "{selectedLetter}"
              </h3>
              <p className="text-gray-400 mb-6">
                Prueba con otra letra o selecciona "Todas" para ver todas las marcas
              </p>
              <button
                onClick={() => setSelectedLetter('Todas')}
                className="bg-green hover:bg-darkgreen text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200"
              >
                Ver todas las marcas
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center title-green mb-12">
            Impacto de Nuestras Marcas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-lightgreen rounded-xl">
              <div className="text-4xl font-bold title-darkgreen mb-2">
                {brandsData.length}+
              </div>
              <p className="text-gray-600">Marcas Sostenibles</p>
            </div>
            <div className="text-center p-6 bg-lightgreen rounded-xl">
              <div className="text-4xl font-bold title-darkgreen mb-2">
                {brandsData.reduce((sum, brand) => sum + brand.productsCount, 0)}+
              </div>
              <p className="text-gray-600">Productos Eco-Friendly</p>
            </div>
            <div className="text-center p-6 bg-lightgreen rounded-xl">
              <div className="text-4xl font-bold title-darkgreen mb-2">
                100%
              </div>
              <p className="text-gray-600">Certificadas</p>
            </div>
            <div className="text-center p-6 bg-lightgreen rounded-xl">
              <div className="text-4xl font-bold title-darkgreen mb-2">
                {(brandsData.reduce((sum, brand) => sum + brand.rating, 0) / brandsData.length).toFixed(1)}
              </div>
              <p className="text-gray-600">Rating Promedio</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16" style={{ background: 'linear-gradient(to right, #62942a, #5a7025)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#ffffff' }}>
            ¿Tienes una marca sostenible?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#ffffff', opacity: '0.9' }}>
            Únete a nuestra comunidad de marcas comprometidas con el medio ambiente 
            y llega a miles de consumidores conscientes.
          </p>
          <a
            href="/registro-empresa"
            className="inline-block font-bold py-4 px-10 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#ffffff', color: '#62942a' }}
          >
            Registra tu marca
            <i className="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .bg-green {
          background-color: var(--primary-medium);
        }
        .bg-darkgreen {
          background-color: var(--primary-dark);
        }
        .bg-lightgreen {
          background-color: var(--off-white);
        }
        .title-green {
          color: var(--primary-medium);
        }
        .title-darkgreen {
          color: var(--secondary-dark);
        }
        .text-green {
          color: var(--primary-medium);
        }
      `}</style>
    </div>
  );
};

export default VistaMarca;  