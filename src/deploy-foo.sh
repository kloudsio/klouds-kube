#!/bin/bash

set -o nounset
set -o errexit

PROJECT_ID="kube-weave"
APP_ID="hello-node-id"
NAME="hello-node-name"
TAG=gcr.io/${PROJECT_ID}/${APP_ID}


cd $(dirname $0)/..

docker build -t $TAG - <<eof
FROM iojs:latest

RUN npm install babel -g

WORKDIR /app
ADD . /app

EXPOSE 8080
CMD ["babel-node", "app.js"]
eof

gcloud docker push $TAG



BASE=$(dirname $0)/..
TAG=gcr.io/${PROJECT_ID}/${APP_ID}

kubectl run $NAME --image=$TAG --port=8080 --hostport=80