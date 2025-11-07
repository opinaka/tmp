import { Link } from 'react-router-dom';
import logo from '/logo.png';

export default function Menu() {
  return (
    <nav>
      <img src={logo} alt="Logo" style={{ width: '40px' }} />
      <Link to="/">Accueil</Link>
      <Link to="/formulaire">Formulaire</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}