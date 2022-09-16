#!/bin/bash
COLLECTION=""
for FILE in docker-entrypoint-initdb.d/seed/*; do 
    COLLECTION=$FILE
    COLLECTION=${COLLECTION##*docker-entrypoint-initdb.d\/seed\/}
    COLLECTION=${COLLECTION%%.json*}

    echo "Importando os dados da collection: $COLLECTION"

    mongoimport --uri "mongodb://${MONGO_CURRENCY_INITDB_USERNAME}:${MONGO_CURRENCY_INITDB_PASSWORD}@localhost:${MONGO_CURRENCY_DOCKER_PORT}/${MONGO_CURRENCY_INITDB_DB}?authSource=${MONGO_CURRENCY_INITDB_DB}" \
    --collection $COLLECTION \
    --drop \
    --file $FILE \
    --jsonArray;
done