import { useParams } from "react-router-dom";
import useFetch from "../lib/hooks/useFetch";
import EcoBadge from "../components/eco/EcoBadge";
import ImpactBar from "../components/eco/ImpactBar";
import SustainabilityScore from '../components/eco/SustainabilityScore'
import CertificationList from "../components/eco/CertificationList";
import {Footer} from "../components/layout/Footer";

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

  const { data: productResponse, loading, error } = useFetch(
    `https://ecoshop-backend-00ta.onrender.com/api/Productos/${id}`
  );

  const product = productResponse?.product;
  const ecoScore = productResponse?.ecoScore;

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
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                // Acá vas a integrar con tu lógica de carrito
                // ejemplo futuro: addToCart(product, quantity)
              }}
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
                  id="product-quantity"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  defaultValue="1"
                  aria-label="Cantidad a agregar al carrito"
                  className="w-20 border border-[var(--border-light)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--primary-medium)]"
                />
              </div>

              <ImpactBar ecoScore={ecoScore} />

              {/* Botón */}
              <button
                type="submit"
                className="bg-[var(--primary-medium)] hover:bg-[var(--primary-dark)] text-white py-3 px-6 rounded-lg font-semibold transition shadow-sm"
              >
                Agregar al carrito
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