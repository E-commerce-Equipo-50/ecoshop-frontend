import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { AlphabetFilter } from "../components/common/AlphabetFilter";
import { ResultCounter } from "../components/common/ResultCounter";
import { Footer } from "../components/layout/Footer";
import useFetch from "../lib/hooks/useFetch";

const Catalog = () => {
  // Uso el custom hook useFetch que creó Araceli para obtener el array de products desde la API para reemplazar al array hardcodeado 
  const { data, loading, error } = useFetch(
    "https://ecoshop-backend-00ta.onrender.com/api/Productos/"
  );
  const products = data?.products || [];

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

  // Estado de carga
  if (loading) {
    return (
      <div className="bg-[var(--off-white)] min-h-screen flex items-center justify-center">
        <p className="text-xl text-[var(--text-light)]">Cargando catálogo...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="bg-[var(--off-white)] min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Error al cargar los productos</p>
      </div>
    );
  }

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
                        {product.name}
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
                    {/* Reemplazamos <button> por <Link> */}
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full flex items-center justify-center rounded-md bg-[var(--primary-light)] px-3 py-2 text-sm font-medium text-[var(--secondary-darker)] opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-[var(--primary-medium)]"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Ver Detalles
                    </Link>
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
