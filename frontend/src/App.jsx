import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Formulaire from './pages/Formulaire';
import Contact from './pages/Contact';
import Menu from './components/Menu';
import Footer from './components/Footer';

function App() {
  return (
    <GoogleOAuthProvider clientId="TON_CLIENT_ID_GOOGLE">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulaire" element={<Formulaire />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;