import { useState } from 'react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export const CartMain = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Zapatillas Eco Runner',
      color: 'Rojo Escarlata / 42',
      price: 85.0,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200',
      inStock: true,
    },
    {
      id: 2,
      name: 'Camiseta Lisa',
      color: 'Blanco',
      price: 25.5,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200',
      inStock: false,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Number(newQuantity) } : p))
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  // Agregar función de prueba
  const addSampleProduct = () => {
    const nextId = cartItems.length ? Math.max(...cartItems.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      name: `Producto ${nextId}`,
      color: 'Color de prueba',
      price: parseFloat((Math.random() * 100 + 5).toFixed(2)),
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1514995669114-a43c6fbf9b4c?auto=format&fit=crop&q=80&w=200',
      inStock: Math.random() > 0.3,
    };
    setCartItems((prev) => [...prev, newProduct]);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Carrito de compras</h1>

        {/* Botón de prueba */}
        <div className="mb-6">
          <button
            onClick={addSampleProduct}
            className="rounded bg-[var(--primary-medium)] hover:bg-[var(--primary-light)] duration-200 px-4 py-2 text-white"
          >
            Agregar producto de prueba
          </button>
          <span className="text-sm text-[var(--text-light)] self-center">
            (Los productos sin stock no se cuentan en el resumen)
          </span>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Items */}
          <div className="lg:col-span-7">
            <ul className="divide-y divide-gray-200 border border-gray-200 rounded-lg">
              {cartItems.map((p) => (
                <CartItem
                  key={p.id}
                  product={p}
                  onQuantityChange={(newQ) => handleQuantityChange(p.id, newQ)}
                  onRemove={() => handleRemove(p.id)}
                />
              ))}
              {cartItems.length === 0 && (
                <li className="py-8 text-center text-gray-500">El carrito está vacío</li>
              )}
            </ul>
          </div>

          {/* Summary */}
          <CartSummary items={cartItems} />
        </div>
      </div>
    </div>
  );
};
