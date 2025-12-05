import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ items = [] }) => {
  // Calculamos subtotal solo con productos en stock
  const subtotal = useMemo(() => {
    return items
      .filter((p) => p.inStock) // ignora productos sin stock
      .reduce((acc, p) => acc + p.price * (p.quantity || 1), 0);
  }, [items]);

  const shipping = subtotal > 0 ? 5.0 : 0; // se puede ajustar la lógica
  const tax = subtotal * 0.08;   // 8% de impuestos
  const total = subtotal + shipping + tax;

  return (
    <section
      aria-labelledby="summary-heading"
      // Usamos --off-white para el fondo y --border-light para el borde
      className="mt-16 rounded-lg bg-[var(--off-white)] px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-[var(--border-light)] shadow-sm"
    >
      <h2 id="summary-heading" 
          className="text-lg font-medium text-[var(--text-dark)]"
      >
          Resumen de la orden
      </h2>

      <dl className="mt-6 space-y-4">

        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <dt className="text-sm text-[var(--text-light)]">Subtotal</dt>
          <dd className="text-sm font-medium text-[var(--text-dark)]">${subtotal.toFixed(2)}</dd>
        </div>
        
        {/* Envío */}
        <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-4">
          <dt className="flex items-center text-sm text-[var(--text-light)]">
            <span>Estimación de envío</span>
          </dt>
          <dd className="text-sm font-medium text-[var(--text-dark)]">${shipping.toFixed(2)}</dd>
        </div>
        
        {/* Impuestos */}
        <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-4">
          <dt className="flex text-sm text-[var(--text-light)]">
            <span>Impuestos (Estimado)</span>
          </dt>
          <dd className="text-sm font-medium text-[var(--text-dark)]">${tax.toFixed(2)}</dd>
        </div>

        {/* TOTAL FINAL */}
        <div className="flex items-center justify-between border-t border-[var(--border-light)] pt-4">
          <dt className="text-base font-bold text-[var(--text-dark)]">Total de la orden</dt>
          <dd className="text-base font-bold text-[var(--secondary-dark)]">${total.toFixed(2)}</dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          type="submit"
          disabled={subtotal === 0}
          // Botón con el color --primary-medium y hover a --primary-dark
          className={`w-full rounded-md border border-transparent px-4 py-3 text-base font-medium text-white shadow-sm transition-colors duration-200 ${
            subtotal === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--primary-medium)] hover:bg-[var(--primary-light)]'
          }`}
        >
          Pagar
        </button>
      </div>

      <div className="mt-6 text-center text-sm">
        <p className="text-[var(--text-light)]">
          o{' '}
          <Link to="/catalogo" className="font-medium text-[var(--primary-medium)] hover:text-[var(--primary-light)] transition-colors">
            Continuar comprando
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default CartSummary;
