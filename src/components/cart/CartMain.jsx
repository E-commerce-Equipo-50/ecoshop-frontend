import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import { getCart } from "../../lib/api/cart";

export const CartMain = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        navigate("/login-client");
        return;
      }

      // 1. Obtenemos el carrito básico
      const cartResponse = await getCart();
      const simpleCartItems = cartResponse.cart?.items || [];

      // 2. Enriquecemos cada item
      const detailedItemsPromises = simpleCartItems.map(async (item) => {
        // Datos base por defecto
        let productData = {
          imageUrl: "https://placehold.co/200x200?text=Cargando",
          ecoScore: null,
          stock: item.product.stock,
          isActive: item.product.isActive,
        };

        try {
          const res = await fetch(
            `https://ecoshop-backend-00ta.onrender.com/api/Productos/${item.product.id}`
          );

          if (res.ok) {
            const data = await res.json();

            const fullProduct = data.product || {};
            const detailedEcoScore = data.ecoScore || fullProduct.ecoScore; // Priorizamos el de la raíz

            productData = {
              imageUrl: fullProduct.imageUrl || productData.imageUrl,
              ecoScore: detailedEcoScore, // Guardamos el que tiene metrics
              stock: fullProduct.stock,
              isActive: fullProduct.isActive,
            };
          }
        } catch (err) {
          console.warn(`Error cargando detalle para ${item.product.name}`, err);
        }

        return {
          id: item.id,
          productId: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          price: item.product.price,
          quantity: item.quantity,
          image: productData.imageUrl,
          inStock: productData.isActive && productData.stock > 0,
          stock: productData.stock,

          // ecoScore tiene la propiedad .metrics
          ecoScore: productData.ecoScore,
        };
      });

      const detailedItems = await Promise.all(detailedItemsPromises);
      setCartItems(detailedItems);
    } catch (error) {
      console.error("Error crítico en carrito:", error);
      setError("Error al cargar el carrito.");
    } finally {
      setLoading(false);
    }
  };

  // PASO 2: CALCULAR TOTAL CO2
  const totalCo2Savings = cartItems.reduce((total, item) => {
    if (!item.ecoScore || !item.ecoScore.metrics) return total;
    const co2Metric = item.ecoScore.metrics.find((m) => m.type === "CO2");
    if (!co2Metric) return total;

    const savingsPerUnit = co2Metric.comparisonValue - co2Metric.value;
    return total + savingsPerUnit * item.quantity;
  }, 0);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Cargando carrito...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
          Carrito de compras
        </h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg bg-white">
              {/* Renderizamos los items si existen */}
              {cartItems.map((p) => (
                <CartItem key={p.id} product={p} />
              ))}

              {/* --- LÓGICA DE CARRITO VACÍO --- */}
              {cartItems.length === 0 && !loading && (
                <li className="py-12 text-center px-4">
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-24 w-24 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <p className="text-xl font-medium text-gray-900 mb-2">
                      Tu carrito está vacío
                    </p>
                    <p className="text-gray-500 mb-6">
                      Agrega productos para comenzar tu compra sostenible
                    </p>
                    <button
                      onClick={() => navigate("/catalog")}
                      className="bg-[var(--primary-medium)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-semibold transition shadow-sm"
                    >
                      Explorar productos
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Solo mostramos el resumen si hay productos */}
          {cartItems.length > 0 && (
            <CartSummary items={cartItems} totalCo2Savings={totalCo2Savings} />
          )}
        </div>
      </div>
    </div>
  );
};
