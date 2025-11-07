
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