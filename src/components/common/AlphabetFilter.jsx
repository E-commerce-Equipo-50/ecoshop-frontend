/**
 * Componente de filtro alfabético reutilizable
 * @param {string} selectedLetter - Letra actualmente seleccionada o 'Todas'
 * @param {function} onLetterChange - Función callback cuando se selecciona una letra
 * @param {Array} items - Array de items para determinar qué letras están disponibles
 * @param {string} nameField - Campo del objeto que contiene el nombre (default: 'name')
 */
export const AlphabetFilter = ({ 
  selectedLetter, 
  onLetterChange, 
  items = [], 
  nameField = 'name' 
}) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Verificar si una letra tiene items
  const hasItems = (letter) => {
    return items.some(item => 
      item[nameField]?.toUpperCase().startsWith(letter)
    );
  };

  return (
    <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Botón "Todas" */}
          <button
            onClick={() => onLetterChange('Todas')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              selectedLetter === 'Todas'
                ? 'bg-green text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="Mostrar todos los elementos"
          >
            Todas
          </button>

          {/* Botones del alfabeto */}
          {alphabet.map((letter) => {
            const hasContent = hasItems(letter);
            return (
              <button
                key={letter}
                onClick={() => onLetterChange(letter)}
                disabled={!hasContent}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  selectedLetter === letter
                    ? 'bg-green text-white shadow-md'
                    : hasContent
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                }`}
                aria-label={`Filtrar por letra ${letter}`}
                aria-disabled={!hasContent}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .bg-green {
          background-color: var(--primary-medium);
        }
      `}</style>
    </section>
  );
};
