import { useParams, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import useFetch from "../lib/hooks/useFetch";
import EcoBadge from "../components/eco/EcoBadge";
import ImpactBar from "../components/eco/ImpactBar";
import SustainabilityScore from '../components/eco/SustainabilityScore'
import CertificationList from "../components/eco/CertificationList";
import {Footer} from "../components/layout/Footer";
import { addToCart, getProductQuantityInCart } from "../lib/api/cart";

  /// Certificaciones de prueba
  const certifications= [
    {
      id: "507f1f77bcf86cd799439011",
      product: "507f1f77bcf86cd799439099",
      type: "CARBON_NEUTRAL",
      iconUrl: "https://cdn.scsglobalservices.com/files/Carbon_Neutral_logo2.png",
      createdAt: "2025-12-02T10:00:00.000Z"
    },
    {
      id: "507f1f77bcf86cd799439012",
      product: "507f1f77bcf86cd799439099",
      type: "FAIR_TRADE",
      iconUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Fairtrade_Certification_Mark.svg",
      createdAt: "2025-12-02T10:05:00.000Z"
    },
    {
      id: "507f1f77bcf86cd799439013",
      product: "507f1f77bcf86cd799439099",
      type: "GOTS",
      iconUrl: "https://global-standard.org/templates/yootheme/cache/d9/logo-d94dd9af.webp",
      createdAt: "2025-12-02T10:10:00.000Z"
    }
  ]




export default function ProductDetail() {
 const { id } = useParams(); // Tomamos el ID desde la URL
  const navigate = useNavigate();
  const quantityRef = useRef(null);
  
  // Estados para el carrito
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const { data: productResponse, loading, error } = useFetch(
    `https://ecoshop-backend-00ta.onrender.com/api/Productos/${id}`
  );

  const product = productResponse?.product;
  const ecoScore = productResponse?.ecoScore;
  
  // Función para agregar al carrito
  const handleAddToCart = async (e) => {
    e.preventDefault();
    
    // Verificar si hay token (usuario logueado)
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      // No hay token, redirigir a login
      setNotification({
        show: true,
        message: 'Debes iniciar sesión para agregar productos al carrito',
        type: 'warning'
      });
      
      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/login-client');
      }, 2000);
      return;
    }
    
    // Obtener cantidad
    const quantity = parseInt(quantityRef.current.value) || 1;
    
    // Validar cantidad
    if (quantity < 1) {
      setNotification({
        show: true,
        message: 'La cantidad debe ser mayor a 0',
        type: 'error'
      });
      return;
    }
    
    try {
      setIsAddingToCart(true);
      
      // Verificar cantidad actual en el carrito
      const currentQuantityInCart = await getProductQuantityInCart(product.id);
      const totalQuantity = currentQuantityInCart + quantity;
      
      // Validar que la suma no exceda el stock
      if (totalQuantity > product.stock) {
        setNotification({
          show: true,
          message: `⚠️ No puedes agregar ${quantity} unidades. Ya tienes ${currentQuantityInCart} en el carrito y solo hay ${product.stock} disponibles.`,
          type: 'error'
        });
        setIsAddingToCart(false);
        return;
      }
      
      // Llamar a la API
      const response = await addToCart(product.id, quantity);
      
      // Disparar evento para actualizar contador del carrito en navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Mostrar notificación de éxito
      setNotification({
        show: true,
        message: '✅ Producto agregado al carrito exitosamente',
        type: 'success'
      });
      
      // Resetear cantidad
      quantityRef.current.value = 1;
      
      // Ocultar notificación después de 3 segundos
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
      
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      
      let errorMessage = 'Error al agregar al carrito';
      
      if (error.message === 'NO_AUTH') {
        errorMessage = 'Debes iniciar sesión para agregar productos';
        setTimeout(() => navigate('/login-client'), 2000);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setNotification({
        show: true,
        message: errorMessage,
        type: 'error'
      });
      
      // Ocultar notificación después de 4 segundos
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 4000);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Cargando...</div>;
  if (error) return <div className="p-10 text-center">Error al cargar.</div>;
  if (!product) return <div className="p-10 text-center">Producto no encontrado.</div>;



  return (
    <div className="bg-[var(--white)] min-h-screen flex flex-col">

      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* ---------- IMAGEN DEL PRODUCTO ---------- */}
          <div className="w-full max-w-md h-96 lg:h-[32rem] flex justify-center items-center overflow-hidden rounded-xl border border-[var(--border-light)] shadow-sm bg-[var(--white)]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ---------- INFORMACIÓN PRINCIPAL ---------- */}
          <div className="flex flex-col gap-3 mb-8">
            
            {/* Brand */}
            <p className="text-sm text-[var(--text-light)] uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Nombre */}
            <h1 className="text-4xl font-bold-[var(--text-title)] text-[var(--text-dark)] leading-snug">
              {product.name}
            </h1>

            {/* Badge eco */}
            <EcoBadge ecoScore={ecoScore} />

            {/* Precio */}
            <p className="text-3xl font-semibold text-[var(--primary-dark)] mt-2">
              ${product.price}
            </p>

            {/* Descripción */}
            <p className="text-[var(--text-light)] leading-relaxed my-6">
              {product.description}
            </p>

            <hr className="border border-[var(--border-light)] mt-8" />
            
            {/* Notificación */}
            {notification.show && (
              <div 
                className={`p-4 rounded-lg mb-4 animate-fade-in ${
                  notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' :
                  notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' :
                  'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                <p className="font-medium">{notification.message}</p>
              </div>
            )}

            <form 
              onSubmit={handleAddToCart}
              className="flex flex-col mt-4  gap-4"
              aria-label="Agregar producto al carrito"
            >
              {/* Campo de cantidad */}
              <div className="flex items-center">
                <label 
                  htmlFor="product-quantity" 
                  className="text-sm text-[var(--text-light)] mr-4"
                >
                  Cantidad
                </label>

                <input
                  ref={quantityRef}
                  id="product-quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  max={product.stock}
                  defaultValue="1"
                  disabled={isAddingToCart}
                  aria-label="Cantidad a agregar al carrito"
                  className="w-20 border border-[var(--border-light)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-medium)] disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              <ImpactBar ecoScore={ecoScore} />

              {/* Botón */}
              <button
                type="submit"
                disabled={isAddingToCart || product.stock === 0}
                className="bg-[var(--primary-medium)] hover:bg-[var(--primary-dark)] text-white py-3 px-6 rounded-lg font-semibold transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Agregando...</span>
                  </>
                ) : product.stock === 0 ? (
                  'Sin stock'
                ) : (
                  'Agregar al carrito'
                )}
              </button>
            </form>

            
          </div>
        </div>


        {/* ---------- DETALLES DEL PRODUCTO ---------- */}
<section className="bg-[var(--off-white)] p-6 ">
  <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-4 flex items-center gap-2">
    Detalles del producto
  </h3>

  <div className="grid grid-cols-1 gap-2 text-gray-700 text-sm">
    <p>
      <span className="font-medium text-gray-900">Categoría:</span>{" "}
      {product.category}
    </p>
    <p>
      <span className="font-medium text-gray-900">Origen:</span>{" "}
      {product.originCountry}
    </p>
    <p>
      <span className="font-medium text-gray-900">Materiales:</span>{" "}
      {product.materials}
    </p>
    <p>
      <span className="font-medium text-gray-900">Stock disponible:</span>{" "}
      {product.stock}
    </p>
  </div>
</section>



{/* ---------- CERTIFICACIONES ---------- */}
<section className="my-10 px-6">
  {/* <CertificationList certifications={product.certifications || []} /> */}
  <CertificationList certifications={certifications} />
</section>



{/* ---------- GRÁFICO DE SOSTENIBILIDAD ---------- */}
<section className="mt-20 ">

    <SustainabilityScore ecoScore={ecoScore} />

</section>



      </main>

      <Footer />
    </div>
  );
}