import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/footer/Footer';
import men_banner from "./Components/assets/Frontend_Assets/banner_mens.png";
import women_banner from "./Components/assets/Frontend_Assets/banner_women.png";
import kids_banner from "./Components/assets/Frontend_Assets/banner_kids.png"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContext } from "./Components/auth/AuthContext"
import { useContext } from 'react';
const queryClient = new QueryClient();

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />
    }
    return children;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute><Shop /></ProtectedRoute>} />
          <Route path='/mens' element={<ProtectedRoute>
            <ShopCategory banner={men_banner} category="men" />
          </ProtectedRoute>} />
          <Route path='/womens' element={<ProtectedRoute><ShopCategory banner={women_banner} category="women" /></ProtectedRoute>} />
          <Route path='/kids' element={<ProtectedRoute><ShopCategory banner={kids_banner} category="kid" /></ProtectedRoute>} />
          <Route path='/product' element={<ProtectedRoute><Product /></ProtectedRoute>}>
            <Route path='/product/:id' element={<ProtectedRoute><Product /></ProtectedRoute>} />
          </Route>
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
