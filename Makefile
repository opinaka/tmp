# Variables
FRONTEND_NAME=wpa_frontend
DOCKER_COMPOSE=docker-compose.yml

# Build l'image frontend
build:
	docker compose -f $(DOCKER_COMPOSE) build frontend

# Lance les services
up:
	docker compose -f $(DOCKER_COMPOSE) up -d

# Stoppe les services
down:
	docker compose -f $(DOCKER_COMPOSE) down

# Nettoie les containers, volumes et images inutiles
clean:
	docker compose -f $(DOCKER_COMPOSE) down --volumes --remove-orphans
	docker image prune -f

# Affiche les logs du frontend
logs:
	docker logs -f $(FRONTEND_NAME)

# Rebuild complet
rebuild: clean build up

# Shell dans le container frontend
shell:
	docker exec -it $(FRONTEND_NAME) sh