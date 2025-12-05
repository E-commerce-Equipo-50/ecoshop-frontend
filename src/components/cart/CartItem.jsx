import React from 'react';
import { Trash2, Leaf } from 'lucide-react';

const CartItem = ({ product, onQuantityChange, onRemove }) => {
  return (
    <li className="flex py-6 sm:py-10">
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

          <div className="mt-4 sm:mt-0 sm:pr-9">
            {/* Selector de Cantidad */}
            <label htmlFor={`quantity-${product.id}`} className="sr-only">
              Cantidad, {product.name}
            </label>
            <select
              id={`quantity-${product.id}`}
              name={`quantity-${product.id}`}
              value={product.quantity}
              onChange={(e) => onQuantityChange(e.target.value)}
              // Bordes y textos con las variables. Focus ring en primary-medium
              className="max-w-full rounded-md border border-[var(--border-light)] py-1.5 text-left text-base font-medium leading-5 text-[var(--text-dark)] shadow-sm focus:border-[var(--primary-medium)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-medium)] sm:text-sm"
              disabled={!product.inStock}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>

            {/* Botón Eliminar */}
            <div className="absolute right-0 top-0">
              <button
                type="button"
                onClick={onRemove}
                // Icono en --text-light y hover en rojo
                className="-m-2 inline-flex p-2 text-[var(--text-light)] hover:text-red-500 transition-colors"
              >
                <span className="sr-only">Eliminar</span>
                <Trash2 className="h-5 w-5" aria-hidden="true" />
              </button>
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
