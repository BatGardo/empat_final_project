FROM php:8.4-apache

# Dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    libpq-dev

# PHP
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql zip

# Laravel
WORKDIR /var/www/html
COPY . .

# Permissions and Apache
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache \
    && a2enmod rewrite \
    && sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Laravel dependencies and cache
RUN composer install --no-dev --optimize-autoloader \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Expose port
EXPOSE 80

# run Apache
CMD ["apache2-foreground"]
