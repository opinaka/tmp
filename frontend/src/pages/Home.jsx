// src/pages/Home.jsx
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ cv: 0, annonces: 0 });

  const handleLogin = async (credentialResponse) => {
    const res = await axios.post('http://localhost:8000/auth/google', {
      token: credentialResponse.credential
    });
    localStorage.setItem('jwt', res.data.access_token);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/stats').then(res => setStats(res.data));
  }, []);

  return (
    <div>
      <h1>Bienvenue sur le site</h1>
      <p>CV : {stats.cv} | Annonces : {stats.annonces}</p>
      <GoogleLogin onSuccess={handleLogin} onError={() => console.log('Erreur')} />
    </div>
  );
}