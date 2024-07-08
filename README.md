# Live-Chat Backend

## Collaborateurs

Groupe 9

  - Thierry Pavone TCHOUAMOU PAYONG
  - Paul-Henry NGANKAM NGOUNOU
  - Maxime Loïc NKWEMI NJIKI
  - Oumou Khairy GUEYE

## Description

Live-Chat est une application de messagerie instantanée construite en utilisant des technologies modernes telles que NestJS pour le serveur backend, GraphQL pour l'API, BullMQ et Redis pour la gestion des files d'attente et Prisma pour l'interaction avec la base de données. Ce projet vise à fournir une base robuste pour des applications de messagerie évolutives et performantes.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

  - Node.js (v14 ou supérieur)
  - npm ou Yarn
  - Docker (pour exécuter Redis et la base de données PostgreSQL)
  - NestJS CLI (facultatif mais recommandé)

## Installation

Clonez le dépôt :

```bash
  git clone https://github.com/Pathi14/Live-Chat.git
  cd Live-Chat
```

Installez les dépendances :

```bash
    npm install
```

Lancez les services Redis et PostgreSQL avec Docker :

```bash
    docker-compose up -d
```

## Utilisation

Démarrez le serveur de développement :

```bash
    npm run start:dev
```

Le serveur devrait maintenant être en cours d'exécution sur http://localhost:3000/graphql.

## Tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
    npm run test
```

Pour exécuter les tests avec newmann

Installez newmann (si ce n'est pas déjà fait):

```bash
    npm install -g newman
```

Lancer les tests avec newmann:

```bash
    newman run test/live_chat.postman_collection.json -e test/postman_environment.json
```
