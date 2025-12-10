/**
 * Componente contador de resultados reutilizable
 * @param {number} count - Cantidad de items mostrados
 * @param {string} itemType - Tipo de items (ej: 'marca', 'producto')
 * @param {string} itemTypePlural - Tipo de items en plural (opcional, se genera automáticamente si no se provee)
 * @param {string} filter - Filtro aplicado (opcional, ej: letra seleccionada)
 */
export const ResultCounter = ({ 
  count, 
  itemType = 'resultado', 
  itemTypePlural,
  filter 
}) => {
  // Generar plural automáticamente si no se provee
  const plural = itemTypePlural || `${itemType}s`;
  const displayText = count === 1 ? itemType : plural;

  return (
    <section className="bg-white py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-gray-600">
          Mostrando <span className="font-bold text-green">{count}</span> {displayText}
          {filter && filter !== 'Todas' && ` que comienzan con "${filter}"`}
        </p>
      </div>

      <style jsx>{`
        .text-green {
          color: var(--primary-medium);
        }
      `}</style>
    </section>
  );
};
