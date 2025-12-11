import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { getCart } from '../../lib/api/cart';

export const CartMain = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar carrito del backend
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar si hay token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/login-client');
        return;
      }

      const data = await getCart();
      const items = data.cart?.items || [];
      
      // El backend no envía imageUrl en el carrito, necesitamos obtener los productos completos
      const productsResponse = await fetch('https://ecoshop-backend-00ta.onrender.com/api/Productos');
      const productsData = await productsResponse.json();
      const allProducts = productsData.products || [];
      
      // Mapear items del backend al formato del componente
      const mappedItems = items.map(item => {
        // Buscar el producto completo para obtener la imagen
        const fullProduct = allProducts.find(p => p.id === item.product.id);
        
        return {
          id: item.id,                           // ID del item en el carrito
          productId: item.product.id,            // ID del producto
          name: item.product.name,
          brand: item.product.brand,
          color: `${item.product.brand} / Stock disponible: ${item.product.stock}`, // Info adicional
          price: item.product.price,
          quantity: item.quantity,
          image: fullProduct?.imageUrl || 'https://placehold.co/200x200/e0e0e0/666666?text=Sin+Imagen',
          inStock: item.product.isActive && item.product.stock > 0,
          stock: item.product.stock
        };
      });
      
      setCartItems(mappedItems);
      
    } catch (error) {
      console.error('Error al cargar carrito:', error);
      
      if (error.message === 'NO_AUTH') {
        navigate('/login-client');
      } else {
        setError('Error al cargar el carrito. Intenta recargar la página.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-4xl text-center">
          <div className="flex flex-col items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-[var(--primary-medium)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-gray-600">Cargando carrito...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Carrito de compras</h1>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Items */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
              {cartItems.map((p) => (
                <CartItem
                  key={p.id}
                  product={p}
                />
              ))}
              {cartItems.length === 0 && !loading && (
                <li className="py-12 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="h-24 w-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-900 mb-2">Tu carrito está vacío</p>
                    <p className="text-gray-500 mb-6">Agrega productos para comenzar tu compra sostenible</p>
                    <button
                      onClick={() => navigate('/catalog')}
                      className="bg-[var(--primary-medium)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                      Explorar productos
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* Summary */}
          {cartItems.length > 0 && <CartSummary items={cartItems} />}
        </div>
      </div>
    </div>
  );
};
