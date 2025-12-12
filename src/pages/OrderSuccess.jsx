import React from "react";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/layout/Footer";

export default function OrderSuccess() {
  const { id: orderId } = useParams(); // Lo mostramos solo como referencia opcional

  return (
    <>
      <main className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          ¡Pago completado con éxito! 🎉
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Tu compra ha sido procesada correctamente.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            ID de la orden: <code>{orderId}</code>
          </p>
        )}

        <div className="flex justify-center gap-4 mt-10">
          <Link
            to="/"
            className="px-5 py-3 rounded bg-[var(--primary-medium)] text-white font-medium hover:bg-[var(--primary-light)]">
            Volver al inicio
          </Link>

          <Link
            to="/ordenes"
            className="px-5 py-3 rounded border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100">
            Ver mis órdenes
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
