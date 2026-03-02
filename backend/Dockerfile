FROM php:8.4-apache

# Dependeces
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql zip \
    && sed -i 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf

# Laravel
COPY . /var/www/html

# Access
RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Dependencies Laravel
RUN composer install --no-dev --optimize-autoloader

# Expose port
EXPOSE 80

# Run command
CMD ["apache2-foreground"]
