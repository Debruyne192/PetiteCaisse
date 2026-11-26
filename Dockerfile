FROM php:8.4-cli

# Installation des dépendances système de base
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copie directe de Node.js 22 et npm depuis l'image officielle (sans script externe)
COPY --from=node:22-slim /usr/local/bin /usr/local/bin
COPY --from=node:22-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

# Copie de Composer depuis l'image officielle
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Définition du dossier de travail
WORKDIR /var/www/html

# Copie des fichiers du projet
COPY . .

# Installation des dépendances PHP et React, puis compilation
RUN composer install --no-interaction --optimize-autoloader
RUN npm install && npm run build

# Exposition du port Laravel
EXPOSE 8000

# Démarrage du serveur
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
