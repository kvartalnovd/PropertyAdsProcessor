#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
cd $(dirname ${SCRIPT_DIR}/../..)

export $(cat ${SCRIPT_DIR}/../.env.dev | xargs)

DOCKER_FILE="-f docker-compose.yml"
COMPOSE="docker-compose ${DOCKER_FILE}"
