Voici le **code complet du backend FastAPI** prêt à être intégré dans ton dossier `backend/`. Il respecte ton architecture : JWT, Google login, endpoints pour formulaire candidat, contact, stats, et support des schémas JSON dynamiques.

---

## 📁 `backend/main.py`

```python
from fastapi import FastAPI, Request, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import jwt
import os

app = FastAPI()

# CORS pour le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir les schémas JSON
app.mount("/schemas", StaticFiles(directory="schemas"), name="schemas")

# Clé secrète JWT
SECRET_KEY = "TON_SECRET_JWT"
ALGORITHM = "HS256"

# Simuler les stats
stats_data = {"cv": 12, "annonces": 5}

# Endpoint Google Auth
@app.post("/auth/google")
async def auth_google(request: Request):
    data = await request.json()
    token = data.get("token")
    if not token:
        return JSONResponse(status_code=400, content={"error": "Token manquant"})

    # Simulation de vérification Google
    user_email = "user@example.com"  # À remplacer par vérification réelle

    jwt_token = jwt.encode({"email": user_email}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": jwt_token}

# Endpoint stats
@app.get("/stats")
def get_stats():
    return stats_data

# Endpoint formulaire candidat
@app.post("/annonce")
async def create_annonce(
    nom: str = Form(...),
    email: str = Form(...),
    cv: str = Form(...)
):
    # Simulation de traitement
    print(f"Annonce reçue : {nom}, {email}, {cv}")
    stats_data["annonces"] += 1
    return {"message": "Annonce enregistrée"}

# Endpoint contact
class ContactMessage(BaseModel):
    nom: str
    email: str
    message: str

@app.post("/contact")
def contact(msg: ContactMessage):
    print(f"Message reçu : {msg.nom}, {msg.email}, {msg.message}")
    stats_data["cv"] += 1
    return {"message": "Message reçu"}
```

---

## 📁 `backend/schemas/candidate_form.json`

Place ton schéma ici. Exemple :

```json
{
  "title": "Formulaire Candidat",
  "type": "object",
  "required": ["nom", "email", "cv"],
  "properties": {
    "nom": { "type": "string", "title": "Nom" },
    "email": { "type": "string", "format": "email", "title": "Email" },
    "cv": { "type": "string", "title": "Lien vers le CV" }
  }
}
```

---

## 📁 `backend/Dockerfile`

```Dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY . .

RUN pip install fastapi uvicorn python-multipart pydantic jwt

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## 📁 `docker-compose.yml` (à la racine du projet)

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
```

---

Ce backend est prêt à tourner. Tu veux que je t’aide à ajouter une vraie vérification du token Google, ou à connecter une base SQLite/PostgreSQL pour stocker les annonces et messages ? Je peux aussi t’ajouter un endpoint `/admin/stats` protégé par JWT.