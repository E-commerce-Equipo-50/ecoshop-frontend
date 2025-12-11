import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import EcoBadge from "../eco/EcoBadge"; // tu componente de badge
import { useRecommendations } from "../../lib/hooks/useRecommendations";

export default function EcoRecommendations({ currentProductId = null }) {

    const { data: productsResponse, loading, error } = useFetch(
    `https://ecoshop-backend-00ta.onrender.com/api/Productos`
    );

    const allProducts = productsResponse?.product;

    if (loading) return <div className="p-10 text-center">Cargando...</div>;
    if (error) return <div className="p-10 text-center">Error al cargar.</div>;
    if (!allProducts) return <div className="p-10 text-center">Producto no encontrado.</div>;



    const recommendations = useRecommendations(allProducts, currentProductId);

    if (!recommendations || recommendations.length === 0) return null;

    return (
    <section className="mt-16">
        <h2 className="text-lg font-semibold text-[var(--text-dark)] mb-6">
        Productos más sustentables para vos 🌿
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
        {recommendations.map(({ product, ecoScore }) => (
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

                {/* ecoBadge flotado arriba a la derecha */}
                <div className="absolute top-2 right-2 z-10">
                <EcoBadge ecoScore={ecoScore} />
                </div>

                {/* STOCK BAJO */}
                {product.stock < 10 && (
                <span className="absolute bottom-2 left-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
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
    </section>
    );
}
