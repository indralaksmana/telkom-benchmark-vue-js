# Vue App for Telkom Blanja.com Frontend Test

## Getting Started
This app uses **vue-cli**, **node**, **docker-ce**, **docker-compose** and **treafik network** as **proxy**. So, please install all requirement on your **linux** system before build this app.

## Setup

### Change Variable Environment for PHP, JAVA & NODE
You can change variable value that you need in **.env** & **env.development (for development)** file for each programming language.
````
#file location for php
- development
/app/docker/dev/php/.env.development

- production
/app/docker/prod/php/.env

#file location for java
- development
/app/docker/dev/java/.env.development

- production
/app/docker/prod/java/.env

#file location for node
- development
/app/docker/dev/node/.env.development

- production
/app/docker/prod/node/.env
````

### Change Container's Host URL
Change all container host url in **docker-compose.yml** & **docker-compose.dev.yml (for development)** file with your system host url.
```
#service :

#vue_php 
...
labels:
  - "traefik.enable=true"
  - "traefik.frontend.rule=Host:vue.sa-php.indovti.com"
  - "traefik.backend=vue.sa-php"
  - "traefik.docker.network=webgateway"
...

#vue_java 
...
labels:
  - "traefik.enable=true"
  - "traefik.frontend.rule=Host:vue.sa-java.indovti.com"
  - "traefik.backend=vue.sa-java"
  - "traefik.docker.network=webgateway"
...

#vue_node 
...
labels:
  - "traefik.enable=true"
  - "traefik.frontend.rule=Host:vue.sa-node.indovti.com"
  - "traefik.backend=vue.sa-node"
  - "traefik.docker.network=webgateway"
...

```

## How to build app?
After setup environment and docker-compose files. Just run below command to build app.

### Build with development environment 
```
docker-compose -f docker-compose.dev.yml up --build
```

### Build with production environment
```
docker-compose up --build
```


