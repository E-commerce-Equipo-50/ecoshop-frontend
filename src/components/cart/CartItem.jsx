import React from 'react';
import { Leaf } from 'lucide-react';

const CartItem = ({ product }) => {
  return (
    <li className="flex py-6 px-6 sm:py-10 sm:px-10">
      {/* Imagen */}
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          // Borde usando variable --border-light
          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48 border border-[var(--border-light)]"
        />
      </div>

      {/* Detalles */}
      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div>
            <div className="flex justify-between">
              <h3 className="text-sm">
                <a
                  href="#"
                  // Título en --text-dark y hover en --primary-medium
                  className="font-medium text-[var(--text-dark)] hover:text-[var(--primary-medium)] transition-colors"
                >
                  {product.name}
                </a>
              </h3>
            </div>
            <div className="mt-1 flex text-sm">
              {/* Variante en --text-light */}
              <p className="text-[var(--text-light)]">{product.color}</p>
            </div>
            {/* Precio destacado en --secondary-darker (o text-dark) */}
            <p className="mt-1 text-sm font-medium text-[var(--text-dark)]">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            {/* Cantidad */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--text-light)]">
                Cantidad:
              </span>
              <span className="text-base font-medium text-[var(--text-dark)]">
                {product.quantity}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 flex space-x-2 text-sm text-[var(--text-light)]">
          {product.inStock ? (
            // Icono de hoja en --primary-medium
            <Leaf
              className="h-5 w-5 flex-shrink-0 text-[var(--primary-medium)]"
              aria-hidden="true"
            />
          ) : (
            // Estado deshabilitado en --border-light o un gris suave
            <Leaf className="h-5 w-5 flex-shrink-0 text-[var(--border-light)]" aria-hidden="true" />
          )}
          {/* Texto de stock */}
          <span className={product.inStock ? 'text-[var(--secondary-dark)]' : 'text-[var(--text-light)]'}>
            {product.inStock ? 'En stock (Envío sostenible)' : 'Agotado'}
          </span>
        </p>
      </div>
    </li>
  );
};

export default CartItem;
