import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <img src="/logo.png" alt="Logo" className="menu-logo" />
        <span className="menu-title">WPA Candidats</span>
      </div>

      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="menu-overlay">
          <button className="menu-close" onClick={() => setOpen(false)}>×</button>
          <Link to="/" onClick={() => setOpen(false)}>Accueil</Link>
          <Link to="/formulaire" onClick={() => setOpen(false)}>Formulaire</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
