#!/bin/bash

docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=dev-password -d mysql:5.7
docker run --name dev-env --link mysql:mysql -p 8080:8080 --volume $(pwd):/opt/dev -it briann/dev-env:latest /bin/bash
