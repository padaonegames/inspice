# Docker para crear la imagen de la aplicación web.
#
# Se utiliza un Dockerfile multietapa. La imagen final tiene un
# apache básico con los ficheros estáticos, la regla de reescritura
# que necesita React y la aplicación compilada y minimizada.
#
# La creación de la imagen requiere configuración a través de varias
# variables de entorno (en un .env)
#
# TODO: de momento no funcionará porque falta el .env que debería ser
# un secret de Docker al hacer la build (aunque... luego terminará
# cableado en el .js...).
#
# docker build -t spice/activity-demo .
#
# Ejemplo de lanzamiento:
#
# docker run --rm \
#       --name activity-demo \
#       -p 80:80 \
#       spice/activity-demo
# 
#
# TODO: crear HEALTHCHECK (¿en otra etapa?)


###################################################
#
# Single-page application de la aplicación de prueba
#
###################################################
#FROM node:latest AS builder
FROM node:12-alpine AS builder-frontend
LABEL autodelete-spice="true"
# Para borrarla luego (tiene que ser a mano)
# list=$(docker images -q -f "dangling=true" -f "label=autodelete-spice=true")
# if [ -n "$list" ]; then
#      docker rmi $list
# fi
WORKDIR /app
# Copiamos solo el package.json y hacemos el install, porque
# esto cambiará poco y así reaprovechamos la cache de Docker
# para la descarga de paquetes de node.
COPY ./package*.json ./
RUN npm install
# Copiamos todo lo demás y hacemos la build de verdad.
COPY ./tsconfig.json ./
COPY ./src src
COPY ./public public
# Configuración de la clave
ARG REACT_APP_API_KEY
# Configuración del id del dataset
ARG REACT_APP_DATASET_UUID
RUN npm run build
# El resultado se queda en ./build/

###################################################
#
#   Imagen final
#
###################################################

# La imagen final es una web estática. Usamos Apache.
FROM httpd:alpine

# Activamos el módulo rewrite, que necesitamos para redirigir
# al index.html y que React se las apañe por dentro en
# JavaScript en el cliente.
# https://stackoverflow.com/questions/49809748/add-mod-rewrite-to-docker-image-httpdalpine
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

RUN { \
  echo 'IncludeOptional conf.d/*.conf'; \
} >> /usr/local/apache2/conf/httpd.conf \
  && mkdir /usr/local/apache2/conf.d


# Copiamos la aplicación web compilada, que tendrá el
# .htaccess que necesitamos gracias a reactapp.
# Hay que copiar directorio a directorio porque
# COPY --from=builder-frontend /app/build/* /usr/local/apache2/htdocs/
# no funciona bien (aparte de que así somos selectivos y no copiamos
# cosas que no necesitamos). No funciona porque /app/build/* se expande
# e incluye /app/build/static que es un directorio. Cuando COPY se
# encuentra un directorio copia su contenido pero *no* el directorio
# en sí mismo, de modo que terminaríamos teniendo en el destino
# lo de dentro directamente, en lugar de la jerarquía correcta.
# El rollo de hacerlo así es que hay más pasos y más imágenes. Ponemos
# lo último lo más susceptible de cambiar (espero).
COPY --from=builder-frontend /app/build/favicon.ico /app/build/logo*.png /app/build/robots.txt /app/build/.htaccess /app/build/index.html /usr/local/apache2/htdocs/
COPY --from=builder-frontend /app/build/locales /usr/local/apache2/htdocs/locales
COPY --from=builder-frontend /app/build/static /usr/local/apache2/htdocs/static

# Activamos la redirección para el directorio de la
# aplicación, sacado del .htaccess
RUN echo '<Directory "/usr/local/apache2/htdocs">' > /usr/local/apache2/conf.d/redirect.conf; cat /usr/local/apache2/htdocs/.htaccess >> /usr/local/apache2/conf.d/redirect.conf; echo -e '\n</Directory>' >> /usr/local/apache2/conf.d/redirect.conf
