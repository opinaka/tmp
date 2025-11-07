import React, { useState, useEffect } from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
import { loadConfig } from "../config";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState(null);

  useEffect(() => {
    loadConfig().then(setConfig);
  }, []);

  const handleDelete = async () => {
    if (!email || !config) return setMessage("Veuillez entrer votre email");

    try {
      await axios.delete(
        config.api.base_url + config.api.endpoints.delete_annonce,
        { headers: { [config.headers.email_header]: email } }
      );
      setMessage("Compte supprimé avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la suppression");
    }
  };

  return (
    <Container className="p-4 border rounded shadow">
      <h2>Supprimer le compte</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email associé au compte</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Button variant="danger" onClick={handleDelete}>Supprimer définitivement</Button>
      </Form>
    </Container>
  );
}