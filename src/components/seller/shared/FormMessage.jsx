/**
 * Componentes de mensajes para formularios
 * Mensajes reutilizables de éxito y error
 */

/**
 * Mensaje de éxito con icono de check verde
 */
export const SuccessMessage = ({ message }) => {
  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center">
        <i className="fa-solid fa-circle-check text-green text-xl mr-3"></i>
        <p className="text-green-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

/**
 * Mensaje de error con icono de X rojo
 */
export const ErrorMessage = ({ message }) => {
  return (
    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center">
        <i className="fa-solid fa-circle-xmark text-red-600 text-xl mr-3"></i>
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
};

/**
 * Mensaje informativo con icono de info azul
 */
export const InfoMessage = ({ title, message }) => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start">
        <i className="fa-solid fa-info-circle text-blue-600 text-xl mr-3 mt-1"></i>
        <div>
          {title && <p className="text-blue-800 font-medium mb-1">{title}</p>}
          <p className="text-blue-700 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
