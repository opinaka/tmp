Voici une version complète et corrigée du frontend WPA (Web Progressive App) multi-pages, avec design responsive, configuration centralisée en YAML, et sécurité renforcée (email dans les headers). Le tout est prêt pour un déploiement Docker multi-stage.

---

## 📁 Arborescence du projet

```
frontend/
├── config.yaml
├── Dockerfile
├── nginx.conf
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── index.js
│   ├── App.js
│   ├── config.js
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── CandidateFormPage.js
│   │   ├── DeleteAccountPage.js
│   │   └── StatsPage.js
│   └── schemas/
│       └── candidate_form.json
```

---

## 🔧 `config.yaml`

```yaml
api:
  base_url: "http://localhost:8000"
  endpoints:
    create_annonce: "/api/annonce"
    delete_annonce: "/api/annonce"
    stats_annonce: "/api/annonce/stats"
headers:
  email_header: "X-User-Email"
```

---

## 📦 `package.json` (extrait)

```json
{
  "name": "wpa-candidats",
  "version": "1.0.0",
  "dependencies": {
    "@rjsf/core": "^5.2.1",
    "axios": "^1.6.0",
    "js-yaml": "^4.1.0",
    "react": "^18.2.0",
    "react-bootstrap": "^2.8.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0"
  }
}
```

---

## 🌐 `src/config.js`

```javascript
import yaml from 'js-yaml';
import configRaw from '../config.yaml?raw';

const config = yaml.load(configRaw);
export default config;
```

---

## 🚀 `src/index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 🧭 `src/App.js`

```javascript
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CandidateFormPage from "./pages/CandidateFormPage";
import DeleteAccountPage from "./pages/DeleteAccountPage";
import StatsPage from "./pages/StatsPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<CandidateFormPage />} />
          <Route path="/delete" element={<DeleteAccountPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
```

---

## 🧩 `components/Navbar.js`

```javascript
import React from "react";
import { Link } from "react-router-dom";
import { Navbar as BSNavbar, Nav, Container } from "react-bootstrap";

export default function Navbar() {
  return (
    <BSNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BSNavbar.Brand as={Link} to="/">WPA Candidats</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Formulaire</Nav.Link>
            <Nav.Link as={Link} to="/delete">Supprimer compte</Nav.Link>
            <Nav.Link as={Link} to="/stats">Statistiques</Nav.Link>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
}
```

---

## 📝 `pages/CandidateFormPage.js`

```javascript
import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import config from "../config";

export default function CandidateFormPage() {
  const [schema, setSchema] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/schemas/candidate_form.json")
      .then(res => res.json())
      .then(setSchema)
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async ({ formData }) => {
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
      setMessage("Annonce créée avec succès !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la création de l'annonce");
    }
  };

  if (!schema) return <p>Chargement du formulaire...</p>;

  return (
    <Container className="p-4 border rounded shadow">
      {message && <Alert variant="info">{message}</Alert>}
      <Form schema={schema} onSubmit={handleSubmit} />
    </Container>
  );
}
```

---

## 🗑️ `pages/DeleteAccountPage.js`

```javascript
import React, { useState } from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
import config from "../config";

export default function DeleteAccountPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!email) return setMessage("Veuillez entrer votre email");
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
```

---

## 📊 `pages/StatsPage.js`

```javascript
import React, { useState } from "react";
import { Container, Button, Alert, Form } from "react-bootstrap";
import axios from "axios";
import config from "../config";

export default function StatsPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleStats = async () => {
    if (!email) return setMessage("Veuillez entrer votre email");
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
```

---

## 🐳 `Dockerfile` multi-stage

```Dockerfile
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

Souhaites-tu que je t’ajoute un `Makefile` pour automatiser build, run, clean et logs ? Je peux aussi te proposer un backend FastAPI ou Express.js adapté à cette structure sécurisée.
