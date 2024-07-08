# Étape 1 : Construire l'application
# Utilisez une image Node.js comme image de base
FROM node:20-slim AS builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers package.json et package-lock.json (ou yarn.lock) dans le répertoire de travail
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tout le reste du projet dans le répertoire de travail
COPY . .

# Construisez l'application NestJS
RUN npm run build

RUN npx prisma migrate deploy

RUN npx prisma generate

# Commande pour lancer l'application
CMD ["node", "dist/main"]
