# BUILD BACKEND
FROM golang:1.21.4 AS backend

WORKDIR /app
COPY workshops-backend/go.mod ./
COPY workshops-backend/go.sum ./
RUN go mod download
COPY workshops-backend/src/*.go ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /workshops-backend

EXPOSE 5000

# BUILD FRONTEND
FROM node:18-alpine AS frontend

WORKDIR /workshops-frontend/

COPY workshops-frontend/public/ ./public
COPY workshops-frontend/src/ ./src
COPY workshops-frontend/package.json ./
COPY workshops-frontend/tailwind.config.js ./

ENV REACT_APP_API_BASEURL="/api"

RUN npm install
RUN npm run build

# SERVER
FROM caddy:2.7.6-alpine

WORKDIR /
COPY Caddyfile /etc/caddy/Caddyfile

COPY --from=frontend /workshops-frontend/build/ /workshops-frontend/
COPY --from=backend /workshops-backend /workshops-backend/server

EXPOSE 4000

ENTRYPOINT ["sh"]
CMD ["-c", "./workshops-backend/server & caddy run --config /etc/caddy/Caddyfile --adapter caddyfile & wait -n; exit $?"]
