# Build stage ===============
FROM node:8.11.1-alpine as node

# Instal dependencies
WORKDIR /app

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install
RUN npm install -g purify-css

# Copy code inside the container
COPY . /app

# Compile the app prod in prod environment
ARG env=prod
RUN npm run build -- --prod

# Removes unused css classes
WORKDIR /app/dist/
RUN purifycss styles.*.css *.js --min --out styles.*.css

# Running stage =============
FROM nginx:1.13-alpine

# Copy compiled app and the nginx configuration file inside the coontainer
COPY --from=node /app/dist/eshop-index-frontend /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
