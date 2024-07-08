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

# Lancer les migrations de la base de données
RUN npx prisma migrate deploy

# Générer le client Prisma
RUN npx prisma generate

# Construisez l'application NestJS
RUN npm run build

# Commande pour lancer l'application
CMD ["node", "dist/main"]
