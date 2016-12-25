#!/bin/bash

docker run -p 3000:3000 --volume $(pwd):/opt/dev -it briann/dev-env:latest /bin/bash
