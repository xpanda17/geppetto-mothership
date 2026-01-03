# Docker
## Setting Up User
<li> sudo groupadd docker
<li> sudo usermod -aG docker $USER

## Command
```docker-compose up --build```
<li>up: Starts the containers.
<li>--build: Tells Docker to re-read your Dockerfile and reinstall your npm packages.

<br><br>
```docker-compose stop```
<li>stop: stop the containers.

<br><br>
```docker-compose down```
<li>down: stop AND remove the containers.

<br><br>
```sudo kill -9 $(sudo docker inspect --format '{{.State.Pid}}' geppetto-be)```
<li>Temporary way to kill the docker container

<br><br>
```docker exec -it {{containerName}} bash```
<li>Go inside docker container