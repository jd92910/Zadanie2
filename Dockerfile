# Etap 1: budowanie zależności (npm install)
FROM node:alpine AS build

# Informacja o autorze zgodna ze standardem OCI
LABEL org.opencontainers.image.authors="Jan Drewienkowski"

#Katalog roboczy
WORKDIR /app
#Kopiowanie plików zależności
COPY package*.json ./
#Instalowanie zależności produkcyjnych
RUN npm install --omit=dev
#Kopiowanie reszty aplikacji
COPY . .

# Etap 2: właściwy, mały obraz uruchomieniowy
FROM node:alpine
LABEL org.opencontainers.image.authors="Jan Drewienkowski"

WORKDIR /app
#Skopiowanie plików z poprzedniego etapu
COPY --from=build /app /app

# Ustawienie portu
EXPOSE 4567

# Healthcheck sprawdzający czy serwer HTTP działa
HEALTHCHECK CMD wget -qO- http://localhost:4567 || exit 1

# Komenda uruchamiająca aplikację
CMD ["node", "pogoda-server.js"]
