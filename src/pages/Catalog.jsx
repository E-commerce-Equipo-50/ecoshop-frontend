import { useState } from "react";
import { ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { AlphabetFilter } from "../components/common/AlphabetFilter";
import { ResultCounter } from "../components/common/ResultCounter";
import { Footer } from "../components/layout/Footer";

// --- MOCK DATA: 12 PRODUCTOS (ESTRUCTURA BACKEND) ---
const products = [
  {
    id: "507f1f77bcf86cd799439001",
    brand: "EcoWear",
    marca: "EcoWear",
    name: "Camiseta de Bambú Soft",
    price: 29.99,
    description:
      "Camiseta ultra suave fabricada con fibra de bambú sostenible.",
    category: "Ropa Ecológica",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400",
    stock: 100,
    originCountry: "España",
    materials: ["bambú", "algodón orgánico"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.8,
  },
  {
    id: "507f1f77bcf86cd799439002",
    brand: "GreenHome",
    marca: "GreenHome",
    name: "Lámpara de Mesa Reciclada",
    price: 45.5,
    description: "Iluminación cálida con materiales recuperados.",
    category: "Hogar Eco",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdkQxjn5n5y7CWZyp_dQGfOWwb9TYUyR7Gzg&s",
    stock: 50,
    originCountry: "México",
    materials: ["cartón reciclado", "vidrio"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.5,
  },
  {
    id: "507f1f77bcf86cd799439003",
    brand: "PureBeauty",
    marca: "PureBeauty",
    name: "Sérum Facial Vegano",
    price: 22.0,
    description: "Hidratación profunda sin crueldad animal.",
    category: "Belleza Natural",
    imageUrl:
      "https://www.lurskinfood.com/cdn/shop/files/LUR_Well-Aging_serum.jpg?v=1725885758&width=1445",
    stock: 200,
    originCountry: "Francia",
    materials: ["aceites esenciales", "aloe vera"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.9,
  },
  {
    id: "507f1f77bcf86cd799439004",
    brand: "EcoFoods",
    marca: "EcoFoods",
    name: "Granola Orgánica Miel y Nueces",
    price: 12.5,
    description: "Energía natural para tus mañanas.",
    category: "Alimentación",
    imageUrl:
      "https://kiloalimentos.com/cdn/shop/products/IMG_7146f4909_1024x1024@2x.jpg?v=1625704281",
    stock: 150,
    originCountry: "Perú",
    materials: ["avena", "miel orgánica"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.7,
  },
  {
    id: "507f1f77bcf86cd799439005",
    brand: "RecycleArt",
    marca: "RecycleArt",
    name: "Escultura Abstracta Metal",
    price: 120.0,
    description: "Arte único creado a partir de chatarra recuperada.",
    category: "Arte Sostenible",
    imageUrl:
      "https://images.unsplash.com/photo-1554188248-986adbb73be4?auto=format&fit=crop&q=80&w=400",
    stock: 5,
    originCountry: "Argentina",
    materials: ["hierro", "cobre reciclado"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 5.0,
  },
  {
    id: "507f1f77bcf86cd799439006",
    brand: "BioBaby",
    marca: "BioBaby",
    name: "Juguetes de Madera Natural",
    price: 34.0,
    description: "Juego seguro y sin plásticos para tu bebé.",
    category: "Infantil",
    imageUrl:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400",
    stock: 80,
    originCountry: "Alemania",
    materials: ["madera certificada", "pintura al agua"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.8,
  },
  {
    id: "507f1f77bcf86cd799439007",
    brand: "NatureGarden",
    marca: "NatureGarden",
    name: "Kit de Huerto Urbano",
    price: 49.99,
    description: "Todo lo que necesitas para cultivar en casa.",
    category: "Jardinería",
    imageUrl:
      "https://www.bioambientar.com/wp-content/uploads/2021/12/kit-mini-huerta-en-casa.png",
    stock: 60,
    originCountry: "Colombia",
    materials: ["semillas orgánicas", "tierra abonada"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.6,
  },
  {
    id: "507f1f77bcf86cd799439008",
    brand: "CleanWater",
    marca: "CleanWater",
    name: "Filtro de Agua Biodegradable",
    price: 25.0,
    description: "Agua pura sin generar residuos plásticos.",
    category: "Agua Sostenible",
    imageUrl:
      "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=768,fit=crop/cdn-ecommerce/store_01J9PYHKGSC6G33J4DH2J45TTV/assets/3eaaf57c-a32f-486e-9aac-957203b30712.jpg",
    stock: 300,
    originCountry: "Brasil",
    materials: ["carbón activado", "cerámica"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.4,
  },
  {
    id: "507f1f77bcf86cd799439009",
    brand: "SolarTech",
    marca: "SolarTech",
    name: "Cargador Solar Portátil",
    price: 55.0,
    description: "Carga tus dispositivos con la energía del sol.",
    category: "Energía Verde",
    imageUrl: "https://i.blogs.es/162e89/img_5200/450_1000.jpeg",
    stock: 40,
    originCountry: "China",
    materials: ["paneles solares", "plástico reciclado"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.7,
  },
  {
    id: "507f1f77bcf86cd799439010",
    brand: "EarthPack",
    marca: "EarthPack",
    name: "Set Bolsas Reutilizables",
    price: 15.0,
    description: "Dile adiós a las bolsas de plástico de un solo uso.",
    category: "Empaques",
    imageUrl:
      "https://ae01.alicdn.com/kf/H2ec84ee149a84221bcc20e4448b8476ev.jpg",
    stock: 500,
    originCountry: "India",
    materials: ["algodón orgánico", "yute"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.9,
  },
  {
    id: "507f1f77bcf86cd799439011",
    brand: "BioTech Sports",
    marca: "BioTech Sports",
    name: "Mat de Yoga de Corcho",
    price: 40.0,
    description: "Agarre perfecto y material 100% natural.",
    category: "Deportes",
    imageUrl:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=400",
    stock: 90,
    originCountry: "Portugal",
    materials: ["corcho", "caucho natural"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 4.8,
  },
  {
    id: "507f1f77bcf86cd799439012",
    brand: "Artisan Wood",
    marca: "Artisan Wood",
    name: "Mesa de Centro Rústica",
    price: 150.0,
    description: "Madera recuperada trabajada a mano.",
    category: "Muebles",
    imageUrl:
      "https://terrazascomedores.cl/cdn/shop/files/Mesa_de_centro_tradicional_1_143d5b75-9b91-4d67-b3e0-2f28b2aef6a8.png?v=1733843381",
    stock: 10,
    originCountry: "Chile",
    materials: ["madera de roble recuperada"],
    isActive: true,
    seller: "507f1f77bcf86cd799439012",
    rating: 5.0,
  },
];

const Catalog = () => {
  const [selectedLetter, setSelectedLetter] = useState("Todas");

  // PAGINACIÓN: Estados
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Función para manejar el cambio de filtro
  const handleLetterChange = (letter) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
  };

  // Lógica de filtrado
  const filteredProducts = products.filter((product) => {
    if (selectedLetter === "Todas" || !selectedLetter) return true;
    return product.name.toUpperCase().startsWith(selectedLetter);
  });

  // Lógica de Paginación
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Funciones de navegación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-[var(--off-white)] min-h-screen flex flex-col">
      
      {/* 1. SECCIÓN DE ENCABEZADO */}
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-5xl font-extrabold tracking-tight text-[var(--secondary-dark)] mb-6">
            Explora nuestro Catálogo
          </h2>

          <p className="text-xl text-[var(--text-light)] mb-4 font-medium">
            Descubre productos éticos y sostenibles para un futuro mejor
          </p>

          <p className="text-x0.5 text-[var(--text-light)] mb-4 font-medium">
            Cada producto ha sido cuidadosamente seleccionado por su impacto
            positivo, materiales ecológicos y procesos de producción justos y
            transparentes.
          </p>
        </div>
      </div>

      {/* 2. BLOQUE DE FILTROS Y RESULTADOS (FULL WIDTH) */}
      <div className="w-full bg-white shadow-sm border-y border-[var(--border-light)]">
        
        {/* Filtro Alfabético */}
        <div className="border-b border-[var(--border-light)]">
           <AlphabetFilter
            items={products}
            selectedLetter={selectedLetter}
            onLetterChange={handleLetterChange}
            nameField="name"
          />
        </div>

        {/* Contador de Resultados */}
        <div className="bg-[var(--off-white)]/50">
          <ResultCounter
            count={filteredProducts.length}
            itemType="producto"
            filter={selectedLetter}
          />
        </div>
      </div>

      {/* 3. CONTENIDO PRINCIPAL: GRILLA */}
      <div className="flex-grow mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-8 w-full">
        
        {/* RESULTADOS */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-[var(--border-light)] mt-8">
            <p className="text-xl text-gray-500 mb-4">
              No encontramos productos que empiecen con "{selectedLetter}" 😔
            </p>
            <button
              onClick={() => handleLetterChange("Todas")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[var(--secondary-darker)] bg-[var(--primary-light)] hover:bg-[var(--primary-medium)] transition-colors"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <>
            {/* GRILLA DE PRODUCTOS */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-16">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow border border-[var(--border-light)]"
                >
                  {/* IMAGEN */}
                  <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-90 transition-opacity lg:h-64 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                    {product.stock < 10 && (
                      <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                        ¡Últimas unidades!
                      </span>
                    )}
                  </div>

                  {/* INFO PRODUCTO */}
                  <div className="mt-4 flex justify-between items-start">
                    <div>
                      <p className="inline-block bg-[var(--primary-light)] text-xs text-[var(--secondary-darker)] font-medium mb-1 px-2 py-0.5 rounded-full">
                        {product.category}
                      </p>
                      <h3 className="text-sm font-semibold text-[var(--text-dark)] mt-1 line-clamp-1">
                        <a href="#">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>

                      <p className="text-xs text-[var(--text-light)] mt-1 font-medium">
                        {product.brand}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-[var(--secondary-dark)] whitespace-nowrap ml-2">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button className="w-full flex items-center justify-center rounded-md bg-[var(--primary-light)] px-3 py-2 text-sm font-medium text-[var(--secondary-darker)] opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-[var(--primary-medium)]">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🚀 BARRA DE NAVEGACIÓN (PAGINACIÓN) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8 mb-12">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md border ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-[var(--border-light)] text-[var(--text-dark)] hover:bg-gray-50"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                      currentPage === number
                        ? "bg-[var(--primary-medium)] text-white border-[var(--primary-medium)]"
                        : "border-[var(--border-light)] text-[var(--text-dark)] hover:bg-[var(--primary-light)] hover:text-[var(--secondary-darker)]"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-[var(--border-light)] text-[var(--text-dark)] hover:bg-[var(--primary-light)] hover:text-[var(--secondary-darker)]"
                  }`}
                >
                  Siguiente
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;