#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
cd $(dirname $(dirname $(dirname ${SCRIPT_DIR})))/server  # /src/server

python manage.py makemigrations --noinput
python manage.py migrate --noinput
PYTHONPATH=`pwd`/.. gunicorn config.wsgi:application --bind 0.0.0.0:8000
