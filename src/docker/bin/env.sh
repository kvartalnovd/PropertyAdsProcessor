#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
cd $(dirname ${SCRIPT_DIR}/../..)  # /src/docker/

export $(cat .env.dev | xargs)

DOCKER_FILE="docker-compose.yml"
COMPOSE="docker-compose -f ${DOCKER_FILE}"
