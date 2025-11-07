import { Link } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="menu d-flex align-items-center p-3 bg-light">
      <img src="/logo.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
      <Link to="/" className="me-3">Accueil</Link>
      <Link to="/formulaire" className="me-3">Formulaire</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}