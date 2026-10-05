import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SupportPage from './pages/SupportPage';
import CasesPage from './pages/CasesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/cases" element={<CasesPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
