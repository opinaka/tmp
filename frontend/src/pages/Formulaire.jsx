import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import { withTheme } from "@rjsf/core";
import { Theme as Bootstrap4Theme } from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";
import { loadConfig } from "../config";

const Form = withTheme(Bootstrap4Theme);

export default function CandidateFormPage() {
  const [schema, setSchema] = useState(null);
  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function init() {
      try {
        const cfg = await loadConfig();
        setConfig(cfg);

        const res = await fetch("/schemas/candidate_form.json");
        const json = await res.json();
        setSchema(json);
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setMessage("Erreur de chargement du formulaire ou de la configuration.");
      }
    }
    init();
  }, []);

  const handleSubmit = async ({ formData }) => {
    if (!config) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post(
        config.api.base_url + config.api.endpoints.create_annonce,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("✅ Annonce créée avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      setMessage("❌ Erreur lors de la création de l'annonce.");
    }
  };

  if (!schema || !config) return <div className="page-content"><p>Chargement du formulaire...</p></div>;

  return (
    <div className="page-content">
      <Container className="p-4 border rounded shadow">
        <h2>Formulaire Candidat</h2>
        {message && <Alert variant="info">{message}</Alert>}
        <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
      </Container>
    </div>
  );
}
