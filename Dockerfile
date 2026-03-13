# React
FROM node:20-alpine AS frontend-build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

# Backend
FROM php:8.4-fpm
WORKDIR /var/www

# PHP
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl libpq-dev libonig-dev libxml2-dev pkg-config \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring xml ctype bcmath

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Dependencies
COPY backend/composer.json backend/composer.lock ./
RUN composer install --optimize-autoloader --prefer-dist --no-interaction --dev

# Copy Laravel
COPY backend/ .

# Create necessary folders for Laravel
RUN mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Copy React build to public
COPY --from=frontend-build /app/dist ./public

# Rights
RUN chown -R www-data:www-data /var/www

# Run Laravel + migrations
ENV PORT 10000
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=$PORT
