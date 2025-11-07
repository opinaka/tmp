import React, { useState, useEffect } from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { loadConfig } from "../config";

export default function StatsPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState(null);

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  const handleStats = async () => {
    if (!email || !config) return setMessage("Veuillez entrer votre email");

    try {
      await axios.get(
        config.api.base_url + config.api.endpoints.stats_annonce,
        { headers: { [config.headers.email_header]: email } }
      );
      setMessage("Les statistiques ont été envoyées par email !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'envoi des statistiques");
    }
  };

  return (
    <Container className="p-4 border rounded shadow">
      <h2>Consulter les statistiques</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email associé au compte</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={handleStats}>Envoyer statistiques</Button>
      </Form>
    </Container>
  );
}