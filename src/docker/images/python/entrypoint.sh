#!/usr/bin/env bash

PYTHONPATH=`pwd`/..
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" > /dev/null && pwd )"
cd $(dirname $(dirname $(dirname ${SCRIPT_DIR})))/server  # /src/server | Docker: /usr/src/app/server

python manage.py makemigrations --noinput
python manage.py migrate --noinput
python manage.py collectstatic --noinput
gunicorn config.wsgi:application --bind 0.0.0.0:8000
