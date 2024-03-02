FROM php:8-apache

RUN apt update && apt -y install libpq-dev && docker-php-ext-install pdo pdo_mysql

WORKDIR /var/www/html

COPY . .