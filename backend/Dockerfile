FROM php:8.4-cli

# Dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev

# PHP extensions
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql zip

# Work directory
WORKDIR /var/www/html
COPY . .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install Laravel deps
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chmod -R 777 storage bootstrap/cache

# Start Laravel for Render
CMD php artisan serve --host=0.0.0.0 --port=$PORT
