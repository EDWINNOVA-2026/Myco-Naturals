import { HashRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Guide from './pages/Guide';
import FranchisePage from './pages/FranchisePage';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import Cart from './pages/consumer/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col relative">
          <Navbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/guide" element={<ProtectedRoute role="farmer"><Guide /></ProtectedRoute>} />
                <Route path="/franchise" element={<FranchisePage />} />
                <Route path="/dashboard" element={<ProtectedRoute role="farmer"><Dashboard /></ProtectedRoute>} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
