import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="menu-container">
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="menu-overlay">
          <button className="close" onClick={() => setOpen(false)}>×</button>
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/formulaire" onClick={() => setOpen(false)}>Formulaire</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}