#!/bin/sh

until cd /backend
do
    echo "Waiting for server volume..."
done

# run a worker :)

celery -A api worker -l INFO

celery -A api beat