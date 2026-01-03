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
