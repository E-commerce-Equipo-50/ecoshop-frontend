import { useState } from 'react';
// 1. IMPORTANTE: Importar BrowserRouter
import { BrowserRouter } from 'react-router-dom';

import CartItem from './components/cart/CartItem';
import CartSummary from './components/cart/CartSummary';

export const App = () => {
  // Estado inicial con 2 productos de ejemplo
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Zapatillas Eco Runner',
      color: 'Rojo Escarlata / 42',
      price: 85.0,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
      inStock: true,
    },
    {
      id: 2,
      name: 'Camiseta Lisa',
      color: 'Blanco',
      price: 25.5,
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200',
      inStock: false,
    },
  ]);


  // Handler para cambiar cantidad
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Number(newQuantity) } : p))
    );
  };

  // Handler para eliminar item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Ejemplo: agregar producto (simula agregar desde catálogo)
  const addSampleProduct = () => {
    const nextId = cartItems.length ? Math.max(...cartItems.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      name: `Producto ${nextId}`,
      color: 'Color de prueba',
      price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
      quantity: 1,
      image:
        'https://images.unsplash.com/photo-1514995669114-a43c6fbf9b4c?auto=format&fit=crop&q=80&w=200',
      inStock: Math.random() > 0.3, // 70% probabilidad de estar en stock
    };
    setCartItems((prev) => [...prev, newProduct]);
  };

  return (
    // 2. IMPORTANTE: Envolver todo en BrowserRouter para que funcionen los <Link>
    <BrowserRouter>
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[var(--text-dark)]">
              Laboratorio de Pruebas: Carrito 🛒
            </h1>
            <p className="text-[var(--text-light)] mt-2">Verificando componentes aislados</p>
          </div>

          {/* PRUEBA 1: CartItem */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">1. Componente CartItem</h2>

            <div className="mb-4 flex gap-2">
              <button
                onClick={addSampleProduct}
                className="rounded bg-[var(--primary-medium)] hover:bg-[var(--primary-light)] duration-200 px-3 py-1 text-white"
              >
                Agregar producto de prueba
              </button>
              <span className="text-sm text-[var(--text-light)] self-center">
                (Los productos sin stock no se cuentan en el resumen)
              </span>
            </div>

            <ul className="divide-y divide-gray-200">
              {cartItems.map((p) => (
                <CartItem
                  key={p.id}
                  product={p}
                  onQuantityChange={(newQ) => handleQuantityChange(p.id, newQ)}
                  onRemove={() => handleRemove(p.id)}
                />
              ))}
              {cartItems.length === 0 && (
                <li className="py-4 text-center text-[var(--text-light)]">El carrito está vacío</li>
              )}
            </ul>
          </section>


          {/* PRUEBA 2: CartSummary */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">2. Componente CartSummary</h2>
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                {/* Pasamos los items completos y CartSummary calcula subtotal ignorando sin stock */}
                <CartSummary items={cartItems} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
