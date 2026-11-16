FROM php:8.4-cli

# Installation des dépendances système et de Node.js 20
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    && curl -fsSL https://nodesource.com | bash - \
    && apt-get install -y nodejs

# Activation des extensions PHP pour Laravel et PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql pgsql zip

# Installation de Composer
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
