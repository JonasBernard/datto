# Datto

Hosted at https://gruppen-tool.jonasbernard.de

This is a tool to sort people into groups based on given wishes.
See the READMEs in the folders for more information.

- `workshops-frontend` contains the React code for the web-frontend
- `workshops-backend` contains the Go code for the stateless backend logic
- `Dockerfile` can be used to build an image running both the backend and frontend on alpine, served using caddy on port 4000

# Using the Dockerfile

To build this application using Docker, execute
```
docker build -t datto:latest .
```
in the repository root.

To host the web application, execute
```
docker run -p 8000:4000 datto:latest
```
and route the traffic to port `8000` using a reverse proxy like Caddy.
