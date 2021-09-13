# Repository Summary
* Docker
* Docker Compose
* Microservices-architecture (Spring Boot - Java Framework)
* Microservices Communication using Feign client as REST client
* Docker staging and pom.xml profiles (dev, test, prod environments)
* Mysql-database
* Postgresql-database
* Spring Boot (back-end)
* Angular (front-end)
* Platform-Provided Service Discovery (Deployment infrastructure take care of service discovery)
* Service-discovery (Docker-DNS)
* API-gateway (NGINX)
* Using NGINX in the backend as a reverse proxy
* Using NGINX in the frontend as a web server for displaying the static content of the dist folder
* Shell Scripting
* 2 types of artifacts:
  * The first type of artifacts: **npm base image** (npm dependencies download acceleration) published on **Docker Hub**
  * The third type of artifacts: publishing the **application’s Docker image** on **Docker Hub**

# Nistagram frontend Instructions
**Start Docker Daemon:** If you're using Docker for Windows, Then simply start the desktop app installed in:
```shell
C:\Program Files\Docker\Docker\Docker Desktop.exe
```
Position yourself using **Git Bash** in the folder where `docker-compose.yml` file is:
```
cd DOCKER-COMPOSE_FILE_PATH
```
Mapping environment variables from the environment file to the docker-compose.yml file (Check how your docker-compose.yml will finally look like, after environment variables substitution). Building container images can also be achieved using docker compose. Before running any docker compose command you should always check configuration using the following command:

Mapping environment variables from the **dev** environment file to the **docker-compose.yml** file
```shell
docker-compose --env-file config/.env.dev config
```
Mapping environment variables from the **test** environment file to the **docker-compose.test.yml** file
```shell
docker-compose --env-file config/.env.test config
```
Mapping environment variables from the **prod** environment file to the **docker-compose.prod.yml** file
```shell
docker-compose --env-file config/.env.prod config
```
To setup an infrastructure for development environment run the following command in **Git Bash**:
```shell
docker-compose --env-file config/.env.dev up --build
```
To setup an infrastructure for test environment run the following command:
```shell
docker-compose --env-file config/.env.test -f docker-compose.yml -f docker-compose.test.yml up --build
```
To setup an infrastructure for production environment run the following command:
```shell
docker-compose --env-file config/.env.prod -f docker-compose.yml -f docker-compose.prod.yml up --build
```
Docker-compose services/containers listing (one service one container)
```shell
docker-compose ps
```
```shell
docker ps
```
Request:
```GET http://localhost:8080/api/product/hello```
```
http://localhost:8080/api/product/hello
```
Response:
```
Hello from product service with ip address 172.21.0.5!
```
Request:
```GET http://localhost:8080/api/shop/hello```
```
http://localhost:8080/api/shop/hello
```
Response:
```
Hello from shop service with ip address 172.21.0.5!
```
Request:
```http://localhost:8080/api/report/hello```
```
http://localhost:8080/api/report/hello
```
Response:
```
Hello from report service with ip address 172.21.0.3!
```

To destroy infrastructure run the following command in **Git Bash**:
```shell
docker-compose down -v
```
Automatically remove (delete) Docker images
```shell
docker image prune -a
```

# Artifacts
## The first type of artifacts: npm base image (npm dependencies download acceleration) published on Docker Hub
Build npm base image
```shell
docker image build -f Dockerfile.base -t stevicdule/npm-base-nistagram-frontend:1.0.0-dev .
```
Push your npm base image to Docker Hub
```shell
docker push stevicdule/npm-base-nistagram-frontend:1.0.0-dev
```
## The third type of artifacts: publishing the application’s Docker image on Docker Hub
