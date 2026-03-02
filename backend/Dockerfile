FROM php:8.4-apache

# Dependeces
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    && sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf \
    libzip-dev zip unzip git curl libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip

# Laravel
COPY . /var/www/html

# Access
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Dependencies Laravel
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose port
EXPOSE 80

# Run command
CMD ["apache2-foreground"]
