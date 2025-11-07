Merci de ta vigilance, Mohammed. Voici les trois fichiers manquants pour compléter ton frontend WPA :

---

## 🧭 `nginx.conf` (pour servir le frontend React)

```nginx
server {
  listen 80;
  server_name localhost;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location /config.yaml {
    default_type text/yaml;
    add_header Access-Control-Allow-Origin *;
  }
}
```

> Ce fichier permet à Nginx de servir une SPA React avec React Router, et expose `config.yaml` avec CORS ouvert pour le chargement dynamique.

---

## 🌐 `public/index.html`

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WPA Candidats</title>
    <link rel="icon" href="favicon.ico" />
  </head>
  <body>
    <noscript>Activez JavaScript pour utiliser cette application.</noscript>
    <div id="root"></div>
  </body>
</html>
```

> Simple et minimal, prêt pour React avec Bootstrap.

---

## 📝 `schemas/candidate_form.json`

```json
{
  "title": "Formulaire Candidat",
  "type": "object",
  "required": ["nom", "email", "cv"],
  "properties": {
    "nom": {
      "type": "string",
      "title": "Nom complet"
    },
    "email": {
      "type": "string",
      "format": "email",
      "title": "Adresse email"
    },
    "cv": {
      "type": "string",
      "title": "CV (fichier)",
      "contentEncoding": "base64",
      "contentMediaType": "application/pdf"
    },
    "linkedin": {
      "type": "string",
      "title": "Profil LinkedIn",
      "format": "uri"
    },
    "motivation": {
      "type": "string",
      "title": "Lettre de motivation"
    }
  }
}
```

> Ce schéma est extensible : tu peux ajouter ou modifier des champs sans changer le backend, puisque MongoDB accepte des documents JSON libres.

---

Souhaites-tu que je t’ajoute un script de validation frontend (avec `uiSchema`) ou une preview du CV uploadé ? Je peux aussi te proposer une version en TypeScript si tu veux renforcer la robustesse du frontend.
