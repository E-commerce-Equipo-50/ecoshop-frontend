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

  const urlImagenProducto = "https://images.unsplash.com/photo-1759572095384-1a7e646d0d4f?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const urlImagenProducto2 = "https://images.unsplash.com/photo-1759572095329-1dcf9522762b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
          <div className="flex items-start ">
            <img
              //src={product.imageUrl}
              src={urlImagenProducto}
              alt={product.name}
              className="rounded-xl shadow-sm border border-[var(--border-light)] w-full h-3/4 object-cover"
            />
          </div>

          {/* ---------- INFORMACIÓN PRINCIPAL ---------- */}
          <div className="flex flex-col gap-3 mb-8">
            
            {/* Brand */}
            <p className="text-sm text-[var(--text-light)] uppercase tracking-wide">
              {product.brand}
            </p>

            {/* Nombre */}
            <h1 className="text-3xl font-bold text-[var(--text-dark)] leading-snug">
              {product.name}
            </h1>

            {/* Badge eco */}
            <EcoBadge ecoScore={ecoScore} />

            {/* Precio */}
            <p className="text-3xl font-semibold text-[var(--primary-dark)] mt-2">
              ${product.price}
            </p>

            {/* Descripción */}
            <p className="text-[var(--text-light)] leading-relaxed">
              {product.description}
            </p>

            <hr className="border border-[var(--border-light)] mt-8" />

            {/* ---------- IMPACTO AMBIENTAL ---------- */}
              <ImpactBar ecoScore={ecoScore} />
            
            {/* Botón Agregar al carrito */}
            <button
              className=" bg-[var(--primary-medium)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-lg font-semibold transition shadow-sm"
            >
              Agregar al carrito
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row my-4 justify-between gap-6 ">
          <div>

            {/* Detalles */}
            <div className="text-sm flex flex-col gap-1">
              <h3 className="font-semibold mb-6 text-lg text-[var(--text-dark)] border-b-4 border-[var(--primary-medium)]">
                Detalles del producto
              </h3>
              <p><strong>Categoría:</strong> {product.category}</p>
              <p><strong>Origen:</strong> {product.originCountry}</p>
              <p><strong>Materiales:</strong> {product.materials}</p>
              <p><strong>Stock disponible:</strong> {product.stock}</p>
            </div>

            {/* ---------- CERTIFICACIONES ---------- */}
            <section className="mt-16">
              {/* <CertificationList certifications={product.certifications || []} /> */}
              <CertificationList certifications={certifications} />
            </section>
          </div>
          


          {/* ---------- GRÁFICO DE SOSTENIBILIDAD ---------- */}
          <section className="my-2 flex justify-center">
            <SustainabilityScore ecoScore={ecoScore} />
          </section>
        </div>

      </main>

      <Footer />
    </div>
  );
}