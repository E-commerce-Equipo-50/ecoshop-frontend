import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/layout/Navbar"
import { Home } from "./pages/Home"
import  Catalog  from "./pages/Catalog"
import { Certifications } from "./pages/Certifications"
import AdminLogin from "./pages/auth/AdminLogin"
import AdminRegister from "./pages/auth/AdminRegister"
import { Cart } from "./pages/Cart"
import UserLogin from "./pages/auth/UserLogin"
import UserRegister from "./pages/auth/UserRegister"
import VistaMarca from './pages/VistaMarca' 

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/brands" element={<VistaMarca />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login-client" element={<UserLogin />} />
        <Route path="/register-client" element={<UserRegister />} />
        <Route path="/login-company" element={<AdminLogin />} />
        <Route path="/register-company" element={<AdminRegister />} />
        
      </Routes>
    </>
  )
}
