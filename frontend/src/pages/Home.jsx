import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ cv: 0, annonces: 0 });

  const handleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post('http://localhost:8000/auth/google', {
        token: credentialResponse.credential
      });
      localStorage.setItem('jwt', res.data.access_token);
      alert('Connexion réussie');
    } catch (err) {
      console.error('Erreur de connexion', err);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Bienvenue sur le site</h1>
      <div className="stats mb-4">
        <strong>CV :</strong> {stats.cv} | <strong>Annonces :</strong> {stats.annonces}
      </div>
      <div className="login">
        <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Erreur')} />
      </div>
    </div>
  );
}